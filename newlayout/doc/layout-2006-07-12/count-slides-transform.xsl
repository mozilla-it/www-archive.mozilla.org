<!-- vim: set shiftwidth=4 tabstop=4 autoindent noexpandtab copyindent:

count-slides-transform.xsl
Copyright (c) 2006, L. David Baron

Count the number of slides in the master.

Written 2006-05-08 for XTech 2006 presentation.

invoked by build-separate-slides.sh

  -->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:html="http://www.w3.org/1999/xhtml"
                >

<xsl:output method="text" encoding="UTF-8" />

<xsl:template match="/">
	<xsl:variable name="slides" select="html:html/html:body/html:div[starts-with(@class,'slide')]" />
	<xsl:value-of select="count($slides)" />
</xsl:template>

</xsl:stylesheet>
