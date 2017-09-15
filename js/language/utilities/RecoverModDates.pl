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
# RecoverModDates <file> ... <file>
#
# For each <file>, if the file's modification date does not fall on the day given
# in the file's "<day-of-week>, <month> <day>, <year>", set the file's modification
# date to noon local time on that day.
#
# If the first option is -n, don't set the dates.

use 5.004;
use strict;
use diagnostics;
use Time::Local;


my @months = ("January", "February", "March", "April", "May", "June",
			  "July", "August", "September", "October", "November", "December");
my %months;
for (my $i = 0; $i < 12; $i++) {
	$months{$months[$i]} = $i;
}


my $noSet = 0;
if ($ARGV[0] eq "-n") {
	$noSet = 1;
	shift;
}

foreach my $srcFile (@ARGV) {
	die "$srcFile is not a file" unless -f $srcFile;
	my $fileTime = (stat $srcFile)[9] or die "Can't stat $srcFile";
	open SRCFILE, "<".$srcFile or die $^E;
	my $srcTime;
	while (<SRCFILE>) {
		if (/\b[A-Za-z]+day,\s+([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})\b/i) {
			my $month = $months{ucfirst $1} or die "Bad month $1";
			my $day = $2;
			my $year = $3;
			die "Bad day $day" if $day<1 || $day>31;
			die "Bad year $year" if $year<1980 || $year>2500;
			$srcTime = timelocal 0, 0, 12, $day, $month, $year-1900;
			my ($fileSec, $fileMin, $fileHour, $fileDay, $fileMonth, $fileYear) = localtime $fileTime;
			$srcTime = $fileTime if $day == $fileDay && $month == $fileMonth && $year-1900 == $fileYear;
			last;
		}
	}
	close SRCFILE;
	if ($srcTime) {
		if ($srcTime != $fileTime) {
			print scalar(localtime $fileTime), " ==> ", scalar(localtime $srcTime), ":  $srcFile\n";
			unless ($noSet) {
				utime time, $srcTime, $srcFile or die $^E;
			}
		}
	} else {
		print "No date found inside $srcFile\n";
	}
}
1;
