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
# TransferRTF <src-file> <dst-file>
#
# Copy the contents from <src-file> to <dst-file> without altering <dst-file>'s resources.
# <dst-file>'s modification date will be the later of <src-file>'s or <dst-file>'s modification dates.

use 5.004;
use strict;
use diagnostics;


my ($srcFile, $dstFile) = @ARGV;

die "$dstFile doesn't exist" unless -f $dstFile;
my $srcModDate = (stat $srcFile)[9] or die "Can't open $srcFile";
my $dstModDate = (stat $dstFile)[9] or die "Can't open $dstFile";
$dstModDate = $srcModDate if $srcModDate > $dstModDate;
open SRCFILE, "<".$srcFile or die $^E;
my @lines = <SRCFILE>;
close SRCFILE or die $^E;
open DSTFILE, ">".$dstFile or die $^E;
print DSTFILE @lines;
close DSTFILE or die $^E;
utime time, $dstModDate, $dstFile or die $^E;
print "Copied RTF from $srcFile to $dstFile\n";
1;
