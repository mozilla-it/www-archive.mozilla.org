echo off

rem Utility to add an e-mail for a specific site to the URLFieldToSchema.tbl file
rem This batch file calls on add.exe to do the real work
rem
rem The way this works is as follows:
rem   Person uses tablegen.htm to fill in info for site and emails to morse@netscape.com
rem   I receive e-mail, right-click on the attachment and do a save-as to <filename>.
rem   I run this batch script as follows: "add_one <filename>"
rem   At this point the data has been appended to the master URLFieldToSchema.tbl

add %1
