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
# DeAnchor [-a] [-e] <src-file> <dst-file>
#
# Copy the HTML body from <src-file> to <dst-file> while doing the following:
#   If -a is given, remove all A tags.
#   If -e is given, translate all numeric entities above 255 into JavaScripts.
# The latter appeases DreamWeaver 2.0, which corrupts numeric entities above 255.

use 5.004;
use strict;
use diagnostics;
use Getopt::Long;


my $deAnchor = 0;
my $convertEntities = 0;
GetOptions("a" => \$deAnchor, "e" => \$convertEntities);
die "Need source and destination files" unless scalar(@ARGV) == 2;
die "Need to specify at least -a or -e" unless $deAnchor || $convertEntities;
my ($srcFile, $dstFile) = @ARGV;

open SRCFILE, "<".$srcFile or die $^E;
open DSTFILE, ">".$dstFile or die $^E;
while (<SRCFILE>) {
	s/<\/?A\b[^<>]*>//ig if $deAnchor;
	s/&#(?:\d{4,}|[3-9]\d\d|2[6-9]\d|25[6-9]);/<SCRIPT type="text\/javascript">document.write("$&")<\/SCRIPT>/ig if $convertEntities;
	print DSTFILE;
}
close SRCFILE or die $^E;
close DSTFILE or die $^E;
print "DeAnchored $srcFile into $dstFile\n";
1;
