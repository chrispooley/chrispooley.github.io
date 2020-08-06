<html>
<body style="background-color:#f0f0ff;">
<?php
//Function to decode URL's that contain Unicode characters
function unicode_urldecode($url)
{
  //split the URL into an array
  $url_array = split ("%",$url);
  //Make sure we have an array
  if (is_array($url_array))
  {
    //Loop while the key/value pair of the array
    //match our list items
    while (list ($k,$v) = each ($url_array))
    {
       //use base_convert to convert each character
       $ascii = base_convert ($v,16,10);
       $ret .= chr ($ascii);
    }
 }
 //return the decoded URL
 return ("$ret");
}

  function utf8_urldecode($str) {
    $str = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($str));
    return html_entity_decode($str,null,'UTF-8');;
  }

function checkEmail($email) {
  if(eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $email)){
    // if(preg_match("/^( [a-zA-Z0-9] )+( [a-zA-Z0-9\._-] )*@( [a-zA-Z0-9_-] )+( [a-zA-Z0-9\._-] +)+$/" , $email)){
    list($username,$domain)=split('@',$email);
    if(!checkdnsrr($domain,'MX')) return false;
    else return true;
  }
  else return false;
}

   // $mess = unicode_urldecode($_GET['message']);
   $mess = $_GET['comments'];
 
   $email = $_GET['email_address'];

   $name = $_GET['name'];

   $message = "Dear ".$name.",**";   
   $message .= "Thank you very much for your comments!*";
   $message .= "I will get back to you as soon as possible.**";  
   $message .= "Warmest Regards,*";
   $message .= "Anagha Joshi*";
   $message .= "(TRES)*";
   $tit = "TRES Comments";
   
   mail($email,$tit,$message,"From: anagha.joshi@roslin.ed.ac.uk","");
  
   $message = "The following comments were submitted to the TRES website:**";
   $message .= "Name: ".$name."*";
   $message .= "Email: ".$email."*";
   $message .= "Comments:* ".$mess."**";
   
   mail("anagha.joshi@roslin.ed.ac.uk","TRES Comments",$message,"From: anagha.joshi@roslin.ed.ac.uk","");
   //mail("christopher.pooley@roslin.ed.ac.uk","TRES Comments",$message,"From: christopher.pooley@roslin.ed.ac.uk","");
?>
<b>Thank you very much for your comments.</b>
</body>
</html>
