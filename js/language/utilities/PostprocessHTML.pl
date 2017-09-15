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
#
# PostProcessHTML [-p] [-n] [-stylebase dir] [-omit str] [-jstoes] dir ... dir
#
# If -p is given, print progress information.
# If -n is given, don't write the files.
# If -stylebase is given, ensure that references to "styles.css", "unicodeCompatibility.js", and "arrows/....gif"
#   go to the given directory.
# If -omit str is given, don't process any files whose pathnames contain str.  This option may be given multiple times.
# If -jstoes is given, rename references to JavaScript to references to ECMAScript when processing imports.
# If dir's are given, postprocess all html files in the given directories (including subdirectories).
# dir's may be files.
#

use 5.004;
use strict;
use diagnostics;
use File::Basename;
use Getopt::Long;
use POSIX;
use GeneralUtilities;
use HTMLUtilities;


# Update the modification dates based on the given date
sub updateModDate($$@) {
	my $newModDate = shift;
	my $nDatesExpected = shift;
	my $newDateString = formatDate localtime $newModDate;
	my $nDatesFound = 0;
	my $nDatesChanged = 0;
	foreach (@_) {
		if ((/^<ADDRESS[>\s]/i ... /^<\/ADDRESS>/i) ||
			(/^<P\s.*class\s*=\s*['"]?mod-date['"]?[>\s]/si ... /^<\/P>/i)) {
			if (substr($_, 0, 1) ne "<" &&
				/\b([A-Za-z]+day,\s+[A-Za-z]+\s+\d{1,2},\s+\d{4})\b/i) {
				$nDatesFound++;
				if ($1 ne $newDateString) {
					s/[A-Za-z]+day,\s+[A-Za-z]+\s+\d{1,2},\s+\d{4}/$newDateString/i;
					$nDatesChanged++;
				}
			}
		}
	}
	warning "Found $nDatesFound dates and expected $nDatesExpected in $currentPathName" if $nDatesFound != $nDatesExpected;
	alertChange "Updated $nDatesChanged dates to $newDateString" if $nDatesChanged;
	return @_;
}


my %prevLinks;  #<full-pathname> -> <full-pathname> of previous page
my %nextLinks;  #<full-pathname> -> <full-pathname> of next page
my %startLinks; #<full-pathname> -> <full-pathname> of contents and start page
my %upLinks;    #<full-pathname> -> <full-pathname> of referring page

my %linkKinds = (
	"Lprev" => \%prevLinks,
	"Lnext" => \%nextLinks,
	"Lstart" => \%startLinks,
	"Lcontents" => \%startLinks,
	"Aleft" => \%prevLinks,
	"Aright" => \%nextLinks,
	"Aup" => \%upLinks);

my %linkMultiples = (
	"Lprev" => 1,
	"Lnext" => 1,
	"Lstart" => 1,
	"Lcontents" => 1,
	"Aleft" => 2,
	"Aright" => 2,
	"Aup" => 2);


# Look up the link of the given kind from the given pathname.  Return the relative link
# as a unix-style relative path or undefined if there is no link given.
sub lookupLink($$) {
	my ($linkKind, $pathName) = @_;
	my $dstPathName = $linkKinds{$linkKind}{$pathName};
	return undef if !defined $dstPathName;
	return pathDifference $pathName, $dstPathName;
}



# Given a list of runs of an index file, update the %prevLinks, %nextLinks, %startLinks and
# %upLinks hash tables based on the file's contents between the CONTENTS and /CONTENTS
# or DOWN and /DOWN HTML comments.  Also push all references to the front of the $roots list.
sub readTableOfContents($$@) {
	my $pathName = shift;
	my $roots = shift;

	my $prev = $pathName;
	foreach (@_) {
		if (/^<!--\s*CONTENTS\s*-->/ ... /^<!--\s*\/CONTENTS\s*-->/) {
			if (/^<A\s+href="([^"<>\/][^"<>]*\.html)">$/) {
				my $ref = pathSum $pathName, $1;
				print "# CONTENTS: $ref\n" if $verbose;
				unshift @$roots, $ref;
				if (defined $prev) {
					updateHash %nextLinks, $prev, $ref;
					updateHash %prevLinks, $ref, $prev;
					updateHash %startLinks, $ref, $pathName;
					updateHash %upLinks, $ref, $pathName;
				}
				$prev = $ref;
			}
		}
		if (/^<!--\s*DOWN\s*-->/ ... /^<!--\s*\/DOWN\s*-->/) {
			if (/^<A\s+href="([^"<>\/][^"<>]*\.html)">$/) {
				my $ref = pathSum $pathName, $1;
				print "# DOWN: $ref\n" if $verbose;
				unshift @$roots, $ref;
				updateHash %upLinks, $ref, $pathName;
			}
		}
	}
	return @_;
}


# Update a file's links and arrow-image anchors based on the %prevLinks, %nextLinks, %startLinks and
# %upLinks values.
sub updateLinks($@) {
	my $pathName = shift;
	if ($pathName !~ /-old\.html$/) {
		my $nLinks = 0;
	
		foreach (@_) {
			if (my ($pre, $linkKind, $href, $post) = /^(<LINK\s+rel=['"]?(Start|Contents|Prev|Next)['"]?\s+href=")([^"<>]*)("[>\s].*)$/is) {
				$nLinks++;
				$linkKind = lc $linkKind;
				my $newHRef = lookupLink "L".$linkKind, $pathName;
				if (!defined $newHRef) {
					warning "No $linkKind link specified from $pathName";
				} elsif ($newHRef ne $href) {
					$_ = $pre . $newHRef . $post;
					alertChange "Updated $linkKind link from \"$href\" to \"$newHRef\"";
				}
			}
			last if $_ eq "<BODY>";
		}
		
		my $i = 0;
		my $limit = scalar(@_) - 2;
		while ($i < $limit) {
			if (my ($pre, $href, $post) = $_[$i] =~ /^(<A\s+href=")([^"<>]*)("[>\s].*)$/is and
				my ($arrowKind) = $_[$i+1] =~ /^<IMG\s+src="[^"<>]*arrows\/([^"<>\/]*)\.gif"/is and
				uc $_[$i+2] eq "</A>") {
				$nLinks++;
				my $newHRef = lookupLink "A".$arrowKind, $pathName;
				if (!defined $newHRef) {
					warning "No $arrowKind arrow link specified from $pathName";
				} elsif ($newHRef ne $href) {
					$_[$i] = $pre . $newHRef . $post;
					alertChange "Updated $arrowKind arrow link from \"$href\" to \"$newHRef\"";
				}
			}
			$i++;
		}
	
		my $nLinksExpected = 0;
		while (my ($linkKind, $links) = each %linkKinds) {
			$nLinksExpected += $linkMultiples{$linkKind} if defined $$links{$pathName};
		}
	
		warning "Expected $nLinksExpected and found $nLinks links in $pathName" if $nLinks != $nLinksExpected;
	}
	return @_;
}


# Update a file's style and arrow-image links to point to entries in the $styleDirectory directory.
sub updateStyleLinks($$@) {
	my $pathName = shift;
	my $styleDirectory = shift;

	foreach (@_) {
		my ($pre, $href, $hrefFile, $post);
		if (($pre, $href, $hrefFile, $post) = /^(<LINK\s.*href=")((?:[^"<>]*\/)?([^"<>\/]+))("[>\s].*)$/is) {
			if ($hrefFile eq "styles.css") {
				my $newHRef = pathDifference $pathName, $styleDirectory . $hrefFile;
				if ($newHRef ne $href) {
					$_ = $pre . $newHRef . $post;
					alertChange "Updated link from \"$href\" to \"$newHRef\"";
				}
			} else {
				warning "Local style sheet reference in $_" if $hrefFile !~ /\.html$/;
			}
		}
		if (($pre, $href, $hrefFile, $post) = /^(<SCRIPT\s.*src=")((?:[^"<>]*\/)?([^"<>\/]+))("[>\s].*)$/is) {
			if ($hrefFile eq "unicodeCompatibility.js") {
				my $newHRef = pathDifference $pathName, $styleDirectory . $hrefFile;
				if ($newHRef ne $href) {
					$_ = $pre . $newHRef . $post;
					alertChange "Updated script reference from \"$href\" to \"$newHRef\"";
				}
			} else {
				warning "Local script reference in $_";
			}
		}
		if (($pre, $href, $hrefFile, $post) = /^(<IMG\s.*src=")((?:[^"<>]*\/)?arrows\/([^"<>\/]+))("[>\s].*)$/is) {
			my $newHRef = pathDifference($pathName, $styleDirectory . "arrows") . "/" . $hrefFile;
			if ($newHRef ne $href) {
				$_ = $pre . $newHRef . $post;
				alertChange "Updated image reference from \"$href\" to \"$newHRef\"";
			}
		}
	}
	return @_;
}


my %noWrapDirectories; # Hash table of directory -> list of files to not be wrapped in that directory

# Record the file in %noWrapDirectories if it contains any LINK, SCRIPT, STYLE, or META in its head section.
sub recordNoWrap($@) {
	my $pathName = shift;
	if ($pathName !~ /-old\.html$/) {
		foreach (@_) {
			if (/^<(LINK|SCRIPT|STYLE|META)[>\s]/is) {
				my ($srcName, $srcPath) = fileparse $pathName;
				push @{$noWrapDirectories{$srcPath}}, $srcName;
				last;
			}
			last if $_ eq "<BODY>";
		}
	}
	return @_;
}


# Return the NOWRAP file in the given directory as a list.  Return the empty list if there
# is no NOWRAP file there.  Also initialize $changed and $currentPathName.
sub readNoWrap($) {
	my ($path) = @_;

	$changed = 0;
	$currentPathName = $path . "NOWRAP";
	return () unless -f $currentPathName;
	open NOWRAPFILE, "<".$currentPathName or die $^E;
	my @noWrapFiles;
	while (<NOWRAPFILE>) {
		if (/^\s*([^:\/\n\r]+)\s*$/) {
			push @noWrapFiles, $1;
		} else {
			die "Bad NOWRAP line: $_";
		}
	}
	close NOWRAPFILE or die $^E;
	return @noWrapFiles;
}


# Ensure that all entries in %noWrapDirectories are present in NOWRAP files.  Update the NOWRAP files
# as appropriate.
sub processNoWrapRequests() {
	while (my ($path, $requiredNoWrapFiles) = each %noWrapDirectories) {
		# print "$path:  ", join(", ", @$requiredNoWrapFiles), "\n";
		my @oldNoWrapFiles = readNoWrap($path);
		my %newNoWrapFiles = listToHash @oldNoWrapFiles;
		foreach (@oldNoWrapFiles) {
			unless (-f $path.$_) {
				alertChange "Removed $_";
				delete $newNoWrapFiles{$_};
			}
		}
		foreach (@$requiredNoWrapFiles) {
			unless ($newNoWrapFiles{$_}) {
				$newNoWrapFiles{$_} = 1;
				alertChange "Added $_";
			}
		}
		my @newNoWrapFiles = sort keys %newNoWrapFiles;
		alertChange "Sorted files" unless $changed || arrayEq @oldNoWrapFiles, @newNoWrapFiles;
		if ($changed) {
			if ($noSet) {
				print STDERR "***** File $currentPathName not written due to -n\n";
			} else {
				backUpFile $currentPathName if -f $currentPathName;
				open DSTFILE, ">".$currentPathName or die $^E;
				foreach (@newNoWrapFiles) {
					print DSTFILE $_, "\n";
				}
				close DSTFILE or die $^E;
			}
		}
	}
}


# Change <SPAN class=symbol>b</SPAN> to <SCRIPT type="text/javascript">document.write(U_beta)</SCRIPT>
# for each greek letter.
my %greek = (
	"a" => "alpha",
	"b" => "beta",
	"c" => "chi",
	"d" => "delta",
	"e" => "epsilon",
	"f" => "phi",
	"g" => "gamma",
	"h" => "eta",
	"i" => "iota",
	"k" => "kappa",
	"l" => "lambda",
	"m" => "mu",
	"n" => "nu",
	"o" => "omicron",
	"p" => "pi",
	"q" => "theta",
	"r" => "rho",
	"s" => "sigma",
	"t" => "tau",
	"u" => "upsilon",
	"w" => "omega",
	"x" => "xi",
	"y" => "psi",
	"z" => "zeta");

sub fixGreek(\@) {
	my ($runs) = @_;
	my $i;

	for ($i = 0; $i <= $#$runs-2; $i++) {
		if ($$runs[$i] eq "<SPAN class=symbol>" && defined($greek{$$runs[$i+1]}) && $$runs[$i+2] eq "</SPAN>") {
			$$runs[$i] = "<SCRIPT type=\"text/javascript\">";
			$$runs[$i+1] = "document.write(U_" . $greek{$$runs[$i+1]} . ")";
			$$runs[$i+2] = "</SCRIPT>";
			alertChange "Changed greek letter to " . $$runs[$i+1];
		}
	}
}


# Given a list of runs, return two integers: the location of the first run after the end of the
# <P class=mod-date> element, and the location of the last <HR> element.  Either integer is -1
# if not found.
sub importBoundaries($\@) {
	my ($f, $runs) = @_;

	my $firstP = 0;
	$firstP++ while $firstP <= $#$runs && $$runs[$firstP] ne "<P class=mod-date>";
	if ($firstP > $#$runs) {
		warning "Missing <P class=mod-date> in $f";
		$firstP = -1;
	} else {
		$firstP = nextElement @$runs, $firstP;
	}

	my $lastHR = $#$runs;
	$lastHR-- while $lastHR >= 0 && $$runs[$lastHR] ne "<HR>";
	if ($lastHR < 0 || $lastHR < $firstP) {
		warning "Missing <HR> in $f";
		$lastHR = 0;
	}
	return ($firstP, $lastHR);
}


# Remove the file's contents and replace them with a template for an IMPORT comment.
sub createImportTemplate($$\@) {
	my ($f, $baseDirectory, $runs) = @_;

	my ($firstP, $lastHR) = importBoundaries $f, @$runs;
	if ($firstP >= 0 && $lastHR >= 0) {
		my $relPath = pathDifference $baseDirectory."base", $f;
		splice @$runs, $firstP, $lastHR - $firstP, "\n\n", "<!--IMPORT \"$relPath\" IMPORTARGS-->", "\n", "<!--/IMPORT-->", "\n\n";
		alertChange "Created <!--IMPORT \"$relPath\" IMPORTARGS-->";
	}
}


my $createImportTemplates;
my $styleDirectory;
my %pendingImports;		#<full-pathname> -> \(<full-pathname> of imported page, transformation, ..., transformation)
my %pendingSummaries;	#<full-pathname> -> <full-pathname> of summary page

# Process the input file with the given name and contents.
sub processInputFile {
	my ($f, $runs, $omits, $roots) = @_;
	my $summaryComment = $$omits{"SUMMARY"};
	if ($summaryComment) {
		my ($target) = $summaryComment =~ /^SUMMARY\s+"([^"]+)"\s*$/ or die "Bad SUMMARY comment: $summaryComment";
		$pendingSummaries{$f} = pathSum $f, $target;
	}
	my $importComment = $$omits{"IMPORT"};
	if ($importComment) {
		my ($target, $transformations) = $importComment =~ /^IMPORT\s+"([^"]+)"((?:\s+[-+][-=0-9A-Za-z._]+)+)\s*$/ or die "Bad IMPORT comment: $importComment";
		my @a = split " ", $transformations;
		unshift @a, pathSum($f, $target);
		$pendingImports{$f} = \@a;
		# print "pendingImports{$f} = <", join(';', @{$pendingImports{$f}}), ">\n";
	}
	cleanAttributes @$runs;
	closeTags @$runs;
	warnOfEmptyElements @$runs;
	warnOfSpaces @$runs;
	cleanupMiscElements @$runs, 0, $#$runs;
	# fixGreek @$runs;
	recordNoWrap $f, @$runs;
	readTableOfContents $f, $roots, @$runs if $indexFiles{basename $f};
	updateModDate fileModDate($f), $summaryComment ? 1 : 2, @$runs;
	updateLinks $f, @$runs;
	updateStyleLinks $f, $styleDirectory, @$runs if defined $styleDirectory;
	createImportTemplate $f, $styleDirectory, @$runs if $createImportTemplates;
}


# $root must be an absolute path to a directory ending with a directory separator character.
# $path must be an absolute path to a file contained, directly or indirectly, in that directory.
# Return a string consisting of the relative path from $root to $path with directory separators
# replaced by underscores and with the file suffix dropped.
sub pathToRelativeId($$) {
	my ($root, $path) = @_;
	local $_ = $path;
	die "File '$path' is not in '$root'" if index $_, $root, 0;
	$_ = substr $_, length $root;
	s/$sep/_/go;
	s/\..*$//;
	return $_;
}


# Read a file and make sure that it has the given HTML comment.  Strip out the lines between that comment
# and its closing counterpart.  Return the list of runs.
sub fetchFileWithComment($$) {
	my ($summaryFile, $commentName) = @_;
	my %omits = ($commentName => "");
	my @file = fetchFile $summaryFile, %omits;
	die "Missing <!--$commentName ...-->" unless $omits{$commentName};
	return parseTags 1, @file;
}


# Replace the contents between the given HTML comment and its closing counterpart in $outerRuns with $innerRuns.
# Modify $outerRuns in place.  Set the $changed flag if the substitution changed $outerRuns.
sub replaceCommentContents($\@\@) {
	my ($commentName, $outerRuns, $innerRuns) = @_;

	my $i = 0;
	while (1) {
		die "Can't find <!--$commentName ...-->" if $i > $#$outerRuns;
		last if $$outerRuns[$i] =~ /^<!--([0-9A-Za-z]+)/ && $1 eq $commentName;
		$i++;
	}
	$i++;
	my $j = $i;
	while (1) {
		die "Can't find <!--$commentName ...-->" if $j > $#$outerRuns;
		last if $$outerRuns[$j] =~ /^<!--\/([0-9A-Za-z]+)/ && $1 eq $commentName;
		$j++;
	}
	if (!arraySliceEq(@$outerRuns, $i, $j, @$innerRuns, 0, scalar @$innerRuns)) {
		splice @$outerRuns, $i, $j-$i, @$innerRuns;
		alertChange "Replaced <!--$commentName ...--> contents";
	}
	return @$outerRuns;
}


my $jsToEs;

# Rename the following phrases outside tags and not between <!--NORENAME--> and <!--/NORENAME--> HTML comments:
#	a JavaScript 1.5	==> an ECMAScript 3
#	a JavaScript 1.5	==> An ECMAScript 3
#	a JavaScript 2.0	==> an ECMAScript 4
#	a JavaScript 2.0	==> An ECMAScript 4
#	a JavaScript		==> an ECMAScript
#	a JavaScript		==> An ECMAScript
#	JavaScript 1.5		==> ECMAScript 3
#	JavaScript 2.0		==> ECMAScript 4
#	JavaScript			==> ECMAScript
sub renameJsToEs(\@) {
	my ($runs) = @_;
	my $enable = 1;
	my $nRenames = 0;

	foreach (@$runs) {
		if ($_ eq "<!--NORENAME-->") {
			warning "Duplicate <!--NORENAME-->" unless $enable;
			$enable = 0;
		} elsif ($_ eq "<!--/NORENAME-->") {
			warning "Duplicate <!--/NORENAME-->" if $enable;
			$enable = 1;
		} elsif ($enable) {
			$nRenames += s/\b([aA])(\s+)JavaScript(\s+|&nbsp;)1\.5\b/$1n$2ECMAScript${3}3/g;
			$nRenames += s/\b([aA])(\s+)JavaScript(\s+|&nbsp;)2\.0\b/$1n$2ECMAScript${3}4/g;
			$nRenames += s/\b([aA])(\s+)JavaScript\b/$1n$2ECMAScript/g;
			$nRenames += s/\bJavaScript(\s+|&nbsp;)1\.5\b/ECMAScript${1}3/g;
			$nRenames += s/\bJavaScript(\s+|&nbsp;)2\.0\b/ECMAScript${1}4/g;
			$nRenames += s/\bJavaScript\b/ECMAScript/g;
		}
	}
	warning "Missing <!--/NORENAME-->" unless $enable;
	alertChange "Renamed 'JavaScript' etc. to 'ECMAScript' etc. $nRenames times" if $nRenames;
}


# Import the file specified as the first element of @$importData between the <!--IMPORT ...--> and <!--/IMPORT-->
# comments insode $f.  Use the transformations specified in the rest of @$importData, which should be a list of
# strings, each starting with either '-' (strip HTML elements whose class is the rest of this string) or
# '+' (remove class from HTML elements whose class is the rest of this string).
sub importFile($$) {
	my ($f, $importData) = @_;
	my @importTransformations = @$importData;
	my $importedFile = shift @importTransformations;
	my %importTransformations;

	print "# Importing '$importedFile' into '$f' using" if $verbose;
	foreach (@importTransformations) {
		my $key = substr $_, 0, 1;
		my $data = substr $_, 1;
		die "Bad IMPORT specification: $_" unless $key eq '+' || $key eq '-';
		die "Redundant IMPORT specification: $_" if $importTransformations{$data};
		$importTransformations{$data} = $key;
		print " $key:$data" if $verbose;
	}
	print "\n" if $verbose;

	my %omits = ();
	my @outerRuns = parseTags 1, fetchFile($f, %omits);
	my $oldDate = fileModDate $f;

	my $importedFileDate = fileModDate $importedFile;
	my @innerRuns = parseTags 0, fetchFile $importedFile;
	$currentPathName = $f;
	$changed = 1;
	cleanAttributes @innerRuns;
	closeTags @innerRuns;

	my ($firstP, $lastHR) = importBoundaries $importedFile, @innerRuns;
	splice @innerRuns, $lastHR if $lastHR >= 0;
	splice @innerRuns, 0, $firstP if $firstP >= 0;
	replaceAttributes @innerRuns, %importTransformations;
	renameJsToEs @innerRuns if $jsToEs;

	$changed = 0;
	replaceCommentContents "IMPORT", @outerRuns, @innerRuns;

	my $newDate = $oldDate;
	$newDate = $importedFileDate if $changed && $newDate < $importedFileDate;
	updateModDate $newDate, 2, @outerRuns;

	updateFile $f, $newDate - $oldDate, @outerRuns if $changed;
}


# Summarize files starting from the given root into summarizeFile.
sub summarizeFile($$) {
	my ($summaryRoot, $summaryFile) = @_;
	local $_;

	print "#\n# Summarizing '$summaryRoot' into '$summaryFile':\n" if $verbose;
	my $summaryRootDirectory = (fileparse $summaryRoot)[1];
	my @outerRuns = fetchFileWithComment $summaryFile, "SUMMARY";
	my @innerRuns = ("\n");
	my $oldSummaryDate = fileModDate $summaryFile;
	my $newSummaryDate = $oldSummaryDate;

	# Accumulate a hash indexed by all files to be summarized in %summaryFiles.
	my %summaryFiles;
	my $f = $summaryRoot;
	while (defined $f) {
		$summaryFiles{$f} = 1;
		$f = $nextLinks{$f};
	}

	$f = $summaryRoot;
	while (defined $f) {
		print "#   '$f'\n" if $verbose;
		my $modDate = fileModDate $f;
		$newSummaryDate = $modDate if $newSummaryDate < $modDate;
		my @runs = parseTags 0, fetchFile $f;
		my $id = pathToRelativeId $summaryRootDirectory, $f;
		push @innerRuns, "\n<HR>\n<A name=\"$id\"></A>\n";

		my $lastHR = $#runs;
		$lastHR-- while $lastHR >= 0 && $runs[$lastHR] ne "<HR>";
		if ($lastHR < 0) {
			warning "Missing <HR> in $f";
		} else {
			my $seenBody = 0;
			for (my $i = 0; $i != $lastHR; $i++) {
				$_ = $runs[$i];
				if (!$seenBody) {
					$seenBody = 1 if /^<BODY>$/i;
				} else {
					my ($pre, $href, $post, $loc, $fragment);
					if (($pre, $href, $post) = /^(<A\s+href=")([^":<>\/][^":<>]*)("[>\s].*)$/is) {
						($loc, $fragment) = split(/#/, $href);
						my $target = pathSum $f, $loc;
						if (defined $summaryFiles{$target}) {
							$href = "#" . pathToRelativeId($summaryRootDirectory, $target);
							$href .= "_$fragment" if defined $fragment;
						} else {
							print "#   Outbound link: '$href' => " if $verbose;
							$href = pathDifference $summaryFile, $target;
							$href .= "#$fragment" if defined $fragment;
							print "'$href'\n" if $verbose;
						}
						$_ = $pre . $href . $post;
					} elsif (($pre, $href, $post) = /^(<IMG\s+src=")([^":<>\/#][^":<>#]*)("[>\s].*)$/is) {
						$href = pathDifference $summaryFile, pathSum($f, $href);
						$_ = $pre . $href . $post;
					} elsif (($pre, $fragment, $post) = /^(<A\s+name=")([^"#<>\/]+)("[>\s].*)$/is) {
						$fragment = pathToRelativeId($summaryRootDirectory, $f) . "_$fragment";
						$_ = $pre . $fragment . $post;
					} elsif ($_ eq "<!--NOSUMMARY-->") {
						do {
							$i++;
							die "No matching <!--/NOSUMMARY-->" if ($i == $lastHR);
						} while ($runs[$i] ne "<!--/NOSUMMARY-->");
						next;
					} elsif (/^<!--SUMMARYONLY\s+(.*\S)\s*-->$/s) {
						$_ = $1;
					}
					push @innerRuns, $_;
				}
			}
		}
		$f = $nextLinks{$f};
	}
	push @innerRuns, "\n";

	$currentPathName = $summaryFile;
	$changed = 1;
	updateModDate $newSummaryDate, 1, @outerRuns;
	replaceCommentContents "SUMMARY", @outerRuns, @innerRuns;
	updateFile $summaryFile, $newSummaryDate - $oldSummaryDate + 60, @outerRuns;
}


my $noImport;
my @omits;

GetOptions("p" => \$verbose, "n" => \$noSet, "stylebase=s" => \$styleDirectory, "omit=s@" => \@omits, "noImport" => \$noImport,
		   "createImportTemplates" => \$createImportTemplates, "jstoes" => \$jsToEs);

$styleDirectory = addDirectorySuffix pathToAbsolute $styleDirectory if defined $styleDirectory;
processInputFiles \&processInputFile, 0, \@omits, @ARGV;
unless ($noImport) {
	while (my ($importingFile, $importData) = each %pendingImports) {
		importFile($importingFile, $importData);
	}
}
while (my ($summaryFile, $summaryRoot) = each %pendingSummaries) {
	summarizeFile($summaryRoot, $summaryFile);
}
processNoWrapRequests;
print STDERR "\n***** $nWarnings warnings\n" if $nWarnings;

1;
