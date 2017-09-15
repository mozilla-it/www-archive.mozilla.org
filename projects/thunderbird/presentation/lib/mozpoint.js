/* 
 * See http://mozpoint.mozdev.org
 *
 * slides.js -- a collection of scripts for use with mozpoint. 
 * - Gagan Saksena 07/08/01
 *
 * Added rginda's hack for onkeyup events to enable keyboard 
 * navigation.  - 02/23/02 
 *
 * Added blank page for 'b' key. Like powerpoint. 03/08/02
 *
 * Added IE support as well. 03/11/02
 *
 */
// --------------------------------------------------

var keyTimeOut = 500;
var keyStack = new Array();
var ie = document.all ? true: false;

// quick function for creating colors.
function rgbc(a,b,c) {
  return 'rgb(' + a + ',' + b + ',' + c + ')';
}

// fadecolor
function fadecolor(rgbfrom, rgbto, step)
{
  var rgbformat = /rgb\((\d+),(\d+),(\d+)\)/g
  rgbformat.exec(rgbfrom);
  return rgbc(RegExp.$1, RegExp.$2, RegExp.$3 + step)
}

function currentFile() {
  k = String(document.location).split('/');
  return k[k.length-1];
}

function currentFileIndex() {
  f = currentFile();
  for (i=0; i<toc.length; ++i) {
    if (toc[i] == f)
      return i;
  }
  return -1;
}

function loadslide(c) {
  if (c>=0 && c <toc.length) {
    document.location = toc[c];
	}
}

function loadSlideFromKeys() {
  if (keyStack.length == 0) return;
  c = 0;
  i = 0;
	do {
		d = keyStack.pop();
    c += Math.pow(10, i++)*d;
	} while (keyStack.length);
  loadslide(parseInt(c));
}

function fireload(count) {
  if (count != keyStack.length) return;
  loadSlideFromKeys();
}

function loadotherstuff() {
	if (ie) {
		document.write('<DIV ID=other></DIV>');
		return;
	}

	var other = document.createElement("div");
	other.setAttribute("id", "other");

	document.firstChild.appendChild(other);
}

function loadstyle(sheet) {
	if (ie) {
		document.write('<LINK REL="stylesheet" HREF="' + sheet + '">');
		return;
	}
	// add the stylesheet stuff here.
	link = document.createElement("link");
	link.setAttribute("rel", "stylesheet");
	link.setAttribute("href", sheet);

	// firstChild is <HTML>
	document.firstChild.appendChild(link);
}

// toggle_blank switches the black/white blank div to front or back
function toggle_blank(black) {

	var other = ie ? document.all["other"] : document.getElementById("other");
	var color = black ? "black" : "white";
	other.style.backgroundColor = (other.style.backgroundColor == color) ? "transparent" : color;
}

// Capture all key events-- thx for this hack to rginda. I extended it for the
// keyboard binding of PP
// TODo punch in keys numbers for slides nums
function keyEvents(e) {
  switch (e.which) {
    case 48: // 0
    case 49: // 1
    case 50: // 2
    case 51: // 3
    case 52: // 4
    case 53: // 5
    case 54: // 6
    case 55: // 7
    case 56: // 8
    case 57: // 9
      setTimeout(fireload, keyTimeOut, keyStack.push(e.which-48)); 
      break;
    case 66: // b
    case 87: // w
			toggle_blank(e.which == 66);
      break;
    case 32: // spacebar
    case 39: // rightkey
    case 40: // downkey
    case 78: // n
      loadslide(currentFileIndex()+1);
      break;
    case 37: // leftkey
    case 38: // upkey
    case 80: // p
      loadslide(currentFileIndex()-1);
      break;
    case 82: // r
      // toggle resolution--
      /* need to make size be read in from a cookie since slides.js is read
       * each time we can't really reset it here... */
      //size = (size==0) ? 1 : 0;
      //loadslide(currentFileIndex());
      break;
    case 84: // t
      loadslide(0);
      break;
    default: 
      break;
  }
}

// Yeah we're called mozpoint but what the heck-- we'll be nice.
function keyEventsIE() {
	e = event;
	e.which = e.keyCode;
	keyEvents(e);
}

// The Uber:test function for making sure we are reaching a random point in some code...
function test() {
  alert('something');
  dump('reached here!');
}

function init_all() {
	// initialize all the stuff... 
	document.onkeyup = ie ? keyEventsIE : keyEvents;
	if (resizeOnLoad) {
    switch(size) {
      case 0:
        window.resizeTo(800,640);
        break;
      case 1:
      default:
        window.resizeTo(1024,768);
        break;
    }
  }
}
loadstyle(libLocation + "lib/size"+ size + ".css");
loadstyle(libLocation + "lib/mozpoint.css");
loadotherstuff();
// vim: set sw=2 ts=2:
