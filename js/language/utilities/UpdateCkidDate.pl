#!/usr/bin/perl -w
#
# The contents of this file are subject to the Mozilla Public
# License Version 1.1 (the "License"); you may not use this file
# except in compliance with the License. You may obtain a copy of
# the License at http://www.mozilla.org/MPL/
# 
# Software distributed under the License is distributed on an "AS
# IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or
# implied. See the License for the specific language governing
# rights and limitations under the License.
# 
# The Original Code is Waldemar's Perl Utilities.
# 
# The Initial Developer of the Original Code is Netscape Communications
# Corporation.  Portions created by Netscape Communications Corporation are
# Copyright (C) 2000 Netscape Communications Corporation.  All
# Rights Reserved.
# 
# Contributor(s):   Waldemar Horwat <waldemar@acm.org>
#
#
# UpdateCkidDate [-n] [-p] [-r] [-suffix suffix] [-dst] <file> ... <file>
#
# For each <file>, set the Mac 'ckid' resource modification date to the file's modification date.
# If the :CVS:Entries file is present, also set that file's entry for <file> to the file's modification date.
# This makes MacCVS believe that the file has not been modified.
#
# If -r is given, also clear the modify-read-only flag in the 'ckid' resource.
# If -p is given, print progress information.
# If -n is given, don't write the files.
# If -suffix suffix is given, then directories may be specified instead of files.  All files with the given
#   suffix inside each directory are affected.
# If -dst is given, work around MacPerl's daylight-saving time bug.
#

use 5.004;
use strict;
use diagnostics;
use File::Basename;
use Getopt::Long;
use Time::Local;
use Mac::Types;
use Mac::Memory;
use Mac::Resources;
use GeneralUtilities;


my $openResourceFile;
my $openResourceFileName;
END {
	if ($openResourceFile) {
		CloseResFile $openResourceFile;
		print STDERR "Closed '$openResourceFileName': $openResourceFile from error handler\n";
	}
}


# Compute the 'ckid' resource checksum.
sub ckidChecksum($) {
	my ($res) = @_;
	use integer;

	my $size = $res->size/4;
	my $checksum = 0;
	for (my $i = 1; $i < $size; $i++) {
		$checksum += unpack('I', $res->get($i*4, 4));
	}
	return $checksum;
}


# Display the resource's contents.
sub showResource($) {
	my ($res) = @_;
	use integer;

	my $size = $res->size;
	for (my $i = 0; $i < $size/4; $i++) {
		printf "%.4X: %.8X\n", $i*4, unpack('I', $res->get($i*4, 4));
	}
}


my $noSet = 0;
my $verbose = 0;
my $clearModifyReadOnly = 0;
my $suffix;
my $fixDST = 0;

# Update the 'ckid' resource for the given file.
sub updateCkid($) {
	my ($srcFile) = @_;
	use integer;

	my $changed = 0;

	die "'$srcFile' is not a file" unless -f $srcFile;
	my $fileTime = fileModDate $srcFile;
	$openResourceFileName = $srcFile;
	if (!defined($openResourceFile = OpenResFile($srcFile))) {
		die "Can't open $srcFile";
	}
	# print "Opened '$srcFile': $openResourceFile\n";
	# printf "Modified on %.8X: ", $fileTime;
	# print "($fileTime) ", scalar(localtime $fileTime), "\n";

	my $res = Get1Resource('ckid', 128);
	if (!$res) {
		print STDERR "Can't find 'ckid' 128 resource in $srcFile\n";
	} else {
		# showResource $res;
		my $size = $res->size;
		die "Bad resource format" if $size < 26 || unpack('S', $res->get(8, 2)) != 4;
		die "Bad checksum" unless ckidChecksum($res) == unpack('I', $res->get(0, 4));
		my $ckidTime = unpack('I', $res->get(22, 4));
		my $modifyReadOnly = unpack('C', $res->get(13, 1));
		die "Bad modify-read-only" unless $modifyReadOnly <= 1;
		if ($ckidTime == $fileTime) {
			print "'$srcFile': ckid time OK: ", scalar(localtime $fileTime), "\n" if $verbose;
		} else {
			print "'$srcFile': ckid time changed from ", scalar(localtime $ckidTime), " to ", scalar(localtime $fileTime), "\n";
			$changed = 1;
			$res->set(22, 4, pack('I', $fileTime)) unless $noSet;
		}
		if ($modifyReadOnly) {
			if ($clearModifyReadOnly) {
				print "'$srcFile': cleared modify-read-only flag\n";
				$changed = 1;
				$res->set(13, 1, pack('C', 0)) unless $noSet;
			} else {
				print "'$srcFile': modify-read-only flag left on\n" if $verbose;
			}
		}
		if ($changed) {
			if ($noSet) {
				$changed = 0;
				print "***** '$srcFile' not written due to -n\n";
			} else {
				$res->set(0, 4, pack('I', ckidChecksum($res)));
				# showResource $res;
				ChangedResource($res) or die "Can't change resource";
			}
		}
	}
	my $resFile = $openResourceFile;
	undef $openResourceFile;
	CloseResFile $resFile;
	if ($changed) {
		utime time, $fileTime, $srcFile or die $^E;
	}
	# print "Closed '$srcFile': $resFile\n";
}


# Version of gmtime with the MacPerl daylight-saving time bug fixed for US dates.
# (MacPerl's gmtime function always assumes that the date is in standard time.)
sub macGMTime($) {
	my ($time) = @_;
	my ($sec, $min, $hour, $day, $month, $year, $weekday, $yearDay, $dst) = localtime $time;
	$time -= 3600 if $fixDST && ($month > 3 && $month < 9 ||
								 $month == 3 && $day > $weekday ||
								 $month == 9 && $day + ($weekday ? 7-$weekday : 0) <= 31);
	return gmtime $time;
}


# Update the CVS Entries file for the given file.
sub updateCVSEntries($) {
	my ($srcFile) = @_;
	use integer;

	my ($srcName, $srcPath) = fileparse $srcFile;
	my $cvsDirectory = $srcPath."CVS";
	my $entriesFile = $cvsDirectory.":Entries";
	if (-d $cvsDirectory && -f $entriesFile) {
		my $fileTime = macGMTime fileModDate $srcFile;
		open ENTRIESFILE, "<".$entriesFile or die "Can't open '$entriesFile'";
		my @entries = <ENTRIESFILE>;
		close ENTRIESFILE or die $^E;
		my $found = 0;
		my $changed = 0;
		foreach (@entries) {
			if (m|^([^/]*)/([^/]*)/([^/]*)/([^/]*)/(.*)$|s && $2 eq $srcName) {
				$found = 1;
				if ($4 ne $fileTime) {
					$_ = "$1/$2/$3/$fileTime/$5";
					print "Changed '$entriesFile' time for '$srcName' from $4 to $fileTime\n";
					$changed = 1;
				} else {
					print "'$srcFile': CVS Entries time OK: $fileTime\n" if $verbose;
				}
				last;
			}
		}
		print STDERR "Can't find entry for '$srcName' in '$entriesFile'\n" unless $found;
		if ($changed) {
			if ($noSet) {
				print "***** '$entriesFile' not written due to -n\n";
			} else {
				open ENTRIESFILE, ">".$entriesFile or die "Can't write '$entriesFile'";
				print ENTRIESFILE @entries;
				close ENTRIESFILE or die $^E;
			}
		}
	} else {
		print "Can't find '$entriesFile'\n" if $verbose;
	}
}


GetOptions("r" => \$clearModifyReadOnly, "p" => \$verbose, "n" => \$noSet, "suffix=s" => \$suffix, "dst" => \$fixDST);
foreach (@ARGV) {
	if (-d) {
		if ($suffix) {
			foreach (findFiles $suffix, pathToAbsolute $_) {
				updateCkid $_;
				updateCVSEntries $_;
			}
		} else {
			foreach (findNonCVSFiles pathToAbsolute $_) {
				updateCkid $_;
				updateCVSEntries $_;
			}
		}
	} else {
		updateCkid $_;
		updateCVSEntries $_;
	}
}
1;
