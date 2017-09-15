echo off

rem Utility to update the schema table in tablegen.js by using info from schemas.htm file
rem Run this batch file whenever the schemas.htm file changes
rem This batch file calls on doschema.exe to do the real work
rem
rem The way it works is as follows:
rem  schemas.htm file is maintained (using composer) as master list of all allowable schema
rem  run this batch script
rem  at this point old schema table in tablegen.js has been updated
rem  also appropriate entries have been added to FieldSchema.tbl

copy ..\tablegen\tablegen.js
copy ..\tablegen\schemas.htm
doschema
del tablegen.js
del schemas.htm

if not exist tablegen.js.xxx goto done
copy tablegen.js.xxx ..\tablegen\tablegen.js
del tablegen.js.xxx
:done

if not exist FieldSchema.tbl.xxx goto done2
copy FieldSchema.tbl.xxx + FieldSchema.tbl.supplement fs.spm
rem need to remove EOF (ctl-z) that the copy just created
hexsubst fs.spm fs2.spm 0d0a1a 0d0a
copy fs2.spm FieldSchema.tbl
del FieldSchema.tbl.xxx
del fs.spm
del fs2.spm
:done2
