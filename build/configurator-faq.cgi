#! /usr/bin/env perl

print "Content-type: text/html\n\n";
print q(
<html>
  <head>
    <title>Mozilla Configurator FAQ</title>
  </head>

  <body BGCOLOR="#FFFFFF" TEXT="#000000"LINK="#0000EE" VLINK="#551A8B" ALINK="#FF0000">


<font size='+2' face='Helvetica,Arial'><b>
Configurator FAQ
</b></font>
<p>
<font size='+1' face='Helvetica,Arial'><b>
Stephen Lamm, 
<TT><A HREF="mailto:slamm@netscape.com">slamm@netscape.com</A></tt>
</b></font><br>

<!-- Created: Fri Mar 12 15:51:15 PST 1999 -->
<!-- hhmts start -->
Last modified: Fri Mar 12 15:47:28 PST 1999
<!-- hhmts end -->

<table cellspacing=20 cellpadding=0 border=0><tr bgcolor='#F0A000'><td>
<table cellpadding=10 cellspacing=3 border=0><tr bgcolor='#FFFFFF'><td>
<table cellpadding=2 cellspacing=0 border=0>
);

@data=();
$ii=1;
$afterFirst = 0;
while (<DATA>) {
  push @data, $_;
  if (/^Q./) {
    $inQ = 1;
    print "</a></td></tr>" if $afterFirst;
    print "<tr valign=top><td>";
    print "Q.</td><td> <a href='#q$ii'>";
    s@<a\s+href[^>]*>@@i;
    s@</a>@@i;
    s@^Q.@@;
    print;
    $ii++;
    $afterFirst=1;
  } elsif (/^A./) {
    $inQ = 0;
  } elsif ($inQ) {
    s@<a\s+href[^>]*>@@i;
    s@</a>@@i;
    print;
  }
}
print q(</a></td></tr></table>
</td></tr></table>
</td></tr></table>
<table cellpading=2 cellspacing=0>
);

$ii=1;
$afterFirst = 0;
foreach (@data) {
  if (/^Q./) {
    print "</td></tr><tr><td>&nbsp;</td></tr>" if $afterFirst;
    print "<tr valign=top><td><A name='q$ii'>";
    s@^Q.@<b>Q.</b></a></td><td>\n@;
    $ii++;
    $afterFirst=1;
  }
  if (/^A./) {
    print "</td></tr><tr valign=top><td>\n";
    #print "<br>\n";
    s@^A.@<b>A.</b></td><td>@;
  }
  print;
}

print q(
</td></tr></table>

<p>
<hr aligh=left>
<a href="http://www.mozilla.org/build/unix.html">
Back to the Unix Build Instructions
</a><br>
<a href="http://webtools.mozilla.org/build/config.cgi">
Back to the Unix Build Configurator
</a>
<hr align=left>
           Send questions or comments to 
           &lt;<a href="mailto:slamm@netscape.com?subject=About the Configurator FAQ">slamm@netcape.com</a>&gt;.
	</form>
</body></html>
);

__DATA__
Q. What are the <a href="http://webtools.mozilla.org/build/config.cgi">
   Unix Build Configurator</a> and <code><b>client.mk</b></code>?
A. The Unix Build Configurator is a CGI form for picking and
   saving build options.<br>
   <code><b>client.mk</b></code> has been around for a while, but I never used
   it because there was no easy way to pass options into it. It used a set of 
   environment variable to control parameters. However, these variables had no
   direct correlation to the options that <code><b>configure</b></code> used.
   <p>
   The <code><b>.mozconfig</b></code> script describes build options in a way
   that both
   <code><b>client.mk</b></code> and <code><b>configure</b></code> understand.
   It saves you the trouble of typing the options on the command-line all the 
   time. Of course, you are still welcome to type options on the command-line
   if you want. Any options you give <code><b>configure</b></code> on the
   command-line will be listed after the <code><b>.mozconfig</b></code> options.
   In this way, you can override individual <code><b>.mozconfig</b></code> options.

Q. How does it work?
A. The Build Configurator produces a script,
   <code><b>.mozconfig</b></code>, that you save in your home
   directory. When <code><b>client.mk</b></code> runs, it reads in the
   options that apply to it (e.g. object dirctory).
   When <code><b>configure</b></code> runs, it also reads in the options that
   it understands.
   <p>
   If you are interested in more of the details, you can start by looking at
   the <a href="http://webtools.mozilla.org/build/README">
   README</a> file. Or, 
   <a href="mailto:slamm@netscape.com?Subject=About the Configuator">
   send me an email</a>.

Q. Can I still do all the build steps by hand?
A. Absolutely. Fill free to mix and match build steps.

Q. Can I load an existing '.mozconfig' into the web Configutator?
A. Yes. 
    <ul><code>
       cd mozilla<br>
       gmake -f client.mk webconfig
    </code></ul>
   It uses<code><b> netscape -remote</b></code>, so make sure you have 
   netscape running.

Q. How do I force <code><b>client.mk</b></code> to run autoconf?
A. Set the environment variable <code>RUN_AUTOCONF_LOCALLY</code>.
    You should not need to do this unless you are making changes to
    <code><b>configure.in</b></code>.
    The <code><b>configure</b></code> script gets updated automatically
    anytime someone makes a change to <code><b>configure.in</b></code>.

Q. How do I use .mozconfig with more than one tree?
A. If you want to use different options with different trees, you
    can save a ".mozconfig" as mozilla/.mozconfig in the root of the tree.
    That file will be read instead of the .mozconfig in your home
    directory.
    If you only want to override an option or two, you could save a
    mozilla/.mozconfig like the following,
    <ul><code>
       # mozilla/.mozconfig<br>
       . $HOME/.mozconfig<br>
       ac_add_options --disable-debug
    </code></ul>

Q. How do I temporarily disable <code><b>.mozconfig</b></code>?
A. If you have a <code><b>~/.mozconfig</b></code>, that you want to
   disable for a particular tree, you have two options. First, you can
   create an empty <code><b>.mozconfig</b></code>
   at the root of the tree,
    <ul><code>
       cd mozilla  (top of the source tree)<br>
       touch .mozconfig<br>
       (build as usual)
    </code></ul>
   Simply remove <topsrcdir>/.mozconfig when you want to revert to your
   ~/.mozconfig. Second, you can set <code>$MOZCONFIG</code> to point to
   an empty file,
    <ul><code>
       touch /tmp/empty<br>
       export MOZCONFIG=/tmp/empty  (or setenv MOZCONFIG /tmp/empty)<br>
       (build as usual)
    </code></ul>


Q. What is the best way to build with dependencies? Should I use 'make
    depend'?

A. If you are building with gcc or egcs, you should build with
    --enable-md. This causes the compiler to generate the dependencies
	when the objects are build. With this option, there is no need
	to run 'make depend'.<br>
   <font color=red>Update: "--enable-md" is used by default if your compiler
   supports it. If your compiler does not support it, running 'make depend' 
   is your best bet. (client.mk includes 'depend' as a default target.)</font>

Q. I changed a Makefile.in file. How to do I update the Makefile?
A. <code><b>make</b></code> will update the Makefile for you. It has
   a dependency rule to update the Makefile,
    <ul><code>
       $(OBJDIR)/Makefile: Makefile.in
             <ul>@echo Updating $@<br>
             $(topsrcdir)/build/autoconf/update-makefile.sh</ul>
    </code></ul>

Q. What is the difference between 'ac_add_options' and 'mk_add_options'?
A. 'ac_add_options' is for passing options to 'configure'. 'mk_add_options'
   is for passing options to 'client.mk'. (The 'mk' stands for make).
   Use 'mk_add_options' for everything that needs to be done before you run
   configure such as checking out the tree, or deciding where to put build
   objects.

