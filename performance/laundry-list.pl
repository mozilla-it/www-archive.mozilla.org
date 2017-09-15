#!/usr/bin/perl
#
# Kludge to generate a "performance laundry list" report
# using bugzilla and a crufty little hand rolled data file
#

use strict;
use LWP::UserAgent;
use HTTP::Request;
use Time::localtime;

sub emailify($)
{
    my ($username) = @_;

    my ($name, $domain) = split '@', $username;
    my $email;

    if ($domain) {
        $email = $name . '@' . $domain;
    }
    else {
        # Use netscape as default domain.
        $email = $name . '@netscape.com';
    }

    return ($email, $name);
}

my %buginfo;

# Hit bugzilla up for dope on the current bugs with 'perf' in the keyword.
{
    my $ua = LWP::UserAgent->new;
    my $request = HTTP::Request->new(GET =>
"http://bugzilla.mozilla.org/buglist.cgi?bug_status=&email1=&emailtype1=substring&emailassigned_to1=1&email2=&emailtype2=substring&emailreporter2=1&bugidtype=include&bug_id=&changedin=&votes=&chfieldfrom=&chfieldto=Now&chfieldvalue=&short_desc=&short_desc_type=substring&long_desc=&long_desc_type=substring&bug_file_loc=&bug_file_loc_type=substring&status_whiteboard=&status_whiteboard_type=substring&keywords=perf&keywords_type=anywords&field0-0-0=noop&type0-0-0=noop&value0-0-0=&cmdtype=doit&namedcmd=M14+Bugs&newqueryname=&order=Reuse+same+sort+as+last+time"
                                );

    # Set the COLUMNLIST cookie to get the crap we want
    $request->push_header("cookie" => "COLUMNLIST=owner qa_contact target_milestone status");

    my $response = $ua->request($request);

    die "unable to get bug info from bugzilla"
        unless $response->is_success();

    # For debugging...
    #warn $response->content();

    my @lines = split /\n/, $response->content();

    # Mmm. Parse that HTML, baby.
    LINE: foreach $_ (@lines) {
        next LINE unless /show_bug.cgi/;

        # Pluck out the bug number, the owner, and the milestone
        my ($bug, $owner, $qa_contact, $milestone, $status) =
            /(\d+).*class=owner><nobr>(.*)<\/nobr>.*class=qa_contact><nobr>(.*)<\/nobr>.*class=target_milestone><nobr>(.*)<\/nobr>.*class=status><nobr>(.*)<\/nobr>/;

        # ...and keep it for later.
        $buginfo{$bug} = { owner => $owner,
                           qa_contact => $qa_contact,
                           milestone => $milestone,
                           status => $status };
    }
}


# Print the prologue

my $last_modified = ctime();
while (<DATA>) {
    last if /\$\$/;
    s/\$DATE\$/$last_modified/;
    print;
}

# Grovel through our little database, and print out entries for each
# performance bug.

open(FILE, "<laundry-list.txt")
    || die("unable to open laundry-list.txt");

my $last_category;

LINE: while (<FILE>) {
    chomp;

    if ($_ =~ /^\* /) {
        $_ = $';
        my ($category, $owner, $metrics_url, $planning_url) = split "\t";
        $last_category = $category;

        next LINE if ($category eq "__JUNK__");

        my ($owner_email, $owner_short) = emailify($owner);

        print "<tr class=\"category\">\n";
        print "<td colspan=\"7\"><b>$category (<a href=\"mailto:$owner_email\">$owner_short</a>)</b> - <a href=\"$metrics_url\"><i>Current Metrics</i></a> <a href=\"$planning_url\"><i>Planning Doc</i></a></td>\n";
        print "</tr>\n";
        print "<tr class=\"heading\">\n";
        print "<td valign=\"bottom\"><i>Task</i></td>\n";
        print "<td valign=\"bottom\"><i>Bug</i></td>\n";
        print "<td valign=\"bottom\"><i>Description</i></td>\n";
        print "<td valign=\"bottom\"><i>Eng<br>Owner</i></td>\n";
        print "<td valign=\"bottom\"><i>QA<br>Owner</i></td>\n";
        print "<td valign=\"bottom\"><i>CPM<br>Owner</i></td>\n";
        print "<td valign=\"bottom\"><i>TFV</i></td>\n";
        print "</tr>\n";
    }
    elsif ($_ =~ /^- /) {
        $_ = $';
        my ($task, $eng_owner, $qa_owner, $cpm_owner) = split "\t";

        my ($eng_owner_email, $eng_owner_short) = emailify($eng_owner);
        my ($qa_owner_email, $qa_owner_short) = emailify($qa_owner);
        my ($cpm_owner_email, $cpm_owner_short) = emailify($cpm_owner);

        print "<tr class=\"task\">\n";
        print "<td valign=\"top\">$task</td>\n";
        print "<td valign=\"top\">&nbsp;</td>\n";
        print "<td valign=\"top\">&nbsp;</td>\n";
        print "<td valign=\"top\"><a href=\"mailto:$eng_owner_email\">$eng_owner_short</a></td>\n";
        print "<td valign=\"top\"><a href=\"mailto:$qa_owner_email\">$qa_owner_short</a></td>\n";
        print "<td valign=\"top\"><a href=\"mailto:$cpm_owner_email\">$cpm_owner_short</a></td>\n";
        print "<td valign=\"top\">&nbsp;</td>\n";
        print "</tr>\n";
    }
    elsif ($_ =~ /^\t/) {
        my ($dummy, $bug, $desc) = split "\t";

        $desc =~ s/&/&amp;/g;
        $desc =~ s/</&lt;/g;
        $desc =~ s/>/&gt;/g;

        my $info = $buginfo{$bug};

        # Delete this from the table, so we'll be able to report on
        # "unclassified" bugs, later
        delete $buginfo{$bug};

        next LINE if ($last_category eq "__JUNK__");

        my $owner = $info->{owner};
        my ($short_owner) = split '@', $owner;
        my $qa_contact = $info->{qa_contact};
        my ($short_qa_contact) = split '@', $qa_contact;
        my $milestone = $info->{milestone};
        my $status = $info->{status};

        my $pre;
        my $post;

        # Compute any special font charactersitics to apply
        if ($status eq "RESO" || $status eq "VERI") {
            $pre = "<strike>";
            $post = "</strike>";
        }

        print "<tr class=\"bug\">\n";
        print "<td>&nbsp;</td>\n";
        print "<td valign=\"top\">$pre<a href=\"http://bugzilla.mozilla.org/show_bug.cgi?id=$bug\">$bug</a>$post</td>\n";
        print "<td valign=\"top\">$pre$desc$post</td>\n";
        print "<td valign=\"top\">$pre<a href=\"mailto:$owner?subject=Bug%20$bug\">$short_owner</a>$post</td>\n";
        print "<td valign=\"top\">$pre<a href=\"mailto:$qa_contact?subject=Bug%20$bug\">$short_qa_contact</a>$post</td>\n";
        print "<td>&nbsp;</td>\n";
        print "<td valign=\"top\">$pre$milestone$post</td>\n";
        print "</tr>\n";
    }
}

# Print the epilogue

while (<DATA>) {
    print;
}


# Now, just for the operator's information, grovel through any bugs
# remaining in the table: these bugs were marked as 'perf' in
# Bugzilla, but didn't have an entry in our little database.

{
    my $bug;

    BUG: foreach $bug (keys(%buginfo)) {
        next BUG unless $bug;

        # Ignore any unclassified "resolved" or "verified" bugs
        my $status = $buginfo{$bug}->{status};
        next BUG if ($status eq 'RESO' || $status eq 'VERI');

        warn("unclassified bug $bug\n");
    }
}



__END__
<html>
<head>
<title>performance: laundry list</title>
<style type="text/css">
tr.category {
  background-color: #FFFFCC;
}
tr.heading {
  background-color: #FFFFCC;
}
tr.task {
  background-color: #EEEEEE;
}
tr.bug {
}
</style>
</head>
<body bgcolor="#FFFFFF" text="#000000" link="#0000EE" vlink="#551A8B" alink="#FF0000">
<center>
<h1>performance: laundry list</h1>
</center>

Contact:
<a href="mailto:waterson@netscape.com">Chris Waterson</a> (waterson@netscape.com)<br>
<small>Last updated on $DATE$</small><br>

<table>
$$
</table>

</body>
</html>

