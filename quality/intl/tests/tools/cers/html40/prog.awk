BEGIN {
	printf "<table>\n"
	printf "<tr bgcolor=#cccccc><td>CER</td><td>Glyph</td><td>NCR</td><td>Glyph</td><td>Hex NCR</td><td>Glyph</td></tr>\n"
}
{ printf "<tr><td>&amp;%s;</td><td>&%s;</td><td>&amp;#%s;</td><td>&#%s;</td><td>&amp;#x%x;</td><td>&#x%x;</td></tr>\n", $1, $1, $2, $2, $2, $2 }
END {
	printf "</table>\n"
}
