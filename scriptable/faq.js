/* -*- Mode: C++; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*-
 *
 * The contents of this file are subject to the Netscape Public License
 * Version 1.0 (the "NPL"); you may not use this file except in
 * compliance with the NPL.  You may obtain a copy of the NPL at
 * http://www.mozilla.org/NPL/
 *
 * Software distributed under the NPL is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the NPL
 * for the specific language governing rights and limitations under the
 * NPL.
 *
 * The Initial Developer of this code under the NPL is Netscape
 * Communications Corporation.  Portions created by Netscape are
 * Copyright (C) 1999 Netscape Communications Corporation.  All Rights
 * Reserved.
 */

/*
* This is dogfood implementation of an html generator for producing our 
* xpconnect faq. It is run using "xpcshell faq.js". It reads "faq.in" and
* generates "faq.html". It relies on xpconnect in general and more 
* specificially on nsIFileSpec and its implementation.
*
* It emits an html file with formatted Qs and As and a nice TOC. 
* A LastModified date/time stamp is also emitted.
*
* This is currently a very fault intolerant implementation.
*
* It assumes:
*
* 1) faq.in exists
* 2) faq.html can be created and written.
* 3) xpcshell, xpconnect, and  nsIFileSpec don't change in unexpected ways.
* 4) faq.in has the following format:
*   a) some block of html at the top that ends inside an open body
*   b) 'questions' preceeded by <F-Q>
*   c) 'answers' preceeded by <F-A>
*   d) 'answers' end with </F-A>
*   e) these special tags are never on the same line.
*   f) some block of html after these special to close the document.
*
* - The questions and answers *can* have embedded html.
* - Threre can be plain html stuff between questions/answers.
* - html comments are ignored
* - the format of a q/a is (NOTE: no 'end-tag' for the <F-Q>:
*     <F-Q>
*       question
*     <F-A>
*       answer
*     </F-A>
*
* e.g.
*
*  <html>
*  <head>
*     <title>XPConnect and XPIDL FAQ</title>
*  </head>
*  <body text="black" bgcolor="white">
*  
*  <center>
*  <h2>Frequently Asked Questions about XPConnect and XPIDL</h2>
*  </center>
*  
*  <!-- ---------------------item------------------------ -->
*  
*  <F-Q>
*  My component isn't scriptable from js!  What's going on?
*  <F-A>
*  Add the [scriptable] attribute.
*  <br><i><a href="mailto:mike+mozilla@meer.net">mccabe</a> - 7/17/99</i>
*  </F-A>
*  
*  <!-- ---------------------item------------------------ -->
*  
*  <F-Q>
*  How do I make my interface accessible through "Components.interfaces.Foo"?
*  <F-A>
*  <i>answer goes here</i>
*  </F-A>
*  
*  <!-- End of Faq -->
*  
*  </body>
*  </html>
*
*/

var inputFilename  = "faq.in"
var outputFilename = "faq.html"

/***************************************************************************/

function showProgress(str) {print(str);}

/***************************************************************************/

function File(name) {
    try {
        var clazz = "@mozilla.org/filespec;1";
        var iface = Components.interfaces.nsIFileSpec;
        var fs = Components.classes[clazz].createInstance(iface);
        if(name)
            fs.unixStyleFilePath = name;
        return fs;    
    } catch(e) {
        print(e);
        return null;    
    }
}

/***************************************************************************/

var nextNumberedItem = 1;
function Item(isQA) {
    this.isQA = isQA;
    if(isQA) {
        this.number = nextNumberedItem++ ;
        this.qText = "";
        this.aText = "";
    }
    else
        this.text = "";
}    

/***************************************************************************/

var STATE_PREFORMATED = 0;
var STATE_QUESTION    = 1;
var STATE_ANSWER      = 2;

var TAG_Q_START = "<F-Q>";
var TAG_A_START = "<F-A>";
var TAG_A_END   = "</F-A>";

var EOL = "\n";

/***************************************************************************/

function processInput() {

    showProgress("opening "+inputFilename+" for reading");

    infile = new File(inputFilename);
    infile.openStreamForReading();

    var state = STATE_PREFORMATED;
    var item = new Item(false);
    itemArray.push(item);

    while(!infile.eof()) {
        var data = new Object;
        var truncated = new Object;
        infile.readLine(data, 1000, truncated);
        var line  = data.value;
        var index;

        switch(state) {
            case STATE_PREFORMATED:
                index = line.indexOf(TAG_Q_START);
                if(-1 == index) {
                    item.text += line+EOL;
                }
                else {
                    state = STATE_QUESTION;
                    item.text += line.substr(0,index)+EOL;
                    item = new Item(true);
                    itemArray.push(item);
                    item.qText += line.substr(index+TAG_Q_START.length)+EOL;
                }
                break;
            case STATE_QUESTION:
                index = line.indexOf(TAG_A_START);
                if(-1 == index) {
                    item.qText += line+EOL;
                }
                else {
                    state = STATE_ANSWER;
                    item.qText += line.substr(0,index)+EOL;
                    item.aText += line.substr(index+TAG_A_START.length)+EOL;
                }
                break;
            case STATE_ANSWER:
                index = line.indexOf(TAG_A_END);
                if(-1 == index) {
                    item.aText += line+EOL;
                }
                else {
                    state = STATE_PREFORMATED;
                    item.aText += line.substr(0,index)+EOL;
                    item = new Item(false);
                    itemArray.push(item);
                    item.text += line.substr(index+TAG_A_END.length)+EOL;
                }
                break;
        }
    }
    infile.closeStream();
    infile = null;
    showProgress("done reading");
}

/***************************************************************************/

function dumpItems() {
    var i;
    for(i = 0; i < itemArray.length; i++) {
        var item = itemArray[i];
        if(item.isQA) {
            print("..."+"qa number "+item.number+" q = "+item.qText+" a = "+item.aText);
        }
        else {
            print("---"+item.text);
        }
    }
}

function doOutput() {

    showProgress("opening "+outputFilename+" for writing");

    var line;
    outfile = new File(outputFilename);
    outfile.openStreamForWriting();

    // emit the first (non-qa) item
    line = itemArray[0].text;
    outfile.write(line, line.length);

    // emit the warning
    line = "\n";
    outfile.write(line, line.length);
    line = "<!-- GENERATED FILE - DO NOT EDIT - see faq.in and faq.js -->\n";
    outfile.write(line, line.length);
    outfile.write(line, line.length);
    outfile.write(line, line.length);
    line = "\n\n\n";
    outfile.write(line, line.length);

    // emit the TOC

    line = "<h3>Table of Contents</h3>\n";
    outfile.write(line, line.length);

    line = "<ul>\n";
    outfile.write(line, line.length);

    for(i = 0; i < itemArray.length; i++) {
        var item = itemArray[i];
        if(item.isQA) {
            line = "<li>"+item.number+") "+"<a href=\"#i"+item.number+"\">"+item.qText+"</a>";
            outfile.write(line, line.length);
        }
    }

    line = "</ul>\n";
    outfile.write(line, line.length);
    

    // write the items (except the first and last)...

    for(i = 1; i < itemArray.length-1; i++) {
        var item = itemArray[i];
        if(item.isQA) {
            line =  "<dl>\n";
            line += "<dt><a name=\"\i"+item.number+"\"></a>";
            line += "<b>"+item.number+") "+item.qText+"</b>";
            line += "<dd>"+item.aText+"</dd>\n";
            line += "</dl>";
            outfile.write(line, line.length);
        }
        else {
            line = item.text;
            outfile.write(line, line.length);
        }
    }

    // emit the warning
    line = "\n\n";
    outfile.write(line, line.length);
    line = "<!-- GENERATED FILE - DO NOT EDIT - see faq.in and faq.js -->\n";
    outfile.write(line, line.length);
    line = "<!-- GENERATED FILE - DO NOT EDIT - see faq.in and faq.js -->\n";
    outfile.write(line, line.length);
    line = "<!-- GENERATED FILE - DO NOT EDIT - see faq.in and faq.js -->\n";
    outfile.write(line, line.length);
    line = "\n\n\n";
    outfile.write(line, line.length);

    // write the last modified stuff

    line = "<hr>Last Modified: "+new Date()+"<BR>\n";
    outfile.write(line, line.length);

    // write last item
    line = itemArray[itemArray.length-1].text;
    outfile.write(line, line.length);
            
    
    outfile.closeStream();
    outfile = null;
    showProgress("done writing");
}    

/***************************************************************************/

// 'main'
var itemArray = new Array;
showProgress("\n");
processInput();
//dumpItems();
doOutput();

