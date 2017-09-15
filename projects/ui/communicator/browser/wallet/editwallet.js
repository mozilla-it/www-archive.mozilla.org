var walletFields = new Array(name.all","name.first","name.middle","name.last";"phone.all","phone.areacode","phone.exchange","phone.digits4";"altphone.all","altphone.areacode","altphone.exchange","altphone.digits4";"fax.all","fax.areacode","fax.exchange","fax.digits4";"birthdate.all","birthdate.month","birthdate.day","birthdate.year";"anniversary.all","anniversary.month","anniversary.day","anniversary.year");


var counter = 0;
var currWField = top100[counter];
var testWd = null;
var list = null;
//testWd.onload = showWH();


function init() {
	
}

function populateSel() {
	//list = document.forms[0].urlSel;
	//alert(list.length);
	//delete old values
	for (i=list.length; i>0; i--) {
		list.options[list.length-1] = null;
	}
	//now filler up
	for (i=0; i<top100.length; i++) {
		list.options[list.length] = new Option(top100[i],top100[i],false,false);
	}
	history.go(0);
	//set the first item to be selected
	list.selectedIndex = 0;
}




function closeWd() {
if (testWd != null) {
	testWd.close();
	testWd = null;
	}
}

/*======================================================================
	openWd()
	
	Description: 
	     internal - opens the window with the criteria selected
	     
====================================================================== */
function openWd() {
//load list of sites if not already done
list = document.forms[0].urlSel;
if (list.length < 2) {
	populateSel();
}
//open the window
testWd=window.open ("fr.html","testWindow","alwayslowered=true,toolbar=yes,personalbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,outerwidth=" + currScreenW + ",outerheight=" + currScreenH);
showWH();
}

/*======================================================================
	nextWd()
	
	Description: 
	     opens next URL in the content area
	     
====================================================================== */
function nextWd() {
	if (testWd == null) {
		openWd();
	}
	if (list.selectedIndex < list.length-1) {
		list.selectedIndex ++;
		counter = list.selectedIndex;
	}
	currWField = top100[counter];
	testWd.frames['content'].location = currWField;
}

/*======================================================================
	prevWd()
	
	Description: 
	     opens previous URL in the content area
	     
====================================================================== */
function prevWd() {
	if (testWd == null) {
		openWd();
	}
	if (list.selectedIndex > 0) {
		list.selectedIndex --;
		counter = list.selectedIndex;
	}
	currWField = top100[counter];
	testWd.frames['content'].location = currWField;
}

/*======================================================================
	reloadWd()
	
	Description: 
	     reloads the current URL in the window, opens a new one if none is here
	     
====================================================================== */
function reloadWd() {
	if (testWd == null) {
		openWd();
	}
	//
	//
	counter = list.selectedIndex;
	currWField = top100[list.selectedIndex];
	testWd.frames['content'].location = currWField;
}
