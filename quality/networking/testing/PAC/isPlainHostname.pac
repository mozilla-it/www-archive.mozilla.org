//Display an alert everytime you use URL with a hostname (one dns label vs. 2+ labels)

function FindProxyForURL(url, host)

{
	if (isPlainHostName(host))
		alert(host);
}
