#!/bin/bash
# vim: set shiftwidth=4 tabstop=4 autoindent noexpandtab copyindent:

# build-separate-slides.sh
# Copyright (c) 2006, L. David Baron
# 
# Build multiple slide HTML files from the master.
# 
# Written 2006-05-08 for XTech 2006 presentation.

rm -f slide-[0-9]*.xhtml

NUM_SLIDES=$(xsltproc count-slides-transform.xsl master.xhtml)
for ((SLIDE=1; $SLIDE <= $NUM_SLIDES; SLIDE=$SLIDE+1))
do
	DEST=slide-$SLIDE.xhtml
	echo -n "Generating $DEST ..."
	xsltproc --stringparam slidenum $SLIDE --stringparam lastnum $NUM_SLIDES make-output-transform.xsl master.xhtml > $DEST
	echo " done."
done

