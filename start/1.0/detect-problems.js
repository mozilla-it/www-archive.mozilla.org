var ua = navigator.userAgent;

// ### Uncomment one of these user agents to test this script
// ua = "Mozilla/5.0 (X11; I; Linux i686; en-US; rv:0.9.9+) Gecko/20020306";
// ua = "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-US; rv:1.0rc1+) Gecko/20020317";
// ua = "Mozilla/5.0 (Macintosh; N; PPC; en-US; rv:1.0rc2) Gecko/20020510";
// ua = "Mozilla/5.0 (Windows; I; Windows NT 5.0; ru-RU; rv:1.0rc2) Gecko/20020511";
// ua = "Mozilla/5.0 (Windows; I; Windows NT 5.0; ru-RU; rv:1.0rc2) Gecko/00000000";
// ua = "Mozilla/4.0 (Windows;)";
// ua = "Mozilla/5.0 (compatible; Konqueror/3.0.0)";
// ua = "Mozilla/5.0 (compatible; Konqueror/3.0.0; Linux 2.4.18-6mdkenterprise; X11; i686; en_US)";
// ua = "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.0rc2) Gecko/20020513 Netscape/7.0b1";
// ua = "Mozilla/5.0 (Windows; U; Win98; en-US; rv:1.0rc1) Gecko/20020501 AOL/7.0";
// ua = "Mozilla/5.0 (X11; N; FreeBSD 4.1-RELEASE i386; Galeon) Gecko/20000818";
// ua = "Mozilla/5.0 (X11; N; FreeBSD 4.1.1-STABLE i386; Galeon) Gecko/20000827";
// ua = "Mozilla/5.0 (X11; N; FreeBSD 4.3-RELEASE i386; Galeon) Gecko/20010419";
// ua = "Mozilla/5.0 (X11; U; Galeon; 0.12; 590080)";
// ua = "Mozilla/5.0 (X11; U; Galeon; 0.12; 590336)";
// ua = "K-Meleon/0.4 (Win 98; rv:0.9) Gecko, Longview, Washington, USA";
// ua = "K-Meleon/0.6 (Windows; U; Windows NT 5.0; en-US; rv:0.9.5) Gecko/20011011";
// ua = "K-Meleon/0.6 (Windows; U; Windows NT 5.1; en-US; rv:0.9.5) Gecko/20011011";
// ua = "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:0.9.9) Gecko/20020412 Debian/0.9.9-6 BuildID: 20020404";
// ua = "Mozilla/4.0 (compatible; MSIE 5.0; Windows 95) Opera 5.12 [en]";
var ual = ua.toLowerCase();

// Browsers we have to keep track of for various reasons

var is_major = parseInt(navigator.appVersion);
var is_minor = parseFloat(navigator.appVersion);

var latestmilestone = "1.0.1";
var latestmilestoneName = "Mozilla 1.0.1"
var osxNightly = "mozilla-macosX-trunk.smi.bin";
var osxRelease = "mozilla-macosX-1.0.1.smi.bin";
var os9Nightly = "mozilla-mac-trunk-full.bin";
var os9Release = "mozilla-mac-101-full.bin";
var win32Nightly = "mozilla-win32-installer-sea.exe";
var win32Release = "mozilla-win32-1.0.1-installer-sea.exe";
var x86LinuxNightly = "mozilla-i686-pc-linux-gnu-sea.tar.gz";
var x86LinuxRelease = "mozilla-i686-pc-linux-gnu-1.0.1-sea.tar.gz";
var nightlyDefault = "http://ftp.mozilla.org/pub/mozilla/nightly/latest/";
var releaseDefault = "http://mozilla.org/releases/";
var nightlydir = "http://ftp.mozilla.org/pub/mozilla/nightly/latest/";
var releasedir = "http://ftp.mozilla.org/pub/mozilla/releases/mozilla1.0.1/";


// Leave the <p>'s where they are! This works around a Mozilla rendering bug.
var webError = new Array();
webError[0] = '<p><span class=\"warning\">Warning!</span><p> Your copy of Mozilla is vulnerable to a <a href=\"http://groups.google.com/groups?as_umsgid=3CD095D4.9050003%40mozilla.org&amp;hl=en\"> security bug</a>. You should fix this problem by downloading and installing the latest Mozilla build, #Milestone#.</p>';
webError[1] = '<p>Note: you are using an old nightly build of Mozilla. Please help us out by testing #Nightly# instead.</p>';
// webError[2] = '<p>Note: You are using an old Mozilla milestone. Please help us out by testing the latest one, #Milestone#, instead.</p>';
webError[2] = '<p style="border:0.4em solid #000; margin:1em; background-color:#ddd;padding:1.5em">If you love to live on the bleeding edge, please help us out by downloading and testing #Milestone#. Otherwise, ignore this message and wait for the final release.</p>';


function detectErrors() {
   fixPngs('');
   errorMessages();
}

function silentlyFixErrors(level) {
   fixPngs(level);
}

function fixPngs(level) {
   var is_win = ( (ual.indexOf("win")!=-1) || (ual.indexOf("16bit")!=-1) );
   var is_ie = ((ual.indexOf("msie") != -1) && (ual.indexOf("opera") == -1) && (ual.indexOf("konqueror") == -1));
   var is_ie4    = (is_ie && (is_major == 4) && (ual.indexOf("msie 4")!=-1) );
   var is_ie5    = (is_ie && (is_major == 4) && (ual.indexOf("msie 5.0")!=-1) );
   var is_ie5_5  = (is_ie && (is_major == 4) && (ual.indexOf("msie 5.5") !=-1));
   var is_ie6    = (is_ie && (is_major == 4) && (ual.indexOf("msie 6.")!=-1) );

   if (!level) level = "";

   if ( is_ie ) {
      if (is_win) {
         if ( is_ie6 ) {
            // Fix png alpha channels in IE using DirectX
            var blankImage = new Image();
            blankImage.src = level + 'images/blank.png';
      
            document.all['mozillaLogo'].src = blankImage.src;
            document.all['dinoTail'].src = blankImage.src;
            document.all['dinoHead'].src = blankImage.src;

            // I would like to thank the people of 
            // MozillaZine and Slashdot for this one.
            document.all['mozillaLogo'].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + level + "images/mozillaLogo.png', sizingMethod='image')";
            document.all['dinoTail'].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + level + "images/dino_tail_iecolour.png', sizingMethod='image')";
            document.all['dinoHead'].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + level + "images/dino.png', sizingMethod='image')";
         } else if ( is_ie4 || is_ie5 || is_ie5_5 ) {
            document.all['mozillaLogo'].style.display = "none";
            document.all['dinoHead'].style.display = "none";
            document.all['dinoTail'].style.display = "none";
            document.all['mainHeader'].innerHTML = "&nbsp;Mozilla";
         }
      }
   }
}

function createErrorMessages() {
   var nurl;
   var murl;

   if (ua.match(/(PPC Mac OS X)/)) {
      nurl = nightlydir + osxNightly;
      murl = releasedir + osxRelease;
   } else if (ua.match(/(Macintosh; [IUN]; PPC)/)) {
      nurl = nightlydir + os9Nightly;
      murl = releasedir + os9Release;
   } else if (ua.match(/(\(Windows;)/)) {
      nurl = nightlydir + win32Nightly;
      murl = releasedir + win32Release;
   } else if (ua.match(/(X11; [IUN]; Linux i686;)/)) {
      nurl = nightlydir + x86LinuxNightly;
      murl = releasedir + x86LinuxRelease;
   } else {
      nurl = nightlyDefault;
      murl = releaseDefault;
   }

   // Loop through all the error messages
   // and replace the markers with links.
   var nightlyLink = '<a href=\"' + nurl + '\" class=\"nversion\">the latest nightly build</a>';
   var milestoneLink = '<a href=\"' + murl + '\" class=\"mversion\">' + latestmilestoneName + '</a>';
   var regExp1 = /#Milestone#/gi;
   var regExp2 = /#Nightly#/gi;
   var regExp3 = /#MURL#/gi;
   var regExp4 = /#NURL#/gi;
   for ( var i = 0; i < webError.length; i++ ) {
      webError[i] = webError[i].replace(regExp1, milestoneLink);
      webError[i] = webError[i].replace(regExp2, nightlyLink);
      webError[i] = webError[i].replace(regExp3, murl);
      webError[i] = webError[i].replace(regExp4, nurl);
   }
}

function errorMessages() {
   // refrain from nagging for a few days till the initial rush of
   // downloads is over. 
   return;

   var is_gecko = (ual.indexOf("gecko") != -1);

   if (!is_gecko) {
      // Not a gecko browser, we don't need these checks
      return;
   }

   // Check to see if this is a mozilla.org browser or some other gecko browser
   var vendor = ua.match( /^Mozilla\/5\.0.*rv:[0-9rc.+abehplt]+[\)].*Gecko\/[0-9]+$/ );

   // Vendor is null if it's Netscape or AOL or something that uses the engine
   if (!vendor) {
      return;
   }

   createErrorMessages();

   // How long till we start nagging users of old nightly builds
   var nightlyLimit = 7;
   // How long till we start nagging users of old milestone builds
   var milestoneLimit = 14;

   var todayDate = new Date();
   var today = (todayDate.getFullYear() * 365) + 
              ((todayDate.getMonth() + 1) * 31) +
                todayDate.getDate();


   // Search for the Gecko build date in the User Agent string
   var re = /Gecko\/(\d+)/;
   var builddate = ua.match(re);
   // Search for the Mozilla revision in the User Agent string
   var re2 = /rv:(.+)\)/;
   var revision = ua.match(re2);
   // If the Mozilla revision ends with a '+' then this is a nightly build
   var re3 = /.+(\+)/;
   var nightly;
   if (revision) nightly = revision[1].match(re3);
 
   if (builddate) {
      // if the build date is all zeros, the user self-built. If not, 
      // we can do upgrade nagging.
      if (builddate != "0000000000") {
         builddate = builddate[1];

         // Convert from "text" date to numerical form   
         var buildyear = Math.floor(builddate / 10000);
         builddate = builddate % 10000;
         var buildmonth = Math.floor(builddate / 100);
         builddate = builddate % 100;
         builddate = builddate + (buildmonth * 31) + (buildyear * 365);

         // if the build is older than May 2 then it is vulnerable to
         // the XMLHttpRequest file disclosure vulnerability (Bugtraq id 4628)
         var securitybugDate = new Date(2002,04,02)
         var securitybugday  = (securitybugDate.getFullYear() * 365) + 
                              ((securitybugDate.getMonth() + 1) * 31) +
                                securitybugDate.getDate();

         var nag = document.getElementById('nag');
         if (builddate < securitybugday) {
            nag.innerHTML = webError[0];
         } else if (nightly && (builddate != 0) && (today - builddate > nightlyLimit)) {
            // old nightly
            nag.innerHTML = webError[1];
         } else if (!nightly && revision && (revision[1] < latestmilestone)
                && (today - builddate > milestoneLimit) ) {
            // old milestone build
            nag.innerHTML = webError[2];
         }
      }
   }
}

