
// KEYBOARD CONTROL IN NAV4

// support SPACE key codes (*not* RETURN because of Goto field!)
var nextKeys = new String("nN ")
var prevKeys = new String("pP")

function handleKeys(e) {
	var keyChar;
	if (is.nav5up);  /* TODO: Add Nav5 event handling! */
        else if (is.nav4) keyChar = String.fromCharCode(e.which);
        else if (is.ie4up) keyChar = String.fromCharCode(window.event.keyCode);
	if (prevKeys.indexOf(keyChar) != -1)
	{  prev_slide(); return false  }
	else if(nextKeys.indexOf(keyChar) != -1)
	{  next_slide(); return false  }
	else return true;
}




// Workaround for Nav3.x bug in which JavaScript files
// with <SCRIPT LANGUAGE="JavaScript1.2" SRC=...> are
// loaded, even though they should be ignored.
// Make sure this code is only executed by 4.x and later.
if (parseInt(navigator.appVersion) > 3) {

   // support ESC key code  (*not* BS because of Goto field!)
   // BUG: *** not working in 4.04? was it ever working? hmmm ...
   prevKeys.concat(String.fromCharCode(27))
   if (is.nav5);  /* TODO: Nav5 Support! */
   if (is.nav4) document.captureEvents(Event.KEYPRESS);
   document.onkeypress = handleKeys;

} // end of Nav4+ only if




// Code to open separate, small "Help" window.
function openHelp()
{   var presoWin;
    var winOptions = "location=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes,toolbar=no,scrollbars=yes,width=500,height=450";
    presoWin = window.open("help.htm", "help", winOptions);
    presoWin.focus();
    return false;
}
