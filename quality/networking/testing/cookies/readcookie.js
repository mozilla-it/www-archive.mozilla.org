function readcookie()
{
// initialize
	curCookie=document.cookie;

// display cookie
	document.write('<B>Current Cookie:</B>"' + curCookie + '"<br><br>');
	return(curCookie);
}
