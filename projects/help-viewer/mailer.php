<?php

//By Nilson Cain
//Based on Nilson's PHP Mailer 2.0

//Revision 0.5

//Set local variables equal to ther request counterparts (saves keystrokes later)
$author=$_POST['mail_subject'];
$feedback=$_POST['mail_message'];
$mail_subject="Mozilla Help Viewer Feedback from $author";
$mail_message="*Mozilla Help Viewer Feedback sent from*: $author \n\n*Feedback*: $feedback";

//If all variables are set, then proceed

$mail_to = "rlk@mozdev.org, nilson@gmail.com, brantgurganus2001@cherokeescouting.org, jwalden@mit.edu, steffen.wilberg@web.de";

if($mail_to && $mail_subject && $mail_message)
{
   if(mail($mail_to, $mail_subject, $mail_message))
   {
          echo "Your feedback has been submitted! The Mozilla Help Viewer developers will read your feedback and should give a response soon!<br><br>";
          echo "<a href='http://www.mozilla.org/projects/help-viewer/'>Back to the Mozilla Help Viewer Project</a>";
   }
   else if(!mail($mail_to, $mail_subject, $mail_message))
   {
          echo "There was an error in submitting your feedback. Try again later.<br><br>";
          echo "<a href='http://www.mozilla.org/projects/help-viewer/'>Back to the Mozilla Help Viewer Project</a>";
   }


}
?>
