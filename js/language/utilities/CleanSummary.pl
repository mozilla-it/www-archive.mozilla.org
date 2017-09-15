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
# CleanSummary file
#
# Erase the contents of the summary file between <!--SUMMARY--> and <!--/SUMMARY-->.
# The file's original contents are backed up.
#

use 5.004;
use strict;
use diagnostics;
use GeneralUtilities;


die "Need summary file" unless scalar(@ARGV) == 1;
my ($summaryFile) = @ARGV;
my @summaryPrefix;
my @summarySuffix;

backUpFile $summaryFile;
open SUMMARYFILE, "<".$summaryFile or die "Can't read $summaryFile";
do {
	defined($_ = <SUMMARYFILE>) or die "Can't find <!--SUMMARY-->";
	push @summaryPrefix, $_;
} until (/<!--SUMMARY-->\s*$/);
do {
	defined($_ = <SUMMARYFILE>) or die "Can't find <!--/SUMMARY-->";
} until (/<!--\/SUMMARY-->\s*$/);
push @summarySuffix, $_;
while (<SUMMARYFILE>) {
	push @summarySuffix, $_;
}
close SUMMARYFILE or die $^E;

open SUMMARYFILE, ">".$summaryFile or die die "Can't write $summaryFile";
print SUMMARYFILE @summaryPrefix, @summarySuffix;
close SUMMARYFILE or die $^E;

1;
