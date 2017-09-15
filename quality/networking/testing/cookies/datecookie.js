function datecookie()
{

// initialize

var date=new Date(); 

//set cookie

document.cookie="TestCookie="+ date;

document.write('<b>Set Cookie:</b>"TestCookie=' + date + '"<br><br>'); 

//call readcookie.js next, to show result
}