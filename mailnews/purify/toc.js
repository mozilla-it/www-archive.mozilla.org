// purify2xml helper functions
// 
// Copyright (C) 1999 Alec Flett (alecf@usa.net, alecf@netscape.com)
// see http://www.mozilla.org/mailnews/purify/ for the latest version
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.

function expandCollapse(event)
{
  var img=event.target;
  var parent=img.parentNode;
  var sibling=parent.nextSibling;

  if (!sibling.nextSibling) return;
  
  var block=sibling.nextSibling;

  if (block.style) {
    if (block.style.display == "none" ||
        block.style.display == "") {
      block.style.display = "block";
      img.src = "minus.gif";
    }
    else {
      block.style.display = "none";
      img.src = "plus.gif";
    }
  }
}

function doSearch(doc, event)
{
  var textWidgets = document.getElementsByTagName("html:input");

  var widget=textWidgets[0];
  
  showOnly(widget.value);

}

function showOnly(searchText)
{
  var warnings = document.getElementsByTagName("html:div");
  var numwarn = warnings.length;

  for (var i=0; i<numwarn; i++) {
    var warning = warnings[i];
    
    // only hide/collapse warnings
    if (warning.className != "warning") continue;

    // not all warning sections have expandable bodies
    if (warning.childNodes.length < 3) continue;
    
    var warningblock = warning.childNodes[3];

    if (searchText=="" ||
        (warningblock && hasText(warningblock, "function", searchText))) {
      warning.style.display = "block";
    } else {
      warning.style.display = "none";
    }
    
  }
}

function hasText(element, tagName, searchText)
{
  // search all children for this tag
  if (!element ||
      element.length ==0) return false;
  
  var children = element.childNodes;

  if (!children) return false;

  // only search this element type
  if (element.tagName == tagName) {
    if (children[0].nodeValue.indexOf(searchText) != -1)
      return true;
  }

  // recurse on all children
  for (var i=0; i<children.length; i++) {
    if (hasText(children[i], tagName, searchText))
      return true;
  }
  return false;
}

function getWarningTypes()
{
  var result = new Array;

  var warntypes = document.getElementsByTagName("error");

  var allwarntypes = new Array;
  // uniquify the warnings by sorting them
  for (var i=0; i<warntypes.length; i++) {
    allwarntypes[i] = warntypes[i].childNodes[0].nodeValue;
  }

  allwarntypes.sort();

  var j=0;
  for (var i=0; i<allwarntypes.length; i++) {
    if (j==0 ||
        allwarntypes[i] != result[j-1]) {
      result[j++] = allwarntypes[i];
    }
  }
  return result;
}

function populateWarningTypes() {

  var warnings = getWarningTypes();
  var selectWidget = document.getElementsByTagName("select")[0];

  for (var i=0; i<warnings.length; i++) {
    var opt =
      document.createElementWithNameSpace("option",
                                          "http://www.w3.org/TR/REC-html40");
    opt.label = warnings[i];
    selectWidget.add(opt, null);
  }
}

