#!/tools/ns/bin/perl
#
# Author: Tao Cheng <tao@netscape.com>
# Date  : May 20, '99
#
require 'getopts.pl';
#
# Usage: $progname [ xulORrdf | directory] [filename | directory]*
#
#
sub usage {
    die
"\n::\n",
"\n",
"  Usage: $progname [-h] xulORrdf | directory \n",
"\n",
"    $progname takes one or more filenames or directories as input.\n",
"    arguments. It moves entities in \'xulORrdf\' into a DTD file\n",
"    in the same directory \'xulORrdf\' resides.\n",
"\n",
"    If \'xulORrdf\' is a XUL file, the generated DTD file will be\n",
"    named \'xulORrdf\.dtd\'. If \'xulORrdf\' is a RDF file, it will\n",
"    be named \'xulORrdf\-rdf\.dtd\'. All original files are renamed\n",
"    as \'xulORrdf\.org\' and \'xulORrdf-rdf.org\' respectively.\n",
"\n",
"    $progname enters a given directory and its sub-directories\n",
"    to process all *.xul and *.rdf files encountered.\n",
"\n",
"  Options:\n",
"      -h                 Print help (this message)\n",
"\n::\n",
"\n";
}

#
# extract entities to dtd
#
sub mvEntity2DTD
{
	$dotxul = rindex($_[0], ".xul");
	$dotrdf = rindex($_[0], ".rdf");
	#
	if ($dotxul >= $[ ) {
		$dot = $dotxul;
	}
	elsif ($dotrdf >= $[ ) {
		$dot = $dotrdf;
	}
	else {
		print "\n\n *** $_[0] is not XUL/RDF; return...\n";
		return -1;
	}

	$leftStr = substr($_[0], $[, $dot);	

	if ($dotxul >= $[ ) {
		$orgfile = $leftStr . ".org";
	}
	else {
		$orgfile = $leftStr . "-rdf.org";
	}
	print " --> The orginal file will be renamed to: $orgfile \n";
	print " --> The new file without entities      : $_[0] \n";
	#
	$mainfile = $leftStr . ".main";

	print "\n\n --> Opening $_[0] ...\n";
	open (INFILE, $_[0]);
    #
	open (MAINFILE, "> $mainfile");
	#
	$line = 0;
	$InDocType = 0;
	$InDTDBlock = 0;
	$InEntity = 0;
	$InComment = 0;
	$write2dtd = 0;
	$docname = "";
	$docNdtd = "";
	$leavingDocType = 0;
    #
	while ( <INFILE> ) {
		if (/\<\!\-\-/) {
			$InComment = 1;
		}
		if (/\-\-\>/) {
			if ($InComment == 1) {
				$InComment = 0;
			}
		}
		# look for DOCTYPE
		if (/^\<\!DOCTYPE/) {
			if ($InDocType == 0) {
				$InDocType = 1;
				$pos = index($_,"\n");
				$aline = substr($_, 0, $pos);
				# strip out doc name
				@tokens = split(/ /, $aline);
				$docname = $tokens[1];
				$docname =~ s/[\n\r\>]//;

				# get the basename
				my ($mfile) = $_[0] =~ /([^\/]+)$/;
				@shortnames = split(/\./, $mfile);
				if ($dotxul >= $[ ) {
					$docNdtd = 
						"<!DOCTYPE $docname SYSTEM \"chrome://l10n/locale/$shortnames[0].dtd\" >\n";
				}
				else {
					$docNdtd = 
						"<!DOCTYPE $docname SYSTEM \"chrome://l10n/locale/$shortnames[0]-rdf.dtd\" >\n";
				}

			}
		}
		if (/\<\!ENTITY/) {
			if (($InDTDBlock == 1) && 
				($InEntity == 0)) {
                # enter entity
				$InEntity = 1;
			}
		}
		if (/\[/) {
            # enter
			if (($InEntity == 0) &&
				($InDocType == 1) &&
				($InDTDBlock == 0)) {
				$InDTDBlock = 1;
			}
		}
		if (/\]/) {
            # leave
			if (($InEntity == 0) &&
				($InDTDBlock == 1)) {
				$InDTDBlock = 0;
			}
		}
		if (($InComment == 0) && 
			(/\>/)) {
			if ($InEntity == 1) {
                # leave entity
				$InEntity = 0;
			}
			elsif ($InDocType == 1) {
                # leave 
				if ($docNdtd) {
					$docNdtd = "" ;
				}
				$InDocType = 0;
				$leavingDocType = 1;
			}
		}
		#
        # producing main and dtd file
        # 
		if ($InDTDBlock == 1) {
			if ($write2dtd == 0) {
				$write2dtd = 1;
				
				if ($dotxul >= $[ ) {
					$dtdfile = $leftStr . ".dtd";
				}
				else {
					$dtdfile = $leftStr . "-rdf.dtd";
				}
				print "\n --> producing $dtdfile";
				print "\n --> Entities will be moved to  : $dtdfile \n";
				open (DTDFILE,  "> $dtdfile");
				print DTDFILE "<!-- extracted from $_[0] -->\n\n" ;
			}
			else {
				print DTDFILE $_ ;
			}
		}
		else {
			if ($write2dtd == 1) {
				$write2dtd = 0;
				print "\n --> Entities have been moved to: $dtdfile \n";
				close (DTDFILE);
			}
			else {
				if ($docNdtd) {
					print MAINFILE $docNdtd;
					$docNdtd = "" ;
				}
				elsif ($leavingDocType == 1) {
					$leavingDocType = 0;
				}
				else {
					print MAINFILE $_ ;
				}
			}
		}
		++$line;
		
	}
    # while

	# close them
	close (INFILE);
	close (MAINFILE);
	#
	# backup the file and put the new one in place
	print " --> renaming $_[0] to $orgfile ... \n";
	rename($_[0], $orgfile);
	print " --> renaming $mainfile to $_[0] ...\n";
	rename($mainfile, $_[0]);
	print " --> mvEntity2DTD DONE !!\n\n"
}
#
# return: 1: success; otherwise, failed
#
sub listDir {

	my $localdir = $_[0];
	my $suffix = $_[1];
	my (@all, @files, @dirs, $newdir);

	#check if it is a directory first
	(-f $localdir)
		&& (&mvEntity2DTD("$localdir"))
		&& (return 1);

	(-d $localdir) 
		|| ((print "\n **$localdir is not a directory**\n") 
			&& (return -1));

	#
	opendir(DIR, $localdir)
		|| (print "\n **can't open $localdir??**\n") && return 0;

    @all = readdir(DIR);
	closedir(DIR);

    @files = grep { -f "$localdir/$_" } @all;
    @dirs  = grep { -d "$localdir/$_" } @all;

	#
	#----- work on files first -----
	#
	my @xuls = 	grep /\.xul$/, @files;
	my ($file, $dtdfile);
	foreach $file (@xuls) {
		$dtdfile = $file;
		$dtdfile =~ s/\.xul$/\.dtd/;
		print "\n >>> looking for $dtdfile...";
		if (-e "$localdir/$dtdfile") {
			print "\n +++ $dtdfile: found ...\n";			
		}
		else {
			print "\n --- $dtdfile: NOT found; produce one...";			
			# produce one
			&mvEntity2DTD("$localdir/$file");
		}
	}
	#
	#----- work on rdf files first -----
	#
	my @rdfs = 	grep /\.rdf$/, @files;
	foreach $file (@rdfs) {
		$dtdfile = $file;
		$dtdfile =~ s/\.rdf$/rdf\-\.dtd/;
		print "\n >>> looking for $dtdfile...";
		if (-e "$localdir/$dtdfile") {
			print "\n +++ $dtdfile: found ...\n";			
		}
		else {
			print "\n --- $dtdfile: NOT found; produce one...";			
			# produce one
			&mvEntity2DTD("$localdir/$file");
		}
	}
	#
	#----- work on dirs -----
	#
	my $mydir;
	foreach $mydir (@dirs) {
		if (!($mydir eq "." || $mydir eq "..")) {

			$newdir = "$localdir/$mydir";
			&listDir($newdir);
		}
	}
	print "\n leaving: $localdir\n";
	return 1;
}

#--------------------------------------------------------------------------
#  main body
#--------------------------------------------------------------------------
@sortedARGV = (sort @ARGV);
#
# Extract base part of this script's name
($progname) = $0 =~ /([^\/]+)$/;
#
&usage if (!&Getopts('h'));
&usage if ($opt_h);		# help option
#
foreach $arg (@sortedARGV) {
	!(&listDir($arg))
		&& print "\n ** listDir($arg) failed!**\n";
}

print "\n";

