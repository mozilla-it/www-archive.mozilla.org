#!/usr/bin/perl
#
#

# make a html plot page from datefile in the format
# printed value1:printed value2 and line length:line color
# 02/10/00:233:green



print <<EOF ;
<!doctype html public "-//w3c//dtd html 4.0 transitional//en">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<meta name="GENERATOR" content="Mozilla/4.72 [en] (Win95; U) [Netscape]">
<title>Beancounter central</title>
</head>
<body text="#000000" bgcolor="#FFFFFF" link="#0000EE" vlink="#551A8B" alink="#FF0000">
<IMG SRC="http://www.mozilla.org/images/mozilla-banner.gif" ALT="" BORDER=0 USEMAP="#banner" WIDTH="600" HEIGHT="58" VSPACE="0" HSPACE="0">
<H2>
the drive to nscp_beta1.  drivers wanted.
</H2>
<b>chofmann sez</b>: 1. make a bug list 2. drive it to zarro 3.ship the software 
<br>
<br>
<font size=-3>green=track record; yellow=upcoming target counts; orange=weekends; red=don't shake the bits zone </font>
<br>
Pull and build instructions for the BRANCH posted on tinderbox.
<br>
View BRANCH changes <a href="http://bonsai.mozilla.org/cvsquery.cgi?treeid=default&module=SeaMonkeyAll&branch=nscp_beta1_BRANCH&branchtype=match&dir=&file=&filetype=match&who=&whotype=match&sortby=Date&hours=2&date=all&mindate=&maxdate=&cvsroot=%2Fcvsroot">here.</a>
<table BORDER=0 CELLSPACING=0 >
<font size=0>
<small>
<sub>
<tr>
<th>Tree restricted<br> to beta1 push<br> effort on<br> 2/15</th>
<th>
<br>
<br>
<br>
<br></th>
<th COLSPAN="2">Number of open beta stopping bugs</th>
</tr>
<tr>
<td><font size=-3>dark ages<br>before<br> building the<br> bug list and <br>starting the<br> push to<br>beta</font></td>
<td ALIGN=RIGHT></td>
<td ALIGN=RIGHT></td>
<td>
  <table WIDTH="" BGCOLOR="#008000" >
 <tr>
  <td>&nbsp;</td>
 </tr>
</table>
</td>
</tr>
EOF

while (<STDIN>) { 
  @F = split(':');
#   printf("<tr>\n<td><font size=-3>%s</font></td>\n <td ALIGN=RIGHT></td> \n <td ALIGN=RIGHT><font size=-3>%s</font></td>\n <td>\n <table WIDTH=\"%s\" BGCOLOR=\"%s\" >\n <tr>\n <td>&nbsp;</td> </tr>\n  </table> </td> </tr>",$F[0],$F[1],$F[1],$F[2],$F[3] ) ;
   printf("
  <table CELLPADDING=\"0\" CELLSPACING=\"0\">
   <tr>
    <td><font size=-3>%s</font></td>\n 
    <td>
      <table WIDTH=\"30\">
      <tr>
         <td><font size=-3>%s</font></td>\n 
      </tr>
      </table>
    <td>
      <table CELLPADDING=\"0\" CELLSPACING=\"0\" WIDTH=\"%s\" BGCOLOR=\"%s\" >\n 
      <tr>
        <td>&nbsp;</td> 
      </tr>\n  
      </table> 
    <td>%s</td>
    </tr>
  </table>",$F[0],$F[1],$F[1],$F[2],$F[3] ) ;
}

    #<td ALIGN=RIGHT></td> \n 
print <<EOF ;

<td></td>
</tr>
</table>
</sub>
</small>
</font>
</body>
</html>
EOF
