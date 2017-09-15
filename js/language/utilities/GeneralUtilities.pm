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
# Copyright (C) 1999 Netscape Communications Corporation.  All
# Rights Reserved.
# 
# Contributor(s):   Waldemar Horwat <waldemar@acm.org>
#

package GeneralUtilities;
use 5.004;
use strict;
use diagnostics;
use Cwd "cwd";
use File::Basename;
use File::Copy;
use File::Find;
use POSIX;

use Exporter;
use vars qw($VERSION @ISA @EXPORT @EXPORT_OK %EXPORT_TAGS);
@ISA = qw(Exporter);
@EXPORT = qw($sep $pre $noSet arrayEq arraySliceEq listToHash updateHash fileModDate formatDate pathToAbsolute addDirectorySuffix testDirectory
			pathDifference pathSum findFiles findNonCVSFiles backUpFile updateFile);
@EXPORT_OK = qw($onMac genBackupFileName);

use vars qw($sep $pre $noSet $onMac);

BEGIN {
	$onMac = "\n" eq "\015";
	if ($onMac) {
		require "MacUtilities.pm";
		MacUtilities->import();
	}
}


$sep = "/"; # file path separator
$pre = "";  # relative path prefix

if ($onMac) {
	$sep = ":";
	$pre = ":";
}


# Set to true to inhibit file writes.
$noSet = 0;


# Return true if the two arrays are equal.
sub arrayEq(\@\@) {
	my ($a1, $a2) = @_;
	my $len = scalar @$a1;
	return "" if $len != scalar @$a2;
	for (my $i = 0; $i != $len; $i++) {
		return "" if $$a1[$i] ne $$a2[$i];
	}
	return 1;
}


# Return true if the two array slices are equal.
sub arraySliceEq(\@$$\@$$) {
	my ($a1, $begin1, $end1, $a2, $begin2, $end2) = @_;
	die "Bad arraySliceEq slice $begin1 through $end1" if $begin1 > $end1;
	return "" if $end1-$begin1 != $end2-$begin2;
	for (; $begin1 != $end1; $begin1++, $begin2++) {
		return "" if $$a1[$begin1] ne $$a2[$begin2];
	}
	return 1;
}


# Return a hash table containing the given keys and "true" values.
sub listToHash(@) {
	my %h;
	foreach (@_) {
		die "Duplicate entry: ", $_ if $h{$_};
		$h{$_} = 1;
	}
	return %h;
}


# Update the hash to the given value.  The hash must be either undefined or eq to
# the given value.
sub updateHash(\%$$) {
	my ($hash, $key, $value) = @_;
	die "Changing ", $key, ": ", $$hash{$key}, " -> ", $value if
		defined($$hash{$key}) && $$hash{$key} ne $value;
	$$hash{$key} = $value;
}


# Return the file's modification date.
sub fileModDate($) {
	my ($pathName) = @_;
	my ($dev, $ino, $mode, $nlink, $uid, $gid, $rdev, $size, $atime, $mtime, $ctime, $blksize, $blocks) =
		stat $pathName or die "Can't stat '$pathName'";
	return $mtime;
}


# Return the date nicely formatted.
sub formatDate(@) {
	return POSIX::strftime("%A, %B ", @_) . $_[3] . ", " . (1900+$_[5]);
}


# Convert the given pathname to an absolute pathname.
sub pathToAbsolute($) {
	local ($_) = @_;
	if ($onMac) {
		$_ = ":".$_ if index($_, ':') == -1;
		$_ = cwd . $_ if substr($_, 0, 1) eq ':';
		while (s/:[^:]+::/:/) {}
	} else {
		$_ = $_ . "/" if (/(^|\/)\.\.?$/);
		if ($_ eq "./") {
			$_ = cwd;
		} elsif (substr($_, 0, 1) ne '/') {
			$_ = cwd . "/" . $_;
			while (s|/[^./][^/]*/\.\./|/|) {}
		}
	}
	return $_;
}


# Add a directory separator to the end of the path if there isn't one there already.
sub addDirectorySuffix($) {
	local ($_) = @_;
	$_ .= $sep if $_ eq "" || substr($_, -1, 1) ne $sep;
	return $_;
}


# If the path is a directory, add a directory separator to its end.
# In scalar context, return the updated path.
# In list context, return the updated path and a flag that states whether it is a directory.
sub testDirectory($) {
	my ($path) = @_;
	die "Empty path" if $path eq "";
	my $isDir = -d $path;
	$path = addDirectorySuffix $path if $isDir;
	if (wantarray) {
		return ($path, $isDir);
	} else {
		return $path;
	}
}


# Ensure that the path is absolute and does not end with a directory separator.
# Return an array of the path's components.
sub splitPath($) {
	my ($path) = @_;
	die "Empty path" if $path eq "";
	if ($onMac) {
		die "Need absolute path" if substr($path, 0, 1) eq ':' || substr($path, -1, 1) eq ':' || /::/;
		return split(/:/, $path);
	} else {
		die "Need absolute path" if substr($path, 0, 1) ne '/' || substr($path, -1, 1) eq '/' || /\/\.\.?(?:\/|$)/;
		my @s = split(/\//, $path);
		shift @s;
		return @s;
	}
}


# $dstPathName and $srcPathName must both be absolute file paths.  Return the relative path from $srcPathName
# to $dstPathName as a unix-style relative path.  As a special case, return the empty string if $dstPathName and
# $srcPathName are identical.
sub pathDifference($$) {
	my ($srcPathName, $dstPathName) = @_;

	return "" if $srcPathName eq $dstPathName;
	my @srcComponents = splitPath $srcPathName;
	my @dstComponents = splitPath $dstPathName;
	while (@srcComponents && @dstComponents && $srcComponents[0] eq $dstComponents[0]) {
		shift @srcComponents;
		shift @dstComponents;
	}
	return "../" x (@srcComponents - 1) . join("/", @dstComponents);
}


# $srcPathName must be an absolute file path to a file.  Return the absolute file path of the file obtained
# by replacing $srcPathName's file component with the $deltaPath unix-style relative path.  If $deltaPath is
# empty, return $srcPathName.
sub pathSum($$) {
	my ($srcPathName, $deltaPath) = @_;
	if ($deltaPath ne "") {
		die "Need relative path" if substr($deltaPath, 0, 1) eq '/';
		my ($fileName, $dir) = fileparse $srcPathName;
		$deltaPath =~ s|/|$sep|g;
		$srcPathName = $dir . $deltaPath;
		while ($srcPathName =~ s|$sep[^.$sep][^$sep]*$sep\.\.$sep|$sep|o) {}
	}
	return $srcPathName;
}


# Find all files in the given directories (including subdirectories) with the given suffix.
# Return a list of the files' full pathnames.
sub findFiles($@) {
	my $suffix = shift;

	my @files;
	find(sub {push @files, $File::Find::name if (/\.$suffix$/)}, @_);
	return @files;
}


# Find all files in the given directories (including subdirectories), excluding CVS directories.
# Return a list of the files' full pathnames.
sub findNonCVSFiles(@) {
	my @files;
	find(sub {$File::Find::prune = 1 if $_ eq "CVS";
			  push @files, $File::Find::name if -f}, @_);
	return @files;
}


# Given a pathname, return a unique generated pathname for a new backup file and, if on
# a Macintosh, a dirID of the given pathname.  The new name is
# generated by appending "~N" with the smallest nonnegative integer N to the pathname
# while still keeping the length of the filename below 32 characters.
#
# On the Macintosh the backup files are put in the trash folder on the volume given by the
# pathname.
sub genBackupFileName($) {
	my ($pathName) = @_;
	my ($name, $path) = fileparse $pathName;
	my $backupPath = $path;
	my $dirID;
	($backupPath, $dirID) = getTrashFolder($pathName) if $onMac;
	
	my $i = 0;
	while (1) {
		my $ending = "~$i";
		my $tempPathName = $backupPath . substr($name, 0, 31 - length $ending) . $ending;
		return ($tempPathName, $dirID) unless -e $tempPathName;
		$i++;
	}
}


# Back up the given files.
sub backUpFile(@) {
	foreach (@_) {
		my ($backupPathName, $dirID) = genBackupFileName $_;
		print "$_ --> $backupPathName\n";
		copy $_, $backupPathName or die $^E;
		setPutAway($backupPathName, $dirID) if $onMac;
	}
}


# Back up the given file and then update its contents to be the given list.
# Set the file's modification date $timeDelta seconds after its previous value, but no
# later than the present.
sub updateFile($$@) {
	my $pathName = shift;
	my $timeDelta = shift;
	if ($noSet) {
		print STDERR "***** File $pathName not written due to -n\n";
	} else {
		backUpFile $pathName;
		my $modDate = fileModDate $pathName;
		open DSTFILE, ">".$pathName or die $^E;
		print DSTFILE @_;
		close DSTFILE or die $^E;
		my $now = time;
		$modDate += $timeDelta;
		$modDate = $now if $modDate > $now;
		utime time, $modDate, $pathName or die $^E;
	}
}

1;
