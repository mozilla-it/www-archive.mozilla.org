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

package MacUtilities;
use 5.004;
use strict;
use diagnostics;
use Mac::Files;

use Exporter;
use vars qw($VERSION @ISA @EXPORT @EXPORT_OK %EXPORT_TAGS);
@ISA = qw(Exporter);
@EXPORT = qw(getTrashFolder setPutAway);


# Given a pathname, return the trash folder on the same volume.
# In a list context returns the trash folder and the given pathname's
# dirID, which can be used as an argument to setPutAway.
sub getTrashFolder($) {
	my ($file) = @_;
	my $fileCat = FSpGetCatInfo $file or die $^E;
	my $vRefNum = $fileCat->ioVRefNum;
	my $parID = $fileCat->ioFlParID;
	my $trashFolder = FindFolder $vRefNum, kTrashFolderType, 1 or die $^E;
	$trashFolder .= ":";
	return wantarray ? ($trashFolder, $parID) : $trashFolder;
}


# Set the Finder's put-away directory for the given file.
sub setPutAway($$) {
	my ($file, $parID) = @_;
	my $fileCat = FSpGetCatInfo $file or die $^E;
	my $flXFndrInfo = $fileCat->ioFlXFndrInfo or die $^E;
	$flXFndrInfo->fdPutAway($parID);
	$fileCat->ioFlXFndrInfo($flXFndrInfo);
	FSpSetCatInfo($file, $fileCat) or die $^E;
	return 1;
}

1;
