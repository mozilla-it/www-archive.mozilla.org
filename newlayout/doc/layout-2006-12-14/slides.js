/* vim: set shiftwidth=4 tabstop=4 autoindent noexpandtab copyindent: */
function handle_key_up(event)
{
	if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey)
		return;

	var rel = null;
	if (event.charCode == 0) {
		switch (event.keyCode) {
			case KeyEvent.DOM_VK_LEFT:
				rel = "prev";
				break;
			case KeyEvent.DOM_VK_RIGHT:
				rel = "next";
				break;
		}
	}
	if (rel) {
		var as = document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "a");
		for (var i = 0; i < as.length; ++i)
			if (as[i].rel == rel)
				window.location = as[i].href;
	}
}
