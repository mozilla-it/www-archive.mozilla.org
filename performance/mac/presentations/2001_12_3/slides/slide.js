

function onSlideLoad()
{
	if (parent && parent.frames && parent.frames.length > 0)
	{
		setStyleSheet("slide.css")
	}
	else
	{
		setStyleSheet("presenter.css")
	}
	
	
	var	pageLocation = location.href;
	pageLocation = pageLocation.slice(pageLocation.lastIndexOf('/') + 1);
	top.defaultStatus = pageLocation;
}


//-----------------------------------------------------------------------------
function setStyleSheet(styleSheet)
{
	var	slideStyleLink = document.getElementById("slidestyle");
	slideStyleLink.setAttribute("href", styleSheet);
}

