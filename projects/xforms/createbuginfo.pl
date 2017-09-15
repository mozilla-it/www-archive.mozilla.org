#!/usr/bin/perl -w
use strict;

my $csvfile = $ARGV[0] || die "ERROR! Supply csv file as first argument";
my $xmlfile = $ARGV[1] || die "ERROR! Supply xml file as first argument";

# Read bug info from CSV file
my $header_read = 0;
my %bugs;
open CSV, "<$csvfile" or die "ERROR! Cannot open $csvfile: $!";
while (<CSV>) {
    if (!$header_read) {
	$header_read = 1;
    } else {
	chomp;
	my @array = split(/,/);
	for (my $i = 0; $i < @array; ++$i) {
	    $array[$i] =~ s/"//g;
	    $array[$i] =~ s/</&lt;/g;
	    $array[$i] =~ s/>/&gt;/g;
	}
	$bugs{$array[0]} = [@array];
    }
}
close CSV;

# Process bugs from XML file
open XML, "<$xmlfile" or die "ERROR! Cannot open $xmlfile: $!";
while (<XML>) {
    if (m|(.*)<bug num="(\d+)"/>| && $bugs{$2}) {
	print <<EOF;
$1<bug num="$2" status="$bugs{$2}[5]">
$1  <title>$bugs{$2}[7]</title>
$1</bug>
EOF
    } else {
	print $_;
    }
}
close XML;
