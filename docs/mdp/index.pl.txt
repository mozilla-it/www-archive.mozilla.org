#perl -w
# Index Generator

use File::Find;

#	-----------------------------------
#	specify a name for the index 
#	at the command line (e.g., perl idx.pl index.html)
#	otherwise these two lines with name it
#	"ref_index.html"
#	-----------------------------------


if($ARGV[0]) {$file = $ARGV[0]}
else {$file = "ref_index.html"}

# 	-----------------------------------
#	CHANGE THE TARGET DIRECTORY HERE.
#	Script looks in directory and all 
#	subdirectories recursively.
#
#	example: chdir ("C:/Projects/MyBook/");
#	-----------------------------------

chdir("C:/Projects/XUL/xulref");

#	-----------------------------------
# 	Create an array of all the html 
# 	files in the given directory.
#	-----------------------------------

sub load_files {
	if (/\.html$/) { push (@source_files, $_)}
}
find(\&load_files, ".");

#	-----------------------------------
#	Print out the html files being
#	examined for index entries to the
#	screen.
#	-----------------------------------

print "Indexing the following files:\n\n";
print join("\t", @source_files);
print "\n---\n";


#	------------------------------------
#	Create the index file itself
#	------------------------------------

open DEST, ">$file";
print DEST "<html><head><title>Index</title></head>";
print DEST qq(<body><h1><font color="#000099"><font size=+2>Index</font></font></h1>);
print DEST qq(<font size=-1>);


#	------------------------------------
#	Open each file and find the target IDX.
#	store the targets and source files in a hash
#	------------------------------------	

foreach $source(@source_files) {
	open SOURCE, $source; 
		while(<SOURCE>) {
			if(/IDX/i) {
				chomp;
				s/.*<a name="(.*)IDX".*/$1/i;
				$source_file{$_} = $source;
			}
	}
	close SOURCE;
}

#	-------------------------------------
#	Sort the index entries and arrange
#	them underneath their letters.
#	Print the entries to the index file
#	-------------------------------------

foreach $link (sort {lc($a) cmp lc($b)} keys %source_file) {

	$first_letter = $link;	
	$first_letter =~ s/(\w).*/$1/;
	
	$cap_letter = uc($first_letter);
 	if (uc($first_letter) ne uc($prev_letter)) {
		print DEST "\n<br>$cap_letter<br>\n";
 	}
	print DEST qq(<a href="$source_file{$link}#$link) . qq(IDX">$link</a><br>\n);
	$prev_letter = $first_letter;
}

close DEST;

