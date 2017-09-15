# ! /usr/bin/python

build = [] # Build Date array
build.append("2001-05-11")
build.append("2001-05-18")
build.append("2001-05-25")
build.append("2001-06-01")

flsar = [] # Folder Loading Speed's array
flsar.append([2.64,2.36,2.54])
flsar.append([2.51,2.48,2.55])
flsar.append([2.28,2.01,2.32])

tpsclar = [] # Thread Pane Scrolling Speed's array
tpsclar.append([0.89,0.89,0.91])
tpsclar.append([0.93,0.91,0.87])
tpsclar.append([0.91,0.88,0.92])

mdsar = [] # Message Display Speed's array
mdsar.append([7.48,7.44,7.49])
mdsar.append([7.49,7.41,7.43])
mdsar.append([7.86,7.40,7.60])

tpsrtar = [] # Thread Pane Sorting Speed's array, these are special, we should never ever average these
tpsrtar.append([0.44,0.46,0.34])
tpsrtar.append([0.45,0.50,0.36])
tpsrtar.append([0.47,0.54,0.39])

mrsar = [] # Message Reply Speed's array
mrsar.append([13.30,10.19,10.23])
mrsar.append([13.19,10.21,10.25])
mrsar.append([13.06,9.44,10.01])

bd5mar = [] # Batch Delete 5 Message's array
bd5mar.append([3.31,3.06,3.25])
bd5mar.append([3.18,3.21,3.20])
bd5mar.append([3.14,3.45,3.16])

mmltar = [] # Mail Module Loading Time's array
mmltar.append([12.38,12.43,12.48])
mmltar.append([13.14,13.40,13.28])
mmltar.append([20.37,15.00,14.95])

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
for Mac</font></font></b>
<p><font color="#000000">Post feedback to<b>: <a href="news://news.mozilla.org/netscape.public.mozilla.mail-news" TITLE="Go to the newsgroup to comment about the results">netscape.public.mozilla.mail-news</a></b>
or send mail to: <b><a href="mailto:stephend@netscape.com?subject=Performance Results for Mac" TITLE="Send mail to stephend about these results">stephend@netscape.com</a></b></font>
<br><script> document.write("<i>Last Updated: " + document.lastModified + "</i>")  </script>

<br><font color="#000000">View <a href="http://www.mozilla.org/mailnews/win_performance_results.html" TITLE="Go here to view Windows performance results">Windows</a>
or<b> </b><a href="http://www.mozilla.org/mailnews/linux_performance_results.html" TITLE="Go here to view Linux performance results">Linux</a>
results</font>
<p><font color="#000000"><font size=+1><a href="#method" TITLE="Methodology for the results">Methodology</a>
| <a href="#results" TITLE="Results in table form">Results</a></font></font></center>
<b><font color="#000000">Machine Configuration</font></b>
<li>
<font color="#000000">Mac OS 9.0.4, 128MB RAM, 266 MHz G3</font></li>

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
Mac, I now log the 2nd time it takes to open this window.)</td>
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
<td VALIGN=TOP>Seems instant (caching?)</td> <!-- target -->

<td VALIGN=TOP>1.54</td> <!-- ns 4.76 -->
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((fls[1][0] + fls[1][1] + fls[1][2]) / 3, fls[1][0], fls[1][1], fls[1][2]) # 2 week ago's fls

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((fls[2][0] + fls[2][1] + fls[2][2]) / 3, fls[2][0], fls[2][1], fls[2][2]) # 3 week ago's fls

print """
<td VALIGN=TOP>3.24</td> <!-- 6.01 RTM -->
</tr>

<tr VALIGN=TOP>
<td VALIGN=TOP>Thread Pane Scrolling Speed</td>
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((tpsc[0][0] + tpsc[0][1] + tpsc[0][2]) / 3, tpsc[0][0], tpsc[0][1], tpsc[0][2]) # last week's tps

print """
<td VALIGN=TOP>1.12</td> <!-- target -->

<td VALIGN=TOP>1.07</td> <!-- ns 4.76 -->
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((tpsc[1][0] + tpsc[1][1] + tpsc[1][2]) / 3, tpsc[1][0], tpsc[1][1], tpsc[1][2]) # 2 week ago's tps

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((tpsc[2][0] + tpsc[2][1] + tpsc[2][2]) / 3, tpsc[2][0], tpsc[2][1], tpsc[2][2]) # 3 week ago's tps

print """
<td VALIGN=TOP>17.52</td> <!-- 6.01 RTM -->
</tr>

<tr VALIGN=TOP>
<td VALIGN=TOP>Message Display Speed</td>
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mds[0][0] + mds[0][1] + mds[0][2]) / 3, mds[0][0], mds[0][1], mds[0][2]) # last week's mds

print """
<td VALIGN=TOP>3.64</td> <!-- target -->

<td VALIGN=TOP>3.78</td> <!-- ns 4.76 -->
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mds[1][0] + mds[1][1] + mds[1][2]) / 3, mds[1][0], mds[1][1], mds[1][2]) # 2 week ago's mds

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mds[2][0] + mds[2][1] + mds[2][2]) / 3, mds[2][0], mds[2][1], mds[2][2]) # 3 week ago's mds

print """
<td VALIGN=TOP>9.76</td> <!-- 6.01 RTM -->
</tr>

<tr VALIGN=TOP>
<td VALIGN=TOP>Thread Pane Sorting</td>
"""

print "<td>sbj=%0.2f<br>sen=%0.2f<br>date=%0.2f</td>" % (tpst[0][0], tpst[0][1], tpst[0][2])

print """
<td VALIGN=TOP>sbj=0.37&nbsp;
<br>sen= 0.33&nbsp; <!-- target -->
<br>date=0.21</td>

<td VALIGN=TOP>sbj=1.01&nbsp;
<br>sen=0.75&nbsp; <!-- ns 4.76 -->
<br>date=0.33</td>
"""

print "<td>sbj=%0.2f<br>sen=%0.2f<br>date=%0.2f</td>" % (tpst[1][0], tpst[1][1], tpst[1][2])

print "<td>sbj=%0.2f<br>sen=%0.2f<br>date=%0.2f</td>" % (tpst[2][0], tpst[2][1], tpst[2][2])

print """
<td VALIGN=TOP>sbj=1.42&nbsp;
<br>sen=1.50&nbsp; <!-- 6.01 RTM -->
<br>date=0.92</td>
</tr>

<tr VALIGN=TOP>
<td VALIGN=TOP>Message Reply Speed</td>
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mrs[0][0] + mrs[0][1] + mrs[0][2]) / 3, mrs[0][0], mrs[0][1], mrs[0][2]) # last week's mrs

print """
<td VALIGN=TOP>3.41</td> <!-- target -->

<td VALIGN=TOP>3.54</td> <!-- ns 4.76 -->
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mrs[1][0] + mrs[1][1] + mrs[1][2]) / 3, mrs[1][0], mrs[1][1], mrs[1][2]) # 2 week ago's mrs

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mrs[2][0] + mrs[2][1] + mrs[2][2]) / 3, mrs[2][0], mrs[2][1], mrs[2][2]) # 3 week ago's mrs 

print """
<td VALIGN=TOP>11.21</td> <!-- 6.01 RTM -->
</tr>

<tr VALIGN=TOP>
<td VALIGN=TOP>Batch Delete 5 Messages</td>
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((bds[0][0] + bds[0][1] + bds[0][2]) / 3, bds[0][0], bds[0][1], bds[0][2]) # last week's bds

print """
<td VALIGN=TOP>0.48</td> <!-- target -->

<td VALIGN=TOP>0.83</td> <!-- ns 4.76 -->
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((bds[1][0] + bds[1][1] + bds[1][2]) / 3, bds[1][0], bds[1][1], bds[1][2]) # 2 week ago's bds

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((bds[2][0] + bds[2][1] + bds[2][2]) / 3, bds[2][0], bds[2][1], bds[2][2]) # 3 week ago's bds

print """
<td VALIGN=TOP>3.44</td> <!-- 6.01 RTM -->
</tr>

<tr>
<td>Mail Module Loading Time</td>
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mml[0][0] + mml[0][1] + mml[0][2]) / 3, mml[0][0], mml[0][1], mml[0][2]) # last week's mml

print """
<td>7.17 (7.10 7.32 7.08)</td> <!-- target -->

<td>2.37 (2.38 2.41 2.32)</td> <!-- ns 4.76 -->
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mml[1][0] + mml[1][1] + mml[1][2]) / 3, mml[1][0], mml[1][1], mml[1][2]) # 2 week ago's mml

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mml[2][0] + mml[2][1] + mml[2][2]) / 3, mml[2][0], mml[2][1], mml[2][2]) # 3 week ago's mml

print """
<td>12.43 (12.38 12.43 12.48)</td> <!-- 6.01 RTM -->
</tr>
</table>
<p>
<br><div align=left><font color="#000000">Table and results by <a href="mailto:stephend@netscape.com?subject=Mail/News performance results" TITLE="Send mail to stephend about these results">Stephen
Donner</a>.</font></div>

<div align=right><font color="#000000">Copyright &copy; 1998-2001 The Mozilla
Organization.</font>
<br><font color="#000000"><a href="http://bonsai-www.mozilla.org/cvslog.cgi?file=mozilla-org/html/mailnews/win_performance_results.html&rev=&root=/www/" TITLE="See this document's revision history.">Document
History</a></font></div>

</body>
</html>
"""
