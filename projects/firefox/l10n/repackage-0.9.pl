#!/usr/bin/perl -w

sub unJAR
{
    my $file = shift;

    -d $file && system("rm -rf $file");
    system("unzip -q -d $file $file.jar") && die("Could not unJAR $file.jar");
}

sub mv
{
    my ($from, $to) = @_;

    system("mv $from $to") && warn("Warning: Couldn't move $from to $to");
}

sub ensureDir
{
    my $fol = shift;
    -d $fol || mkdir $fol;
    while ($_ = shift) {
        $fol .= "/$_";
        -d $fol || mkdir $fol;
    }
}

(my $gFullCode = shift) || die ("No langcode specified!");
$gFullCode =~ /^([a-z]{2,3})-([A-Z]{2})$/ || die("Bad langcode!");

my $gLangCode = $1;
my $gCountryCode = $2;

(-e "$gFullCode.jar" &&
 -e "$gCountryCode.jar" &&
 -e "$gLangCode-win.jar" &&
 -e "$gLangCode-mac.jar" &&
 -e "$gLangCode-unix.jar") || die("Required JAR files not present!");
 
unJAR($gFullCode);
unJAR($gCountryCode);
unJAR("$gLangCode-win");
unJAR("$gLangCode-mac");
unJAR("$gLangCode-unix");

ensureDir("toolkit-$gFullCode", "chrome", "global", "dom");
ensureDir("toolkit-$gFullCode", "chrome", "global", "history");
ensureDir("toolkit-$gFullCode", "chrome", "global", "layout");
ensureDir("toolkit-$gFullCode", "chrome", "global", "security");
ensureDir("toolkit-$gFullCode", "chrome", "global", "webservices");
ensureDir("toolkit-$gFullCode", "chrome", "global", "xml");
ensureDir("toolkit-$gFullCode", "chrome", "global", "xpinstall");
ensureDir("toolkit-$gFullCode", "chrome", "global-region");
ensureDir("toolkit-$gFullCode", "chrome", "global-platform", "win");
ensureDir("toolkit-$gFullCode", "chrome", "global-platform", "mac");
ensureDir("toolkit-$gFullCode", "chrome", "global-platform", "unix");
ensureDir("toolkit-$gFullCode", "chrome", "necko");
ensureDir("toolkit-$gFullCode", "chrome", "mozapps", "downloads");
ensureDir("toolkit-$gFullCode", "chrome", "mozapps", "extensions");
ensureDir("toolkit-$gFullCode", "chrome", "mozapps", "profile");
ensureDir("toolkit-$gFullCode", "chrome", "mozapps", "update");
ensureDir("toolkit-$gFullCode", "chrome", "mozapps", "xpinstall");
ensureDir("toolkit-$gFullCode", "chrome", "autoconfig");
ensureDir("toolkit-$gFullCode", "chrome", "passwordmgr");
ensureDir("toolkit-$gFullCode", "chrome", "pipnss");
ensureDir("toolkit-$gFullCode", "chrome", "pippki");

ensureDir("browser-$gFullCode", "chrome", "browser", "bookmarks");
ensureDir("browser-$gFullCode", "chrome", "browser", "cookieviewer");
ensureDir("browser-$gFullCode", "chrome", "browser", "history");
ensureDir("browser-$gFullCode", "chrome", "browser", "migration");
ensureDir("browser-$gFullCode", "chrome", "browser", "pref");
ensureDir("browser-$gFullCode", "chrome", "browser", "sidebar");
ensureDir("browser-$gFullCode", "chrome", "browser-region");
ensureDir("browser-$gFullCode", "chrome", "cookie");
ensureDir("browser-$gFullCode", "chrome", "global");
ensureDir("browser-$gFullCode", "profile", "chrome");
ensureDir("browser-$gFullCode", "profile", "mac");
ensureDir("browser-$gFullCode", "profile", "win");
ensureDir("browser-$gFullCode", "profile", "unix");
ensureDir("browser-$gFullCode", "searchplugins");

system("find $gFullCode -name contents.rdf -exec rm {} \\;");
system("find $gCountryCode -name contents.rdf -exec rm {} \\;");
system("find $gLangCode-win -name contents.rdf -exec rm {} \\;");
system("find $gLangCode-mac -name contents.rdf -exec rm {} \\;");
system("find $gLangCode-unix -name contents.rdf -exec rm {} \\;");

# accessible.properties is no longer platform-specific

mv("$gLangCode-win/locale/$gFullCode/global-platform/accessible.properties",
   "toolkit-$gFullCode/chrome/global");
unlink("$gLangCode-mac/locale/$gFullCode/global-platform/accessible.properties");
unlink("$gLangCode-unix/locale/$gFullCode/global-platform/accessible.properties");

# platform-specific files

mv("$gLangCode-win/locale/$gFullCode/global-platform/*",
   "toolkit-$gFullCode/chrome/global-platform/win");
mv("$gLangCode-mac/locale/$gFullCode/global-platform/*",
   "toolkit-$gFullCode/chrome/global-platform/mac");
mv("$gLangCode-unix/locale/$gFullCode/global-platform/*",
   "toolkit-$gFullCode/chrome/global-platform/unix");

# former region pack, now integrated

mv("$gCountryCode/locale/$gCountryCode/global-region/*",
   "toolkit-$gFullCode/chrome/global-region");
mv("$gCountryCode/locale/$gCountryCode/browser-region/*",
   "browser-$gFullCode/chrome/browser-region");

# former communicator package, all the files are now moved

mv("$gFullCode/locale/$gFullCode/communicator/security.properties",
   "toolkit-$gFullCode/chrome/necko");
mv("$gFullCode/locale/$gFullCode/communicator/dom/*",
   "toolkit-$gFullCode/chrome/global/dom");
mv("$gFullCode/locale/$gFullCode/communicator/layout/*",
   "toolkit-$gFullCode/chrome/global/layout");
mv("$gFullCode/locale/$gFullCode/communicator/security/caps.properties",
   "toolkit-$gFullCode/chrome/global/security");
mv("$gFullCode/locale/$gFullCode/communicator/webservices/security.properties",
   "toolkit-$gFullCode/chrome/global/webservices");
mv("$gFullCode/locale/$gFullCode/communicator/xml/prettyprint.dtd",
   "toolkit-$gFullCode/chrome/global/xml");
mv("$gFullCode/locale/$gFullCode/communicator/xpinstall/xpinstall.properties",
   "toolkit-$gFullCode/chrome/global/xpinstall");

# global package

mv("$gFullCode/locale/$gFullCode/global/brand.*",
   "browser-$gFullCode/chrome/global");
unlink("$gFullCode/locale/$gFullCode/global/build.dtd");
mv("$gFullCode/locale/$gFullCode/global/*.dtd $gFullCode/locale/$gFullCode/global/*.properties $gFullCode/locale/$gFullCode/global/intl.css $gFullCode/locale/$gFullCode/global/about.xhtml",
   "toolkit-$gFullCode/chrome/global");

# mozapps

mv ("$gFullCode/locale/$gFullCode/mozapps/downloads/*",
    "toolkit-$gFullCode/chrome/mozapps/downloads");
mv ("$gFullCode/locale/$gFullCode/mozapps/extensions/*",
    "toolkit-$gFullCode/chrome/mozapps/extensions");
mv ("$gFullCode/locale/$gFullCode/mozapps/profile/*",
    "toolkit-$gFullCode/chrome/mozapps/profile");
mv ("$gFullCode/locale/$gFullCode/mozapps/update/*",
    "toolkit-$gFullCode/chrome/mozapps/update");
mv ("$gFullCode/locale/$gFullCode/mozapps/xpinstall/*",
    "toolkit-$gFullCode/chrome/mozapps/xpinstall");

# necko, autoconfig, pip*

mv("$gFullCode/locale/$gFullCode/necko/*",
   "toolkit-$gFullCode/chrome/necko");
mv("$gFullCode/locale/$gFullCode/autoconfig/*",
   "toolkit-$gFullCode/chrome/autoconfig");
mv("$gFullCode/locale/$gFullCode/pipnss/*",
   "toolkit-$gFullCode/chrome/pipnss");
mv("$gFullCode/locale/$gFullCode/pippki/*",
   "toolkit-$gFullCode/chrome/pippki");
mv("$gFullCode/locale/$gFullCode/passwordmgr/*",
   "toolkit-$gFullCode/chrome/passwordmgr");

# browser, cookie

mv("$gFullCode/locale/$gFullCode/browser/bookmarks/*",
   "browser-$gFullCode/chrome/browser/bookmarks");
mv("$gFullCode/locale/$gFullCode/browser/cookieviewer/*",
   "browser-$gFullCode/chrome/browser/cookieviewer");
mv("$gFullCode/locale/$gFullCode/browser/history/*",
   "browser-$gFullCode/chrome/browser/history");
mv("$gFullCode/locale/$gFullCode/browser/migration/*",
   "browser-$gFullCode/chrome/browser/migration");
mv("$gFullCode/locale/$gFullCode/browser/pref/*",
   "browser-$gFullCode/chrome/browser/pref");
mv("$gFullCode/locale/$gFullCode/browser/sidebar/*",
   "browser-$gFullCode/chrome/browser/sidebar");
mv("$gFullCode/locale/$gFullCode/browser/*.dtd $gFullCode/locale/$gFullCode/browser/*.properties",
   "browser-$gFullCode/chrome/browser");
mv("$gFullCode/locale/$gFullCode/cookie/cookieAcceptDialog.*",
   "browser-$gFullCode/chrome/cookie");

# OK, now ZIP it all back up

system("cd toolkit-$gFullCode; zip -q -r ../toolkit-$gFullCode.zip .");
system("cd browser-$gFullCode; zip -q -r ../browser-$gFullCode.zip .");
