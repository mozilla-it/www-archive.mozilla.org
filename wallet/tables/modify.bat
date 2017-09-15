rem Utility to modify an e-mail for a URL-specific site
rem    before adding it to the URLFieldSchema.tbl
rem
rem The way it works is as follows:
rem
rem   Person uses tablegen.htm to fill in info for site and emails to morse@netscape.com
rem   I receive e-mail, right-click on the attachment and do a save-as to <filename>.
rem   e-mail consists of a single very-long line and is difficult to edit
rem   I run this batch script as follows: "modify <filename>"
rem   At this point linefeeds have been inserted and file is open in the editor
rem   I perform the editing and save the file
rem   Now the linefeeds are removed getting back to the original file format
rem      (last step was not really necessary, but was done for consistency)
rem   Finally I will use add_one.bat or add_all.bat to put this info into the
rem      master URLFieldToSchema.tbl

copy %1 spm.in
hexsubst spm.in spm.out 253041 0D0A2E
notepad spm.out
hexsubst spm.out spm.in 0D0A2E 253041
copy spm.in %1
del spm.in
del spm.out
