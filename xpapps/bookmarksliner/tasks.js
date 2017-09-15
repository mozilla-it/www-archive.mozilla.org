
function toggleDescriptions(aEvent)
{
  var check = document.getElementById("descriptions");
  var disp = check.checked ? "table-row" : "none";
  var nodes = document.getElementsByTagName("tr")
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i].className == "description")
      nodes[i].style.display = disp;
  }
}