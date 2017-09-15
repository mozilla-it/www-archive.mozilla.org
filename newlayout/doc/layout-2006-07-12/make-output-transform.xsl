<!-- vim: set shiftwidth=4 tabstop=4 autoindent noexpandtab copyindent:

make-output-transform.xsl
Copyright (c) 2006, L. David Baron

This transformation makes a document for a single slide (chosen by
parameter) from a document containing all the slides for a presentation.
Written 2006-05-08 for XTech 2006 presentation.

invoked by build-separate-slides.sh

  -->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:html="http://www.w3.org/1999/xhtml"
                exclude-result-prefixes="html"
                >

<xsl:output method="xml" encoding="UTF-8" />

<xsl:param name="slidenum" />
<xsl:param name="lastnum" />

<xsl:variable name="hasprev" select="$slidenum &gt; 1" />
<xsl:variable name="hasnext" select="$slidenum &lt; $lastnum" />
<xsl:variable name="hrefprev" select="concat('slide-', $slidenum - 1, '.xhtml')" />
<xsl:variable name="hrefnext" select="concat('slide-', $slidenum + 1, '.xhtml')" />

<!-- default behavior is the identity transform -->
<xsl:template match="@*|node()">
	<xsl:copy>
		<xsl:apply-templates select="@*|node()" />
	</xsl:copy>
</xsl:template>

<!-- Promote the selected slide div to being the body element, including
     replacing the body's attributes with the div's.

     Also add an onkeyup handler.
  -->
<xsl:template match="/html:html/html:body">
	<xsl:copy>
		<xsl:attribute name="onkeyup">handle_key_up(event)</xsl:attribute>

		<xsl:variable name="slidediv" select="html:div[starts-with(@class,'slide')][position()=$slidenum]" />
		<xsl:text>&#x000A;</xsl:text>
		<xsl:apply-templates select="$slidediv/@* | $slidediv/node()" />
		<xsl:text>&#x000A;</xsl:text>
	</xsl:copy>
</xsl:template>

<!-- Add script that allows navigation between slides to the end of the
     head -->
<xsl:template match="html:head">
	<xsl:copy>
		<xsl:apply-templates select="@*|node()" />
		<xsl:text>&#x0009;</xsl:text>
		<html:script type="text/javascript" src="slides.js" />
		<xsl:text>&#x000A;</xsl:text>
	</xsl:copy>
</xsl:template>

<!-- Append [Slide N of M] to the title -->
<xsl:template match="html:title">
	<xsl:copy>
		<xsl:apply-templates select="@*|node()" />
		<xsl:value-of select="concat(' [Slide ', $slidenum, ' of ', $lastnum, ']')" />
	</xsl:copy>
</xsl:template>

<!-- Put next and prev links at the beginning of the slide's header -->
<xsl:template match="html:div[starts-with(@class,'slide')]/*[position()=1 and self::html:h1]">
	<xsl:copy>
		<html:span id="nav">
			<xsl:if test="$hasprev">
				<html:a rel="prev" class="prevslide" href="{$hrefprev}" title="Previous Slide">&#x2190;</html:a>
			</xsl:if>
			<xsl:if test="not($hasprev)">
				<html:span class="prevslide none" title="No Previous Slide">&#x2190;</html:span>
			</xsl:if>
			<xsl:if test="$hasnext">
				<html:a rel="next" class="nextslide" href="{$hrefnext}" title="Next Slide">&#x2192;</html:a>
			</xsl:if>
			<xsl:if test="not($hasnext)">
				<html:span class="nextslide none" title="No Next Slide">&#x2192;</html:span>
			</xsl:if>
		</html:span>
		<html:img src="images/moz-head.png" id="mozhead" alt="" />
		<xsl:apply-templates select="@*|node()" />
	</xsl:copy>
</xsl:template>

</xsl:stylesheet>
