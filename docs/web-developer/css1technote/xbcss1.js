/* xbcss1.js (Cross-Browser Nav4/IE4 API for generating CSS1
   rules in JavaScript code) 
   24 April 98, Eric Krock, Copyright Netscape Communications
   Permission is granted to reuse, redistribute, and modify 
   without charge.
	
   Updated 20 Jul 2000, Marcell Ortutay, Plugged In Enterprises
   and Vladimir Ermakov, Netscape Communications
   to add support for the Gecko layout engine.

   Makes CSS1 functionality accessible from JavaScript
   in  Nav4,IE4 and Gecko based user agents, by generating JavaScript code for 
   each browser which can then be conditionally evaluated.
   Loaded by code generator TechNote css1tojs.html.

   Also includes simplified JavaScript client sniffer.

   Usage notes:
   - If you are going to set CSS1 properties from JavaScript and have
     this library work under Internet Explorer, you must add an empty
     STYLE element with ID="tssxyz" in the HEAD of your HTML page.
     (This stands for "Target Style Sheet", plus "xyz" for uniqueness.)
     The CSS1 rules defined by JavaScript will be added to this style
     sheet. Place this empty STYLE element immediately before 
     your own SCRIPT which contains your JavaScript style settings.

     Example of correct usage: in the HEAD, place this HTML markup:

     <!-- DO NOT DELETE: this empty style sheet element becomes the
          style sheet to which CSS1 rules are added in IE4+. -->
     <STYLE ID="tssxyz" TYPE="text/css"></STYLE>
     <!-- Make your function calls to define CSS1 rules in this
          SCRIPT, now that the target style sheet has been created
          in IE4+. -->
     <SCRIPT LANGUAGE="JavaScript1.2"><!--
     //-*** put your JavaScript code to define CSS1 rules here;
            you can generate it using the code generator TechNote css1tojs.html ***
     //--></SCRIPT>

     This will ensure that the CSS1 rules you define from JavaScript
     will be added in the same place (and thus have the same priority
     in interactions with other rules) in both Nav4+ and IE4+.

   - If you want to use a different ID for the empty STYLE element,
     you can; just change (1) global variable ieTargetStyleSheetID, below,
     and (2) the ID attribute value for the dummy STYLE element.
*/


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
	this.nav4_74 = (this.nav && (this.minor == 4.74));
    this.nav4up = (this.nav && (this.major >= 4));
    this.nav6 = (this.nav && (this.major == 5));
    this.nav6up = (this.nav && (this.major >= 5));

    this.gecko = (agt.indexOf("gecko") != -1);
    
    this.ie   = (agt.indexOf("msie") != -1);
    this.ie3  = (this.ie && (this.major == 2));
    this.ie4  = (this.ie && (this.major == 4));
    this.ie4up  = (this.ie  && (this.major >= 4));
    this.ie5  = (this.ie && (this.major == 5));
    this.ie5up  = (this.ie  && (this.major >= 5));

    this.opera = (agt.indexOf("opera") != -1);
     
}

var is = new Is();

var ieTargetStyleSheetID = "tssxyz"



/* originally written with switch, but this caused syntax errors
   when accidentally parsed by Nav3 due to known Nav3 bug that
   causes occasional loading of SCRIPT LANGUAGE="JavaScript1.2" 
   scripts, so rewritten with series of if statements.
*/
function mapPropNameToNav4 (propName)
{  if (propName == "border-width") return "borderWidths";
   else if (propName == "margin")  return "margins";
   else if (propName == "padding") return "paddings";
   else {
      var hyphenPos = propName.indexOf("-");
      while (hyphenPos != -1) 
      { propName = propName.substr(0,hyphenPos) + 
                   propName.substr(hyphenPos+1,1).toUpperCase() +
                   propName.substr(hyphenPos+2);
        hyphenPos = propName.indexOf("-");
      }
      return propName;
   }
}     



/* Takes a string (singleSelector) which is a single CSS1-syntax
   selector (examples: "P", ".warning", "#foo", "P.warning") and returns 
   the Nav4 JavaScript selector as a string (examples:
   "document.tags.P", "document.classes.warning.all", "document.ids.foo",
   "document.classes.warning.P")

   Note: compound element name/class selectors like "P.foo" are supported,
   but compound element name/identifier selectors like "P#foo" are NOT supported.
   Do not use compound element name/identifier selectors like "P#foo".
   Since the identifier uniquely identifies the element, select the
   element using the identifier only ("#foo").
*/

function mapSelectorToNav4 (singleSelector)
{   if (singleSelector.substr(0,1) == ".")
        return "document.classes." + singleSelector.substr(1) + ".all";
    else if (singleSelector.substr(0,1) == "#")
        return "document.ids." + singleSelector.substr(1);
    else if (singleSelector.indexOf(".") == -1)
        return "document.tags." + singleSelector;
    else { 
        var selectorArray = singleSelector.split(".");
        return "document.classes." + selectorArray[1] + "." + selectorArray[0];
    }
}



function nav4SelectorString (selector)
{   var result;
    var selectorArray = selector.split(" ");
    if (selectorArray.length == 1) result = mapSelectorToNav4 (selectorArray[0]);
    else {  // handle contextual (multiple) selector
        result = "document.contextual("
        for (var i=0; i<selectorArray.length; i++)
        {   result += mapSelectorToNav4 (selectorArray[i]);
            if (i < selectorArray.length-1) result += ", ";
        }
        result += ")"
    }
    return result;
}





// function to construct Nav4 JavaScript Style Command as string
// from CSS1 selector, propName, and value. Called out as separate
// function mostly to enable automated testing.

function createNav4Rule (selector, propName, value, isVariable)
{   var opener = "=";  var closer = "";
    if (propName=="border-width" || propName=="margin" ||
        propName=="padding")
    {  opener = "("; closer = ")"  }
    return nav4SelectorString(selector) + "." + mapPropNameToNav4(propName) +
           opener + ((isVariable)?"":"\"") + value + ((isVariable)?"":"\"") + 
           closer + ";";
}




// function to construct IE4 JavaScript Style Command as string
// from CSS1 selector, propName, and value. Called out as separate
// function mostly to enable automated testing.
// 
// document.styleSheets[targetSheetID].addRule (selector, propName + ":" + value);

function createIE4Rule (selector, propName, value, isVariable, ssName)
{  var theRule;
   if (isVariable) theRule = "document.styleSheets[\"" + ssName + "\"].addRule (\""
               + selector + "\", \"" + propName  + ":\" + " 
               + value + ");";
   else theRule = "document.styleSheets[\"" + ssName + "\"].addRule (\""
               + selector + "\", \"" + propName  + ":" 
               + value + "\");";
   return (theRule);        
}

// function to construct Nav6 JavaScript Style Command as string
// from CSS1 selector, propName, and value. Called out as separate
// function mostly to enable automated testing.
// 
// document.getElementById(targetSheetID).sheet.insertRule (selector + "{" + propName + ":" + value + "}", targetSheetID.cssRules.length);

function createNav6Rule(selector,propName,value,isVariable,ssName) {
	if(!isVariable) { 
		rule = ( selector + " { " + propName + ": " + value + " }");
		code = "document.getElementById('" + ssName + "').sheet.insertRule('" + rule + "', " + "document.getElementById('" + ssName + "').sheet" + ".cssRules.length )"
		return code;
	} else {
		rule = ( selector + " { " + propName + ": \' + " + value + " + \' }");
		code = "document.getElementById('" + ssName + "').sheet.insertRule('" + rule + "', " + "document.getElementById('" + ssName + "').sheet" + ".cssRules.length )"
		return code;
	}
}



/* Cross-browser (Nav4, IE4) function to generate JavaScript code which
   defines CSS1 rules.  Returns JavaScript code as string.

   THIS FUNCTION IS FOR USE BY THE CODE GENERATOR PAGE css1tojs.html ONLY.
   DO NOT CALL THIS FUNCTION AND THEN EVALUATE THE RESULT DYNAMICALLY IN
   A PRODUCTION APPLICATION.  FOR EXAMPLE, DO NOT DO THIS:
   // EXAMPLE OF HOW THIS FUNCTION SHOULD *NOT* BE USED
   eval( css1FromJS (is.nav4up, "#fiftypxlm", "margin-left", "50px", false) );

   Instead, this function should be used to generate the correct JavaScript
   code in advance for both Nav4 and IE4. Paste that code into your script,
   and conditionally evaluate the code for the current browser.  This 
   approach insures optimal performance and stability across Nav4 and IE4.

   Takes CSS1 selector string, property name, and value.  Note: before using 
   this function, confirm that the desired property/value combination is
   supported in both Nav4 and IE4 on all target platforms.
   For a good reference, see http://style.webreview.com/safegrid.html

   REQUIRED ARGUMENTS:
   forNav:   a boolean. true if you want to generate JavaScript for Nav4+.
             false if you want to generate JavaScript for IE4+.

   selector: a string of one or more CSS1 single selectors separated by
             single spaces. Examples: "P", "P B", ".warning #foo P",
             "#foo", ".warning"

   propName: the CSS1-syntax (*not* JavaScript syntax) name of
             the property you want to set for the selected elements.
             Examples: "font-size" (not "fontSize")
                       "border-width" (not "borderWidths")

   value:    the value you want to set the property to.
             Syntax of CSS1 value and JavaScript value must be same.
             Examples: "12pt", "red", "#ff0000"

             NOTE: The assignment of multiple-values at once for a 
                   property like border-width, margin, or padding
                   is not currently supported by this emulator.
                   Example: NONE OF THE FOLLOWING ARE ALLOWED:

                   css1Rule ("P",    "border-width", "10px 15px 20px 25px")
                   css1Rule (".bar", "margin",       "10px 15px 20px 25px")
                   css1Rule ("#foo", "padding",      "10px 15px 20px 25px")

                   Instead, set the values on the four sides to a
                   a single value if they are all the same:

                   css1Rule ("P",    "border-width", "10px")
                   css1Rule (".bar", "margin",       "10px")
                   css1Rule ("#foo", "padding",      "10px")

                   Or use the property names for the four sides one at a 
                   time.

   isVariable: boolean. If false, this is a literal value (like "14pt"),
               so we must enclose it in double quotes in the returned
               string of JavaScript code. If true, this is a variable
               (like fontSizeOfElementFoo) which must *not* be enclosed
               in quotes.

   OPTIONAL FINAL ARGUMENT: (has effect on IE4 only)
   ssName:   name of style sheet into which rule should be added.
             Rule will be added at end of that style sheet.
             Note: in general, you should not use this parameter.
             It is simplest to have a single empty STYLE element which
             is the target style sheet in IE4 and which has the 
             default name. This argument is only intended to be used
             when for some reason you choose to place your JavaScript
             style settings in two or more SCRIPTs and therefore need
             to precede each SCRIPT with a separate STYLE element with 
             its own unique ID so that the Nav4 and IE4 rules are placed
             in the same position in the markup and get the same 
             priority.

   Usage notes:
   - color: use the 16 Windows VGA names ("red", etc.) or 
            6 digit hexadecimal RGB values ("#ffffff", etc.) only.
   - background-color: for block level elements, 
                       Nav4 fills in behind text only; 
                       IE4 fills in to right edge of screen.
   - text-decoration:  use "underline" and "line-through" only.
                       IE4 doesn't implement "blink". (shame, shame! ;-> )
   - font-style:       use "italic" or "normal" only, not "oblique".
*/

function css1FromJS (forNav, selector, propName, value, isVariable, ssName, nav6)
{   if (forNav) return (createNav4Rule (selector, propName, value, isVariable));
    else if(!nav6 && !forNav) {
       var targetSheetID = (css1FromJS.arguments.length < 6)? ieTargetStyleSheetID: ssName;
       var tmpRule = createIE4Rule (selector, propName, value, isVariable, targetSheetID);
       return (tmpRule);
    } else if(nav6) return (createNav6Rule(selector, propName, value, isVariable, ssName));
}

