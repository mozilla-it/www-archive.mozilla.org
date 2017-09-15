echo 1 > Tmp.tbl

echo @DistinguishedSchema.tbl >> Tmp.tbl
copy Tmp.tbl+DistinguishedSchema.tbl Tmp.tbl

echo @SchemaConcat.tbl >> Tmp.tbl
copy Tmp.tbl+SchemaConcat.tbl Tmp.tbl

echo @FieldSchema.tbl >> Tmp.tbl
copy Tmp.tbl+FieldSchema.tbl Tmp.tbl

echo @URLFieldSchema.tbl >> Tmp.tbl
copy Tmp.tbl+URLFieldSchema.tbl Tmp.tbl

rem remove EOF (ctl-z) that the copies created
hexsubst Tmp.tbl Tmp2.tbl 0d0a1a 0d0a
copy Tmp2.tbl wallet1.html
del Tmp2.tbl
del Tmp.tbl