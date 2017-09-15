#!/usr/bin/perl
#
# Author: Tao Cheng <tao@netscape.com>
# Date  : Aug 12, '99
#
# purpose: checkin localized DTD files into the tree
#

require 'getopts.pl';

#
# Usage: $progname -l locale_name [filename | directory]*
#
sub usage {
    die
"\n::\n",
"\n",
"  Usage: $progname [Options] [filename | directory]* \n",
"\n",
"\n",
"  Options:\n",
"      -h                 Print help (this message)\n",
"      -l   locale_name   target locale_name directories to look for.\n",
"      -src src_dir       target src_name directories to look for.\n",
"      -chr chr_dir       target chr_name directories to look for.\n",
"\n::\n",
"\n";
}


# Build a hash table of (file, dir) pairs
#
#   Scan the list and build a hash table out of it. 
#   Simply scan each line and strip out the file and path.
#
#   arg 0: file list
#       1: locale_name
#
sub file2tab
{
	print "\n -- in : file2tab $_[0]--\n";
	my ($lineno, $lbr, $basename, $bpos, $path, %PathByName);
	open (DTDLIST, $_[0]) || die "\n CAN'T open $_[0] \n";
	$lineno = 0;
	while ( <DTDLIST> ) {
	  if (/obj-/ ||
		 /dist\/bin/) { # || (!(/$_[1]/))) {
		# print "\n ** reject exported file: $_ **";
		next;
	  }
	  ($tmpname) = $_ =~ /([^\/]+)$/;
	  $lbr = rindex($tmpname, '\n');
	  $basename = substr($tmpname, 0, $lbr);

	  $bpos = rindex($_, $basename);
	  $path = substr($_, 0, $bpos); 
	  #print "\n $lineno:basename=$basename, bpos=$bpos, path=$path";
	  
	  $PathByName{$basename} = $path;
	  
	  ++$lineno;
	}# while
	close(DTDLIST);
	print "\n -- out: file2tab $_[0]--\n";

	%PathByName;
}

#
# dump a hash table to the console
#
sub dumpTable()
{
	my (%Table, $name, $lineno);
	$lineno = 0;
	%Table = @_;
	foreach $name (keys %Table) {
		++$lineno;
		print "\n $lineno: $name in $Table{$name}";
	}
}

#  1.b. process 'dir' backward; find where to add "da-DK"
#           if there is 'locale', 'content', and 'skin'; then {
#                  return 'locale' 
#           }
#           else {
#             report error and ask if 'locale' shall be created?
#           }
#           return null;
#         }
sub getldir {
	$lpos = rindex($_[0], "locale");
	$pdir = substr($_[0], 0, $lpos);
	#print "\n $lineno: $dtd of $chromeTable{$dtd} at $_[0]";
	#print "\n          pdir=$pdir";
	$cntdir = $pdir . "content";
	(-d $cntdir )		
		|| (print "\n ?? $cntdir doesn't exist??");

	$skindir = $pdir . "skin";
	(-d $skindir )		
		|| (print "\n ?? $skindir doesn't exist??");

	$ldir = $pdir . "locale/";
	(-d $ldir )		
		|| die "\n ?? $ldir doesn't exist??";

	return $ldir;
}

#
# 0: path
# 1: "locale"
#
sub srcDepth
{
  my (@tokens, $mozdir, $locdir, $dep, $token, $depth);

  @tokens = split(/\//, $_[0]);
  $mozdir = -1;
  $locdir = -1;
  $dep = 0;
  foreach $token (@tokens) {
	++$dep;
	if (($token eq "mozilla") || 
	    ($token eq ".")) {
	  $mozdir = $dep-1;
	}
	if ($token eq $_[1]) {
	  $locdir = $dep;
	}
  }
  print "\n** dep = $dep, locdir=$locdir, mozdir=$mozdir **";
  $depth = $locdir - $mozdir;
  
}

sub depthStr {
  my ($depth, $count, $str);

  $depth = $_[0];
  $count = 0;
  $str = ".";
  while ($count < $depth) {
	if ($count == 1) {
	  $str = "..";
	}
	else {
	    if ($OSTYPE == 1) {
		$str = $str . "/..";
	    }
	    elsif ($OSTYPE == 2) {
		$str = $str . "\\..";
	    }
	}
	++$count;
  }
  return $str;
}

#
# recursively mkdir
#
#   arg 0: dir path
#
sub winMkdir {
    my ($dir, %dirs, $dpath);
    @dirs = split(/\//, $_[0]);
    print "\n** winMkdir: dirs=@dirs\n";
    $dpath = "";
    foreach $dir (@dirs) {
	print "\n dir=$dir\n";
	if (! ($dir eq ".")) {
	    $dpath = ($dpath eq "")?$dir:($dpath . "/" . $dir);
	    if (!(-d $dpath)) {
		#print "\n** winMkdir: creating dir=$dir, dpath=$dpath **\n";
		mkdir($dpath, 0777)
		    || die "\n ** winMkdir mkdir: Can't create new dir: $dpath **\n";
	    }
	    else {
		#print "\n** winMkdir: dir=$dir, dpath=$dpath EXISTs **\n";
	    }
	}
	else {
	    #print "\n** winMkdir: skipping dir=$dir, dpath=$dpath **\n"
	}
    }
    return 1;
}

# mkdir and cvs add one;
#   muck makefile (win32,linux,mac) to pick it up
#  [for linux, add the path to allmakefiles.sh;
#  add allmakefiles.sh to @toCommitList]
#  add makefile to @toCommitList
#
#  arg 0: locale/
#      1: locale name
#
$nDirs = 0;
sub newDir {
	my ($dir);
	$dir = $_[0] . $_[1];
	if (1) {
	    winMkdir($dir, 0777) 
		|| die "\n ** Can't create new dir: $dir **\n";
	}
	else {
	    mkdir($dir, 0777) 
		|| die "\n ** Can't create new dir: $dir **\n";
	}
	#print "\n added $dir to $nDirs dirs\n";

	$newdirs[$nDirs] = $_[0];
	++$nDirs;
}

$nFiles = 0;
sub updatedFiles {
	$updatedFiles[$nFiles] = $_[0];
	++$nFiles;
}

$nMKFiles = 0;
sub newMKFile {
	$newMKFiles[$nMKFiles] = $_[0];
	++$nMKFiles;
}

$nNewChrome = 0;
sub newChrome {
	$newChromes[$nNewChrome] = $_[0];
	++$nNewChrome;
}

sub fileCopy {
  my ($ffrom, $fto);
  $ffrom = $_[0];
  $fto = $_[1];

  if (-f $fto) {
	my ($org);
	$org = $fto . ".org";
	print "\n $fto exists; rename it to $org\n";
	(rename($fto, $org))
	  || die "\n Error; can't rename $ffrom to $fto !! \n";
  }
  open (inFILE, $ffrom);
  open (outFILE, "> $fto");
  
  # dumb copy
  print "\n from $ffrom to $fto"; 
  while ( <inFILE> ) {
	print outFILE $_ ;
  }
  close(inFILE);
  close(outFILE);
}
#
# arg 0: locname
#
sub loc2mkname {
  my ($mkname);
  $mkname = $_[0];
  $mkname =~ s/-/_/g;
  if ($OSTYPE == 2) {
      $mkname = "\U$mkname\E";
  }
  return $mkname;
}
#
# arg 0: mkfilename
#     1: locale name
#     2: dtd filename
#     3: $winType
#     4: dir delimitor
#
sub addDTD2MK {
  my ($lname, $dtdname, $winType, $dtdentry, $chromeDefined);
  $lname = $_[1];
  $dtdname = $_[2];
  $winType = $_[3];

  $orgfile = $_[0] . ".mkorg";
  $tmpfile = $_[0] . ".tmp";
  (rename($_[0], $orgfile))
	|| die "\n Error; can't rename $_[0] to $orgfile !! \n";

  open(ORGFILE, "< $orgfile");
  open(MKFILE, "> $tmpfile");
  $l10nsec = 0;
  $dtdExist = 0;
  $locsec = 0;
  my ($mkname);
  $mkname = &loc2mkname($lname);

  if ($OSTYPE == 1) {
      $dtdentry = $lname . $_[4] . $dtdname;
  }
  elsif ($OSTYPE == 2) {
      $dtdentry = "\.\\" . $lname . $_[4] . $dtdname;
  }
  $chromeDefined = 0;
  while ( <ORGFILE> ) {
      if (($chromeDefined == 0)&&
	  (/CHROME_L10N \=/)){
	  $chromeDefined = 1;
	  print "\n**** CHROME_L10N = FOUND ***\n";
      }
	if ($l10nsec == 0) {
	  if (/locale\: begin/) {
		$l10nsec = 1;
	  }
	  elsif ((/config/ && /rules\.mk/) ||
			 (/config/ && /rules\.mak/)) {
		print "\n** HACKing old style makefile: $_[0] **\n";

		# first timer
		print MKFILE "\n#",
		"\n# PLS DO NOT edit the following locale block;",
		"\n#     talk to tao\@netscape.com first, thanks!",
		"\n#",
		"\n# locale: begin";
		&addChrome2mk($winType);
		print MKFILE "\n$mkname=1", 
		"\n$ifstart $mkname", 
		$chrome_l10n,
		"\n\t$dtdentry \\", 
		"\n\t\$\(NULL\)",
		"\n$ifend",
		"\n#",
		"\n# locale: end",
		"\n#",
		"\n\n";
		print "\n** finish HACKing old style makefile: $_[0] **\n";

	  }
	}
	else {
	  if (/locale\: end/) {
		$l10nsec = 2;
		if ($locsec == 0) {
		  # add the whole thing
		  print MKFILE "\n$mkname=1", 
		  "\n$ifstart $mkname",
		  $chrome_l10n,
		  "\n",
		  "\t$dtdentry \\", 
		  "\n\t\$\(NULL\)",
		  "\n$ifend";
		}
	  }
	  elsif ($locsec == 0) {
		if (/ifdef $mkname/) {
		  print "\n** found $_[1] section! \n";
		  $locsec = 1;
		}
	  }
	  elsif ($dtdExist == 0) {
		if (/($_[1])/ && /($_[2])/) {
		  print "\n** found dtd file! \n";
		  $dtdExist = 1;
		}
		elsif (/\$\(NULL\)/) {
		  print MKFILE "\t$dtdentry \\", 
		  "\n";
		  print "\n++ addDTD2MK added $dtdname to $_[0]";
		}
	  }
	}# else
	print MKFILE $_;
  }

  close(MKFILE);
  close(ORGFILE);
  (rename("$tmpfile", $_[0]))
	|| die "\n Error; can't rename $tmpfile to $_[0] !! \n";

}

#
# 0: winType
# 
sub addChrome2mk {
    print "\n** addChrome2mk: in **\n";
  # was "# locale: begin, new"
  print MKFILE "\nCHROME_DIR          = $_[0]",
  "\nCHROME_L10N_DIR     = locale",
  "\nCHROME_SOURCE_DIR   = \$\(srcdir\)",
  "\n";
    print "\n** addChrome2mk: out **\n";
}

#  open(MKFILE, "> $_[0]");
#
#  while ( <MKFILE> ) {
#	if (/\# locale: begin, new/) {
#	}
#  }
#
# arg 0: locale name
#     1: filename
#  
sub addNewLocale {
  print "\n** addNewLocale in **\n";
  my ($lname, $dtdname);
  $lname = $_[0];
  $dtdname = $_[1];
  my ($mkname);
  $mkname = &loc2mkname($lname);
  print MKFILE "\n$mkname=1", 
  "\n$ifstart $mkname",
  $chrome_l10n,
  "\n\t\$\(NULL\)",
  "\n$ifend";
  print "\n** addNewLocale out **\n";
}

#
# locale/mkfname
# 
# arg0: path
#    1: mkfilename
#    2: winType
#    3: locale name
#    4: dtd name
#
sub newLMAK {
  my ($mkfname, $depStr);

  $depStr = &depthStr(&srcDepth($_[0], "locale"));
  $mkfname = $_[0] . $_[1];

  print "\n**  newLMAK($mkfname) in **\n";

  open(MKFILE, "> $mkfname")
      || die "\n** CAN NOT create new $mkfname **\n";
  print MKFILE "\nDEPTH = $depStr",
  "\n",
  "\n#",
  "\n# PLS DO NOT edit the following locale block;",
  "\n#     talk to tao\@netscape.com first, thanks!",
  "\n#",
  "\n# locale: begin";
  &addChrome2mk($_[2]);
  &addNewLocale($_[3], $_[4]);
  print MKFILE "\n#",
  "\n# locale: end",
  "\n#",
  "\n",
  "\ninclude \<\$\(DEPTH)\\config\\rules\.mak\>";

  close(MKFILE);
  #
  &newMKFile($_[0]);
  print "\n**  newLMAK($mkfname) out **\n";
}

#
# locale/mkfname
# 
# arg0: path
#    1: mkfilename
#    2: winType
#    3: locale name
#    4: dtd name
#
sub newLMK {
  my ($mkfname, $depStr);

  $depStr = &depthStr(&srcDepth($_[0], "locale"));
  $mkfname = $_[0] . "/" . $_[1];

  print "\n**  newLMK($mkfname) **\n";

  open(MKFILE, "> $mkfname");
  print MKFILE "\nDEPTH = $depStr",
  "\ntopsrcdir	= \@top_srcdir\@",
  "\nVPATH		= \@srcdir\@",
  "\nsrcdir		= \@srcdir\@",
  "\n",
  "\n#",
  "\n# PLS DO NOT edit the following locale block;",
  "\n#     talk to tao\@netscape.com first, thanks!",
  "\n#",
  "\n# locale: begin";
  &addChrome2mk($_[2]);
  &addNewLocale($_[3], $_[4]);
  print MKFILE "\n#",
  "\n# locale: end",
  "\n#",
  "\n",
  "\ninclude \$\(DEPTH\)/config/autoconf.mk",
  "\n",
  "\ninclude \$\(topsrcdir\)/config/config.mk",
  "\n",
  "\ninclude \$\(topsrcdir\)/config/rules.mk";

  close(MKFILE);
  #
  &newMKFile($_[0]);
}

# 0: npl, 
# 1: outfile, 
# 2: commentType: 
#    0: # makefile, 
#    1: <!-- -->, 
#    2: /* */
# 3: magic line
sub addnpl {
    print "\n** addnpl: $_[0] in **\n";
  open (MPL11, "< $_[0]")
	|| die "\n** Error: can't open $_[0] **\n";

  my ($fto, $org);
  $fto = $_[1];
  $org = $fto . ".nplorg";
  if (-f $fto) {
	print "\n $fto exists; rename it to $org\n";
	rename($fto, $org)
	  || die "\n Error; can't rename $fto to $org!! \n";
  }
  open (OUTFILE, "> $fto");
  print "\n ** begin addnpl: $#_ args=@_, $_[2]** \n";
  if (($#_ >= 3)&&(length($_[3]))) {
	print OUTFILE "$_[3]\n";
  }

  $prefix = "  ";
  if ($#_ >= 2) {
	if ($_[2] == 1) {
	  print OUTFILE "<!--\n";
	}
	elsif ($_[2] == 2) {
	  print OUTFILE "\/\*\n";
	}
	elsif ($_[2] == 0) {
	  $prefix = "\# ";
	}
	
  }
  while ( <MPL11> ) {
	print OUTFILE $prefix . $_;
  }
  if ($#_ >= 2) {
	if ($_[2] == 1) {
	  print OUTFILE "-->\n";
	}
	elsif ($_[2] == 2) {
	  print OUTFILE "\*\/\n";
	}
	elsif ($_[2] == 0) {
	  print OUTFILE $prefix;
	}
  }
  close(MPL11);

  if (-f $org) {
	open(ORGFILE, $org);
	while ( <ORGFILE> ) {
	  print OUTFILE $_;
	}
	close(ORGFILE);
  }
  close(OUTFILE);
    print "\n** addnpl: $_[0] out **\n";
}
#
# arg 0: Arr
#
sub dumpArr {
  my ($nArr, @Arr, $count);
  $count = 0;
  @Arr = @_;
  $nArr = $#Arr;
  while ($count < $nArr) {
	print "\n$count:", $Arr[$count];
	++$count;
  }
  print "\n** End of dumpArr \n";
}

# in 0: file name
# 
# out 1: dtd
#     2: proper 
sub fileType {
    my ($dot, $fext, $type);

    $dot = rindex($_[0], '.');
    $fext = substr($_[0], $dot, length($_[0]));
    $type = 0;
    if ( ".dtd" eq $fext ) {
	$type = 1;
    }
    elsif ( ".properties" eq $fext ) {
	$type = 2;
    }
    #print "\n** filetype of $_[0] =$fext, $type **\n";
    ($type);
}

#
# arg 0: locale name
#     1: mkfilename
#     2: dir delimitor
#
sub dtd2moz {
    my ($lname, $lineno, $dtd, $srcdir, $chromdir, $winType, $mkfname, $dirdel, $npl2dtd);

	$lname = $_[0];
	$dirdel = $_[2];

    # for a given DTD: 
	$lineno = 0;
	foreach $dtd (sort keys %chromeTable) {
		++$lineno;

		# 1. find its source dir:
		$srcdir = $srcTable{$dtd};
		if (! $srcdir) { 
			print "\n ** Warning: $dtd not in source !! \n";
			#next;
		}
		#
		$chromdir = $chromeTable{$dtd};
		@tokens = split(/\//, $chromdir);
		$winType = $tokens[$#tokens-2];
		#
		if (1) {
		    # l10n
		    $ldir = "l10n/lang/" . $winType . "/locale/";
		}
		else {
		    # source
		    $ldir = &getldir($srcdir);
		}
		#
		$target_dir = $ldir . $lname; 
		print "\n -- ldir=$ldir,  target_dir=$target_dir--\n";
		#
		(-d $target_dir)
			|| ((print "\n ** NO $target_dir for $winType; create one\n")
				&& &newDir($ldir, $lname));
		#
		# check if locale/makefile exist
		#
		$mkfname = $_[1];
		$lmkfile = $ldir . $mkfname;
		if (!(-f $lmkfile)) {
		  print "\n ==>> NO $lmkfile ** \n";
		  if ($OSTYPE == 1) {
		      &newLMK($ldir, $mkfname, $winType, $lname);
		      &addnpl("/u/tao/bin/npl_1_1.txt", $lmkfile, 0, "#!gmake");
		  }
		  elsif ($OSTYPE == 2) {
		      &newLMAK($ldir, $mkfname, $winType, $lname);
		      &addnpl("g:/nstools/bin/npl_1_1.txt", $lmkfile, 0, "#!nmake");
		  }
		}
		$target_dtd = $target_dir . $dirdel .$dtd;
		#
		#              check if the DTD is there already?
		#
		$npl2dtd = 0;
		if (!(-f $target_dtd)) {
		  print "\n NEW: $target_dtd!\n";
		  $npl2dtd = 1;
		  &newChrome($dtd);
		}
		#
		&addDTD2MK($lmkfile, $lname, $dtd, $winType, $dirdel);
		#
		#              copy the DTD over
		#
		$newdtd = $chromeTable{$dtd} . $dtd;
		
		#print "\n newdtd=$newdtd\n";
		&fileCopy($newdtd, $target_dtd);
		if ($npl2dtd == 1) {
		  if ($OSTYPE == 1) {
			if (&fileType($dtd) == 1) {
			  &addnpl("/u/tao/bin/npl_1_1_henrik.txt", $target_dtd, 1, "");
		    }
		    elsif (&fileType($dtd) == 2) {
			  &addnpl("/u/tao/bin/npl_1_1_henrik.txt", $target_dtd, 0, "");
		    }
		  }
		  elsif ($OSTYPE == 2) {
			if (&fileType($dtd) == 1) {
			  &addnpl("g:/nstools/bin/npl_1_1_henrik.txt", $target_dtd, 1, "");
		    }
		    elsif (&fileType($dtd) == 2) {
			  &addnpl("g:/nstools/bin/npl_1_1_henrik.txt", $target_dtd, 0, "");
		    }
		  }
		  $npl2dtd = 0;
		}
		&updatedFiles($target_dtd);
	    }#for a given DTD

#
#  III. do cvs update to make sure the tree is in sync
#       manually correct conflict
#
#  VI.  Ready to commit the @toCommitList
#           
}

#-------------------------------------------------------------------------------
#
#234567890#234567890#234567890#234567890#234567890#234567890#234567890#234567890
#
#-------------------------------------------------------------------------------
#
# Extract base part of this script's name
($progname) = $0 =~ /([^\/]+)$/;
#
&usage if (!&Getopts('l:src:chr:h'));
#
&usage if ($opt_h);		# help option
#
$locale_name = ($opt_l ? $opt_l : 'da-DK');
print "\nlocale_name=$locale_name\n";
#
$src_dir = ($opt_src ? $opt_src : '.');
print "\nsrc_dir=$src_dir\n";
#
$chr_dir = ($opt_chr ? $opt_chr : '/home/contrib/chrome/');
print "\nchr_dir=$chr_dir\n";
#
# 1: Unix
# 2: WIN
# 3: Mac
#
$OSTYPE = 1;
if ($OSTYPE == 1) {
    $srcflist = "/home/contrib/srcdtd.lis";
    $chromeflist = "/home/contrib/chromedtd.lis";
}
elsif ($OSTYPE == 2) {
    $srcflist = "e:/data/srcdtd.lis";
    $chromeflist = "e:/data/chromedtd.lis";
}
#exec("find $src_dir -name '*.dtd' > $srcflist");
#exec("find $chr_dir -name '*.dtd' > $chromeflist");

%srcTable = &file2tab($srcflist, "en-US");
#&dumpTable(%srcTable);

%chromeTable = &file2tab($chromeflist, $locale_name);
#&dumpTable(%chromeTable);

# $OSTYPE = 0;
$ifstart = "ifdef";
$ifend = "endif";
if ($OSTYPE == 1) {
	$chrome_l10n = "\nCHROME_L10N \+\= \\";
    &dtd2moz($locale_name, "Makefile.in", "/");
}
elsif ($OSTYPE == 2) {
	$chrome_l10n = "\nCHROME_L10N = \$\(CHROME_L10N\)\\";
    $ifstart = "\!ifdef";
    $ifend = "\!endif";
    &dtd2moz($locale_name, "makefile.win", "\\");
}

print "\n** newMKFiles\n";
&dumpArr(sort @newMKFiles);
if (0) {
print "\n** newChromes\n";
&dumpArr(sort @newChromes);
print "\n** updatedFiles\n";
&dumpArr(sort @updatedFiles);
}
print "\n-- DONE --\n";
