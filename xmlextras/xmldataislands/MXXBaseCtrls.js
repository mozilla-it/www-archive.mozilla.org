/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Using XML Data Islands in Mozilla.
 *
 * The Initial Developer of the Original Code is
 * Thad Hoffman.
 * Portions created by the Initial Developer are Copyright (C) 2003
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *                 Thad Hoffman (phiori@mac.com) (Original Author)
 *                 Heikki Toivonen (heikki@netscape.com)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
/*****************
NOTE: this code is not a complete solution. This is just to demonstrate
how to parsea returned XML DOM that could be returned from SOAP, XMLHTTP,
XML-RPC, ASP, JSP, or CGI. 
*****************/
var MXXBaseRadioControlArray = new Array();
var MXXBaseCntrlHandlerArray = new Array();

MXXBaseControl=
{
	initialize:function (control)
	{
		//attach appropriate event(s)
		var tagType = "";
		if (control.type)
			tagType = control.type.toLowerCase();

		var tagName = control.tagName.toLowerCase();
		var strEvent;
		var proc = null;
		var handler = null;

		//value change events
		// you can attach eventhandlers here 
		if (tagName == "input")
		{
			if (tagType == "text" || tagType == "password")
			{
				strEvent = "change";
				proc = this.onChangeField;
				handler = this.processTextDataResponse;
			}
		}
		else if (tagName == "select" || tagName == "textarea")
		{
			strEvent = "change";
			proc = this.onChangeField;
			if (tagName == "select")
				handler = this.processComboDataResponse;
			else
				handler = this.processTextDataResponse;
		}
		else if (tagName == "span" || tagName == "div")
			handler = this.processLayerDataResponse;
		
		MXXBaseCntrlHandlerArray[control.id] = handler;			
	},	
	
	processDataResponse:function (control, xmlNode)
	{
		// fake setup for standalone test, make sure controls are initialized
		// this would normally happen on page load before a response is returned
		MXXBaseControl.initialize(control);
		
		var handlerTest = MXXBaseCntrlHandlerArray[control.id];
		if (handlerTest)
		{
			handlerTest(control, xmlNode);
		}
	},
	
	processTextDataResponse:function (control, xmlNode)
	{		
		var xmlValueNode = xmlNode.getElementsByTagName('value')[0];
		if (xmlValueNode && xmlValueNode.firstChild) 
			control.value = xmlValueNode.firstChild.data;
	},
	
	processLayerDataResponse:function (control, xmlNode)
	{
		var xmlValueNode = pXMLLib.getSingleNodeByName(xmlNode, "value");
		if (xmlValueNode)
			control.innerHTML = pXMLLib.getNodeText(xmlValueNode);
	},
	
	processComboDataResponse:function (control, xmlNode)
	{
		var xmlValueNode = xmlNode.getElementsByTagName('value')[0];
		if (xmlValueNode && xmlValueNode.firstChild)
		{
			var val = xmlValueNode.firstChild.data;

			var objCtrlOptions = control.options;
			var optlen = objCtrlOptions.length;

				var arrCurOptions = new Array();
				for (var i = 0; i < optlen; i++)
				{
					var option = objCtrlOptions[i];
					var optval = option.value;
					arrCurOptions[optval] = i+1; 
				}
				
				var arrSymbolsToDelete = new Array();
				var arrSymbolsToAdd = new Array();
				
				var symNodes = xmlNode.getElementsByTagName('symbol');
				var intSymLength = symNodes.length;
				for (var x = 0; x < intSymLength; x++)
				{
					var xmlSymNode = symNodes[x];
					var strSymValue = xmlSymNode.firstChild.data;
					var strAction = xmlSymNode.getAttribute("action");
	
					if (strAction == "add")
						arrSymbolsToAdd[strSymValue] = true;
				}
	
				for (var strSymValue in arrSymbolsToAdd)
				{
					if (!arrCurOptions[strSymValue])
					{	
						var len = objCtrlOptions.length;//++;
						var newOption = new Option(strSymValue, strSymValue);
						control.options[len] = newOption;	
					}				
				}
	
			var optlen = objCtrlOptions.length;
			for (var i = 0; i < optlen; i++)
			{
				if (objCtrlOptions[i].value == val)
					break;
			}
			
			if (i >= optlen)
			{
				controloption = new Option(val, val);
				control.options[optlen] = controloption;			
			}

			// Set the value of the control.			
			control.value = val;
		}
		return null;
	}
};

