#!/usr/bin/perl
print "Content-type: text/html\n\n";

$theday = (localtime())[3] ;
$themo = (localtime())[4] + 1 ;
$theyr = (localtime())[5] - 100 ;
$today = "$themo-$theday-$theyr";
$daytime = localtime() ;
$datafile = "/data/planning/data";

sub url_quote {
  local($line) = @_;
  $line =~ s/ /%20/g;
  $line =~ s/=/%3D/g;
  $line =~ s/\n/%0A/g;
  return $line;
}

if ($ENV{"REQUEST_METHOD"} eq "POST") {
  read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
} else {
  $buffer = $ENV{"QUERY_STRING"};
}
foreach $pair (split(/&/, $buffer))
{
    ($name, $value) = split(/=/, $pair);

    $value =~ tr/+/ /;
    $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
    $FORM{$name} = $value;
}

open(IF, "<$datafile");
while (<IF>) {
  s/\n//;
  @line = split("\\|");
  $command = $line[0];
  $name = $line[1];
  $name =~ s/[ \t]*//g;
  if ($command eq "name") {
    if ($state{$name} eq "") {
      $state{$name} = "suggested";
      $explain{$name} = $line[2];
    }
  } elsif ($command eq "reject") {
    $state{$name} = "reject";
    $explain{$name} .= "<LI>$today: Marked Completed by $line[2]: $line[3]\n";
  } elsif ($command eq "vote") {
    $vote{$line[2]} .= "|$name";
  } elsif ($command eq "explain") {
    $explain{$name} .= "<LI>$line[2]";
  }
}
close(IF);


foreach $voter (keys %vote) {
  $all_voters++;
  $lastgood = "";
  foreach $pick (split("\\|", $vote{$voter})) {
    if ($pick ne "" && $state{$pick} ne "reject") {
      if ($lastgood eq "") { $counted_voters++; }
      $lastgood = $pick;
    }
  }
  if ($lastgood ne "") {
    $tally{$lastgood}++;
  }
}

# Votes that are out.
$bogus_voters = $all_voters - $counted_voters;


if ($FORM{showname} ne "") {
  print "<H3>Branch Landing Page</H3>";
  print "Here's the scoop.  You have big/hairy changes. Try and and land them smoothly and use this form make sure they your landing plan is communicated widely.";
  print "<br><br>Where ever, and when ever, it makes sense for the project <b> \"$FORM{showname}\" </b>, you should enter comments about the following Landing Tasks to let folks know what is going on and avoid train wrecks:</H2>";
  print "
<ol>
<li>Tell the one-line elevator story about the benefit of this change.
<li>Tell who is working on the changes and provide e-mail contact info.
<li>Provide the bug number for info more details outlining the development task.
<li>Provide summary of the scope of the change (estimated number of files, risks, etc.)
<li>Outline other development tasks that this work depends on.
<li>Outline other development tasks that depend on this checkin.
<li>Estimate the date for completing the basic development work and have it basically working somewhere..
<li>List obstacles in the way of getting basic the work done.
<li>Estimate the date for having sources checked in somewhere (patches to bug, branch, new directory, etc..)
<li>List branch name and build instructions or provide link (so other engineers can look at the code and try builds) 
<li><b>Tell when basic work is completed and your ready for help in testing.</b>
<li>Estimate the date for having experimental builds posted on mozilla.org
<li><b>Provide location of <a href=\"ftp://ftp.mozilla.org/pub/mozilla/nightly/experimental/\">experimental build(s)</a> when they have been posted</b>
<li>Provide link or info about test plans or testing needs.
<li><b>Provide dependency bug number or bugzilla query for filing, finding and tracking any/all regressions that surface in experimental build testing evaluation.</b>
<li><b>Complete a review/assessment of regression bug list (uber landing planner(s))</b>
<li><b>Estimate the date for carpool</b>
<li></b>Schedule the carpool.</b>
<li><b>Provide status updates as the car pool landing progresses</b>
<li>Recap the landing and move to the completed landing list.
<li>Drink Tequila.
</ol>
";
print "<FORM METHOD=POST ACTION=branches.cgi>";

print "\n<INPUT TYPE=hidden name=name value=\"$FORM{showname}\">\n";
print "<INPUT TYPE=hidden NAME=action VALUE=comment>Comment on one of the areas listed above>" ;
print "\n<INPUT TYPE=hidden name=name value=\"$FORM{showname}\">\n";
print "<UL><INPUT SIZE=80 NAME=comments>\n";

  # print "</UL><INPUT CHECKED TYPE=RADIO NAME=action VALUE=vote>Bump the Landing Level for this project when bolded items are completed.\n";
  print "</UL><INPUT TYPE=RADIO NAME=action VALUE=vote>Bump the Landing Level (LL) for this project when bolded items are completed.\n";
  print "<UL>project name and step completed: \n";
  print "<INPUT SIZE=14 NAME=voter>";

# comment out next few lines to Turn rejections off
  print "</UL><INPUT TYPE=RADIO NAME=action VALUE=reject>Change status of this project to Complete.";
  print "<UL>Explanation:<INPUT SIZE=80 name=explain>";
  print "<BR>your name :<INPUT SIZE=14 NAME=rejecter>";
  print "</UL>\n";
  print "</UL><INPUT TYPE=SUBMIT VALUE=\"Do it\">\n";
  print "</FORM>\n";
} elsif ($FORM{action} ne "") {
  if ($FORM{action} eq "comment") {
    if ($FORM{comments} ne "") {
      
      # Don't let <script> get submitted.
      if(($FORM{comments} =~ /<script/i)) {
        print "<i>script</i> found, ye hacker hiteth backspaceth.\n";
      } elsif (($FORM{comments} =~ /<style/i)) {
        print "<i>style</i> found, ye hacker hiteth backspaceth.\n";
      } elsif (($FORM{comments} =~ /<function/i)) {
        print "<i>function</i> found, ye hacker hiteth backspaceth.\n";
      } else {
        # no <script> found.
        open(NAMES, ">>$datafile");
        print NAMES "explain|$FORM{name}|$today: $FORM{comments}\n";
        close(NAMES);
        print "<A HREF=branches.cgi>Comment recorded</A>\n";
      }

    } else {
      print "You need to fill in the comment field, hit back and go type something";
    }
   } elsif ($FORM{action} eq "vote") {
    if ($FORM{voter} eq "") {
      print "You must give your project name.  Hit back in fill it in";
    } else {
      open(NAMES, ">>$datafile");
      print NAMES "vote|$FORM{name}|$FORM{voter}\n";
      close(NAMES);
      print "<A HREF=branches.cgi>Vote recorded</A>";
    }
  } elsif ($FORM{action} eq "reject") {
    if ($FORM{rejecter} eq "") {
      print "You must give your project name.  Hit back in fill it in";
    } elsif ($FORM{explain} eq "") {
      print "You must give some reason.  hit back and fill it it";
    # these lines dont make sense for uses where everything gets retired
    # } elsif ($tally{$FORM{name}} <= 0) {
	# 		print "No vetos for items - $tally{$FORM{name}} - with no votes.";
	} else {
      open(NAMES, ">>$datafile");
      print NAMES "reject|$FORM{name}|$FORM{rejecter}|$today: $FORM{explain}\n";
      close(NAMES);
      print "<A HREF=branches.cgi>Completion of $FORM{name} recorded</A>";
    }
  } elsif ($FORM{action} eq "add") {
    if ($FORM{name} eq "") {
      print "You must pick a non blank name to add.  Go back";
    } else {
      open(NAMES, ">>$datafile");
      print NAMES "name|$FORM{name}\n";
      close(NAMES);
      print "<A HREF=branches.cgi>project name added. You can now return to the branch form and add comments for that person.</A>";
    }
  } else {
    print "Either you are cheating or mtoy is an idiot, or both";
  }
} else {

  print "<title>Branch Landing Updates $today</title>";
  print "<body>" ;
  print "<center>Don't whack the tree. Avoid the Hazards. Land it on the fairway!</center>" ;
  print "<center>
<IMG SRC=\"http://www.mozilla.org/images/mozilla-banner.gif\" ALT=\"\"
 BORDER=0 WIDTH=600 HEIGHT=58></A></center>" ;
  print "<center><b>Tee-Time</b></center>" ;
  print "<center>chofmann's Branch Landing Info Roller Upper and Carpool Reservation Hack.</center>";
  print "<center>A tool for planning and tracking future carpools approaching the trunk</center>";

#  print "<table border=0>\n";
#  print "  <tr>\n";
#  print "  <td>\n";

#  print "<table border=0>\n";
#  print   "<tr>\n";
#  print     "<td>\n";
#  # print       "<b>$all_voters</b>";
#  print   "</td>\n";
#  print   "<td>\n";
#  # print     "people voted";
#  print   "</td>\n";
#  print   "</tr>\n";

#  print   "<tr>\n";
#  print     "<td>\n";
 #  print       "<b>$counted_voters</b>";
#  print   "</td>\n";
#  print   "<td>\n";
#   print     "votes counted";
#  print   "</td>\n";
#  print   "</tr>\n";
#  print   "<tr>\n";
#  print     "<td align=\"right\">\n";
#  print       "<b>$bogus_voters</b>";
#  print   "</td>\n";
#  print   "<td>\n";
#  print     "votes didn't count b/c the name got rejected.";
#  print   "</td>\n";
#  print   "</tr>\n";
#  print "</table>";
#  print "  </td>\n";

  print "  <td valign=\"top\">\n";
  print "<ul>";
#  print "<li><a href=\"#add\">Add a project to the Landing Plan</a></li>\n";
#  print "<li><a href=\"#candidates\">List of candidate names</a></li>\n";
#  print "<li><a href=\"#rejects\">List of Completed Project names</a></li>\n";
  print "</ul>";
  print "  </td>\n";


  print "  </tr>\n";
  print "</table>\n";

  print "<a name=\"candidates\">\n";
  print "<center>click on project name link to add comments and branch data</center>\n";
  print "<P><TABLE BORDER=1><TR><TH ALIGN=LEFT>Projects on Deck<TH ALIGN=LEFT>LL<TH ALIGN=LEFT>
Landing Status Information as of: $daytime
";
  # sorting base on votes
  foreach $name (sort {$tally{$b} <=> $tally{$a};} keys(%state)) {
  # sorting based on name alpha order
  # foreach $name (sort keys(%state)) {
    $tally{$name}++;
## testing here
   $tally{$name}--;
    $lineno++;
   if ($state{$name} ne "reject") {
      $uname = &url_quote($name);
      print "<TR><TD>$lineno. <A HREF=\"branches.cgi?showname=$uname\">$name</A>";
      print "<TD>$tally{$name}";
      if ($explain{$name} ne "") {
	print "<TD>$explain{$name}";
      }
      print "</TR>\n";
    }
  }
  print "</TABLE>";

# Add name suggestion
  print "<a name=\"add\">\n";
  print "<H2>Add a Project</H2>\n";
  print "<FORM METHOD=POST ACTION=branches.cgi>\n";
  print "If you have a project you would like to add, please ";
  print "<INPUT TYPE=hidden NAME=action value=add>\n";
  print " <INPUT NAME=name SIZE=30>\n";
  print " <INPUT TYPE=SUBMIT VALUE=\"Do so\"></FORM>\n";

  print "<a name=\"rejects\">\n";
  print "<H2>Completed/Retired Projects</H2>";
  print "<P><TABLE BORDER=1><TR><TH ALIGN=LEFT>Project<TH ALIGN=LEFT><TH ALIGN=LEFT>Comments\n";
 foreach $name (sort {$tally{$b} <=> $tally{$a};} keys(%state)) {
   $tally{$name}++;
    $tally{$name}--;
    if ($state{$name} eq "reject") {
      $uname = &url_quote($name);
      print "<TR><TD><A HREF=\"branches.cgi?showname=$uname\">$name</A>";
      print "<TD><B></B>";
      if ($explain{$name} ne "") {
	print "<TD>$explain{$name}";
      }
      print "</TR>\n";
    }
  }
  print "</TABLE>\n";
  print "<hr>\n";
  print "<font size=\"-1\">";
  print "Need help?  Send mail to <a href=mailto:\"chofmann\@mozilla.org?subject=branch script\">chofmann</a>.\n";
}

