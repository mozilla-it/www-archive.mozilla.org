// this function verifies disk space in kilobytes
function verifyDiskSpace(dirPath, spaceRequired)
{
  var spaceAvailable;

  // Get the available disk space on the given path
  spaceAvailable = fileGetDiskSpaceAvailable(dirPath);

  // Convert the available disk space into kilobytes
  spaceAvailable = parseInt(spaceAvailable / 1024);

  // do the verification
  if(spaceAvailable < spaceRequired)
  {
    logComment("Insufficient disk space: " + dirPath);
    logComment("  required : " + spaceRequired + " K");
    logComment("  available: " + spaceAvailable + " K");
    return(false);
  }

  return(true);
}
// main
var srDest;
var err;
var fProgram;

// OS type detection
// which platform?
var platformStr = new String(Install.platform);
var platformNode;
if (!platformStr.search(/^Macintosh/))
    platformNode = 'mac';
else if (!platformStr.search(/^Win/))
    platformNode = 'win';
else
    platformNode = 'unix';

logComment("initInstall: platformNode=" + platformNode);
// end
// end - OS type detection

// ----LOCALIZATION NOTE: translate only these ------
var prettyName = "English (US) Language Pack";
var langcode = "en";
var chromeNode = langcode + "-US";
// --- END CHANGABLE STUFF ---
var regName      = "locales/netscape/" + chromeNode;
var chromeName   = chromeNode + ".jar";
var platformName = langcode + "-" + platformNode + ".jar";
var localeName   = "locale/" + chromeNode + "/";

srDest = 641;
err    = initInstall(prettyName, regName, "6.0.0.2001032109"); 
logComment("initInstall: " + err);

fProgram = getFolder("Program");
logComment("fProgram: " + fProgram);

if(verifyDiskSpace(fProgram, srDest))
{
  setPackageFolder(fProgram);

  err = addDirectory("",
                     "6.0.0.2001032109",
                     "bin",              // dir name in jar to extract 
                     fProgram,           // Where to put this file (Returned from GetFolder) 
                     "",                 // subdir name to create relative to fProgram
                     true);              // Force Flag 
  logComment("addDirectory() returned: " + err);

  // register chrome
  var cf = getFolder("Chrome");
  registerChrome(LOCALE, getFolder(cf, chromeName), localeName + "global/");
  registerChrome(LOCALE, getFolder(cf, chromeName), localeName + "communicator/");
  registerChrome(LOCALE, getFolder(cf, chromeName), localeName + "messenger/");
  registerChrome(LOCALE, getFolder(cf, chromeName), localeName + "editor/");
  registerChrome(LOCALE, getFolder(cf, chromeName), localeName + "navigator/");
  registerChrome(LOCALE, getFolder(cf, chromeName), localeName + "aim/");
  registerChrome(LOCALE, getFolder(cf, chromeName), localeName + "necko/");
  registerChrome(LOCALE, getFolder(cf, chromeName), localeName + "cookie/");
  registerChrome(LOCALE, getFolder(cf, chromeName), localeName + "wallet/");

  registerChrome(LOCALE, getFolder(cf, platformName), localeName + "global-platform/");
  registerChrome(LOCALE, getFolder(cf, platformName), localeName + "communicator-platform/");

  // check return value
  if(err == SUCCESS)
  {
    err = performInstall(); 
    logComment("performInstall() returned: " + err);
  }
  else
    cancelInstall(err);
}
else
  cancelInstall(INSUFFICIENT_DISK_SPACE);

// end main
