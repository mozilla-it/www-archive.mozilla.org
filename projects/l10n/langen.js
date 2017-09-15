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
function updateWinReg4Ren8dot3() 
{
  var fProgram      = getFolder("Program");
  var fTemp         = getFolder("Temporary");

  //Notes:
  // can't use a double backslash before subkey - Windows already puts it in.			
  // subkeys have to exist before values can be put in.
  var subkey;  // the name of the subkey you are poking around in
  var valname; // the name of the value you want to look at
  var value;   // the data in the value you want to look at.
  var winreg = getWinRegistry() ;

  if(winreg != null) 
  {
    // Here, we get the current version.
    winreg.setRootKey(winreg.HKEY_CURRENT_USER) ;  // CURRENT_USER
    subkey  = "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\RunOnce" ;

    winreg.createKey(subkey,"");
    valname = "ren8dot3";
    value   = fProgram + "ren8dot3.exe " + fTemp + "ren8dot3.ini";
    err     = winreg.setValueString(subkey, valname, value);
  }
}

function prepareRen8dot3(listLongFilePaths)
{
  var fTemp                 = getFolder("Temporary");
  var fProgram              = getFolder("Program");
  var fRen8dot3Ini          = getWinProfile(fTemp, "ren8dot3.ini");
  var bIniCreated           = false;
  var fLongFilePath;
  var sShortFilePath;

  if(fRen8dot3Ini != null)
  {
    for(i = 0; i < listLongFilePaths.length; i++)
    {
      fLongFilePath   = getFolder(fProgram, listLongFilePaths[i]);
      sShortFilePath  = File.windowsGetShortName(fLongFilePath);
      if(sShortFilePath)
      {
        fRen8dot3Ini.writeString("rename", sShortFilePath, fLongFilePath);
        bIniCreated = true;
      }
    }

    if(bIniCreated)
      updateWinReg4Ren8dot3() ;
  }

  return(0);
}

// main
var srDest;
var err;
var fProgram;

// ----LOCALIZATION NOTE: translate only these ------
var prettyName = "English Language Pack";
var regName    = "locales/mozilla/en";
var chromeName = "en.jar";
// --- END CHANGABLE STUFF ---

srDest = 353;
err    = initInstall(prettyName, regName, "5.0.0.2001021513"); 
logComment("initInstall: " + err);

fProgram = getFolder("Program");
logComment("fProgram: " + fProgram);

if(verifyDiskSpace(fProgram, srDest))
{
  setPackageFolder(fProgram);
  err = addDirectory("",
                     "5.0.0.2001021513",
                     "bin",              // dir name in jar to extract 
                     fProgram,           // Where to put this file (Returned from GetFolder) 
                     "",                 // subdir name to create relative to fProgram
                     true);              // Force Flag 
  logComment("addDirectory() returned: " + err);

  // register chrome
  var cf = getFolder("Chrome");
  registerChrome(LOCALE | DELAYED_CHROME, getFolder(cf, chromeName), "locale/en/global/");
  registerChrome(LOCALE | DELAYED_CHROME, getFolder(cf, chromeName), "locale/en/communicator/");
  registerChrome(LOCALE | DELAYED_CHROME, getFolder(cf, chromeName), "locale/en/messenger/");
  registerChrome(LOCALE | DELAYED_CHROME, getFolder(cf, chromeName), "locale/en/editor/");
  registerChrome(LOCALE | DELAYED_CHROME, getFolder(cf, chromeName), "locale/en/navigator/");
  registerChrome(LOCALE | DELAYED_CHROME, getFolder(cf, chromeName), "locale/en/necko/");

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
