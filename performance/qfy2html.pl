#!perl
#
# The contents of this file are subject to the Netscape Public License
# Version 1.0 (the "NPL"); you may not use this file except in
# compliance with the NPL.  You may obtain a copy of the NPL at
# http://www.mozilla.org/NPL/
#
# Software distributed under the NPL is distributed on an "AS IS" basis,
# WITHOUT WARRANTY OF ANY KIND, either express or implied. See the NPL
# for the specific language governing rights and limitations under the
# NPL.
#
# The Initial Developer of this code under the NPL is Netscape
# Communications Corporation.  Portions created by Netscape are
# Copyright (C) 1998 Netscape Communications Corporation.  All Rights
# Reserved.
#
# $Id: qfy2html.pl,v 1.2 2000/01/21 01:17:18 alecf%netscape.com Exp $
#
# A stupid script to process Quantify 6.0 text files into HTML.
#
#   To use:
#
#     1. Save Quantify 6.0 output as "foo.txt". Win32 users: be sure to
#        "Save As..." a text file.
#
#     2. Run qfy2html foo.txt > foo.html
#
#   Peruse your output as HTML!
#

my %fnids;
my %callees;
my %callers;
my $NextID;
my @functions;

LINE: while (<>) {
    # The call graph entries start with "caller"
    next LINE unless /^caller/;

    my ($keyword, $caller, $callee, $callcount, $prop_time, $pct_of_caller, $pct_of_desc)
        = split /\t/;

    # Ensure that each function has been numbered.
    if (! $fnids{$caller}) {
        $fnids{$caller} = ++$NextID;
    }

    # Add information about the caller
    if (! $callees{$caller}) {
        $callees{$caller} = ();
    }

    push (@{$callees{$caller}},
          {
              callee        => $callee,
              callcount     => $callcount,
              prop_time     => $prop_time,
              pct_of_caller => $pct_of_caller
          });

    # Add information about the callee
    if (! $callers{$callee}) {
        $callers{$callee} = ();
    }

    push (@{$callers{$callee}},
          {
              caller        => $caller,
              pct_of_desc   => $pct_of_desc
          });

    # Keep our own list in the input order
    push (@functions, $caller);
}

print "<pre>\n";

foreach $caller (keys %fnids) {
    my $caller_id = $fnids{$caller};
    print "<b><a name=\"$caller_id\">$caller</a></b>\n";

    print "  <b>Calls</b>\n";

    foreach $entry (@{$callees{$caller}}) {
        my $callee = $entry->{'callee'};
        my $callee_id = $fnids{$callee};

        if ($callee_id) {
            print "    <a href=\"#$callee_id\">$callee</a>\n";
        }
        else {
            print "    $callee\n";
        }

        print "      call count      " . $entry->{'callcount'} . "\n";
        print "      propogated time " . $entry->{'prop_time'} . "\n";
        print "      % of caller     " . $entry->{'pct_of_caller'} . "\n";
        print "\n";
    }

    print "\n";
    print "  <b>Called By</b>\n";

    foreach $entry (@{$callers{$caller}}) {
        my $parent_caller = $entry->{'caller'};
        my $parent_caller_id = $fnids{$parent_caller};

        print "    <a href=\"#$parent_caller_id\">$parent_caller</a>\n";
        print "      % of descendant " . $entry->{'pct_of_desc'} . "\n";
        print "\n";
    }

    print "\n\n";
}

print "</pre>\n";
