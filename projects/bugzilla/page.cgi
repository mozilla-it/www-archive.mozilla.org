#!/usr/bin/perl -w

use CGI;
use Template;
use Date::Format;
use File::Basename;

chdir(dirname($0));
my $cgi = new CGI;
$cgi->charset("UTF-8");
my $file = $::ENV{PATH_INFO};
$file =~ s|^/||;

my $mtime = (stat($file))[9];
my $date = time2str("%B %e, %Y", $mtime);
my $year = time2str("%Y", $mtime);
my $pathcount = grep {$_ eq "/"} (split("",$file));
my $root = "../" x $pathcount;
$root ||= "./";
$root =~ s#/$##;
my $fileroot = dirname($0);

my $template = new Template;
my %vars = (
             WEBPATH => $root,
             DOCROOT => $fileroot,
             filename => $file,
             timestamp => $date,
             year => $year,
             request_uri => $::ENV{REQUEST_URI},
             server_signature => $::ENV{SERVER_SIGNATURE},
           );

if (!-e $file) {
    print $cgi->header(-status=>'404 Not Found', -type=>'text/html');
    $template->process('error404.html.tmpl', \%vars)
      || die "Template failed: $@";
    exit;
}
elsif (!-r $file) {
    print $cgi->header(-status=>'403 Forbidden', -type=>'text/html');
    $template->process('error403.html.tmpl', \%vars)
      || die "Template failed: $@";
    exit;
}
else {
    print $cgi->header("text/html");
    $template->process($file, \%vars)
      || die "Template failed: $@";
}
