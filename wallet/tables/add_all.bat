echo off

rem Utility to add all e-mail for specific sites to a fresh URLFieldToSchema.tbl file
rem
rem The way this works is as follows:
rem   Person uses tablegen.htm to fill in info for site and emails to morse@netscape.com
rem   I receive e-mail, right-click on the attachment and do a save-as to <filename>.
rem   Repeat above for many different sites
rem   I run this batch script as follows: "add_all
rem   At this point a new URLFieldToSchema.tbl has been created

if exist URLFieldSchema.tbl del URLFieldSchema.tbl
for %%i in (sites\*.htm) do add %%i

rem remove entries in URLFieldSchema.tbl that are already in FieldSchema.tbl
filter
copy URLFieldSchema.tbl.xxx URLFieldSchema.tbl
del URLFieldSchema.tbl.xxx
