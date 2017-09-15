var ua = navigator.userAgent;
var ual = ua.toLowerCase();

// Browsers we have to keep track of for various reasons

var is_major = parseInt(navigator.appVersion);
var is_minor = parseFloat(navigator.appVersion);

function silentlyFixErrors(level) {

   var is_win = ( (ual.indexOf("win")!=-1) || (ual.indexOf("16bit")!=-1) );
   var is_ie = ((ual.indexOf("msie") != -1) && (ual.indexOf("opera") == -1) && (ual.indexOf("konqueror") == -1));
   var is_ie4    = (is_ie && (is_major == 4) && (ual.indexOf("msie 4")!=-1) );
   var is_ie5    = (is_ie && (is_major == 4) && (ual.indexOf("msie 5.0")!=-1) );
   var is_ie5_5  = (is_ie && (is_major == 4) && (ual.indexOf("msie 5.5") !=-1));
   var is_ie6    = (is_ie && (is_major == 4) && (ual.indexOf("msie 6.")!=-1) );

   if (!level) level = "";

   if ( is_ie && is_win) {
      if ( is_ie6 ) {
         // Fix png alpha channels in IE using DirectX
         var blankImage = new Image();
         blankImage.src = level + 'images/blank.png';
      
         document.all['mozillaLogo'].src = blankImage.src;
         document.all['dinoTail'].src = blankImage.src;
         document.all['dinoHead'].src = blankImage.src;

         // I would like to thank the people of 
         // MozillaZine and Slashdot for this one.
         document.all['mozillaLogo'].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + level + "images/mozillaLogo.png', sizingMethod='image')";
         document.all['dinoTail'].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + level + "images/dino_tail_iecolour.png', sizingMethod='image')";
         document.all['dinoHead'].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + level + "images/dino.png', sizingMethod='image')";
      } else if ( is_ie4 || is_ie5 || is_ie5_5 ) {
         document.all['mozillaLogo'].style.display = "none";
         document.all['dinoHead'].style.display = "none";
         document.all['dinoTail'].style.display = "none";
         document.all['mainHeader'].innerHTML = "&nbsp;Mozilla";
      }
   }
}
