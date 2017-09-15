
// An inefficient, but effective bubble sort
function sort_a(collection, key)
{
  var i, j;
  var count = collection.length;
  var parent, child;
 
  for (i = count-1; i >= 0; i--) {
    for (j = 1; j <= i; j++) {
      if (collection[j-1][key] > collection[j][key]) {
         // Move the item both in the local array and
         // in the tree
         child = collection[j];
         parent = child.parentNode;

         collection[j] = collection[j-1];
         collection[j-1] = child;

         parent.removeChild(child);       
         parent.insertBefore(child, collection[j]);
      }
    }
  }
}

// Sort dates the other way
function sort_1(collection, key)
{
  var i, j;
  var count = collection.length;
  var parent, child;
 
  for (i = count-1; i >= 0; i--) {
    for (j = 1; j <= i; j++) {
      if (collection[j-1][key] < collection[j][key]) {
         // Move the item both in the local array and
         // in the tree
         child = collection[j];
         parent = child.parentNode;

         collection[j] = collection[j-1];
         collection[j-1] = child;

         parent.removeChild(child);       
         parent.insertBefore(child, collection[j]);
      }
    }
  }
}

// Set user properties on the nodes in the collection
// based on information found in its children. For example,
// make a property "Author" based on the content of the
// "Author" element found in the childNode list of the node.
// This makes later sorting more efficient
function collectInfo(nodes, propNames)
{
  var i, j, k;
  var ncount = nodes.length; 
  var pcount = propNames.length;

  for (i = 0; i < ncount; i++) {
    var node = nodes[i];
    var childNodes = node.childNodes;
    var ccount = childNodes.length;
 
    for (j = 0; j < ccount; j++) {
      var child = childNodes[j];

      if (child.nodeType == Node.ELEMENT_NODE) {
        var tagName = child.tagName;

        for (k = 0; k < pcount; k++) {
          var prop = propNames[k];
          if (prop == tagName) {
            node[prop] = child.firstChild.data;
          }  
        }
      }    
    }
  }
}

// var sortableProps = new Array("Type", "Title", "Date");
var sortableProps = new Array("Title", "Type", "Date");
var vendors = new Array();

// We uppercase the tagName as a workaround for a bug
// that loses the original case of the tag.
var vendorset = document.getElementsByTagName("Vendor");

// We need to create a "non-live" array to operate on. Since
// we'll be moving things around in this array, we can't use
// the read-only, live one returned by getElementsByTagName.
for (var i=0; i < vendorset.length; i++) {
  vendors[i] =  vendorset[i];
}

collectInfo(vendors, sortableProps);

