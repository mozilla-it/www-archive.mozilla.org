/**
 * SVG script wrappers, updated 2005-11-01
 * Maintained at http://www.mozilla.org/projects/svg/wrappers.js
 *
 * Copyright (c) 2005, Jonathan Watt, http://jwatt.org/contact
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */


// XMLHttpRequest
//
// If the global function XMLHttpRequest is undefined, the wrapper that follows
// implements it by wrapping Internet Explorer's ActiveXObject function. For a
// description of XMLHttpRequest see
//
//  http://www.whatwg.org/specs/web-apps/current-work/#scripted-http

if (typeof XMLHttpRequest == 'undefined')
{
  XMLHttpRequest = function() {
    try {
      return new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {}
    try {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {}
    throw new Error('XMLHttpRequest is undefined and could not be implemented');
  }
}


// The four wrappers that follow attempt to implement four global functions
// that are present in only some SVG implementations. The functions - getURL,
// postURL, parseXML and printNode - are not part of a W3C specification, but
// are nevertheless widely used. A rough draft of an SVG WG attempt to specify
// the behaviour of these functions can be found at
//
//  http://www.w3.org/TR/2004/WD-SVG12-20040510/#WindowObject


// getURL
//
// There are no known problematic differences between the following wrapper and
// the global getURL function that some SVG implementations provide.

if (typeof getURL == 'undefined')
{
  getURL = function(url, callback) {
    if (!url)
      throw new Error('No URL for getURL');

    try {
      if (typeof callback.operationComplete == 'function')
        callback = callback.operationComplete;
    } catch (e) {}
    if (typeof callback != 'function')
      throw new Error('No callback function for getURL');

    if (typeof XMLHttpRequest == 'undefined')
      throw new Error('Both getURL and XMLHttpRequest are undefined');

    var http_request = new XMLHttpRequest();
    http_request.onreadystatechange = function() {
      if (http_request.readyState == 4) {
        callback( { success : http_request.status == 200,
                    content : http_request.responseText,
                    contentType : http_request.getResponseHeader('Content-Type') } );
      }
    }
    try {
      http_request.open('GET', url, true);
      http_request.send(null);
    } catch (e) {
      callback( { success : false } );
    }
  }
}


// postURL
//
// There are no known problematic differences between the following wrapper and
// the global postURL function that some SVG implementations provide.

if (typeof postURL == 'undefined')
{
  postURL = function(url, post_data, callback, type, encoding) {
    if (!url)
      throw new Error('No URL for postURL');
    if (!post_data)
      throw new Error('No POST data for postURL');

    try {
      if (typeof callback.operationComplete == 'function')
        callback = callback.operationComplete;
    } catch (e) {}
    if (typeof callback != 'function')
      throw new Error('No callback function for postURL');

    if (typeof XMLHttpRequest == 'undefined')
      throw new Error('Both postURL and XMLHttpRequest are undefined');

    var http_request = new XMLHttpRequest();
    http_request.onreadystatechange = function() {
      if (http_request.readyState == 4) {
        callback( { success : http_request.status == 200,
                    content : http_request.responseText,
                    contentType : http_request.getResponseHeader('Content-Type') } );
      }
    }
    if (type) http_request.setRequestHeader('Content-Type', type);
    if (encoding) http_request.setRequestHeader('Content-Encoding', encoding);
    try {
      http_request.open('POST', url, true);
      http_request.send(post_data);
    } catch (e) {
      callback( { success : false } );
    }
  }
}


// parseXML
//
// The following wrapper should provide the same behaviour as the global
// parseXML function that some SVG implementations provide so long as there are
// no well-formedness errors in the input. (If the input is not well-formed
// XML, DOMParser will wrap the errors in 'parseerror' elements.) One known
// difference in behaviour is that the wrapper that follows requires namespace
// declarations in the input markup if the markup is intended to be SVG or some
// other namespaced XML. If the declarations aren't present the resulting DOM
// will be "flat" (so nothing will be rendered if it is inserted into a
// document for example).

if (typeof parseXML == 'undefined')
{
  parseXML = function(str, doc) {
    if (!(doc === undefined || doc === null ||
          typeof doc == 'object' && doc.nodeType === 9))
      throw new Error('Bad argument for doc parameter in parseXML');

    if (typeof DOMParser == 'undefined')
      throw new Error('Both parseXML and DOMParser are undefined');

    var new_doc = new DOMParser().parseFromString(str, 'text/xml');
    if (!doc)
      return new_doc;
    var doc_fragment = doc.createDocumentFragment();
    var imported_node = doc.importNode(new_doc.documentElement, true);
    doc_fragment.appendChild(imported_node);
    return doc_fragment;
  }
}


// printNode
//
// There are no known problematic differences between the following wrapper and
// the global printNode function that some SVG implementations provide.

if (typeof printNode == 'undefined')
{
  printNode = function(node) {
    if (typeof XMLSerializer == 'undefined')
      throw new Error('Both printNode and XMLSerializer are undefined');

    return new XMLSerializer().serializeToString(node);
  }
}
