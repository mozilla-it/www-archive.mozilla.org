/*
 mvctable.js v0.2 Thursday, May 06, 1999
 Mitch Gould - humanfact@generalpicture.com
 
 by Mitch Gould, humanfact@generalpicture.com

 This script demonstrates dynamic documents in Netscape Navigator v5
 in the folowing ways:

  (a) it exercises W3C's standard Document Object Model API.
  (b) it creates, modifies, and destroys a table.
  (c) it partially illustrates the concept of Model-View-Controller.

 (To fully illustrate the MVC concept, modifications made to the
  data view would need to be propagated back to the data model.)

*/

// A. Data initialization.
 
 var datacount = 0
 model = new Array()

   // Allocate the first dataset, a set of quotations, from this array.
   arrayquotes = new Array(
    "Oh dear! I shall be too late.",
    "Curiouser and curiouser!",
    "Who are -you-?",
    "We're all mad here.",
    "Twinkle, twinkle, little bat.",
    "Off with her head!",
    "I make you a present of everything I've said...",
    "Once, I was a real Turtle.",
    "Sentence first--verdict afterwards.")
 
   // When a link is clicked, the quotations' sources will be revealed
   // from this array.
   arraysources = new Array(
    "White Rabbit",
    "Alice",
    "Caterpillar",
    "Cheshire Cat",
    "Dormouse",
    "Red Queen",
    "Dutchess",
    "Mock Turtle",
    "Red Queen")

// B. MVC-DOM methods.

 // Establish a new data model and assign it to a new view.
 function startController() {

  // Populate the model with initial data.
  datamodel = refreshModel(arrayquotes)

  // Get the document body element.
  var docbod = getBody()

  /* 
     Create an empty view in the body of the document and fill it
     with the initial data. 
  */
   createView(docbod, model) 
 }

 // Copy the specified dataset into the model.
 function refreshModel(arraycurrent) {

  // Populate the model with the current datastore.
  for(var i=0; i < arraycurrent.length; i = i + 1)
   {
    model[i] = arraycurrent[i]
   }
  return model
 }

 /* 
    This could be generalized to provide alternatives to a
    a table view, such as a select object, a tree, or even
    a textarea. This sample produces a 1-column table. 
    Multi-column tables are more complex.
 */
 function createView(bodyelement, themodel) {
  table = document.createElement("TABLE")
  table.border = 1
  table.id = "viewtable"
  tablebody = document.createElement("TBODY")
  var modelcount = 0
  for(var i=0; i < model.length; i++)
  {
   currentRow = document.createElement("TR")
   currentCell = document.createElement("TH")      
   currentCell.appendChild(document.createTextNode(model[i]))
   currentRow.appendChild(currentCell)
   tablebody.appendChild(currentRow)
  }
  table.appendChild(tablebody)
  bodyelement.appendChild(table)
  return table
 }

 // Refresh the model first, then the view.
 function refreshView(dataset) {
  // Populate the model with new data.
  refreshModel(dataset)

  tablebody = document.getElementsByTagName("TBODY").item(0)
  var count = 0
  replaceAllText(tablebody)
 }

 // One can also destroy HTML objects using the DOM.
 function destroyView() {
  objecttodestroy = document.getElementById("viewtable")
  body = getBody()
  body.removeChild(objecttodestroy)
  // Now destroy the buttons.
  objecttodestroy = document.getElementById("whosaid")
  body.removeChild(objecttodestroy)
  objecttodestroy = document.getElementById("goaway")
  body.removeChild(objecttodestroy)
 }

// C. DOM tree-navigation and utilities.

 /*
   One must climb the trunk, branches, and twigs to get
   (or set!) the fruit. The recursive nature of this
   algorithm reflects an essential fractal nature of 
   documents.
 */
 function replaceAllText(startelem) {
  // Climb the object tree, replacing its text nodes with
  // new data.
  for (var i=0; i < startelem.childNodes.length; i = i + 1) {
   switch (startelem.childNodes.item(i).nodeType) {
    case 1: // Element nodetype
     replaceAllText(startelem.childNodes.item(i))
     break;
    case 3: // Text nodetype 
      if (datacount < model.length) {
       setText(startelem.childNodes.item(i), model[datacount])
       datacount = datacount + 1
      } else {
       setText(startelem.childNodes.item(i)," - ? - ")
      }
     break;
   } //endswitch
  } //endfor
 } //endfunction

 /*
    Many operations on dynamic documents require one to start
    from the document's body element.
 */
 function getBody()
  {
   if(navigator.appName != "Netscape") {
    resultElement = document.body;
   } else {
    resultElement = document.getElementsByTagName("body").item(0);
   }
   return resultElement;
 }

 // Utility function to overwrite text nodes.
 function setText(tagToSet, valueToSet) {
  tagToSet.nodeValue = valueToSet
 }

// D. This can't start until the page loads.
 window.onload = startController
