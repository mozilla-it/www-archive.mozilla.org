#!/usr/local/bin/perl
#
# First, get the CGI variables into a list of strings

%cgivars= &getcgivars;

# Print the CGI response header, required for all HTML output
# Note the extra \n, to send the blank line

print "Content-type: text/html\n\n" ;

# Finally, print out the complete HTML response page

$line = 1 ;
$lines = 5 ;

foreach (keys %cgivars) {
  $lines = $cgivars{$_} ;
}

$bytes = $lines * 8 ;

print <<EOF ;

<html>
<head><title>CGI Results</title></head>
<body>
<h1>chofmann's IBM Olympic INFO Application javascript string append tester</h1>
Building a test page of $lines eight byte string appends; about $bytes bytes <br>
<PRE>
EOF

# Print the CGI variables sent by the user.
# Note that the order of variables is unpredictable.
# Also note this simple example assumes all input fields had unique names,
#   though the &getcgivars() routine correctly handles similarly named
#   fields-- it delimits the multiple values with the \0 character, within 
#   $cgivars{$_}.

  print "<script language=\"JavaScript\">" ;
   $lcontent1 = "string1 += \"foo <br>\"\; " ;
   $lcontent2 = "string2 += \"bar <br>\"\; " ;
  
      printf("string1 = \"\" \; ") ;
      printf("string2 = \"\" \; ") ;
     while ( $line <= $lines ) {
      printf("%s\n",$lcontent1) ;
      printf("%s\n",$lcontent2) ;
      $line = $line + 1
     }
    
        print "document.write(' ' + string1 + ' ' + string2 + ' ')\;";
        print "\ndocument.close()\;";
      # Print close of HTML file
       print "</script>" ;
# Print close of HTML file
  #print "</script>" ;

print <<EOF ;
</PRE>
</body>
</html>
EOF

exit ;

#----------------- start of &getcgivars() module ----------------------

# Read all CGI vars into an associative array.
# If multiple input fields have the same name, they are concatenated into
#   one array element and delimited with the \0 character (which fails if
#   the input has any \0 characters, very unlikely but conceivably possible).
# Currently only supports Content-Type of application/x-www-form-urlencoded.

sub getcgivars {
    local($in, %in) ;
    local($name, $value) ;

    # First, read entire string of CGI vars into $in

    if ( ($ENV{'REQUEST_METHOD'} eq 'GET') ||
         ($ENV{'REQUEST_METHOD'} eq 'HEAD') ) {
        $in= $ENV{'QUERY_STRING'} ;
    } elsif ($ENV{'REQUEST_METHOD'} eq 'POST') {
        if ($ENV{'CONTENT_TYPE'}=~ m#^application/x-www-form-urlencoded$#i) {
            $ENV{'CONTENT_LENGTH'}
                || &HTMLdie("No Content-Length sent with the POST request.") ;
            read(STDIN, $in, $ENV{'CONTENT_LENGTH'}) ;
        } else { 
            &HTMLdie("Unsupported Content-Type: $ENV{'CONTENT_TYPE'}") ;
        }
    } else {
        &HTMLdie("Script was called with unsupported REQUEST_METHOD.") ;
    }
    # Resolve and unencode name/value pairs into %in
    foreach (split('&', $in)) {
        s/\+/ /g ;
        ($name, $value)= split('=', $_, 2) ;
        $name=~ s/%(..)/chr(hex($1))/ge ;
        $value=~ s/%(..)/chr(hex($1))/ge ;
        $in{$name}.= "\0" if defined($in{$name}) ;  # concatenate multiple vars
        $in{$name}.= $value ;
    }
    return %in ;
}

# Die, outputting HTML error page
# If no $title, use a default title
sub HTMLdie {
    local($msg,$title)= @_ ;
    $title || ($title= "CGI Error") ;
    print <<EOF ;
Content-type: text/html

<html>
<head>
<title>$title</title>
</head>
<body>
<h1>$title</h1>
<h3>$msg</h3>
</body>
</html>
EOF
    exit ;
}
