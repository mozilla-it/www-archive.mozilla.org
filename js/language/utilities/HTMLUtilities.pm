#!/usr/bin/perl -w
#
# The contents of this file are subject to the Mozilla Public
# License Version 1.1 (the "License"); you may not use this file
# except in compliance with the License. You may obtain a copy of
# the License at http://www.mozilla.org/MPL/
# 
# Software distributed under the License is distributed on an "AS
# IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or
# implied. See the License for the specific language governing
# rights and limitations under the License.
# 
# The Original Code is Waldemar's Perl Utilities.
# 
# The Initial Developer of the Original Code is Netscape Communications
# Corporation.  Portions created by Netscape Communications Corporation are
# Copyright (C) 1999 Netscape Communications Corporation.  All
# Rights Reserved.
# 
# Contributor(s):   Waldemar Horwat <waldemar@acm.org>
#

package HTMLUtilities;
use 5.004;
use strict;
use diagnostics;
use File::Basename;
use GeneralUtilities;

use Exporter;
use vars qw($VERSION @ISA @EXPORT @EXPORT_OK %EXPORT_TAGS);
@ISA = qw(Exporter);
@EXPORT = qw($verbose $currentPathName $changed $nWarnings %indexFiles alertChange warning fetchFile parseTags decodeAttributes cleanAttributes closeTags
			 warnOfEmptyElements decodeTag nextElement warnOfSpaces cleanupMiscElements removeElement replaceAttributes listInputFiles
			 inputFileRoot inputFileRoots processInputFiles);
@EXPORT_OK = qw($printElementHierarchy);

use vars qw($verbose $currentPathName $changed $nWarnings $printElementHierarchy %indexFiles);
$verbose = 0;
$nWarnings = 0;

$printElementHierarchy = 0; # Set to print the hierarchy of the elements in the file


# Files that are to be examined before other files in the same directory.
%indexFiles = ("index.html" => -10, "futures.html" => -9);


# Elements with no end tags
my %singletonElements = listToHash "AREA", "BASE", "BASEFONT", "BR", "COL", "FRAME", "HR", "IMG", "INPUT",
	"ISINDEX", "LINK", "META", "PARAM";

my @inlineElementList = ("TT", "I", "B", "U", "S", "STRIKE", "BIG", "SMALL", "EM", "STRONG", "DFN", "CODE",
	"SAMP", "KBD", "VAR", "CITE", "ABBR", "ACRONYM", "A", "IMG", "APPLET", "OBJECT", "FONT", "BASEFONT", "BR", "SCRIPT",
	"MAP", "Q", "SUB", "SUP", "SPAN", "BDO", "IFRAME", "INPUT", "SELECT", "TEXTAREA", "LABEL", "BUTTON");
my %inlineElements = listToHash @inlineElementList;
my %flowElements = listToHash "P", "H1", "H2", "H3", "H4", "H5", "H6", "UL", "OL", "DIR", "MENU", "PRE", "DL",
	"DIV", "CENTER", "NOSCRIPT", "NOFRAMES", "BLOCKQUOTE", "FORM", "ISINDEX", "HR", 
	"TABLE", "FIELDSET", "ADDRESS", @inlineElementList;
my %trElement = listToHash "TR";
my %possiblyEmptyElements = listToHash "A", "BODY", "SCRIPT", "TD", "TH";
my %okToRemoveEmptyElements = listToHash "TT", "I", "B", "U", "S", "STRIKE", "BIG", "SMALL", "EM", "STRONG", "DFN", "CODE",
	"SAMP", "KBD", "VAR", "CITE", "ABBR", "ACRONYM", "FONT", "SCRIPT", "SUB", "SUP", "SPAN",
	"P", "H1", "H2", "H3", "H4", "H5", "H6", "DIV";
my %okToRemoveSpacesInside = listToHash "P", "H1", "H2", "H3", "H4", "H5", "H6", "UL", "OL", "DIR", "MENU", "DL",
	"DIV", "TABLE", "ADDRESS", "TD", "TH", "TR", "LI";
my %okToRemoveSpacesAround = listToHash "BR", "HR";
my %dontWarnAboutSpacesInside = listToHash "SPAN";

# Elements with optional end tags.  The values are hash-lists of allowed nested tags.
my %selfTerminatingElements = (
	COLGROUP => {listToHash("COL")},
	DD => \%flowElements,
	DT => \%inlineElements,
	HEAD => {listToHash "TITLE", "ISINDEX", "BASE", "SCRIPT", "STYLE", "META", "LINK", "OBJECT"},
	HTML => {listToHash "HEAD", "BODY"},
	LI => \%flowElements,
	OPTION => {},
	P => \%inlineElements,
	TBODY => \%trElement,
	TFOOT => \%trElement,
	THEAD => \%trElement,
	TD => \%flowElements,
	TH => \%flowElements,
	TR => {listToHash "TD", "TH"});

# Attributes whose values should always be quoted.
my %alwaysQuotedAttributes = listToHash "alt", "href", "name";


sub alertChange(@) {
	print STDERR "\nIn '$currentPathName':\n" unless $changed;
	$changed = 1;
	print STDERR @_, "\n";
}


sub warning(@) {
	print STDERR "***** WARNING: ", @_, "\n";
	$nWarnings++;
}


# Read a file with the given file or path name.  Strip trailing whitespace from each line.
# Return the file as a list of lines.
# If omits is provided, it must be a hash H indexed by strings STR.  If the file contains a
# line consisting of <!--STR ...-->, omit all following lines until a line containing <--/STR--> is found
# and store the entire STR ... comment as the value of STR in H.
sub fetchFile($;\%) {
	($currentPathName, my $omits) = @_;
	
	$changed = 0;
	open SRCFILE, "<".$currentPathName or die "Cannot open '$currentPathName'";

	my $nModifiedLines = 0;
	my @lines;
	local $_;
	if ($omits) {
		while (<SRCFILE>) {
			$nModifiedLines += s/[ \t]+$//;
			while (/<!--((\/?)([0-9A-Za-z]+).*?)-->/g) {
				my $comment = $1;
				my $name = $3;
				if (exists $$omits{$name}) {
					if ($2) {
						warning "Trying to close unopened <!--$name-->";
					} else {
						warning "Duplicate <!--$comment-->" if $$omits{$name};
						warning "<!--$comment--> should be at the end of a line: $_" if pos($_)+1 != length;
						# print "# Omitting <!--$comment--> section\n" if $verbose;
						$$omits{$name} = $comment;
						push @lines, $_;
						my $name2;
						do {
							defined($_ = <SRCFILE>) or die "Can't find <!--/$name-->";
						} until ((($name2) = /<!--\/([0-9A-Za-z]+)-->\s*$/) && $name2 eq $name);
						last;
					}
				}
			}
			push @lines, $_;
		}
	} else {
		while (<SRCFILE>) {
			$nModifiedLines += s/[ \t]+$//;
			push @lines, $_;
		}
	}
	close SRCFILE or die $^E;
	alertChange "Removed trailing whitespace on $nModifiedLines lines" if $nModifiedLines;
	return @lines;
}


# Given a list of lines, each ending with a newline except maybe the last, parse
# it into a list of runs.  Each run is either plain text or an HTML comment,
# tag (opening or closing), or directive.  Return the list of runs.
# If $replaceQuots is true, replace &quot; with " except inside scripts or tags.
sub parseTags($@) {
	my $replaceQuots = shift;
	my @runs;
	my $textRun = "";
	my $nQuots;
	local $_ = "";
	while (1) {
		my $pos = index $_, "<";
		if ($pos == -1) {
			$textRun .= $_;
			$_ = shift || last;
		} else {
			$textRun .= substr $_, 0, $pos;
			$_ = substr $_, $pos;
			if ($textRun ne "") {
				die "> should be &gt; in: ", $textRun if index($textRun, ">") != -1;
				$nQuots += $textRun =~ s/&quot;/"/gs if $replaceQuots;
				push @runs, $textRun;
				$textRun = "";
			}
			
			my $markup;
			while (1) {
				if (($markup) = /^(<(?:![ \t]*--.*?--[ \t]*|\/?[:0-9A-Za-z]+[^<>]*|![0-9A-Za-z\[][^<>]*)>)/s) {
					push @runs, $markup;
					$_ = substr $_, length $markup;
					last;
				} elsif (/^<(?:![ \t]*--|\/?[:0-9A-Za-z]+|![0-9A-Za-z\[])/) {
					$_ .= shift || die "Unterminated tag: $_";
				} else {
					die "Unknown markup: $_";
				}
			}
			
			if ($markup =~ /^<SCRIPT/i) {
				while (($pos = index $_, "</") == -1) {
					$textRun .= $_;
					$_ = shift || die "Unterminated script: ", $textRun, $_;
				}
				$textRun .= substr $_, 0, $pos;
				if ($textRun ne "") {
					die "Script shouldn't begin with a < in: ", $textRun if substr($textRun, 0, 1) eq "<" and substr($textRun, 1, 1) ne "!";
					push @runs, $textRun;
					$textRun = "";
				}
				$_ = substr $_, $pos;
			}
		}
	}
	if ($textRun ne "") {
		die "> should be &gt; in: ", $textRun if index($textRun, ">") != -1;
		$nQuots += $textRun =~ s/&quot;/"/gs if $replaceQuots;
		push @runs, $textRun;
		$textRun = "";
	}
	alertChange "Replaced $nQuots occurrences of &quot; with double quotes" if $nQuots;
	return @runs;
}


# Given an opening or closing tag with attributes, return it as a list consisting of the following:
#   The tag name in upper case (preceded by a '/' if it's a closing tag);
#   All attributes in lower case with contents quoted using double quotes only when necessary.
sub decodeAttributes($) {
	my ($tag) = @_;

	my ($tagName,$args) = $tag =~ /^<(\/?[:0-9A-Za-z]+)([^<>]*?)\s*>$/ or die "Bad attributes: $tag";
	my @result = (uc $tagName);
	while ($args ne "") {
		my ($key, $value, $rest) = $args =~ /^\s+([-:0-9A-Za-z]+)(?:\s*=\s*([-0-9A-Za-z._]+|'[^<>']*'|"[^<>"]*"))?(.*)$/s
			or die "Bad attributes ($args) in: $tag";
		$key = lc $key;
		if (defined $value) {
			if ($value =~ /^'(.*)'$/s) {
				$value = $1;
				$value =~ s/"/&quot;/g;
			}
			elsif ($value =~ /^"(.*)"$/s) {$value = $1;}
			$value = '"'.$value.'"' if $value !~ /^[-0-9A-Za-z]+$/ || $alwaysQuotedAttributes{$key};
			$key .= "=".$value;
		}
		push @result, $key;
		$args = $rest;
	}
	return @result;
}


# Given a list of runs, convert attributes in each tag to a canonical format:
#   Tag names in upper case;
#   Attribute names in lower case;
#   Attribute values quoted with double quotes unless consist only of alphanumerics or _ or -;
#   Attributes separated by one space
# Return the list of runs, which is modified in place.
sub cleanAttributes(@) {
	my $nModifiedTags = 0;

	foreach (@_) {
		if (/^<[\/:0-9A-Za-z]/ && !/^<\/?[:0-9A-Z]+( [-:a-z]+(=([-0-9A-Za-z]+|"[^<>"]*[^-0-9A-Za-z<>"][^<>"]*"))?)*>/) {
			my $newTag = "<" . (join ' ', decodeAttributes($_)) . ">";
			if ($_ ne $newTag) {
				$nModifiedTags++;
				$_ = $newTag;
			}
		}
	}
	alertChange "Reformatted $nModifiedTags tags" if $nModifiedTags;
	return @_;
}


# Given a list of runs, insert all optional closing tags.
# Return the list of runs, which is modified in place.
sub closeTags(\@) {
	my ($runs) = @_;
	my @stack;	# Tags opened but not yet closed
	my $i;
	my %insertedTags;

	my $addClosingTag = sub {
		my ($closingTagName) = @_;
		my $closingTag = "</$closingTagName>";
		if ($i && $$runs[$i-1] =~ /^(.*?)(\s+)$/s) {
			if ($1 eq "") {
				splice @$runs, $i-1, 0, $closingTag;
				$i++;
			} else {
				splice @$runs, $i-1, 1, $1, $closingTag, $2;
				$i += 2;
			}
		} else {
			splice @$runs, $i, 0, $closingTag;
			$i++;
		}
		$insertedTags{$closingTag} = 1;
	};

	for ($i = 0; $i <= $#$runs; $i++) {
		if ($$runs[$i] =~ /^<(\/?)([0-9A-Za-z]+)/) {
			my $isClose = $1;
			my $tagName = $2;
			if ($isClose) {
				while (1) {
					my $prevTag = pop @stack or die "Closing tag without opening tag: ", $$runs[$i];
					last if $prevTag eq $tagName;
					die "Tag $$runs[$i] trying to close $prevTag" unless $selfTerminatingElements{$prevTag};
					$addClosingTag->($prevTag);
				}
				print "  "x@stack, "/$tagName\n" if $printElementHierarchy;
			} else {
				while (@stack) {
					my $allowedChildren = $selfTerminatingElements{$stack[$#stack]};
					last unless $allowedChildren && !$$allowedChildren{$tagName};
					$addClosingTag->(pop @stack);
				}
				print "  "x@stack, $tagName, "\n" if $printElementHierarchy;
				push @stack, $tagName unless $singletonElements{$tagName};
			}
		}
	}
	while (@stack) {
		my $prevTag = pop @stack;
		die "Unclosed tag: ", $prevTag unless $selfTerminatingElements{$prevTag};
		$addClosingTag->($prevTag);
	}
	alertChange "Inserted tags ", join ", ", sort keys %insertedTags if %insertedTags;
	return @$runs;
}


# Given a list of runs, warn about empty elements that do not appear in %possiblyEmptyElements.
# Remove empty elements that appear in %okToRemoveEmptyElements.
sub warnOfEmptyElements(\@) {
	my ($runs) = @_;
	my $i;
	my $currentTag = "";
	my $currentIsAHref = 0;
	my $blank;
	my $line = 1;
	local $_;

	for ($i = 0; $i <= $#$runs; $i++) {
		$_ = $$runs[$i];
		if (/^<(\/?)([0-9A-Za-z]+)/) {
			if ($1) {
				if ($currentTag eq $2 && ($currentIsAHref || !$possiblyEmptyElements{$currentTag})) {
					if (!$blank && ($currentIsAHref || $okToRemoveEmptyElements{$currentTag})) {
						alertChange "Removed empty tag $currentTag on line $line";
						splice @$runs, $i-1, 2;
						$i -= 2;
					} else {
						warning $blank ? "Blank" : "Empty", " tag $currentTag on line $line in $currentPathName";
					}
				}
				$currentTag = "";
				$currentIsAHref = 0;
			} else {
				$currentTag = $2;
				$currentIsAHref = /\shref=/i;
				$blank = 0;
			}
		} elsif (/^\s*$/) {
			$blank = 1;
		} else {
			$currentTag = "";
			$currentIsAHref = 0;
		}
		$line++ while (/\n/g);
	}
	return @$runs;
}


# If the $i-th element of $runs is an opening or closing tag, return a list consisting of:
#   either "" or "/" depending on whether the tag opens or closes;
#   the name of the tag.
# If not, return a list consisting of "?" and "".
sub decodeTag(\@$) {
	my ($runs, $i) = @_;
	if ($i >= 0 && $i <= $#$runs && $$runs[$i] =~ /^<(\/?)([0-9A-Za-z]+)/) {
		return ($1, $2);
	}
	return ("?", "");
}


# Return the index of the element following the $i-th element.  closeTags should have been run so
# that all elements not in %singletonElements have closing tags.  If the $i-th element is the last
# one, then the result will be one past the number of runs.
# If the $i-th element is a closing tag, return -1.
sub nextElement(\@$) {
	my ($runs, $i) = @_;
	die "Internal index error" unless $i >= 0 && $i <= $#$runs;
	return $i+1 if $$runs[$i] !~ /^<(\/?)([0-9A-Za-z]+)/;
	return -1 if $1;

	if (!$singletonElements{$2}) {
		my @stack = ($2);	# Tags opened but not yet closed
		while (@stack) {
			$i++;
			die "Tag scanning overrun" unless $i <= $#$runs;
			if ($$runs[$i] =~ /^<(\/?)([0-9A-Za-z]+)/) {
				if ($1) {
					die "Tag $$runs[$i] trying to close $2" unless $2 eq pop @stack;
				} else {
					push @stack, $2 unless $singletonElements{$2};
				}
			}
		}
	}
	return $i+1;
}


# Given a list of runs, warn about spaces after opening tags or before closing tags as long as
# those tags don't appear in %dontWarnAboutSpacesInside.
# Remove spaces after opening tags or before closing tags that appear in %okToRemoveSpacesInside.
# Remove spaces before or after tags that appear in %okToRemoveSpacesAround.
sub warnOfSpaces(\@) {
	my ($runs) = @_;
	my $i;
	my $prevSlash;
	my $prevTag;
	my $nextSlash;
	my $nextTag;
	my $nonBlank;
	my $line = 1;
	local $_;

	for ($i = 0; $i <= $#$runs; $i++) {
		$_ = $$runs[$i];
		if (/^[ \t]+$/) {
			($prevSlash, $prevTag) = decodeTag @$runs, $i-1;
			($nextSlash, $nextTag) = decodeTag @$runs, $i+1;
			if ($prevSlash eq "" && ($okToRemoveSpacesInside{$prevTag} || $okToRemoveSpacesAround{$prevTag})) {
				alertChange "Removed spaces after tag $$runs[$i-1] on line $line";
				splice @$runs, $i, 1;
				$_ = "";
				$i--;
			} elsif ($nextSlash eq "" ? $okToRemoveSpacesAround{$nextTag} : $okToRemoveSpacesInside{$nextTag}) {
				alertChange "Removed spaces before tag $$runs[$i+1] on line $line";
				splice @$runs, $i, 1;
				$_ = "";
				$i--;
			} elsif ($prevSlash eq "" && !$dontWarnAboutSpacesInside{$prevTag} || $nextSlash eq "/" && !$dontWarnAboutSpacesInside{$nextTag}) {
				warning "Extra spaces on line $line in $currentPathName: '$$runs[$i-1]','$_','$$runs[$i+1]'";
			}
		} else {
			if (($nonBlank) = /^[ \t]+([^ \t].*)$/s) {
				($prevSlash, $prevTag) = decodeTag @$runs, $i-1;
				if ($prevSlash eq "" && ($okToRemoveSpacesInside{$prevTag} || $okToRemoveSpacesAround{$prevTag})) {
					alertChange "Removed spaces after tag $$runs[$i-1] on line $line";
					$$runs[$i] = $nonBlank;
					$_ = $nonBlank;
				} elsif ($prevSlash eq "" && !$dontWarnAboutSpacesInside{$prevTag}) {
					warning "Extra spaces on line $line in $currentPathName: '$$runs[$i-1]','$_'";
				}
			}
			if (($nonBlank) = /^(.*\S)[ \t]+$/s) {
				($nextSlash, $nextTag) = decodeTag @$runs, $i+1;
				if ($nextSlash eq "" ? $okToRemoveSpacesAround{$nextTag} : $okToRemoveSpacesInside{$nextTag}) {
					alertChange "Removed spaces before tag $$runs[$i+1] on line $line";
					$$runs[$i] = $nonBlank;
					$_ = $nonBlank;
				} elsif ($nextSlash eq "/" && !$dontWarnAboutSpacesInside{$nextTag}) {
					warning "Extra spaces on line $line in $currentPathName: '$_','$$runs[$i+1]'";
				}
			}
		}
		$line++ while (/\n/g);
	}
	return @$runs;
}


# Perform a few miscellaneous cleanups on elements between $i and $end, inclusive:
#   Convert <VAR class=nonterminal> to <SPAN class=nonterminal>.
#   Merge SPAN and A elements when one directly contains the other.
#   Merge SUB/SUP elements with immediately contained SPAN elements.
# closeTags and warnOfSpaces should have been run already.
# Return the number of elements added (positive) or removed (negative) between $i and $end.
sub cleanupMiscElements(\@$$);
sub cleanupMiscElements(\@$$) {
	my ($runs, $i, $end) = @_;
	my $delta = 0;

	while ($i <= $end) {
		my $outerTag = $$runs[$i];
		if ($outerTag eq "<VAR class=nonterminal>") {
			my $j = nextElement(@$runs, $i) - 1;
			die "Internal error" unless $$runs[$j] eq "</VAR>";
			$outerTag = "<SPAN class=nonterminal>";
			$$runs[$i] = $outerTag;
			$$runs[$j] = "</SPAN>";
			alertChange "Changed <VAR class=nonterminal> to <SPAN class=nonterminal>";
		}
		if ($outerTag =~ /^<(?:A href="[^<>"]*"|SPAN class=(?:[-0-9A-Za-z._]+|"[^<>"]*")|SU[BP])>$/) {
			my ($tagName) = $outerTag =~ /^<([0-9A-Za-z]+)/;
			my $j = nextElement @$runs, $i+1;
			if ($j >= 0 && $$runs[$j] eq "</$tagName>") {
				my $d = cleanupMiscElements(@$runs, $i+1, $j-1);
				$j += $d;
				$end += $d;
				$delta += $d;
				die "Internal error" unless $$runs[$j] eq "</$tagName>";
				if (nextElement(@$runs, $i+1) == $j) {
					my $innerTag = $$runs[$i+1];
					if ($tagName eq "SPAN") {
						if ($innerTag =~ /^<A href="[^<>"]*">$/) {
							my ($spanClass) = $outerTag =~ /^<SPAN( class=(?:[-0-9A-Za-z._]+|"[^<>"]*"))>$/;
							die "Internal error" unless $$runs[$j-1] eq "</A>";
							$$runs[$i+1] = substr($innerTag, 0, -1) . $spanClass . ">";
							splice @$runs, $j, 1;
							splice @$runs, $i, 1;
							$j -= 2;
							$end -= 2;
							$delta -= 2;
							alertChange "Merged $outerTag with $innerTag";
						}
					} elsif ($innerTag =~ /^<SPAN( class=(?:[-0-9A-Za-z._]+|"[^<>"]*"))>$/) {
						my $spanClass = $1;
						die "Internal error" unless $$runs[$j-1] eq "</SPAN>";
						$$runs[$i] = substr($outerTag, 0, -1) . $spanClass . ">";
						splice @$runs, $j-1, 1;
						splice @$runs, $i+1, 1;
						$j -= 2;
						$end -= 2;
						$delta -= 2;
						alertChange "Merged $outerTag with $innerTag";
					}
				}
				$i = $j;
			}
		}
		$i++;
	}
	return $delta;
}


# Remove the $i-th element, coalescing strings around it if appropriate.  Return the new index of the
# element after the removed element (it may be $i-1 due to coalescing).
sub removeElement(\@$) {
	my ($runs, $i) = @_;
	my $j = nextElement @$runs, $i;
	die "Called removeElement on a closing tag" if $j < 0;

	my $result = $i;
	if ($i > 0 && $j <= $#$runs) {
		my $prev = $$runs[$i-1];
		my $next = $$runs[$j];
		if ($prev !~ /^</ && $next !~ /^</) {
			if ($prev =~ /\n\s*$/ && $next =~ /^\n/) {
				$prev = substr $prev, 0, rindex($prev, "\n");
			}
			$$runs[$i-1] = $prev . $next;
			$j++;
			$result--;
		}
	}
	splice @$runs, $i, $j-$i;
	return $result;
}


# $transformations is a hash table of attribute -> '+' or '-'.  Strip all attributes whose
# hash is '+' from @$runs.  Remove all elements that contain an attribute whose hash is '-'
# from @$runs.  Return @$runs, modified in place.
sub replaceAttributes(\@\%) {
	my ($runs, $transformations) = @_;
	my $nModifiedTags = 0;
	my $nRemovedTags = 0;
	local $_;

	my $i = 0;
	while ($i <= $#$runs) {
		$_ = $$runs[$i];
		if (/^<[:0-9A-Za-z]/) {
			my @tag = decodeAttributes $_;
			my $j = 1;
			my $remove = 0;
			while ($j <= $#tag) {
				my $x = $$transformations{$tag[$j]};
				if ($x) {
					if ($x eq '+') {
						splice @tag, $j, 1;
						next;
					} elsif ($x eq '-') {
						$remove = 1;
						last;
					} else {
						die "Bad transformation '$x' on attribute $j of $_";
					}
				}
				$j++;
			}
			if ($remove) {
				$i = removeElement @$runs, $i;
				$nRemovedTags++;
				next;
			} else {
				my $newTag = "<" . (join ' ', @tag) . ">";
				if ($_ ne $newTag) {
					$nModifiedTags++;
					$$runs[$i] = $newTag;
				}
			}
		}
		$i++;
	}
	alertChange "Removed attributes from $nModifiedTags tags" if $nModifiedTags;
	alertChange "Removed $nRemovedTags tags" if $nRemovedTags;
	return @$runs;
}


sub orderPaths {
	my ($aName, $aDir) = fileparse $a;
	my ($bName, $bDir) = fileparse $b;
	if ($aDir ne $bDir) {
		$aDir =~ s|$sep|\01|go;
		$bDir =~ s|$sep|\01|go;
	}
	return $aDir cmp $bDir
		|| ($indexFiles{$aName} || 0) <=> ($indexFiles{$bName} || 0)
		|| $aName cmp $bName;
}

# Given a list of directories and/or files (which must have proper case, even on case-insensitive
# file systems), return a list of the input HTML files' absolute pathnames.
sub listInputFiles(@) {
	my @dirs = map {pathToAbsolute $_} @_;
	return sort orderPaths findFiles "html", @dirs;
}


# Given a directory or a file (which must have proper case, even on case-insensitive
# file systems), return the file if it was a file or the contained index.html file if the input
# was a directory.  All returned files are absolute pathnames.
sub inputFileRoot($) {
	my ($f) = @_;
	my ($path, $isDir) = testDirectory(pathToAbsolute $f);
	$path .= "index.html" if $isDir;
	return $path;
}


# Given a list of directories and/or files (which must have proper case, even on case-insensitive
# file systems), return a list of the input files or index.html files inside directories.
# All returned files are absolute pathnames.
sub inputFileRoots(@) {
	return map {inputFileRoot $_} @_;
}


# Helper for processInputFiles.  Call $fun on $f.  $roots is the list of roots to be examined next;
# it may be modified to consider other files next.  $files is a hash table of <absolute-path> -> <code>,
# where <code> is one of:
#   0 File has already been processed; don't process it again
#   1 File has not been processed
sub processInputFile($$\@\%) {
	my ($fun, $f, $roots, $files) = @_;
	if (defined $$files{$f}) {
		if ($$files{$f}) {
			$$files{$f} = 0;
			print "# '$f'\n" if $verbose;
			my %omits = ("SUMMARY" => "", "IMPORT" => "");
			my @file = fetchFile $f, %omits;
			my @runs = parseTags 1, @file;
			if (@runs > 0 && $runs[0] =~ /^<!DOCTYPE\s/i) {
				&$fun($f, \@runs, \%omits, $roots);
				if ($changed) {
					updateFile $f, 60, @runs;
				}
			} else {
				warning "File $f ignored because it doesn't start with <!DOCTYPE";
			}
		}
	} else {
		warning "External file $f ignored";
	}
}


# Given a list of directories and/or files (which must have proper case, even on case-insensitive
# file systems), call fun for each HTML file in the list.  fun takes four arguments:
#   the name of the file;
#   a reference to the list of its runs;
#   a reference to a hash of comments whose contents were omitted;
#   a reference to a list of roots, which may be modified to consider more files to be roots.
# If the file has been changed, write it back out to disk.
# If $all is true, consider all HTML files in the given directories to be roots.
# Ignore all files whose absolute pathnames contain any of the strings inside the $omits list.
sub processInputFiles(&$$@) {
	my $fun = shift;
	my $all = shift;
	my $omits = shift;
	warning "Nothing to do" unless @_;
	my @files = listInputFiles @_;
	if (@$omits) {
		my $r = join "|", @$omits;
		print "Omitting /$r/\n";
		@files = grep !/$r/, @files;
	}
	my %files = listToHash @files;
	my @roots = $all ? @files : inputFileRoots(@_);
	print "Roots are:\n", join("\n    ", @roots), "\n";

	while (@roots) {
		my $f = shift @roots;
		processInputFile $fun, $f, @roots, %files;
	}
	foreach (@files) {
		push @roots, $_ if $files{$_};
	}
	if (@roots) {
		warning "The following files are not reachable from the root:";
		foreach (@roots) {
			print STDERR "*** '$_'\n";
		}
		while (@roots) {
			my $f = shift @roots;
			processInputFile $fun, $f, @roots, %files;
		}
	}
}

1;
