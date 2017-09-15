// navbar.js
// (Global variables are declared in slide.js.)
// Display previous/next slide in sequence, or goto other slide.

// 22 May 98: rewrite to calculate base index.htm directory URL and add filename;
//            this eliminated need for caller_in_base_directory argument *and*
//            finally eliminated the occasional slide "Not found" error message! 
// 20 May 98: add Help window code
// 10 April 98: IE4 compatibility added.

// This is a simplified version of the JavaScript Client Sniffer code 
// found at http://developer.nextscape.com/docs/examples/javascript/browser_type.html

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
    this.nav4up = (this.nav && (this.major >= 4));
    this.nav5 = (this.nav && (this.major == 5));
    this.nav5up = (this.nav && (this.major >= 5));
    
    this.ie   = (agt.indexOf("msie") != -1);
    this.ie3  = (this.ie && (this.major < 4));
    this.ie4  = (this.ie && (this.major == 4));
    this.ie4up  = (this.ie  && (this.major >= 4));
    this.ie5  = (this.ie && (this.major == 5));
    this.ie5up  = (this.ie  && (this.major >= 5));

    this.opera = (agt.indexOf("opera") != -1);
     
}

var is = new Is();

// HACK: work around fact that Nav5 M5 doesn't support alert()
var nav5SupportsAlerts = false;

// Go to slide number slide_num.
function goto_slide(slide_num)
{       var indexURL = top.location.href; // get URL of top-level frameset doc
        var baseURL = indexURL.substring (0, indexURL.lastIndexOf("/") + 1);
	if(slide_num < 1 || slide_num > top.last_slide)
	{	if (!is.nav5 || nav5SupportsAlerts) alert("Please enter number between 1 and " + top.last_slide);
	}
	else 
	{	top.current_slide = Math.abs(slide_num);
		top.frames["slide"].location = baseURL + top.filename[slide_num];
                // update displayed page count in goto field
                // TODO: Nav5 support!
                // top.frames["next"].document.forms["gotoform"].slidenum.value = top.current_slide;
	}
        // ekrock added 13 May to work around #6222
        return false;
}

// Display previous slide in sequence.
function prev_slide()
{	if (top.current_slide == 1)
	{	if (!is.nav5 || nav5SupportsAlerts) alert("You are already at the first slide.\nThere is no previous slide.");
	} 
        else goto_slide(top.current_slide - 1);
        // ekrock added 13 May to work around #6222
        return false;
}


// Display next slide in sequence.
function next_slide()
{	if (top.current_slide == top.last_slide)
	{	if (!is.nav5 || nav5SupportsAlerts) alert("You are already at the last slide.\nThere is no next slide.");
	} 
        else goto_slide(top.current_slide + 1);
        // ekrock added 13 May to work around #6222
        return false;
}




