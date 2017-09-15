<?xml version="1.0" encoding="iso-8859-1"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

 <xsl:output method = "html" />

 <xsl:variable name="milestones" select="document('')/*/*/milestones" />
 <xsl:template name="dontcall" mode="hidden">
  <milestones>
   <mile value="91" stone="0.9.1" />
   <mile value="94" stone="0.9.4" />
   <mile value="94.1" stone="0.9.4.1" alias="Netscape6.2" />
   <mile value="95" stone="0.9.5" />
   <mile value="97" stone="0.9.7" />
  </milestones>
 </xsl:template>

 <xsl:template match="xslt">
<html>
 <body>
  <h1>XSLT Compatibility matrix</h1>
  <table border="1">
   <tbody>
    <tr>
     <th /> <!-- empty column for features -->
     <xsl:for-each select="$milestones/mile">
      <th>
       <xsl:value-of select="@stone" />
       <xsl:if test="@alias">
        /<xsl:value-of select="@alias" />
       </xsl:if>
      </th>
     </xsl:for-each>
    </tr>
    <xsl:apply-templates select="feature">
     <xsl:sort select="name" />
    </xsl:apply-templates>
   </tbody>
  </table>
 </body>
</html>
 </xsl:template>

<xsl:template match="feature">
 <xsl:variable name="feature" select="." />
 <xsl:variable name="full" select="./support/full" />
 <xsl:variable name="fullms"
               select="translate($full/milestone/@version,'.','')" />
 <xsl:variable name="partial" select="./support/partial" />
 <xsl:variable name="partialms"
               select="translate($partial/milestone/@version,'.','')" />
    <tr>
     <td><xsl:value-of select="name" /></td>
     <xsl:for-each select="$milestones/mile">
      <td>
       <xsl:choose>
       <xsl:when test="$full and (@value &gt;= $fullms)">
        <xsl:attribute name="bgcolor">lightgreen</xsl:attribute>
        <xsl:call-template name="buglist">
         <xsl:with-param name="bug" select="$full" />
        </xsl:call-template>        
       </xsl:when>
       <xsl:when test="$partial and (@value &gt;= $partialms)">
        <xsl:attribute name="bgcolor">grey</xsl:attribute>
        <xsl:call-template name="buglist">
         <xsl:with-param name="bug" select="$partial" />
        </xsl:call-template>
       </xsl:when>
       <xsl:otherwise>
        <xsl:attribute name="bgcolor">red</xsl:attribute>
       </xsl:otherwise>
       </xsl:choose>
      </td>
     </xsl:for-each>
    </tr>
</xsl:template>

<xsl:template name="buglist">
 <xsl:param name="bug" select="/.." />
 <xsl:if test="$bug/bug">
  <a>
   <xsl:attribute name="href">http://bugzilla.mozilla.org/buglist.cgi?bug_id=<xsl:value-of select="$bug/bug/@id" /></xsl:attribute>
   <xsl:value-of select="$bug/bug/@id" />
  </a>
 </xsl:if>
</xsl:template>

</xsl:stylesheet>

