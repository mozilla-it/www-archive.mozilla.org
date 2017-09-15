/**
 * FileName: TESTLIB.JS
 * 
 * The contents of this file are subject to the Mozilla Public
 * License Version 1.1 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of
 * the License at http://www.mozilla.org/MPL/
 * 
 * Software distributed under the License is distributed on an "AS
 * IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * rights and limitations under the License.
 *
 * The Original Code is Mozilla Communicator Test Cases.
 *
 * The Initial Developer of the Original Code is Netscape Communications
 * Corp.  Portions created by Netscape Communications Corp. are
 * Copyright (C) 1999 Netscape Communications Corp.  All
 * Rights Reserved.
 * 
 * Contributor(s): Gerardo Kvaternik <gerardok@netscape.com>
 *                 Phillip Bond <phillip@netscape.com>
 *                 Chris Kritzer <ckritzer@netscape.com>
 *                 Par Pandit <ppandit@netscape.com>
 *                 Prashant Desale <desale@netscape.com>
 *
 * Descript: JavaScript Function Library for Gecko Test Cases
 *
 * Revs: 12/28/98 - Created       
 *       01/14/99 - phillip@netscape.com - added setAttribute, getAttribute...
 *       01/27/99 - ckritzer - Added docit() and stringDebugger() functions.
 *       02/05/99 - phillip@netscape.com - updated writeResultsToScreent()
 *                                       - (added a column heading)
 *       02/11/99 - phillip@netscape.com - added testcaseDebugger(),
 *                                         arrayAppend(), arrayAppendMethod()
 *       03/15/99 - gerardok@netscape.com - added writeResults()
 *	     04/23/99 - ckritzer@netscape.com - added hr()
 *	     05/10/99 - ckritzer@netscape.com - added debug()
 *       07/15/99 - phillip@netscape.com - updated checkProperty()
 *       11/03/99 - ppandit@netscape.com - added Alec Flett code for arrays
 *       05/14/01 - desale@netscape.com  - added two functions 'resultTrue()' & 'resultFalse()'
 *       06/01/01 - vladimire@netscape.com - fixed up results formatting for parsing
 *      
 * ToDo:
 *
 * ----------------------------------------------------------------------------
 * CONTENTS
 * ----------------------------------------------------------------------------
 * TestCase() - Defines a TestCase object.
 *
 * evaluateResult() - Determines Pass/Fail criteria and evaluates test result.
 *
 * writeResultsToScreen() - Iterates through test results and writes them to 
 *                          screen for test case validation.
 *
 * writeResults()- Smarter than above; it writes test results back to server
 *                 or to screen, depending on how the test window was invoked.
 *
 * isString() - Determines if parameter is string (boolean)
 *
 * setAttribute() - sets the property/attribute of an object
 *
 * getAttribute() - gets the value of an objects property/attribute
 *
 * setAndGetAttribute() - accomplishes both of the above, returns the value
 *
 * checkProperty() - checks an objects' property against an array of possible
 *                   values
 *
 * arrayAppend() - takes two arrays and returns a third array with the contents
 *                 of both arrays
 *
 * arrayAppendMethod() - when set as an array's own method, this greatly 
 *                       increases the efficiency of arrayAppend
 *
 * docit() - a function that kindly outputs a string followed by a '<br>'
 *
 * stringDebugger() - takes 5 strings and outputs them in a nice format
 *
 * testcaseDebugger() - takes a testcase and formats it's contents like
 *                      stringDebugger
 *
 * hr() - adds a horizontal line & carriage return (for debugging)
 *
 * arrayDescribe() - accepts an nsISupportArray and outputs the values into the DOS debug window
 *
 * describe() - Outputs the value of an object.
 *
 * describeIdentity() - Can be used to display additional information
 *
 * nsISupportsArray2JSArray() - Converts a nsISupportsArray into a javascript array
 *
 * JSarrayDescribe() - Similar to describeArray except use a javascript array instead of
 *           a nsISupportsArray
 * makeFilename() - creates filename based on platform, date, and prepend string sent
 *           as parameter. 
 *
 * resultTrue() - Function is used specifically for layout harness & is used for reporting testcase result if testcase passed.
 *
 * resultFalse() - Function is used specifically for layout harness & is used for reporting testcase result if testcase failed.
 */


/******************************************************************************
 * Function: TestCase()
 *
 * Descript: Defines a Testcase object
 * Usage: Testcase(f, t, e, a, b);  where:
 *        f - Testcase filename string
 *        t - Testcase name string
 *        e - Expected test result
 *        a - Actual test result
 *        b - Bug report string
 * Returns: null
 *****************************************************************************/

function Testcase(f, t, e, a, b) {
  this.filename = f;
  this.testcase = t;
  this.expected = e;
  this.actual = a;
  this.result = false;
  this.bug = b;

  // Evaluate Test Result
  this.result = evaluateResult(this.expected, this.actual);
}


/******************************************************************************
 * Function: evaluateResult()
 *
 * Descript: Determines Pass/Fail criteria and evaluates test result.
 * Usage: evaluateResult(xExpected, xActual);
 * Returns: bResult
 *****************************************************************************/

function evaluateResult(xExpected, xActual) {
  var bResult = false;

  // Pass/Fail Criteria
  if (xExpected == xActual) {
    var bResult = true;
  }
  return bResult;
}   


/******************************************************************************
 * Function: writeResultsToScreen()
 *
 * Descript: Iterates through test results and writes them to screen
 * Usage: writeResultsToScreen(aTestcases);
 * Returns: null
 *****************************************************************************/

function writeResultsToScreen(aTestcases) {
  var tc = 0;

  // Writes Test Filename and Creates Table
  document.write('<H3>' + aTestcases[tc].filename + '</H3>');
  document.write('<TABLE BORDER=1><TBODY>');
  
  // Writes Header
  document.write('<TR><TD><B>Description</B></TD><TD><B>Pass</B></TD>' +
                 '<TD><B>Bug Number</B></TD><TD><B>Actual Result</B></TD></TR>');

  // Iterates through Tests writing the Test Result
  for (tc=0; tc < aTestcases.length; tc++) {
     failed = (!aTestcases[tc].result);

    document.write('<TR><TD' + ((failed)?' bgcolor=red style="color:white;"':'') +'>' + aTestcases[tc].testcase );

      // Writes Bug number for Failed Tests
      if (failed) {
        document.write('<TD bgcolor=red style="color:white;">failed');
        document.write('<TD bgcolor=red style="color:white;">' + aTestcases[tc].bug);
        document.write('<TD bgcolor=red style="color:white;">' + aTestcases[tc].actual);
      } else {
        document.write("<TD colspan=2>passed");
        document.write('<TD>' + aTestcases[tc].actual);
      }
    document.write('</TR>');
  }

  document.write('</TBODY></TABLE>');
}

/******************************************************************************
 * Function: writeResults()
 *
 * Descript: It writes test results back to server or to screen, depending on
 *           how the test window was invoked
 * Usage: writeResults(aTestcases);
 * Returns: null
 *****************************************************************************/

function writeResults(aTestcases) {
  var tc = 0;
  var output = ""; //why initialize
//document.domain = "mcom.com";
//added by stummala to get suitename when running all suites...
//for forms u can see this in /cgi-bin/forms2.cgi
  if (aTestcases[tc].filename == "catt001.html") {
 	 output = '<A NAME="dom-core"><H1> DOM CORE/HTML </H1>';
  }
  else if (aTestcases[tc].filename == "dhtml001.html") {
 	 output = '<A NAME="dhtml"><H1> DHTML </H1>';
  }
  else if (aTestcases[tc].filename == "sc2p000.html") {
 	 output = '<A NAME="domcss"><H1> DOM CSS </H1>';
  }
  else if (aTestcases[tc].filename == "areanode.html") {
 	 output = '<A NAME="inhr"><H1> INHERITANCE </H1>';
  }
  else if (aTestcases[tc].filename == "are001.html") {
 	 output = '<A NAME="javascript"><H1> JAVASCRIPT </H1>';
  }
 
  // Writes Test Filename and Creates Table
  output = output + '<H3>' + aTestcases[tc].filename + '</H3>' + '<TABLE BORDER=1>\n <TBODY>\n';
  
  // Writes Header
  output = output + '  <TR><TD><B>Description</B></TD>\n    <TD><B>Pass</B></TD>\n    ' +
           '<TD><B>Bug Number</B></TD>\n    <TD><B>Actual Result</B></TD>';
  if (top.name != "testWindow") {
	  output += '\n    <TD><B>Expected Result</B></TD>';
  }
  output +='\n  </TR>\n';

  // Iterates through Tests writing the Test Result
  for (tc=0; tc < aTestcases.length; tc++) {
      failed = (!aTestcases[tc].result);

      output += ('  <TR>\n    <TD' + ((failed)?' bgcolor=red style="color:white;"':'') +'>' + aTestcases[tc].testcase );

      // Writes Bug number for Failed Tests
      if (failed) {
        output += ('\n    <TD bgcolor=red style="color:white;">failed');
        output += ('\n    <TD bgcolor=red style="color:white;">' + aTestcases[tc].bug);
        output += ('\n    <TD bgcolor=red style="color:white;">' + aTestcases[tc].actual);
      } else {
        output += ("\n    <TD colspan=2>passed");
        output += ('\n    <TD>' + aTestcases[tc].actual);
      }
      if (top.name != "testWindow") {
        output += ('\n    <TD>' + aTestcases[tc].expected);
      }
    output += ('\n  </TR>\n');
  }

  output = output + ' </TBODY>\n</TABLE>\n\n';
  document.results.textarea.value = output;


  if (top.name == "testWindow") {
//    document.results.submit();  submit() moved to BODY, it's failing here
  }
  else {
    document.write(document.results.textarea.value);
    //dump(document.results.textarea.value);
  }
}

/******************************************************************************
 * Function: fixSubmit()
 *
 * Descript: It fixes the submit() function for the BODY
 * Usage: fixSubmit();
 * Returns: null
 *****************************************************************************/

function fixSubmit() {
    if (top.name == "testWindow") {
      document.results.submit();
	
  }
}

/******************************************************************************
 * Function: fixSubmit1()
 *
 * Descript: It fixes the submit() function for the BODY who has window name conflict
 * Usage: fixSubmit1();
 * Returns: null
 *****************************************************************************/

function fixSubmit1() {
    
      document.results.submit();
  
}

/******************************************************************************
 * Function: writeResultsToo()
 *
 * Descript: New version of writeResults with nice format
 * Usage: writeResultsToo(aTestacases);
 * Returns: null
 *****************************************************************************/

function writeResultsToo(aTestcases) { 
  var tc = 0; 
  var output = "no output";
  var numtc = aTestcases.length; 
  var failed = false; 

  output = '<tbody><tr><td rowspan='+ numtc + '>' + aTestcases[tc].filename; 
  
  // Iterates through Tests writing the Test Result 
  for (tc=0; tc < numtc; tc++) { 
    failed = (!aTestcases[tc].result); 

    output = output + '<TR><TD' + ((failed)?' bgcolor=red':'') +'>' + aTestcases[tc].testcase; 

      // Writes Bug number for Failed Tests 
      if (failed) { 
        output = output + '<TD bgcolor=red>failed<TD>' + aTestcases[tc].bug; 
        output = output + '<TD>' + aTestcases[tc].actual; 
      } else { 
        output = output + "<TD colspan=3>passed"; 
      } 
  } 
  output = output + '</tbody>'; 
} 

/******************************************************************************
 * Functions: setAttribute(), _setAttribute()
 *
 * Descript: Sets the property specified to a value
 *
 * Usage: setAttribute ( o, p, v );
 *        o - Object whose property you will change
 *        p - the property you wish to change ( is a string )
 *        v - the value to which p will be set
 *
 * Modifes: oObj.p
 *          oObj.__whitebox__f_setAttribute()
 *       
 * Returns: nothing
 *****************************************************************************/

/******************************************************************************
 * Functions: isString()
 *
 * Descript: determines if the param is a string 
 *
 * Usage: if ( isString( s ) ) {  document.write( s + " is a string! " ) };
 *	s - any object
 * Modifies: nothing
 * Returns: nothing
 *****************************************************************************/
function isString( cow ) {
	return ( typeof ( cow ) == "string" );
}

function _setAttributeHelper ( sProp, value ){
	var delim = "";
	if ( isString(value) )
		delim = "\""; // if value is a string, we must quote it
	eval( "this." + sProp + " = " +delim+ value + delim);
}
function setAttribute( oObj, sProp, value ) {
	oObj.__whitebox__setAttribute = _setAttributeHelper;
	oObj.__whitebox__setAttribute( sProp, value );
}
/* this next two functions are deprecated, please don't use them ever again!
var setSimple = setAttribute;
var setString = setAttribute;*/

/******************************************************************************
 * Functions: getAttribute(), _getAttributeHelper()
 *
 * Descript: Gets the value of the property 
 *
 * Usage: getAttribute ( o, p );
 *        o - Object in question
 *        p - the desired property  (is a string)
 *
 * Modifes: oObj.__whitebox__f_getAttribute()
 *       
 * Returns: the property.
 **************************************************************************/
function _getAttributeHelper ( sProp ){
	return eval( "this." + sProp );
}
function getAttribute( oObj, sProp ) {
	oObj.__whitebox__getAttribute = _getAttributeHelper;
	return oObj.__whitebox__getAttribute( sProp );
}
/* this next two functions are deprecated, please don't use them ever again!
var getSimple = getAttribute;
var getString = getAttribute;*/

/******************************************************************************
 * Function: setAndGetAttribute()
 *
 * Descript: sets the property and retrieves its value
 *
 * Usage: setAndGetAttribute ( o, p, v );
 *        o - Object in question
 *        p - the desired property  (is a string)
 *        v - the value to which p will be set(is a string)
 *
 * Modifes: nothing
 *       
 * Returns: the property.
 *****************************************************************************/
function setAndGetAttribute( oObj, sProp, value ) {
	setAttribute( oObj, sProp, value ); 
	return getAttribute( oObj, sProp ); 
}
/* this next two functions are deprecated, please don't use them ever again!
var setAndGetString = setAndGetAttribute;
var setAndGetSimple = setAndGetAttribute;*/

function checkProperty( sDesc, oObj, sProp, aValues, aBugNums ) {
	var i;
	var aTestcases = new Array;

	for( i=0; i < aValues.length; i++){
	    aTestcases.push( new Testcase(sFilename,
		sDesc + " = " + aValues[i],
		aValues[i],
		setAndGetAttribute( oObj, sProp, aValues[i] ),
 		(( typeof(aBugNums)=="string" ) ? aBugNums : 
 		(( aBugNums[i] == null ) ? "Bug report required" : aBugNums[i]))));
	}
	return aTestcases;
}

/******************************************************************************
 * Function: arrayAppend(), arrayAppendMethod()
 *
 * Descript: returns the concatenation of two arrays
 *
 * Usage: dest = arrayAppend ( aFront, aEnd );
 *        dest   - the destination array
 *        aFront - the front array
 *        aEnd   - the end array
 *
 * Modifes: nothing
 *       
 * Returns: the new array.
 *
 * Example: // given: 3 arrays,
 *      aDest = new Array(); aFirst = new Array(); aSecond= new Array(); 
 *      aFirst = [1,2,3,4,5];
 *      aSecond = [7,8,9,0,6,2];
 *      aDest = arrayAppend( aFirst, aSecond );
 *      
 *      // now aDest is [1,2,3,4,5,7,8,9,0,6,2]
 *
 *      aDest.appendIt = arrayAppendMethod;
 *      aDest.appendIt( aFirst );
 *      // now aDest is [1,2,3,4,5,7,8,9,0,6,2,1,2,3,4,5]
 *
 *****************************************************************************/
function arrayAppend ( aFront, aEnd ){
	var i;
	var dest = new Array();
	if ( aFront == null )
		return arrayAppend ( new Array(), aEnd );
	else if ( aEnd == null )
		return arrayAppend (aFront, new Array());
	
	for (i=0;i<aFront.length;i++)
		dest.push( aFront[i] );
	for (i=0;i<aEnd.length;  i++)
		dest.push( aEnd[i] );
	return dest;
}
		
function arrayAppendMethod ( aEnd ){
	var i;
	if ( aEnd == null )
		return;
	for (i=0;i<aEnd.length;i++)
		this.push( aEnd[i]);
}
		
/******************************************************************************
 * Function: docit()
 *
 * Descript: Outputs to screen string entered & attaches a <br> to the end
 * Usage: docit(sString);
 *        docit( "<b>birdhouse</b> in your soul." );
 * Returns: null
 *****************************************************************************/

function docit(sString) {
	document.write(sString + "<br>");
}


/******************************************************************************
 * Function: stringDebugger()
 *
 * Descript: Outputs to screen the core strings as defined by function Testcase()
 * Usage: stringDebugger(sFilename,sTestcaseName,sExpected,sActual,sBugReport);
 * Returns: null
 *****************************************************************************/

function stringDebugger(sF,sT,sE,sA,sB) {
	var aDebug = new Array(sF,sT,sE,sA,sB);
	for (tc=0; tc < 5; tc++) {
		if (aDebug[tc] == undefined) {
			aDebug[tc] = "<font color='#ff0000'>undefined</font>";
		}
	}
	docit("<hr>");
	docit("<font size=+2><b>String Debugger BEGIN</b></font>");
	docit("sFilename = " + aDebug[0]);
	docit("sTestcaseName = " + aDebug[1]);
	docit("sExpected = " + aDebug[2]);
	docit("sActual = " + aDebug[3]);
	docit("sBugReport = " + aDebug[4]);
	docit("<font size=+1><b>String Debugger END</b></font>");
	docit("<hr>");
}

/******************************************************************************
 * Function: testcaseDebugger()
 *
 * Descript: Outputs to screen the core strings as defined by function
 *           Testcase(); a nice shortcut if the testcase has already been
 *           instantiated.
 * Usage: testcaseDebugger(oTestcase);
 * Returns: null
 *****************************************************************************/
function testcaseDebugger(oTc) {
  stringDebugger(oTc.filename, oTc.testcase, oTc.expected, oTc.actual, oTc.bug);
}

/******************************************************************************
 * Function: hr()
 *
 * Descript: simply returns a horizontal line and a carriage return for ease of
 *			 reading when debugging - dependent on docit() function
 * Usage: hr();
 * Returns: null
 *****************************************************************************/
function hr() {
	docit("<hr>");
}

/******************************************************************************
 * Function: debug()
 *
 * Descript: returns text/numbers bolded and in orange - dependent on docit() function
 * Usage: debug(string);
 * Returns: null
 *****************************************************************************/
function debug(string) {
	docit("<b><font color='#FF2400'>" + string + "</font></b>");
}

/******************************************************************************
 * Function: arrayDescribe()
 *
 * Descript: accepts an nsISupportArray and outputs the values into the DOS debug window
 * Usage: arrayDescribe(array, iface, name, describeCallback);
 *				array = nsISupportArray
 *				iface = XPConnect interface 
 *				name = name to describe output values
 *				describeCallback - callback function if necessary
 * Returns: null
 *****************************************************************************/
function arrayDescribe(array, iface, name, describeCallback) {
    dump("There are " + array.Count() + " " + name + "(s).\n");
    for (var i=0; i<array.Count(); i++) {
      var obj = array.GetElementAt(i).QueryInterface(iface);
      dump(name + " #" + i + ":\n");
      describe(obj, "\t" + name);
      if (describeCallback) describeCallback(obj);
    }
}

/******************************************************************************
 * Function: describe()
 *
 * Descript: Outputs the value of an object. Display a value if 
 *           it is a string or number. Displays "function" if it is a function.
 *           Called from arrayDescribe() or JSarrayDescribe()
 * Usage: describe(object, name);
 *			 object = any javascript object
 *           name = name of the object to be used for displaying the value
 * Returns: null
 *****************************************************************************/
function describe(object, name) {
  for (var i in object) {
    var value;
    try {
      value = object[i];
    } catch (e) {
      dump("the " + i + " slot of " + object + "returned an error. Please file a bug.\n");
    }
      
    if (typeof(object[i]) == "function")
      value = "[function]";
    
    dump(name + "." + i + " = " + value + "\n");
  }
}

/******************************************************************************
 * Function: describeIdentity()
 *
 * Descript: Can be used to display additional information. Currently unimplemented
 * Usage: describeIdentity(identity);
 *		    identity - ???
 * Returns: null
 *****************************************************************************/
function describeIdentity(identity) {
  dump("Additional Identity Info\n");
}

/******************************************************************************
 * Function: nsISupportsArray2JSArray()
 *
 * Descript: Converts a nsISupportsArray into a javascript array
 * Usage: nsISupportsArray2JSArray(array, IID);
 *        array = nsISupportArray
 *        IID = interface such as Components.interfaces.nsISmtpServer
 * Returns: null
 *****************************************************************************/
function nsISupportsArray2JSArray(array, IID) {
    var result = new Array;
    var length = array.Count();
    for (var i=0; i<length; i++) {
      result[i] = array.GetElementAt(i).QueryInterface(IID);
    }
    return result;
}

/******************************************************************************
 * Function: JSarrayDescribe()
 *
 * Descript: Similar to describeArray except use a javascript array instead of
 *           a nsISupportsArray
 * Usage: JSarrayDescribe(array, iface, name, describeCallback);
 *				array = javascript array
 *				iface = XPConnect interface 
 *				name = name to describe output values
 *				describeCallback - callback function if necessary
 * Returns: null
 *****************************************************************************/
function JSarrayDescribe(array, iface, name, describeCallback) {
    dump("There are " + array.length + " " + name + "(s).\n");
    for (var i=0; i<array.length; i++) {
      var obj = array[i];
      dump(name + " #" + i + ":\n");
      describe(obj, "\t" + name);
      if (describeCallback) describeCallback(obj);
    }
}
/******************************************************************************
 * Function: resultTrue()
 *
 * Descript: Changes value of 'hidden field' to 'Passed' once got called from applet. Used for Layout harness.
 ******************************************************************************/
    function resultTrue(){
        document.results.textarea.value = "<b><font face='Arial,Helvetica' color='#009900' size='+2'>" + document.results.textarea.value + " Passed</font></b>";
    }
/******************************************************************************
 * Function: resultFalse()
 *
 * Descript: Changes value of 'hidden field' to 'Failed' once got called from applet. Used for Layout harness.
 ******************************************************************************/
    function resultFalse(){
        document.results.textarea.value = "<b><font face='Arial,Helvetica' color='#CC0000' size='+2'>" + document.results.textarea.value + "  Failed</font></b>";
    }

/******************************************************************************
 * Function: timeSubmit()
 *
 * Descript: Calls fixSubmit() function after specific amount of time.
 ******************************************************************************/
    function timeSubmit(){
        timerID=setTimeout('fixSubmit()',10000);
    }

//END//
