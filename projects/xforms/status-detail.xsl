<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
                xmlns="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="xml"
            indent="yes"
	    omit-xml-declaration="yes"
            doctype-public="-//W3C//DTD HTML 4.01//EN"
            doctype-system="http://www.w3.org/TR/html4/strict.dtd"/>

<xsl:template match="/status">
<html lang="en">
<head>
  <title>Mozilla XForms Project - Status Details</title>
  <link rel="stylesheet" type="text/css" href="status.css" media="all"/>
</head>
<body>

<!-- Header -->
<div id="side" class="left">
  <xsl:comment>#include virtual="menucontent"</xsl:comment>
</div>

<div id="mainContent" class="bodyleft">

<h1>Status Details</h1>
<p>
This page describes the current status of the XForms implementation for
Mozilla. That is, code built from current CVS or found in <a
href="download.html#nightly">the nightly XPI builds of Firefox</a>.
</p>

<!-- Overview -->
<h2>Limitations and Extensions</h2>
<p>
  The current limitations in the extension, and the custom extension to the
  XForms 1.1 specification we have can be found on <a
  href="http://developer.mozilla.org/en/docs/XForms:Mozilla_XForms_Specials">Mozilla
  Developer Central</a>.
</p>


<!-- Chapter index -->
<h2>Specification Chapter Index</h2>
 <p>
   Here we give an overview of XForms 1.1 specification chapters and the
   current status of the Mozilla support. The sections are marked with their
   current status: <span class="xf-supported">Supported</span>, <span
   class="xf-partial">partial support</span>, <span class="xf-inprogress">in
   progress</span>, and <span class="xf-unsupported">not currently
   supported</span>.
</p>

<p>
We have listed the most relevant bugs here, but check out the <a
href="https://bugzilla.mozilla.org/buglist.cgi?query_format=advanced&amp;product=Core&amp;component=XForms&amp;bug_status=UNCONFIRMED&amp;bug_status=NEW&amp;bug_status=ASSIGNED&amp;bug_status=REOPENED&amp;bug_status=VERIFIED&amp;cmdtype=doit&amp;order=Reuse+same+sort+as+last+time">Bugzilla
XForms buglist</a> for the complete list.
</p>

<ul>
<xsl:for-each select="chapter">
  <li>
    <a href="#chapter-{@number}">
      <xsl:value-of select="@number"/>. <xsl:value-of select="title"/>
    </a>
  </li>
</xsl:for-each>
</ul>

<!-- Chapter content -->
<xsl:apply-templates select="chapter"/>

</div>

</body>
</html>
</xsl:template>

<xsl:template match="chapter">
  <h2>
    <a name="chapter-{@number}" class="ex-ref"
       href="http://www.w3.org/TR/xforms11/#{@linkName}">
      <xsl:value-of select="@number"/>. <xsl:value-of select="title"/>
    </a>
  </h2>

  <xsl:apply-templates select="items"/>
  <xsl:if test="notes">
  <p>
    <xsl:copy-of select="notes/node()"/>
  </p>
  </xsl:if>
</xsl:template>

<xsl:template match="items">
<table summary="" class="items" border="1">
  <col width="10%"/>
  <col width="30%"/>
  <col width="10%"/>
  <col width="*"/>
  <col width="10%"/>
  <tbody>
    <tr>
      <th>Section</th>
      <th>Title</th>
      <th>Status</th>
      <th>Notes</th>
      <th>Bugs</th>
    </tr>
    <xsl:apply-templates select="item"/>
  </tbody>
</table>
</xsl:template>

<xsl:template match="item">
<tr class="xf-{status}">
  <td><a name="section-{section}"><xsl:value-of select="section"/></a></td>
  <td><xsl:copy-of select="title/node()"/></td>
  <td><xsl:copy-of select="status/node()"/></td>
  <td><xsl:copy-of select="notes/node()"/></td>
  <td><xsl:apply-templates select="bug[@num != '']"/></td>
</tr>
</xsl:template>

<xsl:template match="bug">
<a class="bug-{@status}" href="https://bugzilla.mozilla.org/show_bug.cgi?id={@num}"
   title="{title}">
  <xsl:value-of select="@num"/>
</a>;
</xsl:template>

<xsl:template match="text()"/>

</xsl:stylesheet>
