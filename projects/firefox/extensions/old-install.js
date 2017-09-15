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
var srDest = 110;

var err = initInstall("Tab Downloader 3.0 for Firebird 0.7", "Tab Downloader", "3.0"); 
logComment("initInstall: " + err);

if (verifyDiskSpace(getFolder("Program"), srDest))
{
    addFile("Tab Downloader Defaults",
            "3.0",
            "tabdownloader.js",
            getFolder("Program", "defaults/pref"),
            "tabdownloader.js",
            true);

    addFile("Tab Downloader Chrome",
            "bin/chrome/tabdownloader.jar", // jar source folder 
            getFolder("Chrome"),        // target folder
            "");                        // target subdir 

    registerChrome(PACKAGE | DELAYED_CHROME, getFolder("Chrome","tabdownloader.jar"), "content/tabdownloader/");
    registerChrome(LOCALE | DELAYED_CHROME, getFolder("Chrome","tabdownloader.jar"), "locale/en-US/tabdownloader/");

    if (err==SUCCESS)
        performInstall(); 
    else
        cancelInstall(err);
}
else
    cancelInstall(INSUFFICIENT_DISK_SPACE);
