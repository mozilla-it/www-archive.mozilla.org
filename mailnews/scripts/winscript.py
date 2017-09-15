# ! /usr/bin/python

build = [] # Build Date array
build.append("2001-05-11")
build.append("2001-05-18")
build.append("2001-05-25")
build.append("2001-06-01")

flsar = [] # Folder Loading Speed's array
flsar.append([1.84,2.60,2.09])
flsar.append([2.41,2.48,2.46])
flsar.append([2.32,2.51,2.41])
flsar.append([2.92,1.73,2.01])

tpsclar = [] # Thread Pane Scrolling Speed's array
tpsclar.append([0.81,0.85,0.90])
tpsclar.append([0.94,0.91,0.87])
tpsclar.append([0.87,0.92,0.92])
tpsclar.append([0.89,0.90,0.94])

mdsar = [] # Message Display Speed's array
mdsar.append([7.35,7.30,7.32])
mdsar.append([7.18,6.57,7.02])
mdsar.append([7.11,6.82,7.03])
mdsar.append([7.19,6.49,6.17])

tpsrtar = [] # Thread Pane Sorting Speed's array, these are special, we should never ever average these
tpsrtar.append([0.64,0.63,0.31])
tpsrtar.append([0.69,0.57,0.31])
tpsrtar.append([0.65,0.58,0.30])
tpsrtar.append([0.62,0.57,0.32])

mrsar = [] # Message Reply Speed's array
mrsar.append([13.56,8.85,9.04])
mrsar.append([11.51,9.72,9.50])
mrsar.append([9.75,10.02,10.00])
mrsar.append([11.24,8.61,8.21])

bd5mar = [] # Batch Delete 5 Message's array
bd5mar.append([1.45,1.31,1.35])
bd5mar.append([0.83,0.96,1.02])
bd5mar.append([0.91,0.87,0.94])
bd5mar.append([1.01,0.92,1.04])

mmltar = [] # Mail Module Loading Time's array
mmltar.append([7.51,4.95,4.24])
mmltar.append([9.53,9.47,9.55])
mmltar.append([9.45,10.02,9.61])
mmltar.append([12.96,11.28,12.42])


# do not edit below this line

fls = flsar[-3:]
fls.reverse()
tpsc = tpsclar[-3:]
tpsc.reverse()
mds = mdsar[-3:]
mds.reverse()
tpst = tpsrtar[-3:]
tpst.reverse()
mrs = mrsar[-3:]
mrs.reverse()
bds = bd5mar[-3:]
bds.reverse()
mml = mmltar[-3:]
mml.reverse()
bdate = build[-3:]
bdate.reverse()

print """

<!doctype html public "-//w3c//dtd html 4.0 transitional//en">
<html>
<head>
<title>Mail Performance Results</title><LINK HREF="../persistent-style.css" REL="stylesheet" TYPE="text/css">
</head>
<BODY>
<TABLE BGCOLOR=black BORDER="0" CELLPADDING="0" CELLSPACING="0" WIDTH="100%">
<TR>
<TD VALIGN="TOP" class="bannercell">
<A HREF="http://www.mozilla.org/" CLASS="bannerlink">
<IMG SRC="http://www.mozilla.org/images/mozilla-banner.gif" title="mozilla.org"
CLASS="mozillaorgbanner" WIDTH="600" HEIGHT="58" border=0>
</A>
</TD>
</TR>
</TABLE>
<body text="#000000" bgcolor="#FFFFFF" link="#003366" vlink="#003366" alink="#FF0000">

<center><b><font color="#000000"><font size=+2>Mail Performance Results
for Windows</font></font></b>
<p><font color="#000000">Post feedback to<b>: <a href="news://news.mozilla.org/netscape.public.mozilla.mail-news" TITLE="Go to the newsgroup to comment about the results">netscape.public.mozilla.mail-news</a></b>
or send mail to: <b><a href="mailto:stephend@netscape.com?subject=Performance Results for Windows" TITLE="Send mail to stephend about these results">stephend@netscape.com</a></b></font>
<br><script> document.write("<i>Last Updated: " + document.lastModified + "</i>")  </script>

<br><font color="#000000">View <a href="http://www.mozilla.org/mailnews/mac_performance_results.html" TITLE="Go here to view Mac performance results">Mac</a>
or<b> </b><a href="http://www.mozilla.org/mailnews/linux_performance_results.html" TITLE="Go here to view Linux performance results">Linux</a>
results</font>
<p><font color="#000000"><font size=+1><a href="#method" TITLE="Methodology for the results">Methodology</a>
| <a href="#results" TITLE="Results in table form">Results</a> | <a href="#graph" TITLE="Graph of the Results">Graph</a></font></font></center>
<b><font color="#000000">Machine Configuration</font></b>
<li>
<font color="#000000">MS-Windows: 98 Second Edition, 266 MHz Pentium II,
128M RAM.</font></li>

<li>
<font color="#000000">All test results are in seconds and done with a stopwatch,
error rate of ± 1 second.</font></li>

<li>
<font color="#000000">The actual messages and folders I use to test are
available via the links in the Methodology section.</font></li>

<table BORDER CELLSPACING=2 CELLPADDING=2 WIDTH="100%" BGCOLOR="#CCCCCC" >
<caption><tbody>
<br></tbody></caption>

<tr>
<td VALIGN=TOP BGCOLOR="#003366"><b><font color="#FFFFFF">Area Tested</font></b></td>

<td VALIGN=TOP BGCOLOR="#003366"><b><font color="#FFFFFF">Methodology for
the Area</font></b></td>
</tr>

<tr>
<td VALIGN=TOP>Folder Loading Speed</td>

<td VALIGN=TOP>Time to load the summary file with <a href="http://www.mozilla.org/mailnews/1000messagefolderlocal.txt">1,000
messages</a> after launching the mail client (local folders). (When you
save this, take the .txt extension off of the file.)</td>
</tr>

<tr>
<td VALIGN=TOP BGCOLOR="#CCCCCC">Thread Pane Scrolling Speed</td>

<td VALIGN=TOP>Time to scroll 1,000 messages in real-time from top to bottom.&nbsp;</td>
</tr>

<tr>
<td VALIGN=TOP>Message Reply Speed</td>

<td VALIGN=TOP>Display 5 <a href="http://www.mozilla.org/mailnews/10kmessage.eml">10kb
messages</a> from a POP inbox.</td>
</tr>

<tr>
<td VALIGN=TOP>Thread Pane Sorting</td>

<td VALIGN=TOP>1,000 message folder, sort by subject, sort by sender, and
then sort by date. (Initial sort of date was done to inititiate sort state.
Not timed).&nbsp;</td>
</tr>

<tr>
<td VALIGN=TOP>Message Reply Speed</td>

<td VALIGN=TOP>Click Reply All to a <a href="http://www.mozilla.org/mailnews/2khtmlmessage.eml">2kb
HTML message</a> sent to 5 recipients. (Due to "Brutal Sharing" of XUL
windows, I now log the 2nd time it takes to open this window.)</td>
</tr>

<tr>
<td VALIGN=TOP>Batch Delete 5 Messages</td>

<td VALIGN=TOP>Select 5 messages at once and Delete (local folder).&nbsp;</td>
</tr>

<tr>
<td>Mail Module Loading Time</td>

<td>Load only navigator, and then time how long it takes to load the default
mail account from Tasks | Mail. (Wait for the Inbox to complete loading.)</td>
</tr>
</table>

<table BORDER CELLSPACING=2 CELLPADDING=2 WIDTH="100%" BGCOLOR="#CCCCCC" >
<caption><tbody>
<br></tbody></caption>

<tr VALIGN=TOP>
<td VALIGN=TOP BGCOLOR="#003366"><a NAME="results"></a><b><font color="#FFFFFF">Area
Tested</font></b></td>
"""

print "<td VALIGN=TOP BGCOLOR=\"#003366\"><b><font color=\"#FFFFFF\"> %s </font></b></td>" % (bdate[0])

print """
<td VALIGN=TOP BGCOLOR="#003366"><b><font color="#FFFFFF">Target</font></b></td>

<td VALIGN=TOP BGCOLOR="#003366"><b><font color="#FFFFFF">Netscape 4.76</font></b></td>
"""
print "<td VALIGN=TOP BGCOLOR=\"#003366\"><b><font color=\"#FFFFFF\"> %s </font></b></td>" % (bdate[1])

print "<td VALIGN=TOP BGCOLOR=\"#003366\"><b><font color=\"#FFFFFF\"> %s </font></b></td>" % (bdate[2])
print """
<td VALIGN=TOP BGCOLOR="#003366"><b><font color="#FFFFFF">6.01 RTM</font></b></td>
</tr>

<tr VALIGN=TOP>
<td VALIGN=TOP>Folder Loading Speed</td>
"""
print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((fls[0][0] + fls[0][1] + fls[0][2]) / 3, fls[0][0], fls[0][1], fls[0][2]) # last week's fls

print """
<td VALIGN=TOP>0.43</td> <!-- target -->

<td VALIGN=TOP>1.64</td> <!-- ns 4.76 -->
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((fls[1][0] + fls[1][1] + fls[1][2]) / 3, fls[1][0], fls[1][1], fls[1][2]) # 2 week ago's fls

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((fls[2][0] + fls[2][1] + fls[2][2]) / 3, fls[2][0], fls[2][1], fls[2][2]) # 3 week ago's fls

print """
<td VALIGN=TOP>2.79</td> <!-- 6.01 RTM -->
</tr>

<tr VALIGN=TOP>
<td VALIGN=TOP>Thread Pane Scrolling Speed</td>
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((tpsc[0][0] + tpsc[0][1] + tpsc[0][2]) / 3, tpsc[0][0], tpsc[0][1], tpsc[0][2]) # last week's tps

print """
<td VALIGN=TOP>0.73</td> <!-- target -->

<td VALIGN=TOP>0.56</td> <!-- ns 4.76 -->
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((tpsc[1][0] + tpsc[1][1] + tpsc[1][2]) / 3, tpsc[1][0], tpsc[1][1], tpsc[1][2]) # 2 week ago's tps

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((tpsc[2][0] + tpsc[2][1] + tpsc[2][2]) / 3, tpsc[2][0], tpsc[2][1], tpsc[2][2]) # 3 week ago's tps

print """
<td VALIGN=TOP>16.42</td> <!-- 6.01 RTM -->
</tr>

<tr VALIGN=TOP>
<td VALIGN=TOP>Message Display Speed</td>
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mds[0][0] + mds[0][1] + mds[0][2]) / 3, mds[0][0], mds[0][1], mds[0][2]) # last week's mds

print """
<td VALIGN=TOP>2.87</td> <!-- target -->

<td VALIGN=TOP>5.11</td> <!-- ns 4.76 -->
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mds[1][0] + mds[1][1] + mds[1][2]) / 3, mds[1][0], mds[1][1], mds[1][2]) # 2 week ago's mds

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mds[2][0] + mds[2][1] + mds[2][2]) / 3, mds[2][0], mds[2][1], mds[2][2]) # 3 week ago's mds

print """
<td VALIGN=TOP>11.73</td> <!-- 6.01 RTM -->
</tr>

<tr VALIGN=TOP>
<td VALIGN=TOP>Thread Pane Sorting</td>
"""

print "<td>sbj=%0.2f<br>sen=%0.2f<br>date=%0.2f</td>" % (tpst[0][0], tpst[0][1], tpst[0][2])

print """
<td VALIGN=TOP>sbj=0.33&nbsp;
<br>sen= 0.35&nbsp; <!-- target -->
<br>date=0.25</td>

<td VALIGN=TOP>sbj=0.87&nbsp;
<br>sen=0.57&nbsp; <!-- ns 4.76 -->
<br>date=0.33</td>
"""

print "<td>sbj=%0.2f<br>sen=%0.2f<br>date=%0.2f</td>" % (tpst[1][0], tpst[1][1], tpst[1][2])

print "<td>sbj=%0.2f<br>sen=%0.2f<br>date=%0.2f</td>" % (tpst[2][0], tpst[2][1], tpst[2][2])

print """
<td VALIGN=TOP>sbj=1.53&nbsp;
<br>sen=1.73&nbsp; <!-- 6.01 RTM -->
<br>date=1.12</td>
</tr>

<tr VALIGN=TOP>
<td VALIGN=TOP>Message Reply Speed</td>
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mrs[0][0] + mrs[0][1] + mrs[0][2]) / 3, mrs[0][0], mrs[0][1], mrs[0][2]) # last week's mrs

print """
<td VALIGN=TOP>2.35</td> <!-- target -->

<td VALIGN=TOP>2.33</td> <!-- ns 4.76 -->
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mrs[1][0] + mrs[1][1] + mrs[1][2]) / 3, mrs[1][0], mrs[1][1], mrs[1][2]) # 2 week ago's mrs

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mrs[2][0] + mrs[2][1] + mrs[2][2]) / 3, mrs[2][0], mrs[2][1], mrs[2][2]) # 3 week ago's mrs 

print """
<td VALIGN=TOP>9.90</td> <!-- 6.01 RTM -->
</tr>

<tr VALIGN=TOP>
<td VALIGN=TOP>Batch Delete 5 Messages</td>
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((bds[0][0] + bds[0][1] + bds[0][2]) / 3, bds[0][0], bds[0][1], bds[0][2]) # last week's bds

print """
<td VALIGN=TOP>0.44</td> <!-- target -->

<td VALIGN=TOP>0.36</td> <!-- ns 4.76 -->
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((bds[1][0] + bds[1][1] + bds[1][2]) / 3, bds[1][0], bds[1][1], bds[1][2]) # 2 week ago's bds

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((bds[2][0] + bds[2][1] + bds[2][2]) / 3, bds[2][0], bds[2][1], bds[2][2]) # 3 week ago's bds

print """
<td VALIGN=TOP>3.20</td> <!-- 6.01 RTM -->
</tr>

<tr>
<td>Mail Module Loading Time</td>
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mml[0][0] + mml[0][1] + mml[0][2]) / 3, mml[0][0], mml[0][1], mml[0][2]) # last week's mml

print """
<td>3.15 (3.18 3.11 3.15)</td> <!-- target -->

<td>2.31 (2.80 2.11 2.03)</td> <!-- ns 4.76 -->
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mml[1][0] + mml[1][1] + mml[1][2]) / 3, mml[1][0], mml[1][1], mml[1][2]) # 2 week ago's mml

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mml[2][0] + mml[2][1] + mml[2][2]) / 3, mml[2][0], mml[2][1], mml[2][2]) # 3 week ago's mml

print """
<td>7.56 (7.31 7.28 8.10)</td> <!-- 6.01 RTM -->
</tr>
</table>

<p><a NAME="graph"></a>
<center><img SRC="perfchart.gif" TITLE="Latest performance results" </center>
<br><font color="#000000">Table and results by <a href="mailto:stephend@netscape.com?subject=Mail/News performance results" TITLE="Send mail to stephend about these results">Stephen
Donner</a>.</font></center>

<div align=right><font color="#000000">Copyright &copy; 1998-2001 The Mozilla
Organization.</font>
<br><font color="#000000"><a href="http://bonsai-www.mozilla.org/cvslog.cgi?file=mozilla-org/html/mailnews/win_performance_results.html&rev=&root=/www/" TITLE="See this document's revision history.">Document
History</a></font></div>

</body>
</html>
"""
