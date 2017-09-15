#!/tools/ns/bin/perl
print "Content-type: text/html\n\n";
if ($ENV{'REQUEST_METHOD'} eq "GET") { $buffer = $ENV{'QUERY_STRING'}; }
else { read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'}); }
# Split the name-value pairs
@pairs = split(/&/, $buffer);
print "<H1>Form Echo</H1><H2>Here is what you typed:</H2>\n";
print "<B>Buffer</B> = $buffer\n <BR><BR>";
foreach $pair (@pairs)
{
    ($name, $value) = split(/=/, $pair);

    $value =~ tr/+/ /;
    $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;

    print "<B>$name</B> = $value\n";
    print "<BR>\n";

    $FORM{$name} = $value;
}

print "<HR><H2>Environment Variables</H2>\n";
foreach $item (keys %ENV)
{
    print "<B>$item</B> = " . $ENV{"$item"} . "<BR>\n";
};
