<xsl:stylesheet 
  version="1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>

  <xsl:template match="doc">
    <HTML>
      <style>
        body { margin: 10px; font-family: georgia; } 
        .title { color: red; font-size: 24pt; text-align: center; }
        .topic { border: 1px red solid; margin: 10px; padding: 10px; }
        pre.code { color: green; display: block; }
      </style>

      <body>
        <div class="content">
        <h1 class="title">Mozilla U. XSLT Demo</h1>
        <xsl:for-each select="/doc/item">
         <xsl:apply-templates select="document(string(@filename))/topic"/>
        </xsl:for-each>
        </div>
      </body>
    </HTML>
  </xsl:template>

  <xsl:template match="topic">
    <div class="topic">
      <h2><xsl:value-of select="title"/></h2> 
      <xsl:apply-templates select="p"/>
      <xsl:apply-templates select="code"/>
    </div>
  </xsl:template>

  <xsl:template match="topic/p">
    <p>
     <xsl:value-of select="."/>
    </p>
  </xsl:template>

  <xsl:template match="topic/code">
    <pre class="code">
     <xsl:value-of select="."/>
    </pre>
  </xsl:template>

</xsl:stylesheet>