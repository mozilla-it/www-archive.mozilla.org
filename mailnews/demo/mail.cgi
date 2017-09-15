#!/usr/bonsaitools/bin/perl5
#!/local/bin/perl -IMailCclient-0.3/

$query=$ENV{'QUERY_STRING'};
$query =~ tr/+/ /;

@key_value_pairs = split (/&/, $query);
foreach $key_value (@key_value_pairs) {
    ($key, $value) = split (/=/, $key_value);
    $key   =~ s/%([0-9a-fA-F][0-9a-fA-F])/pack("C", hex($1))/eg;
    $value =~ s/%([0-9a-fA-F][0-9a-fA-F])/pack("C", hex($1))/eg;
    $args{$key} = $value;
}

@rcookies = split(/; /,$ENV{'HTTP_COOKIE'});
foreach $cook(@rcookies) {
    ($id, $val) = split(/=/, $cook);
    $cookies{$id} = $val;
}
($user, $passwd) = split(':',$cookies{"id"});

#
# main frameset

$hbase="http://www.mozilla.org/mailnews/demo/";
#$hbase="http://uruk/mail/";
$base=$hbase."mail.cgi?server=".$args{"server"}."&proto=".$args{"proto"};

    $main=$base."&main=t";
    $folders=$base."&folders=t";
    $subjects=$base."&subjects=t";
    $toolbar=$base."&toolbar=t";
    $message=$base."&message=t";

if ($args{"main"} eq "t") {

    printf "Content-type: text/html\n\n
<html>
<head><title>RDF Mail (".$user."@".$args{"server"}.")</title></head>
<frameset rows=\"25%, 55, 65%\">
	<frameset cols=\"25%, 75%\">
	  <frame src=\"$folders\" NAME=\"folders\" scrolling=no> 
	  <frame src=\"about:blank\" NAME=\"subjects\" scrolling=no> 
	</frameset>
	  <frame frameborder=\"no\" SCROLLING=\"no\" SRC=\"$toolbar\"  NAME=\"tools\"> 
		  <frame frameborder=\"no\" SRC=\"about:blank\"  NAME=\"messages\">
</frameset>
</html>";
    exit 0;
}

#
# component framesets

if ($args{"folders"} eq "t") {
print "Content-type: text/html\n\n
<html>
<body marginwidth=0 marginheight=0>
<object width=100% height=100% type=builtin/tree 
data=\"".$base."&rdffolders=t#root\"
target=\"subjects\">
<param name=\"Column\" value=\"name\">
<param name=\"title\" value=\"Folders\">
</object>
</body>
</html>";
    exit 0;
}

if ($args{"subjects"} eq "t") {
print "Content-type: text/html\n\n
<html>
<body marginwidth=0 marginheight=0>
<object width=100% height=100% type=builtin/tree 
data=\"".$base."&rdfsubjects=t#root\"
target=\"messages\">
<param name=\"Column\" value=\"mail:From\">
<param name=\"Column\" value=\"mail:Subject\">
<param name=\"Column\" value=\"mail:Date\">
<param name=\"title\" value=\"Subjects\">
</object>
</body>
</html>";
    exit 0;
}

if ($args{"toolbar"} eq "t") {
print "Content-type: text/html\n\n
<html>
<body bgcolor=\"#fefefe\">
<script>
function logout () { window.parent.location.href=\"login.html\"; }
function compose () {
window.onerror = null;
window.open ('".$hbase."compose.html',\"compose\",\"width=600,height=470,screenX=100,screenY=100,alwaysRaised=yes,toolbar=no\");
}


</script>

<table border=0 width=100%>
<tr>
<td align=left>
<form>
<input type=button value=\"Compose\" onClick=\"compose()\">
<input type=button value=\"Reply\">
<input type=button value=\"Reply All\">
<input type=button value=\"Delete\">
<input type=button value=\"Logout\" onClick=\"logout()\">
<input type=button value=\"Talk Now\">
</form>
</td>
</tr>
</table>
</body></html>";
    exit 0;
}

if ($args{"ads"} eq "t") {
printf "Content-type: text/html\n\n
<html>
<body bgcolor=\"#ffffff\" marginwidth=0 marginheight=0>
<center><i>Advertisement</i><br>
<img src=\"http://www.abcnews.com/ad/sponsors/in_house/abcnews/abc_tic001.gif\">
</center>
</body>
</html>";
    exit 0;
}

if ($args{"login"} eq "t") {
    print "Set-Cookie: id=".$args{"id"}.":".$args{"pass"}."\n";
    print "Status: 302\n";
    print "Location: ".$main."\n\n";
    exit 0;
}

#
# interaction with the servers


#if ($auth) {
#	$_ = $auth;
#	$_ =~ s/Basic (.*)/$1/;
#	tr#A-Za-z0-9+/##cd;                   
#	tr#A-Za-z0-9+/# -_#;                  
#	$len = pack("c", 32 + 0.75*length);   
#	($user, $passwd) = split(':', unpack("u", $len . $_));
#} else {
#	print "Status: 401 passwd\n\n"     if ($args{"id"} ne "smartmail" );
#}

#select(STDOUT); $| = 1;

use Mail::Cclient qw(set_callback);

set_callback
	log => sub {
#	    my ($str, $type) = @_;
#	    print "$type: $str\n";
	},
	list => sub {
	    ($stream, $delim, $mailbox, $other) = @_;
	    $mailbox =~ s/^\{[^\}]+\}(.*)/$1/;
#	    print "<Mailbox name=\"".$mailbox."\" attributes=\"".$other."\"/>\n";
	    print "\t<child name=\"".$mailbox."\" href=\"".$subjects."\"/>\n";
	},
	dlog => sub { print "debug: $_[0]\n" },
	login => sub { 
	    return ($user, $passwd) 
	    };


if ( $args{"proto"} eq "imap" ) {
    $sargs = "{".$args{"server"}."}INBOX";
}

if ( $args{"proto"} eq "pop" ) {
    $sargs = "{".$args{"server"}."/pop3}";
}

$c = Mail::Cclient->new($sargs, "readonly") or die "Can't Open Mailstream ".$sargs."\n";
$c->rdonly;

sub header {
	local($key, $value) = @_;
#	$value = $c->fetchheader($i, ["$key"]);
	$value =~ s/$key: ([^\n\r]*)[\n\r]*/$1/i; 
	$value =~ s/</&lt;/g;
	print "\t<mail:$key>".$value."</mail:$key>\n";
}

sub addr {
    my $alist = shift;
    return join(", ", map { sprintf('%s', $_->personal)
#				    $_->mailbox, $_->host, $_->personal)
		      } @$alist);
}

#
# rdf mailbox list

if ($args{"rdffolders"} eq "t") {
    print "Content-type: text/plain\n\n";
    print "<RDF:RDF>\n";
    print "<MailFolders id=\"root\">\n";
    $c->list($sargs,"*");
    print "</MailFolders>\n";
    print "</RDF:RDF>\n";
}

#
# rdf subject list

if ($args{"rdfsubjects"} eq "t") {
	$nmsgs = $c->nmsgs;
	print "Content-type: text/plain\n\n";
	print "<RDF:RDF>\n";
	print "<Topic id=\"root\">\n";
	print "<Column href=\"mail:Subject\"/>\n";
	print "<Column href=\"mail:From\"/>\n";
	print "<Column href=\"mail:Date\"/>\n";

	print "<child>";
	print "<Message href=\"".$hbase."welcome.html\">\n";
	header("Subject", "Welcome!");
	header("From", "Mozilla");
	header("Date", "The Epoch");
	print "</Message>";
	print "</child>\n";

#$nmsgs=1;
	for ($i = 1; $i <= $nmsgs; $i++) {
	    ($envelope, $body) = $c->fetchstructure($i);

	    print "<child>";
	    print "<Message href=\"".$message."&msg=$i\">\n";
	    header("Subject", $envelope->subject);
	    header("From", addr($envelope->from));
	    header("Date", $envelope->date);
	    print "</Message>";
	    print "</child>\n";
	}
	print "</Topic>\n";
	print "</RDF:RDF>\n";
    }


#
# display a message
if ($args{"message"} eq "t") {
    if($args{"msg"}) {
#	($envelope, $body) = $c->fetchstructure($args{"msg"});
#	my $type = $body->type;
	printf "Content-type: message/rfc822\n\n";
#	print "From: ".addr($envelope->from)."\n";
#	print "Subject: ".$envelope->subject."\n";
#	print "Date: ".$envelope->date."\n";
	print $c->fetchheader($args{"msg"});
	print $c->fetchbody($args{"msg"},1);

    } else {
	print "Content-type: text/plain\n\nno messages\n";
    }
}



