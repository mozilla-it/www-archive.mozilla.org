function swapStyle( n, dontWrite ) {

   if (!dontWrite) setCookie( "style", n, 10 );

   var links = document.getElementsByTagName('link');
   for ( var i = 0; i < links.length; i++ ) {
      var title = links[i].getAttribute("title");
      if (i == n) {
         links[i].disabled = false;
      } else {
         links[i].disabled = true;
      }      
   }
}

function loadStyle() {
    var style = getCookie( "style" );
    var ss = document.getElementById('stylesheets');
    if (ss) {
       ss.style.display = "block";
    }
    if ( style ) {
       swapStyle( style, true );
    }
}

function setCookie(name, value, days) {
   var expireDate = new Date ();
   expireDate.setTime( expireDate.getTime() + (days * 24 * 3600 * 1000) );

   document.cookie = name + "=" + escape(value) + "; expires=" + expireDate.toGMTString();
}

function getCookie(name) {
   if (document.cookie.length > 0) {
      var start;
      var end;

      start = document.cookie.indexOf(name + "=");
      if ( start == -1 ) return null;
      end = document.cookie.indexOf(";", start);
      if (end == -1) end = document.cookie.length;

      return unescape( document.cookie.substring(start + name.length + 1, end) );
   }
   return null; 
}

function deleteCookie( name ) {
   if ( getCookie(name) ) {
      document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
   }
}
