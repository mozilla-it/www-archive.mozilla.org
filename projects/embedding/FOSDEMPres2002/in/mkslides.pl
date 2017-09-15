#!/usr/bin/perl

# RUN THIS TO MAKE THE SLIDES!!!

$manifest_file = "manifest.txt";
$contents_file = "contents.html";
$stylesheet = "slide.css";

@slide_in_files = ();
@slide_out_files = ();
@slide_titles = ();

$verbose = 1;

read_manifest();

open (CONTENTS, ">$contents_file")
  or die ("Cannot open file \"$in_file\".\n");

generate_pre_contents(CONTENTS);

$i = $[;
foreach $file (@slide_in_files)
{
  $next = "";
  $prev = "";
  $first = $slide_out_files[$[];
  $last = $slide_out_files[$#slide_out_files];
  $outfile = $slide_out_files[$i];
  $title = $slide_titles[$i];
  if ($i > $[)
  {
    $prev = $slide_out_files[$i - 1];
  }
  if ($i + 1 <= $#slide_out_files)
  {
    $next = $slide_out_files[$i + 1];
  }

  generate_slide ($file, $outfile, $title, $next, $prev, $first, $last);

  print CONTENTS "<li><a href=\"$outfile\">$title</a></li>\n";
  $i++;
}

generate_post_contents(CONTENTS);

close CONTENTS;

sub read_manifest()
{
  open(MANIFEST, "<$manifest_file")
    or die ("Cannot open manifest \"$manifest\".\n");

  print "Reading manifest \"$manifest\"\n" unless !$verbose;

  while (<MANIFEST>)
  {
    chomp;
    s/^\s+//;
    s/\s+$//;
  
    # Skip comments & blank lines
    next if (/^\#/);
    next if (/^\s*$/);
  
    # Read input
    ($file, $title) = split(/,/, $_);

    $outfile = $file;
    $outfile =~ s/\.in$//g;
    $outfile = "$outfile.html";

    print "Reading $file, $outfile, $title\n" unless !$verbose;

    push @slide_titles, $title;
    push @slide_in_files, $file;
    push @slide_out_files, $outfile;
  }

  close MANIFEST;
}

sub generate_slide()
{
  my ($in_file, $out_file, $title, $next, $prev, $first, $last) = @_;

  print STDERR "Generating HTML for \"$file\" ...\n" unless !$verbose;

  open (INFILE, "<$in_file")
    or die ("Cannot open file \"$in_file\".\n");
  open (OUTFILE, ">$out_file")
    or die ("Cannot open file \"$out_file\".\n");

  generate_pre_slide(OUTFILE, $title, $contents_file, $next, $prev, $first, $last);
  while (<INFILE>)
  {
    print OUTFILE "$_";
  }
  generate_post_slide(OUTFILE);

  close INFILE;
  close OUTFILE;
}

sub generate_pre_contents()
{
  my ($out) = @_;
  print $out <<EOF;
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<html>
  <head>
    <title>Contents</title>
    <link href="$stylesheet" rel="stylesheet" type="text/css">
  </head>
  <body>
    <table class="slide-table">
      <tr>
        <td class="slide-title">Contents</td>
      </tr>
      <tr>
        <td colspan="2" class="slide-content">
          <span>
            <title>Contents</title>
<ol>
EOF
}

sub generate_post_contents()
{
  my ($out) = @_;
  print $out <<EOF;
</ol>
          </span>
        </td>
      </tr>
    </table>
  </body>
</html>
EOF
}

sub generate_pre_slide()
{
  my ($out, $title, $content, $next, $prev, $first, $last) = @_;
  print $out <<EOF;
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<html>
  <head>
    <title>$title</title>
    <link href="$stylesheet" rel="stylesheet" type="text/css">
    <link href="$content" rel="Contents">
    <link href="$first" rel="First">
    <link href="$last" rel="Last">
EOF
  print $out "<link href=\"$next\" rel=\"Next\">" if $next ne "";
  print $out "<link href=\"$prev\" rel=\"Prev\">" if $prev ne "";
  print $out <<EOF;
  </head>
  <body>
    <table class="slide-table">
      <tr>
        <td class="slide-title">$title</td>
        <td class="slide-nav">
           [&nbsp;
EOF
  if ($prev ne "")
  {
    print $out "             <a accesskey=\"p\" href=\"$prev\">&lt;&lt; Previous</a>&nbsp;|&nbsp;\n";
  }
  print $out "             <a href=\"$content\">Contents</a>\n";
  if ($next ne "")
  {
    print $out "             &nbsp;|&nbsp; <a accesskey=\"n\" href=\"$next\">Next &gt;&gt;</a>\n";
  }
  print $out <<EOF;
  &nbsp;]
        </td>
      </tr>
      <tr>
        <td colspan="2" class="slide-content">
          <span>
            <title>$title</title>
EOF
}

sub generate_post_slide()
{
  local $out = shift;
  print $out <<EOF;
          </span>
        </td>
      </tr>
    </table>
  </body>
</html>
EOF
}
