function Is ()
{   
    var agt=navigator.userAgent.toLowerCase()

    this.major = stringToNumber(navigator.appVersion)
    this.minor = parseFloat(navigator.appVersion)

    this.nav  = ((agt.indexOf('mozilla')!=-1) && ((agt.indexOf('spoofer')==-1)
                && (agt.indexOf('compatible') == -1)))
    this.nav2 = (this.nav && (this.major == 2))
    this.nav3 = (this.nav && (this.major == 3))
    this.nav4 = (this.nav && (this.major == 4))
	
	this.nav5 =	(this.nav && (this.major == 5))
	this.nav6 = (this.nav && (this.major == 5))
	this.gecko = (this.nav && (this.major >= 5))

    this.ie   = (agt.indexOf("msie") != -1)
    this.ie3  = (this.ie && (this.major == 2))
    this.ie4  = (this.ie && (this.major == 3))
    this.ie5  = (this.ie && (this.major == 4))


    this.opera = (agt.indexOf("opera") != -1)
     
    this.nav4up = this.nav && (this.major >= 4)
    this.ie4up  = this.ie  && (this.major >= 4)
}


var is = new Is();

function dw(str, minVersion, maxVersion)
{   if ( ((dw.arguments.length < 3) || (is.major <= maxVersion)) 
         && ((dw.arguments.length < 2) || (is.major >= minVersion)))
    document.write(str)  
}

function dwb (str, aBoolean)
{   if  ((dwb.arguments.length < 2) || aBoolean)
    document.write(str)  
}

function sv(str, minVersion, maxVersion)
{   if ( ((sv.arguments.length < 3) || (is.major <= maxVersion)) 
         && ((sv.arguments.length < 2) || (is.major >= minVersion)))
    return str;
    else return "";
}

function sb (str, aBoolean)
{   if  ((sb.arguments.length < 2) || aBoolean)
    return str;
    else return "";
}

function layerClipOrder (cssClipString)
{  var commaPos = cssClipString.lastIndexOf(",");
   return (cssClipString.substring(commaPos+1) + "," + cssClipString.substring(0,commaPos));
}

function genElt (name, content, left, top, z, width, height, visibility, 
                 backgroundColor, backgroundImage, clip, relative, 
                 hideEltOnOlderBrowsers, useDivInsteadOfLayer, classname) 
{ var markup = "";
  if (is.gecko)
  {
    markup = '<DIV ID="' + name + '"' +  
        ((classname)?' CLASS="' + classname + '"':'') + 
        ' STYLE="position:' + ((relative)?'relative;':'absolute;') + 
        ' overflow:none;' + 
        ((left)?' left:' + left + 'px;':'') + 
        ((top)?' top:' + top + 'px;':'') + 
        ((height)?' height:' + height + 'px;':'') + 
        ((width)?' width:' + width + 'px;':'') + 
        ((visibility && (visibility!='')) ? ' visibility:' + visibility + ';' : '') + 
        ((z)?' z-index:' + z + ';':'') + 
        ((backgroundColor)?' background-color:' + backgroundColor + ';':'') + 
        ((backgroundImage)?' background-image:url("' + backgroundImage + '");':'') +  
        ((clip)?' clip:rect("' + clip + '");':'') + 
        '">' + ((content)?content:'') + '</DIV>';
  }

  else if (is.nav && (is.major == 4 || !hideEltOnOlderBrowsers) && 
      !useDivInsteadOfLayer)
  { var tagname = (relative)?'ILAYER':'LAYER';
    if (visibility && (visibility!=''))
    {  if (visibility=="hidden") visibility = "hide";
       else if (visibility=="visible") visibility = "show";
    }
    markup = '<' + tagname + ' ID="' + name + '"' + ((classname)?' CLASS="' + 
        classname + '"':'') + ((left)?' LEFT="' + left + '"':'') + 
        ((top)?' TOP="' + top + '"':'') + ((width)?' WIDTH="' + width + '"':'') + 
        ((height)?' HEIGHT="' + height + '"':'') + 
        ((visibility && (visibility!='')) ? ' VISIBILITY="' + visibility + '"' : '') + 
        ((z)?' Z-INDEX="' + z + '"':'') + 
        ((backgroundColor)?' BGCOLOR="' + backgroundColor + '"':'') + 
        ((backgroundImage)?' BACKGROUND="' + backgroundImage + '"':'') +  
        ((clip)?' CLIP="' + layerClipOrder(clip) + '"':'') + 
        '>' + ((content)?content:'') + '</' + tagname + '>';
  }
 
  else if ((is.ie || (is.nav && useDivInsteadOfLayer)) && (is.major>=4 || !hideEltOnOlderBrowsers))
  { markup = '<DIV ID="' + name + '"' +  
        ((classname)?' CLASS="' + classname + '"':'') + 
        ' STYLE="position:' + ((relative)?'relative;':'absolute;') + 
        ' overflow:none;' + 
        ((left)?' left:' + left + 'px;':'') + 
        ((top)?' top:' + top + 'px;':'') + 
        ((height)?' height:' + height + 'px;':'') + 
        ((width)?' width:' + width + 'px;':'') + 
        ((visibility && (visibility!='')) ? ' visibility:' + visibility + ';' : '') + 
        ((z)?' z-index:' + z + ';':'') + 
        ((backgroundColor)?' background-color:' + backgroundColor + ';':'') + 
        ((backgroundImage)?' background-image:url("' + backgroundImage + '");':'') +  
        ((clip)?' clip:rect("' + clip + '");':'') + 
        '">' + ((content)?content:'') + '</DIV>';
  }

  return markup;
}

function writeElt (name, content, left, top, z, width, height, visibility, 
                   backgroundColor, backgroundImage, clip, relative, 
                   hideEltOnOlderBrowsers, useDivInsteadOfLayer, classname) 
{ if (writeElt.arguments.length < 15) classname = false;
  if (writeElt.arguments.length < 14) useDivInsteadOfLayer = false;
  if (writeElt.arguments.length < 13) hideEltOnOlderBrowsers = false;
  if (writeElt.arguments.length < 12) relative = false;
  if (writeElt.arguments.length < 11) clip = false;
  if (writeElt.arguments.length < 10) backgroundImage = false;
  if (writeElt.arguments.length < 9) backgroundColor = false;
  if (writeElt.arguments.length < 8) visibility = false;
  if (writeElt.arguments.length < 7) height = false;
  if (writeElt.arguments.length < 6) width = false;
  if (writeElt.arguments.length < 5) z = false;
  if (writeElt.arguments.length < 4) top = false;
  if (writeElt.arguments.length < 3) left = false;
  if (writeElt.arguments.length < 2) content = false;
  document.write (genElt (name, content, left, top, z, width, height, visibility, 
                    backgroundColor, backgroundImage, clip, relative, 
                 hideEltOnOlderBrowsers, useDivInsteadOfLayer, classname));
}

function getElt () 
{ if (is.nav4)
  {
    var currentLayer = document.layers[getElt.arguments[0]];
    for (var i=1; i<getElt.arguments.length && currentLayer; i++)
    {   currentLayer = currentLayer.document.layers[getElt.arguments[i]];
    }
    return currentLayer;
  } 
  else if(document.getElementById && document.getElementsByName)
  { 
    var name = getElt.arguments[getElt.arguments.length-1];
    if(document.getElementById(name))
       return document.getElementById(name);
    else if (document.getElementsByName(name))
	   return document.getElementsByName(name)[0];
  }
  else if (is.ie4up) {
    var elt = eval('document.all.' + getElt.arguments[getElt.arguments.length-1]);
    return(elt);
  }

}

function showElt(elt)
{
	setEltVisibility(elt,'visible');
}

function hideElt(elt)
{
	setEltVisibility(elt, 'hidden');
}

function setEltVisibility (elt, value)
{  if (is.nav4) elt.visibility = value;
   else if (elt.style) elt.style.visibility = value;
}

function getEltVisibility (elt)
{  if (is.nav4) 
   {  var value = elt.visibility;
      if (value == "show") return "visible";
      else if (value == "hide") return "hidden";
      else return value;
   }
   else if (elt.style) return elt.style.visibility;
}

function moveEltTo (elt, x, y) 
{ if (is.nav4) elt.moveTo(x, y);
  else if (is.ie4up) {
    elt.style.pixelLeft = x;
    elt.style.pixelTop  = y;
  }
  else if (is.gecko) {
    elt.style.left = x;
    elt.style.top  = y;
  }
}

function moveEltBy (elt, x, y) 
{ if (is.nav4) elt.moveBy(x, y);
  else if (is.ie4up)  {
    elt.style.pixelLeft += x;
    elt.style.pixelTop  += y;
  }
  else if (is.gecko)  {
    elt.style.left = (stringToNumber(elt.style.left) + x + "px");
    elt.style.top  = (stringToNumber(elt.style.top)  + y + "px");
  }
}

function getEltPageLeft(elt) {
  var x;

  if (is.nav4)
    return elt.pageX;
  if (is.ie4up) {
    x = 0;
    while (elt.offsetParent != null) {
      x += elt.offsetLeft;
      elt = elt.offsetParent;
    }
    x += elt.offsetLeft;
    return x;
  }
  if (is.gecko) {
    x = 0;
    while (elt.offsetParent != null) {
      x += elt.offsetLeft;
      elt = elt.offsetParent;
    }
    x += elt.offsetLeft;
    return x;
  }
  return -1;
}

function getEltPageTop(elt) {
  var y = 0;

  if (is.nav4)
    return elt.pageY;
  if (is.ie4up) {
    while (elt.offsetParent != null) {
      y += elt.offsetTop;
      elt = elt.offsetParent;
    }
    y += elt.offsetTop;
    return y;
  }

  if (is.mac && is.ie5)
  {
    y += stringToNumber(document.body.currentStyle.marginTop);
  }

  if (is.gecko) {
    while (elt.offsetParent != null) {
      y += elt.offsetTop;
      elt = elt.offsetParent;
    }
    y += elt.offsetTop;
    return y;
  }
  return -1;
}

function setEltLeft (elt, x) {
  if (is.nav4)     elt.left=x;
  else if (is.ie4up) elt.style.pixelLeft=x;
  else if (is.gecko) elt.style.left = (x + "px");
}


function getEltLeft (elt) {
  if (is.nav4)     return (elt.left);
  else if (is.ie4up) return (elt.style.pixelLeft);
  else if (is.gecko) return stringToNumber(elt.style.left);
}

function setEltTop (elt, y) 
{ if (is.nav4)     elt.top=y;
  else if (is.ie4up) elt.style.pixelTop=y;
  else if (is.gecko) elt.style.top= (y + "px");
}

function getEltTop (elt) 
{ if (is.nav4)     return (elt.top);
  else if (is.ie4up) return (elt.style.pixelTop);
  else if (is.gecko) return stringToNumber(elt.style.top);
}

function getEltWidth(elt) {

  if (is.nav4) {
    if (elt.document.width)
      return elt.document.width;
    else
      return elt.clip.right - elt.clip.left;
  }
  if (is.ie4up) {
    if (elt.style.pixelWidth)
      return elt.style.pixelWidth;

    else
      return elt.offsetWidth;
  }
  if (is.gecko) {
    if (elt.style.width)
      return stringToNumber(elt.style.width);
    else
      return stringToNumber(elt.offsetWidth);
  }
  return -1;
}

function setEltWidth(elt,wdth)
{
	if(is.nav4)
    { 
	     elt.document.width = wdth;
    }
    else if(elt.style)
    { 
        elt.style.width = wdth;
    }
}

function getEltHeight(elt) {
  if (is.nav4) {
    if (elt.document.height)
      return elt.document.height;
    else
      return elt.clip.bottom - elt.clip.top;
  }
  if (is.ie4up) {
    if (elt.style.pixelHeight)
      return elt.style.pixelHeight;
    else
      return elt.clientHeight;
  }
  if (is.gecko) {
    if (elt.style.height)
      return stringToNumber(elt.style.height);
    else
      return stringToNumber(elt.offsetHeight);
  }
  return -1;
}

function setEltHeight(elt,hght)
{
	if(is.nav4)
    { 
		elt.document.height = hght;
    }
    else if(elt.style)
    { 
        elt.style.height = hght;
    }
}

function setEltClip (elt, cliptop, clipright, clipbottom, clipleft) 
{ if (is.nav4) {
    elt.clip.left   = clipleft;
    elt.clip.top    = cliptop;
    elt.clip.right  = clipright;
    elt.clip.bottom = clipbottom;
  }
  else if (is.ie4up)  elt.style.clip = 'rect(' + cliptop + ' ' +  
       clipright + ' ' + clipbottom + ' ' + clipleft +')';
  else if (is.gecko)  elt.style.clip = 'rect(' + cliptop + ' ' +  
       clipright + ' ' + clipbottom + ' ' + clipleft +')';
}

function tempClipObj (elt)
{  var clipStr = elt.style.clip;
  
   clipStr = clipStr.substring (clipStr.indexOf("(") + 1);
   this.top = stringToNumber(clipStr);
   clipStr = clipStr.substring (clipStr.indexOf(" ") + 1);
   this.right = stringToNumber(clipStr);
   clipStr = clipStr.substring (clipStr.indexOf(" ") + 1);
   this.bottom = stringToNumber(clipStr);
   clipStr = clipStr.substring (clipStr.indexOf(" ") + 1);
   this.left = stringToNumber(clipStr);
}

function getEltClipLeft (elt) 
{ if (is.nav4)     return (elt.clip.left);
  else if (elt.style) 
  {  var tempClip = new tempClipObj (elt);
     return tempClip.left;
  }
}

function getEltClipTop (elt) 
{ if (is.nav4)     return (elt.clip.top);
  else if (elt.style) 
  {  var tempClip = new tempClipObj (elt);
     return tempClip.top;
  }
}

function getEltClipRight (elt) {
  if (is.nav4)     return (elt.clip.right);
  else if (elt.style) 
  {  var tempClip = new tempClipObj (elt);
     return tempClip.right;
  }

}

function getEltClipBottom (elt) 
{ if (is.nav4)     return (elt.clip.bottom);
  else if (elt.style) 
  {  var tempClip = new tempClipObj (elt);
     return tempClip.bottom;
  }
}

function getEltClipWidth (elt) 
{
    return (getEltClipRight(elt) - getEltClipLeft(elt));
}

function getEltClipHeight (elt) 
{
    return (getEltClipBottom(elt) - getEltClipTop(elt));
}

function getCurrentWinWidth() 
{ if (is.nav4)     return(window.innerWidth);
  else if (is.ie4up) return(document.body.clientWidth);
  else if (is.gecko) return(window.innerWidth);
}

function getCurrentWinHeight() 
{ if (is.nav4)     return(window.innerHeight);
  else if (is.ie4up) return(document.body.clientHeight);
  else if (is.gecko) return(window.innerHeight);

}

function getEltZIndex (elt) 
{ if (is.nav4) return(elt.zIndex);
  else if (elt.style) return (elt.style.zIndex);
}

function setEltZIndex (elt, z) 
{ if (is.nav4) elt.zIndex = z;
  else if (elt.style) elt.style.zIndex = z;
}

function setEltBackgroundImage (elt, imageFilePath) 
{ if (is.nav4) elt.background.src = imageFilePath;
  else if (is.ie4up) elt.style.backgroundImage = "url(" + imageFilePath + ")";
  else if (is.gecko) elt.style.backgroundImage = "url(" + imageFilePath + ")";
}

function getEltBackgroundImage (elt) 
{ if (is.nav4) return (elt.background.src);
  else if (elt.style) { 
     var theURL = elt.style.backgroundImage;
     if (typeof(theURL) == "string")
     {  var URLlen = theURL.length;
        return (theURL.substring (4, URLlen-1));
     }
     else return(theURL);
  }
}

function setEltBackgroundColor (elt, colorNumber) 
{ if (is.nav4) elt.bgColor = colorNumber;
  else if (elt.style) elt.style.backgroundColor = colorNumber;
}

var colorNameString = "aqua,black,blue,fuchsia,gray,green,lime,maroon,navy,olive,purple,red,silver,teal,yellow,white";
var colorNames   = new Array ("aqua", "black", "blue", "fuchsia", "gray",   "green", "lime", "maroon", "navy", "olive",  "purple", "red",    "silver", "teal", "yellow", "white");
var colorNumbers = new Array (0xffff, 0,       0xff,   0xff00ff,  0x808080, 0x8000,  0xff00, 0x800000, 0x80,   0x808000, 0x800080, 0xff0000, 0xc0c0c0, 0x8080, 0xffff00, 0xffffff);

function isColorName (aString)
{ return ( (typeof(aString) == "string") && (colorNameString.indexOf(aString) != -1));
}

function colorNameToNumber (colorName)
{ for (var i=0; i<16; i++) if (colorNames[i]==colorName) return colorNumbers[i];
  return colorName;
}

function colorNumberToName (colorNumber)
{ for (var i=0; i<16; i++) if (colorNumbers[i]==colorNumber) return colorNames[i];
  return null;
}

function getEltBackgroundColor (elt) 
{
  if (is.nav4) return (elt.bgColor);
  else if (is.ie4up) 
  {
     var colorVal = elt.style.backgroundColor;
     if (isColorName(colorVal)) return colorNameToNumber (colorVal);
     else if (typeof(colorVal) == "string") 
          return (("0x" + colorVal.substring(1)) - 0);
     else return colorVal;
  }
  else if (is.gecko) {
    var colorVal = elt.style.backgroundColor;
    
	 if (typeof(colorVal) == "string")
	 { 	
		if (isColorName(colorVal)) 	
		{
			return colorNameToNumber (colorVal);
		}
		else if (colorVal.indexOf(["rgb"]) != -1) 
		{	
			var sR,sG,sB;
			var iR,iG,iB;
			var i=0;

			ColorString = (elt.style.backgroundColor);
			ColorString = ColorString.slice(4,-1);

			while(ColorString[i] != ',' && i < 20){i++;}
			sR = ColorString.slice(0,-(ColorString.length - i));
			i++;
			j = i;
			while(ColorString[j] != ',' && j < 20){j++;}
			sG = ColorString.slice(i,0-(ColorString.length - j));
			j++;
			sB = ColorString.slice(j);
			iR = stringToNumber(sR);
			iG = stringToNumber(sG);
			iB = stringToNumber(sB);
			sR = iR.toString(16);if(sR.length < 2)sR = "0" + sR;if(sR.length < 2)sR = "0" + sR;
			sG = iG.toString(16);if(sG.length < 2)sG = "0" + sG;if(sG.length < 2)sG = "0" + sG;
			sB = iB.toString(16);if(sB.length < 2)sB = "0" + sB;if(sB.length < 2)sB = "0" + sB;

			sRGB = sR.toUpperCase()+sG.toUpperCase()+sB.toUpperCase();
			return (("0x" + sRGB)-0);
		}
	 }
     else return colorVal;
  }
}

function stringToNumber(s)
{
        return parseInt(('0' + s), 10)
}
