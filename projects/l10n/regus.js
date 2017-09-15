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

// ----LOCALIZATION NOTE: translate only these ------
var prettyName = "US Region Pack";
var chromeNode = "US";
// --- END CHANGABLE STUFF ---

var regName    = "locales/mozilla/" + chromeNode;
var chromeName = chromeNode + ".jar";
var localeName = "locale/" + chromeNode + "/";

srDest = 769;
err    = initInstall(prettyName, regName, "5.0.0.2001030120"); 
logComment("initInstall: " + err);

fProgram = getFolder("Program");
logComment("fProgram: " + fProgram);

if(verifyDiskSpace(fProgram, srDest))
{
  setPackageFolder(fProgram);
  err = addDirectory("",
                     "5.0.0.2001030120",
                     "bin",              // dir name in jar to extract 
                     fProgram,           // Where to put this file (Returned from GetFolder) 
                     "",                 // subdir name to create relative to fProgram
                     true);              // Force Flag 
  logComment("addDirectory() returned: " + err);

  // register chrome
  var cf = getFolder("Chrome");
  registerChrome(LOCALE, getFolder(cf, chromeName), localeName + "global-region/");
  registerChrome(LOCALE, getFolder(cf, chromeName), localeName + "communicator-region/");
  registerChrome(LOCALE, getFolder(cf, chromeName), localeName + "editor-region/");
  registerChrome(LOCALE, getFolder(cf, chromeName), localeName + "messenger-region/");
  registerChrome(LOCALE, getFolder(cf, chromeName), localeName + "navigator-region/");

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
