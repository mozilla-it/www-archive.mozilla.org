# .gdbinit file for debugging Mozilla

# run when using the auto-solib-add trick
def prun
        tbreak main
        run
	set auto-solib-add 0
        cont
end

# run -mail, when using the auto-solib-add trick
def pmail
        tbreak main
        run -mail
	set auto-solib-add 0
        cont
end

# define "pu" command to display PRUnichar * strings (100 chars max)
def pu
  set $uni = $arg0 
  set $i = 0
  while (*$uni && $i++<100)
    if (*$uni < 0x80) 
      print *(char*)$uni++
    else
      print /x *(short*)$uni++
    end
  end
end

# define "ps" command to display nsString/nsAutoString/nsCString/nsCAutoString
def ps
  set $ns = $arg0 
  if ($ns->mCharSize)
    pu $ns->mUStr
  else
    print $ns->mStr
  end
end

