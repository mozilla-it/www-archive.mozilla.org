function linkBugs {
    if(document.all) {
      document.getElementById("bugzillaDiv").style.visibility = "visible";
      document.getElementById("summaryDiv").style.display = "none";
    }
    if(document.layers) {
      document.layers["justforfun"].visibility = "hide";
      document.layers["summaryDiv"].visibility = "hide";
      return;
    }
    
    // I had to separate the bugs and the perf bugs because otherwise the summary at
    // the end of the page would also be affected by this, and we DON'T want that.

    // Get the "bugs" unordered list tag then grab all its <li> children.
    var bugul = document.getElementById("bugs");
    var lis = bugul.getElementsByTagName("li");
    // Get the "perf" unordered list tag then grab all its <li> children.
    var perful = document.getElementById("perf");
    var lis2 = perful.getElementsByTagName("li");

    // For the first set of li's
    for(var i = 0; i < lis.length; i++)
    {
      // Get the string that is composed of the bug number, then its summary.
      var str = lis[i].firstChild.nodeValue;
      // Parse the integer that is the bug number
      var bugNbr = parseInt(str);
      // Just in case...
      if(!bugNbr)
        continue;
      // Create a new link.
      var newLink = document.createElement("a");
      // Set its href to the relevant Bugzilla URL.
      newLink.setAttribute("href", "http://bugzilla.mozilla.org/show_bug.cgi?id=" + bugNbr);
      // Create a first text node, with the bug number.
      var numberNode = document.createTextNode(bugNbr);
      // Create a second text node, with the rest of the sentence. This is kind of a hack and will break once we reach the 100k bugs... argh! I should probably use toString().
      var textNode = document.createTextNode(str.substring(5, str.length));
      // Append the bug number text node as child of the link node.
      newLink.appendChild(numberNode);
      // Remove the string next to the original <li>
      lis[i].removeChild(lis[i].firstChild);
      // Append the link node to the <li> node.
      lis[i].appendChild(newLink);
      // Append the second text node after the link node.
      lis[i].appendChild(textNode);
    }

    // Idem for the perf bugs.
    for(var i = 0; i < lis2.length; i++)
    {
      var str = lis2[i].firstChild.nodeValue;
      var bugNbr = parseInt(str);
      if(!bugNbr)
        continue;
      var newLink = document.createElement("a");
      newLink.setAttribute("href", "http://bugzilla.mozilla.org/show_bug.cgi?id=" + bugNbr);
      var numberNode = document.createTextNode(bugNbr);
      var textNode = document.createTextNode(str.substring(5, str.length));
      newLink.appendChild(numberNode);
      lis2[i].removeChild(lis2[i].firstChild);
      lis2[i].appendChild(newLink);
      lis2[i].appendChild(textNode);
    }

    // Add the number of real and perf bugs to the summary
    var summary = document.getElementById("summary");
    var realBugs = summary.firstChild.nextSibling;
    dump(realBugs + "\n");
    // second <li>
    var perfBugs = realBugs.nextSibling.nextSibling;
    // Number to add before the real bugs summary
    var realBugsNbr = lis.length;
    // Number to add before the perf bugs summary
    var perfBugsNbr = lis2.length;
    // Create a new text node containing the number of real bugs
    var realBugsNbrNode = document.createTextNode(realBugsNbr.toString() + " ");
    // Create a new text node containing the number of perf bugs
    var perfBugsNbrNode = document.createTextNode(perfBugsNbr.toString() + " ");
    // Append the text node before the sentence of the real bugs
    realBugs.insertBefore(realBugsNbrNode, realBugs.firstChild);
    // Append the text node before the sentence of the perf bugs
    perfBugs.insertBefore(perfBugsNbrNode, perfBugs.firstChild);
  }
