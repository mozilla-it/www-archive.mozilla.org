// style.js: JavaScript file which uses Document Object Model
// to set style of text in htmlpres HTML presentation template.
// Created by Eric Krock, Netscape Communications.
// Permission is granted to freely reuse and distribute this file.
// Changes:
// - 30 July  1997 backward compatibility with Nav3.0.
// - 11 Sept  1997 font scaling in speakerNotes and tutorial modes
// - 10 April 1998 cross-browser compatibility with IE4


// Global variables speakerNotesMode and tutorialMode determines 
// whether we are in:
//
// * speaker notes display mode (speaker mode text visible, all
//   text in smaller fonts so speaker notes fit on screen)
// * tutorial mode (tutorial mode text visible, text in slightly
//   larger fonts for online viewing)
// * normal mode (speaker mode text invisible because color is same
//   as backgroundcolor, all text in large fonts appropriate
//   for overhead display).

var speakerNotesMode = false;
var tutorialMode = false;


// Adjust font sizes downward in speakerNotes and tutorial modes.
var sizeMultiplier = 1.0;                      // default
if (tutorialMode) sizeMultiplier = 0.79;       // online viewing
if (speakerNotesMode) sizeMultiplier = 0.55;   // speaker preparation with notes
var minFontSize = 12;                          // smallest ever displayed


// Global variable fontSizeOf will store the per-element size data
// for the current screen size so that style
// sheets in individual HTML pages can retrieve and 
// use this data. 

var fontSizeOf;


// Calculates font size to be used for element, which is
// the maximum of specified*sizeMultiplier and minAllowed.
// Returns as string for storage in data structure fontSizeOf.
function calcSize (specified, sizeMult, minOK)
{  return ( Math.max (Math.round(specified*sizeMult), minOK) + "pt" );
}


// Constructor function for object type fontSizeOf.
// This object type holds the per-element size data
// for the current screen size.  A global variable,
// fontSizeOf, is set to this object so that style
// sheets in individual HTML pages can retrieve and 
// use this data. 

function constructFontSizeOf (h1, h2, h3, h4, h5, h6, titlepage, p, li, ul, ol, dl, dt, dd, blockquote, th, td, pre, tt, small, medium, large, sizeMult, minOK)
{  this.h1 = calcSize(h1, sizeMult, minOK); 
   this.h2 = calcSize(h2, sizeMult, minOK);
   this.h3 = calcSize(h3, sizeMult, minOK);
   this.h4 = calcSize(h4, sizeMult, minOK);
   this.h5 = calcSize(h5, sizeMult, minOK);
   this.h6 = calcSize(h6, sizeMult, minOK);
   this.titlepage = calcSize(titlepage, sizeMult, minOK);
   this.p  = calcSize(p, sizeMult, minOK);
   this.li = calcSize(li, sizeMult, minOK);
   /* BUG WORKAROUND: Shouldn't be necessary to set fontSize on UL and OL as
      well as LI, but setting LI fontSize doesn't work now.  Setting on UL and OL
      is the workaround. */ 
   this.ul = calcSize(ul, sizeMult, minOK);
   this.ol = calcSize(ol, sizeMult, minOK);
   this.dl = calcSize(dl, sizeMult, minOK);
   this.dt = calcSize(dt, sizeMult, minOK);
   this.dd = calcSize(dd, sizeMult, minOK);
   this.blockquote = calcSize(blockquote, sizeMult, minOK);
   this.th = calcSize(th, sizeMult, minOK);
   this.td = calcSize(td, sizeMult, minOK);
   this.pre = calcSize(pre, sizeMult, minOK);
   this.tt  = calcSize(tt, sizeMult, minOK);
   this.small = calcSize(small, sizeMult, minOK);
   this.medium = calcSize(medium, sizeMult, minOK);
   this.large = calcSize(large, sizeMult, minOK);
}

// This is a simplified version of the JavaScript Client Sniffer code 
// found at http://developer.nextscape.com/docs/examples/javascript/browser_type.html

function Is ()
{   // convert all characters to lowercase to simplify testing
    var agt=navigator.userAgent.toLowerCase();

    // --- BROWSER VERSION ---
    this.major = parseInt(navigator.appVersion);
    this.minor = parseFloat(navigator.appVersion);

    this.nav  = ((agt.indexOf('mozilla')!=-1) && ((agt.indexOf('spoofer')==-1)
                && (agt.indexOf('compatible') == -1)));
    this.nav2 = (this.nav && (this.major == 2));
    this.nav3 = (this.nav && (this.major == 3));
    this.nav4 = (this.nav && (this.major == 4));
    this.nav4up = (this.nav && (this.major >= 4));
    this.nav5 = (this.nav && (this.major == 5));
    this.nav5up = (this.nav && (this.major >= 5));
    
    this.ie   = (agt.indexOf("msie") != -1);
    this.ie3  = (this.ie && (this.major == 2));
    this.ie4  = (this.ie && (this.major == 4));
    this.ie4up  = (this.ie  && (this.major >= 4));
    this.ie5  = (this.ie && (this.major == 5));
    this.ie5up  = (this.ie  && (this.major >= 5));

    this.opera = (agt.indexOf("opera") != -1);
     
}


var is = new Is();

var ieTargetStyleSheetID = "ietssxyz";
var styleSheetTitle = "headstyle";

function getStyleSheetByTitle (styleSheetTitle)
{  var i = 0;
   while ( ( i < document.styleSheets.length ) &&
        (document.styleSheets.item(i).title != styleSheetTitle) ) { i++; }
   if (i == document.styleSheets.length) return null;
   else return document.styleSheets.item(i);
}


function addRuleToStyleElement (styleSheetElement, selector, declaration)
{  styleSheetElement.insertRule (selector + " { " + declaration + " } ",
                styleSheetElement.cssRules.length);  // insert at end of sheet
}	


function setFontSizes (h1, h2, h3, h4, h5, h6, titlepage, p, li, ul, ol, dl, dt, dd, blockquote, th, td, pre, tt, small, medium, large, sizeMultiplier, minFontSize)
{var fontSizeOf = new constructFontSizeOf (h1, h2, h3, h4, h5, h6, titlepage, p, li, ul, ol, dl, dt, dd, blockquote, th, td, pre, tt, small, medium, large, sizeMultiplier, minFontSize)
 if (is.nav5up) {
   var styleSheetElement = getStyleSheetByTitle (styleSheetTitle);
   addRuleToStyleElement (styleSheetElement, "H1", "font-size:" + fontSizeOf.h1);
   addRuleToStyleElement (styleSheetElement, "H2", "font-size:" + fontSizeOf.h2);
   addRuleToStyleElement (styleSheetElement, "H3", "font-size:" + fontSizeOf.h3);
   addRuleToStyleElement (styleSheetElement, "H4", "font-size:" + fontSizeOf.h4);
   addRuleToStyleElement (styleSheetElement, "H5", "font-size:" + fontSizeOf.h5);
   addRuleToStyleElement (styleSheetElement, "H6", "font-size:" + fontSizeOf.h6);
   addRuleToStyleElement (styleSheetElement, "PRE", "font-size:" + fontSizeOf.pre);
   addRuleToStyleElement (styleSheetElement, "P", "font-size:" + fontSizeOf.p);
   addRuleToStyleElement (styleSheetElement, "LI", "font-size:" + fontSizeOf.li);
   addRuleToStyleElement (styleSheetElement, "UL", "font-size:" + fontSizeOf.ul);
   addRuleToStyleElement (styleSheetElement, "OL", "font-size:" + fontSizeOf.ol);
   addRuleToStyleElement (styleSheetElement, "DL", "font-size:" + fontSizeOf.dl);
   addRuleToStyleElement (styleSheetElement, "DT", "font-size:" + fontSizeOf.dt);
   addRuleToStyleElement (styleSheetElement, "DD", "font-size:" + fontSizeOf.dd);
   addRuleToStyleElement (styleSheetElement, "BLOCKQUOTE", "font-size:" + fontSizeOf.blockquote);
   addRuleToStyleElement (styleSheetElement, "TH", "font-size:" + fontSizeOf.th);
   addRuleToStyleElement (styleSheetElement, "TD", "font-size:" + fontSizeOf.td);
   addRuleToStyleElement (styleSheetElement, ".titlepage", "font-size:" + fontSizeOf.titlepage);
   addRuleToStyleElement (styleSheetElement, ".small",  "font-size:" + fontSizeOf.small);
   addRuleToStyleElement (styleSheetElement, ".medium", "font-size:" + fontSizeOf.medium);
   addRuleToStyleElement (styleSheetElement, ".large", "font-size:" + fontSizeOf.large);
   addRuleToStyleElement (styleSheetElement, ".footnote", "font-size:" + fontSizeOf.small);
 }
 else if (is.nav4) {
   document.tags.H1.fontSize = fontSizeOf.h1;
   document.tags.H2.fontSize = fontSizeOf.h2;
   document.tags.H3.fontSize = fontSizeOf.h3;
   document.tags.H4.fontSize = fontSizeOf.h4;
   document.tags.H5.fontSize = fontSizeOf.h5;
   document.tags.H6.fontSize = fontSizeOf.h6;
   document.tags.PRE.fontSize = fontSizeOf.pre;
   document.tags.P.fontSize = fontSizeOf.p;
   /* BUG WORKAROUND: Shouldn't be necessary to set fontSize on UL and OL as
      well as LI, but setting LI fontSize doesn't work now.  Setting on UL and OL
      is the workaround. */ 
   document.tags.LI.fontSize = fontSizeOf.li;
   document.tags.UL.fontSize = fontSizeOf.ul;
   document.tags.OL.fontSize = fontSizeOf.ol;
   document.tags.DL.fontSize = fontSizeOf.dl;
   document.tags.DT.fontSize = fontSizeOf.dt;
   document.tags.DD.fontSize = fontSizeOf.dd;
   document.tags.BLOCKQUOTE.fontSize = fontSizeOf.blockquote;
   document.tags.TH.fontSize = fontSizeOf.th;
   document.tags.TD.fontSize = fontSizeOf.td;
   document.classes.titlepage.all.fontSize = fontSizeOf.titlepage;
   document.classes.small.all.fontSize = fontSizeOf.small;
   document.classes.medium.all.fontSize = fontSizeOf.medium;
   document.classes.large.all.fontSize = fontSizeOf.large;
   document.classes.footnote.all.fontSize = fontSizeOf.small;
 }
 else if (is.ie4up) {
// document.styleSheets[ieTargetStyleSheetID].addRule ("", "" + ":" + "");
   document.styleSheets[ieTargetStyleSheetID].addRule ("H1", "font-size:" + fontSizeOf.h1);
   document.styleSheets[ieTargetStyleSheetID].addRule ("H2", "font-size:" + fontSizeOf.h2);
   document.styleSheets[ieTargetStyleSheetID].addRule ("H3", "font-size:" + fontSizeOf.h3);
   document.styleSheets[ieTargetStyleSheetID].addRule ("H4", "font-size:" + fontSizeOf.h4);
   document.styleSheets[ieTargetStyleSheetID].addRule ("H5", "font-size:" + fontSizeOf.h5);
   document.styleSheets[ieTargetStyleSheetID].addRule ("H6", "font-size:" + fontSizeOf.h6);
   document.styleSheets[ieTargetStyleSheetID].addRule ("PRE", "font-size:" + fontSizeOf.pre);
   document.styleSheets[ieTargetStyleSheetID].addRule ("P", "font-size:" + fontSizeOf.p);
   document.styleSheets[ieTargetStyleSheetID].addRule ("LI", "font-size:" + fontSizeOf.li);
   document.styleSheets[ieTargetStyleSheetID].addRule ("UL", "font-size:" + fontSizeOf.ul);
   document.styleSheets[ieTargetStyleSheetID].addRule ("OL", "font-size:" + fontSizeOf.ol);
   document.styleSheets[ieTargetStyleSheetID].addRule ("DL", "font-size:" + fontSizeOf.dl);
   document.styleSheets[ieTargetStyleSheetID].addRule ("DT", "font-size:" + fontSizeOf.dt);
   document.styleSheets[ieTargetStyleSheetID].addRule ("DD", "font-size:" + fontSizeOf.dd);
   document.styleSheets[ieTargetStyleSheetID].addRule ("BLOCKQUOTE", "font-size:" + fontSizeOf.blockquote);
   document.styleSheets[ieTargetStyleSheetID].addRule ("TH", "font-size:" + fontSizeOf.th);
   document.styleSheets[ieTargetStyleSheetID].addRule ("TD", "font-size:" + fontSizeOf.td);
   document.styleSheets[ieTargetStyleSheetID].addRule (".titlepage", "font-size:" + fontSizeOf.titlepage);
   document.styleSheets[ieTargetStyleSheetID].addRule (".small",  "font-size:" + fontSizeOf.small);
   document.styleSheets[ieTargetStyleSheetID].addRule (".medium", "font-size:" + fontSizeOf.medium);
   document.styleSheets[ieTargetStyleSheetID].addRule (".large", "font-size:" + fontSizeOf.large);
   document.styleSheets[ieTargetStyleSheetID].addRule (".footnote", "font-size:" + fontSizeOf.small);
 }
 return fontSizeOf;
}






// Workaround for Nav3.x bug in which JavaScript files
// with <SCRIPT LANGUAGE="JavaScript1.2" SRC=...> are
// loaded, even though they should be ignored.
// Make sure this code is only executed by 4.x and later.
if (parseInt(navigator.appVersion) > 3) {


// HACK! Since screen.width isn't working in M4; fix scheduled for M6.
// var screenWidth = screen.width;
var screenWidth = 1024;

/* 640x480 is 0.8 times the size of 800x600, so scale down by 20%. */
if (screenWidth < 700) {
     fontSizeOf = setFontSizes (27, 27, 27, 27, 27, 27, 27, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 10, 14, 17, sizeMultiplier, minFontSize); }

/* 12" monitor of 800x600 pixels is the size which we consider "base"; 
   all other sizes are designed to scale so that their content will fit
   within an 800x600 pixel size area.  This is the pixel size used by 12"
   laptop monitors as well as many overhead display systems. */
else if (screenWidth < 900) {
     fontSizeOf = setFontSizes (34, 34, 34, 34, 34, 34, 34, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 12, 18, 21, sizeMultiplier, minFontSize); }

/* 17" monitor of 1024x768 pixels is 1.28 times larger than 12",
   so scale up by 28% to make sure HTML still fits on smaller page. */
else if (screenWidth < 1050) {
     fontSizeOf = setFontSizes (44, 44, 44, 44, 44, 44, 44, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 18, 23, 27, sizeMultiplier, minFontSize); }

/* 20" monitor of 1280x1024 pixels is 1.7 times larger than 800x600,
   so scale up by 70% to make sure HTML still fits on smaller page. */
else if (screenWidth < 1300) {
     fontSizeOf = setFontSizes (58, 58, 58, 58, 58, 58, 58, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 21, 31, 36, sizeMultiplier, minFontSize); }

/* 21" monitor of 1600x1200 pixels is 2.0 times larger than 800x600,
   so scale up by 100% to make sure HTML still fits on smaller page. */
else {
     fontSizeOf = setFontSizes (68, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 24, 36, 42, sizeMultiplier, minFontSize); }


}


// 29 July 98
// removed keyboard control from audio style version