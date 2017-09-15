
all:		status-detail.html

%.xhtml:	%.withbugs.xml status-detail.xsl
		xsltproc status-detail.xsl $< > $@

%.html:		%.xhtml
		tidy --tidy-mark no --output-html yes --indent auto --wrap 0 --doctype strict < $< > $@

%.withbugs.xml:	%.xml buglist.csv
		./createbuginfo.pl buglist.csv $< > $@

buglist.csv:	status-detail.xml
		wget --no-check-certificate -O $@ https://bugzilla.mozilla.org/buglist.cgi\?query_format=advanced\&bugidtype=include\&bug_id=`./buglist.pl < status-detail.xml`\&ctype=csv


.PHONY:	clean realclean

clean:
		rm -f status-detail.withbugs.xml buglist.csv buglist.xml status-detail.xhtml

realclean:	clean
		rm -f status-detail.html