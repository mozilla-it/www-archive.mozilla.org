#!/usr/bin/perl -w
use strict;

my $first = 1;
my @bug;
while (<>) {
    if (m|<bug .*num="(\d+)".*>|) {
	if (!$bug[$1]) {
	    $bug[$1] = 1;
	    if ($first) {
		$first = 0;
	    } else {
		print "%2C";
	    }
	    print $1;
	}
    }
}
