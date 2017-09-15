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


// AddSlide("x_what");
// AddSlide("x_what2");
// AddSlide("x_whatnt");

// AddSlide("x_agenda")

/* 

AddSlide("topics");

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


*/

// AddSlide("x_agend1")

// *** START CSS

AddSlide("real");

AddSlide("real1");

AddSlide("j_whatcs")
// AddSlide("j_whatdo");
// AddSlide("j_benef") 

// AddSlide("u_cs1onl")
AddSlide("x_cssafe")
AddSlide("h_back0");

AddSlide("h_backg");
AddSlide("h_backg1");
AddSlide("h_backg2");
AddSlide("h_css1");


// copied from cssp

// AddSlide("x_agend2")



// *** START CSSP

AddSlide("real2");


// Running as standalone CSSP preso instead of combined CSS-CSSP preso.
var csspStandalone = false

AddSlide("p_whatp")
AddSlide("p_prop");
AddSlide("p_zdemo");
// AddSlide("u_csponl")

AddSlide("h_cssp");

AddSlide("h_stycmt");

// *** END CSSP !!!


// writing for the web

// AddSlide("x_agend3")

// AddSlide("w_stdchk")
// AddSlide("w_site")
// AddSlide("w_lcd")
// AddSlide("w_lcd1")
// AddSlide("w_lcd1p")
// AddSlide("w_js10")

AddSlide("real3");

AddSlide("w_jsclev")
//AddSlide("w_jsclex")



// AddSlide("x_agend4")


// *** dealing with markup


// AddSlide("h_jsver0");
// AddSlide("w_nav3bg")
// AddSlide("w_nav3b2")
// AddSlide("h_ie3ie4")

AddSlide("h_jsver");
// AddSlide("h_jsver2");
AddSlide("h_jsver3");

AddSlide("domsniff");

AddSlide("real4");


AddSlide("x_dynmkw");
AddSlide("x_dynmkb");
AddSlide("x_dynmsv");
AddSlide("x_dynmsb");
AddSlide("x_dynmxb");

// AddSlide("h_nolay");
// AddSlide("h_laydiv");
// AddSlide("h_condld");
// AddSlide("h_condns");
// AddSlide("h_condcb");




// ---- msns -- the two DOMs

AddSlide("real5");


AddSlide("w_whogiv");

// AddSlide("u_ndomon");

// AddSlide("x_agend5");

AddSlide("x_wycsjs");
AddSlide("x_wycsj2");
AddSlide("x_whyjs");
AddSlide("j_whyjs2");

AddSlide("h_jsstyl");



AddSlide("cs1rstrc")

AddSlide("cs1w3c1");
AddSlide("cs1w3c2");
AddSlide("cs1w3c3");
AddSlide("cs1radie");
AddSlide("cs1radi2");
AddSlide("cs1radi3");
AddSlide("cs1radnn");
AddSlide("cs1selmp");
AddSlide("cs1valmp");
AddSlide("cs1navex");

AddSlide("cs1both");
AddSlide("cs1both2");
AddSlide("cs1both3");
AddSlide("cs1botht");

//AddSlide("cs1bothx")
//AddSlide("cs1bothy")
//AddSlide("cs1bothz")


// AddSlide("x_agend6")

/*
AddSlide("xjbenefd"); 
AddSlide("h_nampos");
AddSlide("h_nampo2");
AddSlide("h_safnam");
AddSlide("h_onlode");

AddSlide("x_getelt");
AddSlide("x_getz");
AddSlide("x_getlft");
AddSlide("x_setlft");
// AddSlide("h_iecpjs");
AddSlide("x_moveto");
AddSlide("x_moveby");
AddSlide("x_setvis");
AddSlide("x_getvis");
AddSlide("x_setclp");
AddSlide("x_cssptn");
*/

// AddSlide("h_resize");

/* 
// EVENTS!!!
AddSlide("x_agend7")
AddSlide("x_event0");
AddSlide("x_event2");
AddSlide("x_event");
AddSlide("h_ieonld");
AddSlide("h_lowerc");
AddSlide("u_dgevnt");
AddSlide("u_dgdrag");
*/

AddSlide("real6");


AddSlide("x_pres");
AddSlide("x_prestn");

AddSlide("x_res");

// AddSlide("x_dfont");

// AddSlide("x_full"); 

// AddSlide("x_tool"); 

AddSlide("w_solns")




/*
if (showURLsAtEnd) {
AddSlide("x_agend8")

// AddSlide("u_cssonl")
// AddSlide("u_css1p")
// AddSlide("j_scurl")
// AddSlide("j_scurl2")
// AddSlide("j_scurl3")
// AddSlide("u_dgcsso")
// AddSlide("w_jsclex")
// AddSlide("w_roadmp")
// AddSlide("u_js12")
// AddSlide("u_cs1csp")
// AddSlide("u_dgevnt");
// AddSlide("u_dgdrag");
}
*/

AddSlide("real7");

AddSlide("urlmoz");
AddSlide("newsgrp");

AddSlide("mozquote");

AddSlide("help");


AddSlide("joinus");


// AddSlide("logopage");	//






