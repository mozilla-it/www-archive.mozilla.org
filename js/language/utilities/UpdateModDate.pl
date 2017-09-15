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
# UpdateModDate [-delta <delta>] <src-file> <dst-file>
#
# Update the modification date of <dst-file> to be the same as <src-file> plus <delta> in seconds.

use 5.004;
use strict;
use diagnostics;
use Getopt::Long;
use GeneralUtilities;


my $delta = 0;
GetOptions("delta=i" => \$delta);
my ($srcFile, $dstFile) = @ARGV;

my $srcTime = fileModDate $srcFile;
my $dstTime = fileModDate $dstFile;
$srcTime += $delta;
if ($dstTime != $srcTime) {
	print scalar(localtime $dstTime), " <== ", scalar(localtime $srcTime), ":   $dstFile <== $srcFile\n";
	utime time, $srcTime, $dstFile or die $^E;
}
1;
