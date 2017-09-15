// If your presentation is longer than 200 slides,
// you could change the array size below.
filename = new Array(200);

first_slide = 0;
last_slide = 0;
current_slide = 1;
slides_inserted = 0;
slides_deleted = 0;
show_slide_filename = 0;


/* function AddSlide adds a slide to the presentation at the end.      */
/*                                                                     */
/* parameter name is the name of the file, without the .htm extension. */

function AddSlide(name)
{
	last_slide++;
	if(name == null) name = last_slide-slides_inserted+slides_deleted;
	else {
		slides_inserted++;
	}
	filename[last_slide] = name + ".htm";
}


// DON'T EDIT ANY OF THE TEXT ABOVE THIS LINE!!!
// It's source code you don't need to touch and should not touch.
//
// To add, delete, and reorder slides, 
// just add, delete, and reorder the AddSlide("FILENAME")
// entries below.  Each name in double quotes is the name
// of an HTML file in this presentation directory.
//
// If you want to include an HTML file which is in a subdirectory,
// separate the subdirectory name and the HTML file name with a
// forward slash like this: AddSlide("DIRECTORYNAME/FILENAME")
// (This works fine across platforms, even on Windows.) 
//
// Within the quotes, don't include an extension like .htm or .html.
// This application automatically adds .htm to the name when it
// looks in the directory for the file.  In the directory, the
// HTML file *must* have the three letter extension .htm.


// Means the preso is being set for placement on the web
// to be viewed directly (with no human speaker) by the end user.
var online = false


// Running online as Visual Tutorial with explanatory text.
var tutorialMode = false


// Keep these first three slides (Logopage, Title, S_agenda)
// in your presentation so we have a standard look and feel.
// (Edit the contents of the Title and S_agenda slide.)


var showURLsAtEnd = true


// Keep these first three slides (Logopage, Title, S_agenda)
// in your presentation so we have a standard look and feel.
// (Edit the contents of the Title and S_agenda slide.)

// if (!online) { AddSlide("logopage"); }

// Add *either* the tutorial title page or the presentation
// title page, depending on whether we're running in tutorialMode.
if (tutorialMode) { AddSlide("titletut"); }
else if (online) { AddSlide("titleonl"); }
else { AddSlide("title"); }	// title slide

if (tutorialMode || online ) { AddSlide("howto"); }
if (tutorialMode) { AddSlide("howtotu2"); }
else if (online) { AddSlide("howto2"); }


// AddSlide("X_what");
// AddSlide("X_what2");
// AddSlide("X_whatnt");

// AddSlide("X_agenda")

 

// AddSlide("topics");

AddSlide("standard");

AddSlide("travel");


AddSlide("cssfirst");
AddSlide("himgbutn");

AddSlide("whideelt");
AddSlide("whilite");

AddSlide("wmoveelt");
AddSlide("wloopelt");

AddSlide("xnhtml");

AddSlide("gwhatis");
AddSlide("gengine");
AddSlide("gnotbrow");
AddSlide("gfastsm");
AddSlide("gstdlead");
AddSlide("gdevice");
AddSlide("gembedbl");
AddSlide("gmomentm");
AddSlide("stdquote");


/*

// AddSlide("X_agend1")

// *** START CSS

AddSlide("real");

AddSlide("real1");

AddSlide("J_whatCS")
// AddSlide("J_whatdo");
// AddSlide("J_benef") 

// AddSlide("U_CS1onl")
AddSlide("X_cssafe")
AddSlide("H_back0");

AddSlide("H_backg");
AddSlide("H_backg1");
AddSlide("H_backg2");
AddSlide("H_css1");


// copied from cssp

// AddSlide("X_agend2")



// *** START CSSP

AddSlide("real2");


// Running as standalone CSSP preso instead of combined CSS-CSSP preso.
var csspStandalone = false

AddSlide("P_whatP")
AddSlide("P_prop");
AddSlide("P_zdemo");
// AddSlide("U_CSPonl")

AddSlide("H_cssp");

AddSlide("H_stycmt");

// *** END CSSP !!!


// writing for the web

// AddSlide("X_agend3")

// AddSlide("W_stdchk")
// AddSlide("W_site")
// AddSlide("W_LCD")
// AddSlide("W_LCD1")
// AddSlide("W_LCD1P")
// AddSlide("W_JS10")

AddSlide("real3");

AddSlide("W_JSclev")
//AddSlide("W_JSclex")



// AddSlide("X_agend4")


// *** dealing with markup


// AddSlide("H_jsver0");
// AddSlide("W_nav3bg")
// AddSlide("W_nav3b2")
// AddSlide("H_ie3ie4")

AddSlide("H_jsver");
// AddSlide("H_jsver2");
AddSlide("H_jsver3");

AddSlide("domsniff");

AddSlide("real4");


AddSlide("X_dynmkw");
AddSlide("X_dynmkb");
AddSlide("X_dynmsv");
AddSlide("X_dynmsb");
AddSlide("X_dynmxb");

// AddSlide("H_nolay");
// AddSlide("H_laydiv");
// AddSlide("H_condld");
// AddSlide("H_condns");
// AddSlide("H_condcb");




// ---- msns -- the two DOMs

AddSlide("real5");


AddSlide("W_whogiv");

// AddSlide("U_NDOMon");

// AddSlide("X_agend5");

AddSlide("X_wycsjs");
AddSlide("X_wycsj2");
AddSlide("X_whyJS");
AddSlide("J_whyJS2");

AddSlide("H_jsstyl");



AddSlide("CS1Rstrc")

AddSlide("CS1w3c1");
AddSlide("CS1w3c2");
AddSlide("CS1w3c3");
AddSlide("CS1Radie");
AddSlide("CS1Radi2");
AddSlide("CS1Radi3");
AddSlide("CS1Radnn");
AddSlide("CS1selmp");
AddSlide("CS1valmp");
AddSlide("CS1navex");

AddSlide("CS1both");
AddSlide("CS1both2");
AddSlide("CS1both3");
AddSlide("CS1botht");

//AddSlide("CS1bothx")
//AddSlide("CS1bothy")
//AddSlide("CS1bothz")


// AddSlide("X_agend6")


AddSlide("XJbenefd"); 
AddSlide("H_nampos");
AddSlide("H_nampo2");
AddSlide("H_safnam");
AddSlide("H_onlode");

AddSlide("X_getelt");
AddSlide("X_getz");
AddSlide("X_getlft");
AddSlide("X_setlft");
// AddSlide("H_iecpjs");
AddSlide("X_moveto");
AddSlide("X_moveby");
AddSlide("X_setvis");
AddSlide("X_getvis");
AddSlide("X_setclp");
AddSlide("X_cssptn");


// AddSlide("H_resize");


// EVENTS!!!
AddSlide("X_agend7")
AddSlide("X_event0");
AddSlide("X_event2");
AddSlide("X_event");
AddSlide("H_ieonld");
AddSlide("H_lowerc");
AddSlide("U_DGevnt");
AddSlide("U_DGdrag");


AddSlide("real6");


AddSlide("X_pres");
AddSlide("X_prestn");

AddSlide("X_res");

// AddSlide("X_dfont");

// AddSlide("X_full"); 

// AddSlide("X_tool"); 

AddSlide("W_solns")





if (showURLsAtEnd) {
AddSlide("X_agend8")

// AddSlide("U_CSSonl")
// AddSlide("U_CSS1P")
// AddSlide("J_SCURL")
// AddSlide("J_SCURL2")
// AddSlide("J_SCURL3")
// AddSlide("U_DGCSSO")
// AddSlide("W_JSclex")
// AddSlide("W_roadmp")
// AddSlide("U_JS12")
// AddSlide("U_cs1csp")
// AddSlide("U_DGevnt");
// AddSlide("U_DGdrag");
}
*/

AddSlide("real7");

AddSlide("urlmoz");
AddSlide("newsgrp");

AddSlide("mozquote");

AddSlide("help");


AddSlide("joinus");


// AddSlide("logopage");	//






