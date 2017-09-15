build = [] # Build Date array
build.append("2001-05-11")
build.append("2001-05-18")
build.append("2001-05-25")
build.append("2001-06-01")

flsar = [] # Folder Loading Speed's array
flsar.append([3.71,3.57,3.70])
flsar.append([3.51,3.65,3.49])
flsar.append([3.31,3.45,3.38])

tpsclar = [] # Thread Pane Scrolling Speed's array
tpsclar.append([0.99,1.03,1.01])
tpsclar.append([0.97,1.05,1.03])
tpsclar.append([0.89,1.01,0.94])

mdsar = [] # Message Display Speed's array
mdsar.append([8.00,8.02,7.53])
mdsar.append([7.98,8.03,7.88])
mdsar.append([8.10,8.02,7.98])

tpsrtar = [] # Thread Pane Sorting Speed's array, these are special, we should never ever average these
tpsrtar.append([0.76,0.85,0.31])
tpsrtar.append([0.59,0.51,0.33])
tpsrtar.append([0.60,0.51,0.31])

mrsar = [] # Message Reply Speed's array
mrsar.append([12.50,10.45,10.74])
mrsar.append([12.75,11.31,11.44])
mrsar.append([11.23,10.45,10.87])

bd5mar = [] # Batch Delete 5 Message's array
bd5mar.append([3.29,2.99,2.92])
bd5mar.append([3.18,3.01,2.97])
bd5mar.append([3.20,3.17,3.11])

mmltar = [] # Mail Module Loading Time's array
mmltar.append([11.73,10.67,11.03])
mmltar.append([10.91,11.03,10.89])
mmltar.append([11.43,10.99,11.21])

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
<center><b><font color="#000000"><font size=+2>Mail Performance Results
for Linux</font></font></b>
<p><font color="#000000">Post feedback to<b>: <a href="news://news.mozilla.org/netscape.public.mozilla.mail-news" TITLE="Go to the newsgroup to comment about these results">netscape.public.mozilla.mail-news</a></b>
or send mail to: <b><a href="mailto:stephend@netscape.com?subject=Performance results for Linux" TITLE="Send mail to stephend about these results">stephend@netscape.com</a></b></font>
<br><script>  document.write("<i>Last Updated: " + document.lastModified + "</i>")</script>

<br><font color="#000000">View <a href="http://www.mozilla.org/mailnews/win_performance_results.html" TITLE="Go here to view Windows performance results">Windows</a>
or <a href="http://www.mozilla.org/mailnews/mac_performance_results.html" TITLE="Go here to view Mac performance results">Mac</a>
results</font>
<p><font color="#000000"><font size=+1><a href="#method" TITLE="Methodology for the results">Methodology</a>
| <a href="#results" TITLE="Results in table form">Results</a></font></font></center>
<font color="#000000">&nbsp;<b>Machine Configuration:</b></font>
<li>
<font color="#000000">Linux: Redhat 6.2, 128M RAM, 266 MHz Pentium II</font></li>

<li>
<font color="#000000">All test results are in seconds and done with a stopwatch,
error rate&nbsp; of +/- 1 second.</font></li>

<li>
<font color="#000000">The actual messages and folders I use to test are
available via the links in the Methodology section.</font></li>

<table BORDER=1 CELLSPACING=2 CELLPADDING=2 WIDTH="100%" BGCOLOR="#CCCCCC">

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
<td VALIGN=TOP BGCOLOR="#CCCCCC">Message Reply Speed</td>

<td VALIGN=TOP>Display 5 <a href="http://www.mozilla.org/mailnews/10kmessage.eml">10kb
messages</a> from a POP inbox.</td>
</tr>

<tr>
<td VALIGN=TOP BGCOLOR="#CCCCCC">Thread Pane Sorting</td>

<td VALIGN=TOP>1,000 message folder, sort by subject, sort by sender, and
then sort by date. (Initial sort of date was done to inititiate sort state.
Not timed).&nbsp;</td>
</tr>

<tr>
<td VALIGN=TOP BGCOLOR="#CCCCCC">Message Reply Speed</td>

<td VALIGN=TOP>Click Reply All to a <a href="http://www.mozilla.org/mailnews/2khtmlmessage.eml">2kb
HTML message</a> sent to 5 recipients.</td>
</tr>

<tr>
<td VALIGN=TOP BGCOLOR="#CCCCCC">Batch Delete 5 Messages</td>

<td VALIGN=TOP>Select 5 messages at once and Delete (local folder).&nbsp;</td>
</tr>

<tr>
<td>Mail Module Loading Time</td>

<td>Load only navigator, and then time how long it takes to load the default
mail account from Tasks | Mail. (Wait for the Inbox to complete loading.)</td>
</tr></table><br>
<table BORDER CELLSPACING=2 CELLPADDING=2 WIDTH="100%" BGCOLOR="#CCCCCC">
"""

print """<td VALIGN=TOP BGCOLOR="#003366"><b><font color="#FFFFFF">Methodology for
the Area</font></b></td>
"""
print "<td VALIGN=TOP BGCOLOR=\"#003366\"><b><font color=\"#FFFFFF\"> %s </font></b></td>" % (bdate[0])
print """
<td VALIGN=TOP BGCOLOR=\"#003366\"><b><font color="#FFFFFF">Netscape 4.76</font></b></td>
"""

print "<td VALIGN=TOP BGCOLOR=\"#003366\"><b><font color=\"#FFFFFF\"> %s </font></b></td>" % (bdate[1])

print "<td VALIGN=TOP BGCOLOR=\"#003366\"><b><font color=\"#FFFFFF\"> %s </font></b></td>" % (bdate[2])
print """
<td VALIGN=TOP BGCOLOR="#003366"><b><font color="#FFFFFF">6.01 RTM</font</b></td>
</tr>
<tr>
<td VALIGN=TOP>Folder Loading Speed</td>
"""
print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((fls[0][0] + fls[0][1] + fls[0][2]) / 3, fls[0][0], fls[0][1], fls[0][2]) # last week's fls -->
print """
<td VALIGN=TOP>1.63</td> <!-- ns 4.76 -->
"""
print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((fls[1][0] + fls[1][1] + fls[1][2]) / 3, fls[1][0], fls[1][1], fls[1][2]) # 2 week ago's fls

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((fls[2][0] + fls[2][1] + fls[2][2]) / 3, fls[2][0], fls[2][1], fls[2][2]) # 3 week ago's fls
print """
<td VALIGN=TOP>4.29</td> <!-- 6.01 RTM -->
</tr>
<tr VALIGN=TOP>
<td VALIGN=TOP>Thread Pane Scrolling Speed</td>
"""

print "<td BGCOLOR=\"#CCCCCC\">%0.2f (%0.2f %0.2f %0.2f) </td>" % ((tpsc[0][0] + tpsc[0][1] + tpsc[0][2]) / 3, tpsc[0][0], tpsc[0][1], tpsc[0][2]) # last week's tps
print """
<td VALIGN=TOP>1.56</td> <!-- ns 4.76 -->
"""
print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((tpsc[1][0] + tpsc[1][1] + tpsc[1][2]) / 3, tpsc[1][0], tpsc[1][1], tpsc[1][2]) # 2 week ago's tps

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((tpsc[2][0] + tpsc[2][1] + tpsc[2][2]) / 3, tpsc[2][0], tpsc[2][1], tpsc[2][2]) # 3 week ago's tps
print """
<td VALIGN=TOP>19.89</td> <!-- 6.01 RTM -->
</tr>

<tr VALIGN=TOP>
<td VALIGN=TOP>Message Display Speed</td>
"""
print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mds[0][0] + mds[0][1] + mds[0][2]) / 3, mds[0][0], mds[0][1], mds[0][2]) # last week's mds

print """
<td VALIGN=TOP>4.07</td> <!-- ns 4.76 -->
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mds[1][0] + mds[1][1] + mds[1][2]) / 3, mds[1][0], mds[1][1], mds[1][2]) # 2 week ago's mds

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mds[2][0] + mds[2][1] + mds[2][2]) / 3, mds[2][0], mds[2][1], mds[2][2]) # 3 week ago's mds

print """
<td VALIGN=TOP>12.81</td> <!-- 6.01 RTM -->
</tr>
<tr VALIGN=TOP>
<td VALIGN=TOP>Thread Pane Sorting</td>
"""

print "<td> %0.2f<br>%0.2f<br>%0.2f </td>" % (tpst[0][0], tpst[0][1], tpst[0][2])

print """
<td VALIGN=TOP>sbj=0.57&nbsp;
<br>sen=0.48&nbsp; <!-- ns 4.76 -->
<br>date=0.32</td>
"""

print "<td> %0.2f<br>%0.2f<br>%0.2f </td>" % (tpst[1][0], tpst[1][1], tpst[1][2])

print "<td> %0.2f<br>%0.2f<br>%0.2f </td>" % (tpst[2][0], tpst[2][1], tpst[2][2])

print """
<td VALIGN=TOP>sbj=2.21&nbsp;
<br>sen=2.30&nbsp; <!-- 6.01 RTM -->
<br>date=1.37</td>
</tr>
<tr VALIGN=TOP>
<td VALIGN=TOP>Message Reply Speed</td>
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mrs[0][0] + mrs[0][1] + mrs[0][2]) / 3, mrs[0][0], mrs[0][1], mrs[0][2]) # last week's mrs

print """
<td VALIGN=TOP>3.23</td> <!-- ns 4.76 -->
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mrs[1][0] + mrs[1][1] + mrs[1][2]) / 3, mrs[1][0], mrs[1][1], mrs[1][2]) # 2 week ago's mrs

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mrs[2][0] + mrs[2][1] + mrs[2][2]) / 3, mrs[2][0], mrs[2][1], mrs[2][2]) # 3 week ago's mrs 

print """
<td VALIGN=TOP>10.40</td> <!-- 6.01 RTM -->
</tr>

<tr VALIGN=TOP>
<td VALIGN=TOP>Batch Delete 5 Messages</td>
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((bds[0][0] + bds[0][1] + bds[0][2]) / 3, bds[0][0], bds[0][1], bds[0][2]) # last week's bds

print """
<td VALIGN=TOP>0.55</td> <!-- ns 4.76 -->
"""
print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((bds[1][0] + bds[1][1] + bds[1][2]) / 3, bds[1][0], bds[1][1], bds[1][2]) # 2 week ago's bds

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((bds[2][0] + bds[2][1] + bds[2][2]) / 3, bds[2][0], bds[2][1], bds[2][2]) # 3 week ago's bds

print """
<td VALIGN=TOP>3.70</td> <!-- 6.01 RTM -->
</tr>

<tr>
<td>Mail Module Loading Time</td>
"""

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mml[0][0] + mml[0][1] + mml[0][2]) / 3, mml[0][0], mml[0][1], mml[0][2]) # last week's mml

print """
<td>1.49 (2.80 2.11 2.03)</td> <!-- ns 4.76 -->
"""
print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mml[1][0] + mml[1][1] + mml[1][2]) / 3, mml[1][0], mml[1][1], mml[1][2]) # 2 week ago's mml

print "<td>%0.2f (%0.2f %0.2f %0.2f) </td>" % ((mml[2][0] + mml[2][1] + mml[2][2]) / 3, mml[2][0], mml[2][1], mml[2][2]) # 3 week ago's mml

print """
<td>14.70 (14.71 14.56 14.82)</td> <!-- 6.01 RTM -->
</tr>
</table>

<p><font color="#000000">Table and results by <a href="mailto:stephend@netscape.com?subject=Mail/News performance results" TITLE="Send mail to stephend about these results">Stephen
Donner</a>.</font>
<div align=right><font color="#000000">Copyright &copy; 1998-2001 The Mozilla
Organization.</font>
<br><font color="#000000"><a href="http://bonsai-www.mozilla.org/cvslog.cgi?file=mozilla-org/html/mailnews/linux_performance_results.html&rev=&root=/www/" TITLE="See this document's revision history">Document
History</a></font></div>
</body>
</html>
"""
