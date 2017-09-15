/* ***** BEGIN LICENSE BLOCK *****
 * Version: NPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Netscape Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/NPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is mozilla.org code.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 1998
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Ashish Bhatt <ashishbhatt@netscape.com>
 *
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the NPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the NPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


/*******************************************************
WriteResults()
********************************************************/
function WriteResults(buffer)
{

    var obj = getAppObj();
    if (!obj)
    {
       alert("Problem accessing application Object");
       return ;
    }

    obj.WriteResults(buffer) ;
}

/*******************************************************
This Method is used by Gecko Standards Test Cases.
********************************************************/
function writeNewResults(aTestcases)
{
  var tc = 0;
  var output = "";

  output = output + '<H3>' + aTestcases[tc].filename + '</H3>' + '<TABLE BORDER=1>\n <TBODY>\n';
  output = output + '  <TR><TD><B>Description</B></TD>\n    <TD><B>Pass</B></TD>\n    ' +
           '<TD><B>Bug Number</B></TD>\n    <TD><B>Actual Result</B></TD>';
  if (top.name != "testWindow") {
    output += '\n    <TD><B>Expected Result</B></TD>';
  }
  output +='\n  </TR>\n';

  // Iterates through Tests writing the Test Result
  for (tc=0; tc < aTestcases.length; tc++) {
      failed = (!aTestcases[tc].result);
	
      output += ('  <TR>\n    <TD' + ((failed)?' bgcolor=red style="color:white;"':'') +'>' + aTestcases[tc].testcase + '</TD>');
	
      // Writes Bug number for Failed Tests
      if (failed) {
        output += ('\n    <TD bgcolor=red style="color:white;">failed</TD>');
        output += ('\n    <TD bgcolor=red style="color:white;">' + aTestcases[tc].bug + '</TD>');
        output += ('\n    <TD bgcolor=red style="color:white;">' + aTestcases[tc].actual + '</TD>');
      } else {
        output += ('\n    <TD colspan=2>passed</TD>');
        output += ('\n    <TD>' + aTestcases[tc].actual + '</TD>');
      }
      if (top.name != "testWindow") {
        output += ('\n    <TD>' + aTestcases[tc].expected + '</TD>');
      }
    output += ('\n  </TR>\n');
  }
  output = output + ' </TBODY>\n</TABLE>\n\n';
  WriteResults(output);
}

/*******************************************************
getProperty()
********************************************************/
function getAppObj()
{
   var obj ;
   netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserAccess");
   netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

   if (window.opener)
		obj = window.opener.document.getElementById("ContentBody");
   else
   {
       obj = window.parent.document.getElementById("ContentBody");

       if (!obj)
	      var obj =  document.getElementById("ContentBody");
   }
   return obj.appobj ;
}


/*******************************************************
isRunningStandalone()
********************************************************/
function isRunningStandalone()
{
   netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserAccess");
   netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

   var obj =  window.parent.document.getElementById('ContentBody');

   if(obj)
     return false ;
   else
     return true ;
}

