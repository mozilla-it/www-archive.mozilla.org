/* -*- Mode: C++; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 2 -*- */

var xpi = new Object();
var numxpi = 0;
var numstatus = 0;

function statusCallback(url,status) {
  var text;
  var restart = false;
  dlg = window.open("","resultWindow");
  dlg.document.write("<head><title>XPInstall Results</title></head>");
  dlg.document.write("<body><h1>XPInstall Results</h1>");
  text = "Transformiix installation: ";
  switch (status) {
  case 999:
    restart = true;     // fall-through
  case 0:
    text += "Successful";
    break;
  default:
    text += "Error encountered -- "+status;
    break;
  }
  text += "<br>";
  dlg.document.write(text);
  if (restart) {
    dlg.document.write("<p>Some files were in use, you must restart to complete the installation");
  }

  dlg.document.write("</body>");
  dlg.document.close();
}

function launch() {
  var OSDir = "";
  if ((navigator.appVersion.indexOf("Linux") != -1)
      || (navigator.platform.indexOf("Linux") != -1)) {
    OSDir = "linux";
    OSDir = "http://people.netscape.com/peterv/Transformiix/linux/transformiix.xpi";
  } else if (navigator.platform.indexOf("Mac") != -1) {
    //OSDir = "mac";
    //OSDir = "http://www.av.be/mozilla/mac/transformiix.xpi";
  } else if (navigator.platform.indexOf("Win") != -1) {
    OSDir = "win";
    OSDir = "http://people.netscape.com/peterv/Transformiix/win/transformiix.xpi";
  } else if (navigator.platform.indexOf("SunOS") != -1) {
    OSDir = "solaris";
    OSDir = "http://www.numerik.uni-kiel.de/~ah/mozilla/transformiix.xpi";
  }
  if (OSDir != "") {
    //xpi["Transformiix"] = "ftp://ftp.mozilla.org/pub/projects/xslt/"+OSDir + "/transformiix.xpi";
    xpi["Transformiix"] = OSDir;
    if ((navigator.appCodeName.indexOf("Mozilla")!=-1)
        && (navigator.appVersion.indexOf("5.0")!=-1)){
      InstallTrigger.install(xpi,statusCallback);
    } else {
      //document.location = "ftp://ftp.mozilla.org/pub/projects/xslt/"+OSDir + "/transformiix.xpi";
      document.location = OSDir;
    }
  } else {
    alert("sorry, couldn't find XSLT binary for "+navigator.platform);
  }
}
