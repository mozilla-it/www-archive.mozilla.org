var gPlatform = PLATFORM_WINDOWS;

var PLATFORM_OTHER    = 0;
var PLATFORM_WINDOWS  = 1;
var PLATFORM_LINUX    = 2;
var PLATFORM_MACOSX   = 3;
var PLATFORM_MAC      = 4;
var PLATFORM_MACOSX_PPC = 5;

if (navigator.platform.indexOf("Win32") != -1)
  gPlatform = PLATFORM_WINDOWS;
else if (navigator.platform.indexOf("Linux") != -1)
  gPlatform = PLATFORM_LINUX;
else if (navigator.userAgent.indexOf("Mac OS X") != -1)
  gPlatform = PLATFORM_MACOSX;
else if (navigator.userAgent.indexOf("MSIE 5.2") != -1)
  gPlatform = PLATFORM_MACOSX;
else if (navigator.platform.indexOf("Mac") != -1)
  gPlatform = PLATFORM_MAC;
else
  gPlatform = PLATFORM_OTHER;

function getPlatformName(aPlatform)
{
  if (aPlatform == PLATFORM_WINDOWS)
    return "Windows";
  if (aPlatform == PLATFORM_LINUX)
    return "Linux i686";
  if (aPlatform == PLATFORM_MACOSX)
    return "Mac OS X";
  if (aPlatform == PLATFORM_MACOSX_PPC)
    return "Mac OS X PowerPC";
  return "Unknown";
}

function getPlatformFileSize(aPlatform, aProduct)
{
  if (aProduct == "fx") {
    if (aPlatform == PLATFORM_WINDOWS)
      return "5.7MB";
    if (aPlatform == PLATFORM_LINUX)
      return "9.2MB";
    if (aPlatform == PLATFORM_MACOSX)
      return "18MB";
    if (aPlatform == PLATFORM_MACOSX_PPC)
      return "%%FIREFOX-MACOSX-PPC-SIZE%%";
  } else if (aProduct == "tb") {
    if (aPlatform == PLATFORM_WINDOWS)
      return "6.4MB";
    if (aPlatform == PLATFORM_LINUX)
      return "11MB";
    if (aPlatform == PLATFORM_MACOSX)
      return "19MB";
    if (aPlatform == PLATFORM_MACOSX_PPC)
      return "%%THUNDERBIRD-MACOSX-PPC-SIZE%%";
  } else if (aProduct == "fxbeta") {
    if (aPlatform == PLATFORM_WINDOWS)
      return "5.6MB";
    if (aPlatform == PLATFORM_LINUX)
      return "9.2MB";
    if (aPlatform == PLATFORM_MACOSX)
      return "18MB";
    if (aPlatform == PLATFORM_MACOSX_PPC)
      return "%%FIREFOX-DEVEL-MACOSX-PPC-SIZE%%";
  }
  else if (aProduct == "tbbeta") {
    if (aPlatform == PLATFORM_WINDOWS)
      return "6.4MB";
    if (aPlatform == PLATFORM_LINUX)
      return "11MB";
    if (aPlatform == PLATFORM_MACOSX)
      return "19MB";
    if (aPlatform == PLATFORM_MACOSX_PPC)
      return "%%THUNDERBIRD-DEVEL-MACOSX-PPC-SIZE%%";
  }
  return "Unknown";
}

function getProductName(aProduct)
{
  if (aProduct == "fx") {
    return "firefox";
  } else if (aProduct == "tb") {
    return "thunderbird";
  }
  return "Unknown";
}

var gDLVersions = {
  "fx": {
    "1.5.0.6": "firefox-1.5.0.6",
    "1.5.0.5": "firefox-1.5.0.5",
    "1.5.0.4": "firefox-1.5.0.4",
    "1.5.0.3": "firefox-1.5.0.3",
    "1.5.0.2": "firefox-1.5.0.2",
    "1.5.0.1": "firefox-1.5.0.1",
    "1.5": "firefox-1.5",
    "1.0.7": "firefox-1.0.7",
    "1.0.6": "firefox-1.0.6",
    "1.0.5": "firefox-1.0.5",
    "1.0.4": "firefox-1.0.4",
    "1.0.3": "firefox-1.0.3",
    "1.0.2": "firefox-1.0.2",
    "1.0.1": "firefox-1.0.1",
    "1.0": "firefox"
  },
  "tb": {
    "1.5.0.4": "thunderbird-1.5.0.4",
    "1.5.0.2": "thunderbird-1.5.0.2",
    "1.5": "thunderbird-1.5",
    "1.0.8": "thunderbird-1.0.8",
    "1.0.7": "thunderbird-1.0.7",
    "1.0.6": "thunderbird-1.0.6",
    "1.0.5": "thunderbird-1.0.5",
    "1.0.2": "thunderbird-1.0.2",
    "1.0": "thunderbird"
  },
  "fxbeta": {
    "2.0 RC 3": "firefox-2.0rc3",
    "2.0 RC 2": "firefox-2.0rc2",
    "2.0 RC 1": "firefox-2.0rc1",
    "2.0 Beta 2": "firefox-2.0b2",
    "2.0 Beta 1": "firefox-2.0b1",
    "1.5 RC 3": "firefox-1.5rc3",
    "1.5 RC 2": "firefox-1.5rc2",
    "1.5 RC 1": "firefox-1.5rc1",
    "1.5 Beta 2": "firefox-1.5b2",
    "1.5b1": "firefox-1.5b1"
  },
  "tbbeta": {
    "2.0 RC 1": "thunderbird-2.0.0.0rc1",
    "2.0 Beta 2": "thunderbird-2.0b2",
    "2.0 Beta 1": "thunderbird-2.0b1",
    "1.5 RC 2": "thunderbird-1.5rc2",
    "1.5 RC 1": "thunderbird-1.5rc1",
    "1.5 Beta 2": "thunderbird-1.5b2",
    "1.5b1": "thunderbird-1.5b1"
  }
};

function hasMacUniversal(aProduct, aVersion)
{
  return (aProduct == "fx" && aVersion >= "1.5.0.2") ||
    (aProduct == "tb" && aVersion >= "1.5.0.2") ||
    (aProduct == "fxbeta" && aVersion >= "1.5.0.4") ||
    (aProduct == "tbbeta" && aVersion >= "1.5.0.4");
}

function hasMacPowerPC(aProduct, aVersion)
{
  return (aProduct == "fx" && aVersion <= "1.5.0.3") ||
         (aProduct == "tb" && aVersion <= "1.5.0.4");
}

function getDownloadURLForLanguage(aLangID, aPlatform)
{
  // If we are testing the site locally, give the direct download URL.
  if (window.location.protocol == "file:") {
    var url = "http://download.mozilla.org/?product=";
  }
  // If it is IE/SP2, just give the direct download URL
  else if (window.navigator.userAgent.indexOf("SV1") != -1) {
    var url = "http://download.mozilla.org/?product=";
  } else {
  // If it is *not* IE/SP2, give the download/thankyou page
    var url = "http://www.mozilla.com/products/download.html?product=";
  }
  var version = aLangID[aLangID.product];
  url += gDLVersions[aLangID.product][version] + "&amp;os=";
  var abCD = aLangID.abCD;

  if (aPlatform == PLATFORM_WINDOWS) {
    url += "win";
  } else if (aPlatform == PLATFORM_LINUX) {
    url += "linux";
  } else if (aPlatform == PLATFORM_MACOSX) {
    url += "osx";
    if (abCD == "ja-JP")
      abCD = "ja-JPM";
    if (abCD == "ja")
      abCD = "ja-JP-mac";
  } else if (aPlatform == PLATFORM_MACOSX_PPC) {
    if (hasMacUniversal(aLangID.product, version))
      url += "osxppc";
    else
      url += "osx";
    if (abCD == "ja-JP")
      abCD = "ja-JPM";
    if (abCD == "ja")
      abCD = "ja-JP-mac";
  } else {
    return "http://www.mozilla.org/products/firefox/all.html";
  }

  return url + "&amp;lang=" + abCD;
}

// "" for a version means it should be "Not Yet Available" on all.html,
// null means it should not be listed
// A region code of "-" means that no region code should be used.
var gLanguages = {
  "af":  { "-":  { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Afrikaans",                localName: "Afrikaans" } },
  "ast": { "es": { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Asturian",                 localName: "Asturianu" } },
  "ar":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: null,      tbbeta: null,         name: "Arabic",                   localName: "\u0639\u0631\u0628\u064A" } },
  "be":  { "-":  { fx: null,      fxbeta: "2.0 RC 3",   tb: null,      tbbeta: "2.0 RC 1",         name: "Byelorussian",             localName: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F" } },
  "bg":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1",         name: "Bulgarian",                localName: "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438" } },
  "br":  { "fr": { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Breton",                   localName: "Brezhoneg" } },
  "ca":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Catalan",                  localName: "Catal\u00E0" } },
  "cs":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Czech",                    localName: "\u010Ce\u0161tina" } },
  "cy":  { "gb": { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Welsh",                    localName: "Cymraeg" } },
  "da":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1",         name: "Danish",                   localName: "Dansk" } },
  "de":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "German",                   localName: "Deutsch" } },
  "el":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Greek",                    localName: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AE" } },
  "en":  { "us": { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "English",                  localName: "English" },
           "gb": { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "English (British)",        localName: "English (British)" },
           "za": { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "English (South African)",  localName: "English (South African)" } },
  "es":  { "ar": { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Spanish (Latin American)", localName: "Espa\u00F1ol (de Am\u00E9rica)" },
           "es": { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Spanish (Spain)",          localName: "Espa\u00F1ol (de Espa\u00F1a)" } },
  "eu":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Basque",                   localName: "Euskara" } },
  "fi":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Finnish",                  localName: "Suomi" } },
  "fr":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "French",                   localName: "Fran\u00e7ais" } },
  "fy":  { "nl": { fx: null,      fxbeta: "2.0 RC 3",   tb: null,      tbbeta: null,         name: "Frisian",                  localName: "Frysk" } },
  "ga":  { "ie": { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: null,      tbbeta: "2.0 RC 1",         name: "Irish",                    localName: "Gaeilge" } },
  "gu":  { "in": { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: null, name: "Gujarati",                 localName: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0" } },
  "he":  { "-":  { fx: "1.5.0.4", fxbeta: null,         tb: "1.5.0.4", tbbeta: null, name: "Hebrew",                   localName: "\u05E2\u05D1\u05E8\u05D9\u05EA" } },
  "hu":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Hungarian",                localName: "Magyar" } },
  "hy":  { "am": { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Armenian",                 localName: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576" } },
  "it":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Italian",                  localName: "Italiano" } },
  "ja":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Japanese",                 localName: "\u65e5\u672c\u8a9e" } },
  "ko":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: null, name: "Korean",                   localName: "\uD55C\uAD6D\uC5B4" } },
  "lt":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: null,      tbbeta: "2.0 RC 1",         name: "Lithuanian",               localName: "Lietuvi\u0173" } },
  "mk":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1",         name: "Macedonian",               localName: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438" } },
  "mn":  { "-":  { fx: null,      fxbeta: "2.0 RC 3",   tb: null,      tbbeta: null,         name: "Mongolian",                localName: "\u041C\u043E\u043D\u0433\u043E\u043B" } },
  "nb":  { "no": { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Norwegian (Bokm\u00E5l)",  localName: "Norsk bokm\u00E5l" } },
  "nl":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Dutch",                    localName: "Nederlands" } },
  "nn":  { "no": { fx: null,      fxbeta: "2.0 RC 3",   tb: null,      tbbeta: "2.0 RC 1",         name: "Norwegian (Nynorsk)",      localName: "Norsk nynorsk" } },
  "nr":  { "-":  { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Ndebele, South",           localName: "isiNdebele Sepumalanga" } },
  "nso": { "-":  { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Northern Sotho",           localName: "Sepedi" } },
  "pa":  { "in": { fx: "1.5.0.4", fxbeta: null,         tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Punjabi",                  localName: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40" } },
  "pl":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Polish",                   localName: "Polski" } },
  "pt":  { "br": { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Portuguese (Brazilian)",   localName: "Portugu\u00EAs (do Brasil)" },
           "pt": { fx: null,      fxbeta: "2.0 RC 3",   tb: null,      tbbeta: "2.0 RC 1",         name: "Portuguese (Portugal)",    localName: "Portugu\u00EAs (Europeu)" } },
  "ro":  { "-":  { fx: "1.5.0.4", fxbeta: null,         tb: null,      tbbeta: null,         name: "Romanian",                 localName: "Rom\u00E2n\u0103" } },
  "ru":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Russian",                  localName: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" } },
  "sk":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Slovak",                   localName: "Slovensk\u00FD" } },
  "sl":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Slovenian",                localName: "Slovensko" } },
  "sq":  { "-":  { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Albanian",                 localName: "Shqipe" } },
  "ss":  { "-":  { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Siswati",                  localName: "Siswati" } },
  "st":  { "-":  { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Sotho, Southern",          localName: "Sesotho" } },
  "sv":  { "se": { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Swedish",                  localName: "Svenska" } },
  "tn":  { "-":  { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Tswana",                   localName: "Setswana" } },
  "tr":  { "-":  { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Turkish",                  localName: "T\u00FCrk\u00E7e" } },
  "ts":  { "-":  { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Tsonga",                   localName: "Mutsonga" } },
  "ve":  { "-":  { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Venda",                    localName: "Tshiven\u1E13a" } },
  "xh":  { "-":  { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Xhosa",                    localName: "isiXhosa" } },
  "zh":  { "cn": { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: "1.5.0.4", tbbeta: "2.0 RC 1", name: "Chinese (Simplified)",     localName: "\u4E2D\u6587 (\u7B80\u4F53)" },
           "tw": { fx: "1.5.0.4", fxbeta: "2.0 RC 3",   tb: null,      tbbeta: "2.0 RC 1",         name: "Chinese (Traditional)",    localName: "\u6b63\u9ad4\u4e2d\u6587 (\u7E41\u9AD4)" } },
  "zu":  { "-":  { fx: null,      fxbeta: null,         tb: null,      tbbeta: null,         name: "Zulu",                     localName: "isiZulu" } }
};


function LanguageID(aAB, aCD, aProduct, aBuild)
{
  if (aCD == "-")
    this.abCD = aAB;
  else
    this.abCD = aAB + "-" + aCD.toUpperCase();
  this.product = aProduct;
  for (var prop in aBuild)
    this[prop] = aBuild[prop]
}

function buildValidForPlatform(aLangID, aPlatform)
{
  if ((aLangID.abCD == "gu-IN" ) &&
      (aPlatform == PLATFORM_MACOSX || aPlatform == PLATFORM_MACOSX_PPC))
    return false;

  return true;
}

function getLanguageIDs(aProduct)
{
  var language = "";
  if (navigator.language)
    language = navigator.language;
  else if (navigator.userLanguage)
    language = navigator.userLanguage;
  else if (navigator.systemLanguage)
    language = navigator.systemLanguage;

  // Convert "en" to "en-US" as well since en-US build is the canonical
  // translation, and thus better tested.
  if (language == "" || language == "en")
    language = "en-US";

  // Konqueror uses '_' where other browsers use '-'.
  if (language.indexOf("_") != -1)
    language = language.split("_").join("-");

  language = language.toLowerCase();
  var languageCode = language.split("-")[0];
  var regionCode = language.split("-")[1];

  // String comparison actually works for version numbers.
  var currentVersion = gLanguages["en"]["us"][aProduct];
  var bestVersion = "";
  var ids = [];

  if (gLanguages[languageCode]) {
    var region;
    var build;
    var langid;

    for (region in gLanguages[languageCode]) {
      build = gLanguages[languageCode][region];
      if (build[aProduct] && regionCode == region) {
        langid = new LanguageID(languageCode, regionCode, aProduct, build);
        if (buildValidForPlatform(langid, gPlatform)) {
          ids[ids.length] = langid;
          bestVersion = build[aProduct];
        }
      }
    }

    // We have a localized build for this language, but not this region.
    // Show all available regions and let the user pick.

    if (bestVersion != currentVersion) {
      var bestRegionVersion = "";
      for (region in gLanguages[languageCode]) {
        build = gLanguages[languageCode][region];
        if (build[aProduct] > bestVersion) {
          langid = new LanguageID(languageCode, region, aProduct, build);
          if (buildValidForPlatform(langid, gPlatform)) {
            ids[ids.length] = langid;
            if (build[aProduct] > bestRegionVersion)
              bestRegionVersion = build[aProduct];
          }
        }
      }
      if (bestRegionVersion > bestVersion)
        bestVersion = bestRegionVersion;
    }
  }
  if (bestVersion != currentVersion) {
    ids[ids.length] = new LanguageID("en", "us", aProduct, gLanguages["en"]["us"]);
  }

  return ids;
}

function writeDownloadItem(aLanguageID)
{
  var item = gDownloadItemTemplate;
  item = item.replace(/%DOWNLOAD_URL%/g,  getDownloadURLForLanguage(aLanguageID, gPlatform));
  item = item.replace(/%VERSION%/g,       aLanguageID[aLanguageID.product]);
  item = item.replace(/%PLATFORM_NAME%/g, getPlatformName(gPlatform));
  item = item.replace(/%LANGUAGE_NAME%/g, aLanguageID.name);
  item = item.replace(/%FILE_SIZE%/g,     getPlatformFileSize(gPlatform, aLanguageID.product));
  document.writeln(item);
}

function writeDownloadItems(aProduct)
{
  // Show the dynamic links
  if (gPlatform == PLATFORM_MAC) {
    document.writeln(gDownloadItemMacOS9);
  } else if (gPlatform == PLATFORM_OTHER) {
    document.writeln(gDownloadItemOtherPlatform);
  } else {
    var languageIDs = getLanguageIDs(aProduct);
    for (var i = 0; i < languageIDs.length; ++i)
      writeDownloadItem(languageIDs[i]);
  }
}
