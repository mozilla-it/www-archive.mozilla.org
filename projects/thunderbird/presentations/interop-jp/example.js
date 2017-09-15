// Scripts associated with example.xul
function validateUserInput()
{
  // enable the add button if we have valid text
  if (document.getElementById('labelField').value)
    document.getElementById("addButton").disabled = false;
}

function addItem()
{
  // create a new listitem and add it to the list box
  var textInputField = document.getElementById('labelField');
  document.getElementById("itemList").appendItem(textInputField.value);
  textInputField.value = ""; // clear the text box
  document.getElementById("addButton").disabled = true;
}