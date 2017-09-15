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
#
# UpdateModDates [-p] [-delta <delta>] <suffix> <src-tree> <dst-tree>
#
# Update the modification date of every file in <src-tree> with the given <suffix> to
# be the same as the corresponding file in <dst-tree> plus <delta> in seconds.

use 5.004;
use strict;
use diagnostics;
use Getopt::Long;
use GeneralUtilities;


# Replace srcPrefix with dstPrefix in the pathname.
# (Mac-specific)
sub replacePathPrefix($$$) {
	my ($srcPrefix, $dstPrefix, $path) = @_;
	die "Bad prefix $srcPrefix of $path" unless uc substr($path, 0, length $srcPrefix) eq uc $srcPrefix;
	return $dstPrefix . substr($path, length $srcPrefix);
}


my $verbose = 0;
my $delta = 0;
GetOptions("p" => \$verbose, "delta=i" => \$delta);
my ($suffix, $srcTree, $dstTree) = @ARGV;

$srcTree = pathToAbsolute $srcTree;
$dstTree = pathToAbsolute $dstTree;
foreach (findFiles $suffix, $dstTree) {
	my $src = replacePathPrefix $dstTree, $srcTree, $_;
	if (my $srcTime = fileModDate $src) {
		$srcTime += $delta;
		my $dstTime = fileModDate $_;
		if ($dstTime != $srcTime) {
			print scalar(localtime $dstTime), " <== ", scalar(localtime $srcTime), ":   $_ <== $src\n";
			utime time, $srcTime, $_ or die $^E;
		} elsif ($verbose) {
			print scalar(localtime $dstTime), ":   $_ <== $src\n";
		}
	} else {
		print STDERR "Can't find $src\n";
	}
}
1;
