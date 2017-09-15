var err = SUCCESS;
var pkgName = "Swedish Language Pack for Mozilla";
var regName = "sv-SE";
var version = "6.0.0.1";

err = startInstall(pkgName, regName, version);
logComment("startInstall returned: " + err);

setPackageFolder(getFolder("Program", "chrome"));

err = addDirectory("chrome");
logComment("addDirectory returned: " + err);

err = getLastError();
if (err==SUCCESS || err==REBOOT_NEEDED)
{
	err = finalizeInstall();
	logComment("finalizeInstall returned: " + err);
}
else
{
	abortInstall();
	logComment("abortInstall due to error: " + err);
}
