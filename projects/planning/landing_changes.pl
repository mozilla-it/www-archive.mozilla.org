#!/usr/bin/perl

# print "get started\n" ;
use LWP::Simple;

use Date::Parse;
use Date::Format;
use HTML::Parse;
require HTML::FormatText;
require MIME::Lite;

my $TIMEFORMAT = "%T";
my $DTIMEFORMAT = "%D %T";


$url = "http://komodo.mozilla.org/planning/branch" ;
$content = get($url);
  print "$content" ;
 exit ;
