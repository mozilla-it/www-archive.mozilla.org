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
# TransferSemantics <src-file> <dst-file>
#
# Copy the HTML body from <src-file> to <dst-file> in between the <!--SEMANTICS--> and
# <!--/SEMANTICS--> comments without altering <dst-file>'s resources.
# <dst-file>'s modification date will be the later of <src-file>'s or <dst-file>'s modification dates.

use 5.004;
use strict;
use diagnostics;
use GeneralUtilities;


my ($srcFile, $dstFile) = @ARGV;

die "$dstFile doesn't exist" unless -f $dstFile;
my $srcModDate = fileModDate $srcFile;
my $dstModDate = fileModDate $dstFile;
$dstModDate = $srcModDate if $srcModDate > $dstModDate;

my @srcLines;
open SRCFILE, "<".$srcFile or die $^E;
do {
	defined($_ = <SRCFILE>) or die "Can't find <BODY>";
} until (/<BODY>\s*$/);
while (1) {
	defined($_ = <SRCFILE>) or die "Can't find </BODY>";
	last if (/^\s*<\/BODY>/);
	push @srcLines, $_;
}
close SRCFILE or die $^E;

my @dstPre;
my @dstSemantics;
my @dstPost;
open DSTFILE, "<".$dstFile or die $^E;
do {
	defined($_ = <DSTFILE>) or die "Can't find <!--SEMANTICS-->";
	push @dstPre, $_;
} until (/<!--SEMANTICS-->\s*$/);
while (1) {
	defined($_ = <DSTFILE>) or die "Can't find <!--/SEMANTICS-->";
	last if (/<!--\/SEMANTICS-->\s*$/);
	push @dstSemantics, $_;
}
push @dstPost, $_;
while (<DSTFILE>) {
	push @dstPost, $_;
}
close DSTFILE or die $^E;

unless (arrayEq @srcLines, @dstSemantics) {
	open DSTFILE, ">".$dstFile or die $^E;
	print DSTFILE @dstPre, @srcLines, @dstPost;
	close DSTFILE or die $^E;
	utime time, $dstModDate, $dstFile or die $^E;
	print "Copied semantics from $srcFile to $dstFile\n";
}
1;
