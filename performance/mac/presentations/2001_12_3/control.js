// functions for controlling the slide viewer

var gCurrentSlideIndex = 0;
var gNumSlides = 0;

//-----------------------------------------------------------------------------
function doOnload()
{
	gNumSlides = gSlideList.length;
	
	writeSlideNumbers(gNumSlides);
	
	goToSlideIndex(0);
}

//-----------------------------------------------------------------------------
function goToPrevious()
{
	goToSlideIndex(gCurrentSlideIndex - 1);
}


//-----------------------------------------------------------------------------
function goToNext()
{
	goToSlideIndex(gCurrentSlideIndex + 1);
}

//-----------------------------------------------------------------------------
function goToSlideIndex(slideIndex)
{
	unHilightSlideNumber(gCurrentSlideIndex);
	
	gCurrentSlideIndex = slideIndex;
	
	var prevButton = document.getElementById("prevbutton");
	var nextButton = document.getElementById("nextbutton");
		
	if (gCurrentSlideIndex == 0)
		prevButton.setAttribute("disabled", "true");
	else
		prevButton.removeAttribute("disabled");
	
	if (gCurrentSlideIndex == gNumSlides - 1)
		nextButton.setAttribute("disabled", "true");
	else
		nextButton.removeAttribute("disabled");

	var		presFrame = window.parent.presentation;
	presFrame.location = "slides/" + gSlideList[slideIndex];
	
	hilightSlideNumber(slideIndex);
}

//-----------------------------------------------------------------------------
function writeSlideNumbers(numSlides)
{
	var listParent = document.getElementById("slidelist");
	
	var i;	
	for (i = 0; i < numSlides; i ++)
	{
		var span = document.createElement("span");
		var link = document.createElement("a");
		var href = "javascript:goToSlideIndex(" + i + ")";

		link.setAttribute("href", href);
		var pText = document.createTextNode(i + 1);
		
		link.setAttribute("id", "slide_index_" + i);
		
		span.appendChild(link);
		link.appendChild(pText);
		listParent.appendChild(link);
		
		listParent.appendChild(document.createTextNode(" "));
	}
}

//-----------------------------------------------------------------------------
function unHilightSlideNumber(slideIndex)
{
	var	curLink = document.getElementById("slide_index_" + slideIndex);
	if (curLink)
		curLink.removeAttribute("style");
}

//-----------------------------------------------------------------------------
function hilightSlideNumber(slideIndex)
{
	var	curLink = document.getElementById("slide_index_" + slideIndex);
	curLink.setAttribute("style", "{ text-decoration: underline; }");
}

//-----------------------------------------------------------------------------
function toggleSlideStyleSheet()
{
	var	slideDoc = window.parent.presentation.document;
	var	slideStyleLink = slideDoc.getElementById("slidestyle");
	
	var	curSheet = slideStyleLink.getAttribute("href");
	if (curSheet == "slide.css")
		curSheet = "presenter.css"
	else
		curSheet = "slide.css";
	
	slideStyleLink.setAttribute("href", curSheet);
}

//-----------------------------------------------------------------------------
function setSlideStyleSheet(styleSheet)
{
	var	slideDoc = window.parent.presentation.document;
	var	slideStyleLink = slideDoc.getElementById("slidestyle");
	slideStyleLink.setAttribute("href", styleSheet);
}



