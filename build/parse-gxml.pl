#!/usr/bin/perl
#
# ***** BEGIN LICENSE BLOCK *****
# Version: MPL 1.1
#
# The contents of this file are subject to the Mozilla Public License Version
# 1.1 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
# http://www.mozilla.org/MPL/
#
# Software distributed under the License is distributed on an "AS IS" basis,
# WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
# for the specific language governing rights and limitations under the
# License.
#
# The Original Code is the xml -> html glossary translation script.
#
# The Initial Developer of the Original Code is
# Netscape Communications Corporation.
# Portions created by the Initial Developer are Copyright (C) 2002
# the Initial Developer. All Rights Reserved.
#
# Contributor(s):
#	Chris Seawood <cls@seawood.org>
#
# ***** END LICENSE BLOCK *****
#
# Convert gnumeric .xml of build definitions into html table
#
# Usage: $0 mozbuild-glossary.xml > glossary.html
#
# Assumes that the definitions are contained in a 
# gnumeric 0.67ish xml file format 
# 
# Each row contains a glossary definition using the following column layout
# Column 0  -  Name of variable
# Column 1  -  Purpose of variable
# Column 2  -  Who sets the variable
# Column 3  -  Who uses the variable
# Column 4  -  Related information
#

use strict;

require XML::Parser;
require Compress::Zlib;

my $debug = 0;

# Init vars
my %glossary;
my $g_entry = "";
my $g_parsing_entry = 0;
my $g_column = -1;
my ($buffer, $inbuf, $infile, $gz, $bytesread, $parser, $defn);

# open file
&usage if ($#ARGV +1 != 1);
$infile = shift;
$gz = Compress::Zlib::gzopen ($infile, "r");
$buffer = "";
while (($bytesread = $gz->gzread($inbuf)) != 0) {
    if ($bytesread < 0) {
	print "Error reading file $infile: $!\n";
	exit(2);
    }
    $buffer .= $inbuf;
}
$gz->gzclose;

# Parse xml file
$parser = new XML::Parser(Style => 'Tree',
			  Handlers => { Start => \&handle_start,
					End => \&handle_end,
				        Char => \&handle_ch });
$parser->parse($buffer);

# Output results

&print_header();

foreach $defn (sort keys %glossary) {
    print "<a name=\"$defn\"><b>$defn</b></a>\n";
    print "<table>\n";
    print "<tr><td><b>Set By:</b></td><td>$glossary{$defn}{SetBy}</td></tr>\n";
    print "<tr><td><b>Used By:</b></td><td>$glossary{$defn}{UsedBy}</td></tr>\n";
    print "<tr><td><b>Purpose:</b></td><td>$glossary{$defn}{Purpose}</td></tr>\n";
    print "<tr><td><b>Other:</b></td><td>$glossary{$defn}{Other}</td></tr>\n" if ("$glossary{$defn}{Other}" ne "");
    print "</table>\n";
    print "\n<P>\n";
}

&print_footer();

exit(0);

sub usage() {
    print "Usage: $0 gnumeric.xml $#ARGV\n";
    exit(1);
}

sub handle_start() {
    my ($p, $el, %atts) = @_;
    if ($debug) {
	my $f;
	print "START::: $el\n";
	foreach $f (keys %atts) {
	    print "\tKey: $f == " . $atts{$f} . "\n";
	}
    }
    if ($el eq 'gmr:Cell') {
	$g_column = $atts{"Col"};
	if ($g_column == 0) {
	    $g_entry = "";
	}
    }
    if ($el eq 'gmr:Content') {
	$g_parsing_entry = 1;
    }
}

sub handle_end() {
    my ($p, $el, %atts) = @_;
    print "END:::: $el\n" if ($debug);
    if ($el eq 'gmr:Content') {
	$g_parsing_entry = 0;
    }
}

sub handle_ch() {
    my ($p, $string) = @_;
    if ($g_parsing_entry) {
	print "\t\t$string\n" if ($debug);
	if ($g_column == 0) {
	    if ($string eq "" || $string eq "Name") {
		$g_entry = "";
	    } else {
		$g_entry = $string;
	    }
	    if ($g_entry eq "WIP") {
		# We're done here
		$p->finish();
	    }
	} 
	if ($g_entry ne "") {
	    if ($g_column == 1) {
		$glossary{$g_entry}{Purpose} = $string;
	    } elsif ($g_column == 2) {
		$glossary{$g_entry}{SetBy} = $string;
	    } elsif ($g_column == 3) {
		$glossary{$g_entry}{UsedBy} = $string;
	    } elsif ($g_column == 4) {
		my $tmp = $string;
		if ($string =~ m/\*\S+\*/) {
		    $tmp =~ s/\*(\S+)\*/<a href=\"#\1\">\1<\/a>/g;
		}
		$glossary{$g_entry}{Other} = $tmp;
	    }
	}
    }
}

sub print_header() {

print <<EOF
<HTML>
<HEAD>
<TITLE>Mozilla Build Glossary</TITLE>
</HEAD>
<BODY BGCOLOR="#FFFFFF" TEXT="#000000" LINK="#0000EE" VLINK="#551A8B"
    ALINK="#FF0000">
<!-- This file is automanually generated.  Do not edit. -->

<H1>Glossary of terms used by the Mozilla build system</H1>
This document does not cover auxillary build systems such as the ones used by NSPR, NSS or LDAP.
<br>

<h2>Makefile variables</h2>
EOF

}

sub print_footer() {

print <<EOF

</BODY>
</HTML>
EOF

}


