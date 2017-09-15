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
# Copyright (C) 2001 Netscape Communications Corporation.  All
# Rights Reserved.
# 
# Contributor(s):   Waldemar Horwat <waldemar@acm.org>
#
#
# RenameTags [-v] [-n] -from regexp -to regexp [-omit str] dir ... dir
#
# Rename any occurrences inside HTML tags of the from regexp to the to regexp replacement string.
# If -v is given, print progress information.
# If -n is given, don't write the files.
# If -omit str is given, don't process any files whose pathnames contain str.  This option may be given multiple times.
#

use 5.004;
use strict;
use diagnostics;
use File::Basename;
use Getopt::Long;
use POSIX;
use GeneralUtilities;
use HTMLUtilities;

my $verbose = 0;
my $fromString;
my $toString;

my %fragmentFiles;  #<fragment> -> <full-pathname> of defining file

sub renameTagsInFile($\@\%\@) {
	my ($file, $runs, $omits, $roots) = @_;
	my $nReplaces = 0;
	cleanAttributes @$runs;
	foreach (@$runs) {
		$nReplaces += s/$fromString/$toString/og if /^</;
	}
	alertChange "Made $nReplaces substitutions" if $nReplaces;
}

my @omits;
GetOptions("v" => \$verbose, "n" => \$noSet, "from=s" => \$fromString, "to=s" => \$toString, "omit=s@" => \@omits);
die "Need to specify -from and -to strings" unless defined $fromString && defined $toString;
print "# Replacing '$fromString' by '$toString'...\n" if $verbose;
processInputFiles \&renameTagsInFile, 1, \@omits, @ARGV;
print STDERR "\n***** ", $nWarnings, " warnings\n" if $nWarnings;

1;
