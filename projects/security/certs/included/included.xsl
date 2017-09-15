<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/">
    <html>
    <head>
      <link rel="stylesheet" href="../certificate-list.css"/>
      <link rel="stylesheet" href="included.css"/>
      <title>Included Certificate List</title>
    </head>
    <body>
      <h1>Included Certificate List</h1>
      <p>This is a list of companies and certificates included in 
      the Mozilla project Root CA store after March 1st, 2007. Eventually,
      it is hoped that this list will be extended to include all CAs
      in the store. In the mean time, the trunk version of the file with all 
      the included roots in it is 
      <a href="http://lxr.mozilla.org/mozilla/source/security/nss/lib/ckfw/builtins/certdata.txt">here</a>.</p>
      
      <ul>
      <xsl:for-each select="//authority">
        <xsl:sort select="./@name"/>
        <li>
          <a>
            <xsl:attribute name="href">
              #<xsl:value-of select="@name"/>
            </xsl:attribute>
            <xsl:value-of select="./@name"/>
          </a>
        </li>
      </xsl:for-each>    
      </ul>
      
      <p>Note: revocation details (CRLs, OCSP) are given for information only; because a CA can create any number
      of sub-CAs, and can decide to change its revocation URLs at any time, this information
      cannot be kept up to date and should not be regarded as comprehensive. Type information is
      a subjective assessment.</p>
      
      <xsl:apply-templates select="certificates/authority">
        <xsl:sort select="@name"/>
      </xsl:apply-templates>
    
      <p><a href="http://bonsai-www.mozilla.org/cvslog.cgi?file=mozilla-org/html/projects/security/certs/included/index.xml&amp;rev=&amp;root=/www/">Document History</a>.</p>
      
    </body>
    </html>
  </xsl:template>

  <xsl:include href="../certificate-list-html.xsl"/>
</xsl:stylesheet>