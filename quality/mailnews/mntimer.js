function getTimeStamp()
{
var day="";
var month="";
var myweekday="";
var year="";
newdate = new Date();
mydate = new Date();
dston =  new Date('April 4, 1999 2:59:59');
dstoff = new Date('october 31, 1999 2:59:59');
var myzone = newdate.getTimezoneOffset();
newtime=newdate.getTime();

var zone = 8;  // references your time zone

if (newdate > dston && newdate < dstoff ) {
zonea = zone - 1 ;
dst = "  Pacific Daylight Savings Time";
}
else {
zonea = zone ; dst = "  Pacific Standard Time";
}
var newzone = (zonea*60*60*1000);
newtimea = newtime+(myzone*60*1000)-newzone;
mydate.setTime(newtimea);
myday = mydate.getDay();
mymonth = mydate.getMonth();
myweekday= mydate.getDate();
weekday= myweekday;
myyear= mydate.getYear();
year = myyear;

if (year < 2000)    // Y2K Fix, Isaac Powell
year = year + 1900; // http://onyx.idbsu.edu/~ipowell

yhours = mydate.getHours();
if (yhours > 12) {
myhours = yhours - 12 ; mm = " PM";
}
else {
myhours = yhours; mm = " AM";
}
myminutes = mydate.getMinutes();
if (myminutes < 10){
mytime = ":0" + myminutes;
}
else {
mytime = ":" + myminutes;
};
arday = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
armonth = new Array("January ","February ","March ","April ","May ","June ","July ","August ","September ", "October ","November ","December ")
ardate = new Array("0th","1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th","16th","17th","18th","19th","20th","21st","22nd","23rd","24th","25th","26th","27th","28th","29th","30th","31st");
// rename locale as needed.

time = ("In Mountain View, CA, it is: " + myhours + mytime+ mm + ", " + arday[myday] +", " + armonth[mymonth] +" "+ardate[myweekday] + ", " + year+", " + dst +".");

return time;

// document.write(time);
//-->
}


function display()
{
	dump("Entering display()\n");;
	rtime=etime-ctime;
	document.writeln(rtime);
	if (rtime>60)
		m=parseInt(rtime/60);
	else
		m=0;

	s=parseInt(rtime-m*60);
	if(s<10)
		s="0"+s
	window.status="Time Remaining Until Next GetNewMessages():  "+m+":"+s
	window.setTimeout("checktime()",1000)
}

function settimes()
{
	// alert("You have 20 minutes to complete this test")
	dump("Entering settimes()\n");
	var time= new Date();
	hours= time.getHours();
	mins= time.getMinutes();
	secs= time.getSeconds();
	etime=hours*3600+mins*60+secs;
	etime+= 5;  // 60
	// etime+=1200;  
	//
	// You can change the value of 1200 according to how much
	// time you wish to set the timer. Where 1200 is time in secs (1200 = 20
	// mins * 60 secs/min). Max time is 60 mins (3600secs)
	//
	
	checktime();
}

function checktime()
{
	dump("Entering checktime()\n");
	var time= new Date();
	hours= time.getHours();
	mins= time.getMinutes();
	secs= time.getSeconds();
	ctime=hours*3600+mins*60+secs
	if(ctime>=etime)
		expired();
	else
		display();
}

function expired()
{
	dump("Entering expired()\n");
	// alert("Time expired");
	// location.href="nextpage.html";  //Put here the next page
	// clearTimeout(timeoutid);
}
