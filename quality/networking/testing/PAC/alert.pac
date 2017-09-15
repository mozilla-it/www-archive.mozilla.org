// unit test for alert function.
// useful for troubleshooting when other tests built on alert misbehave.
// Mozilla/Netscape displays alert in Javascript Console (vs. dialog box)

function FindProxyForURL(url, host)

{
	alert(host);
}
