<html>
<head>   
<?php
 $Handle = fopen("../upload/submitnum",'r');
 $num = intval(fgets($Handle));
 //if($_COOKIE["num"] == 1)
 //setcookie("num", $value, time()+5*60);
 
 fclose($Handle);
?>
 
<script type="text/javascript">
function getHTTPObject() 
{ 
  if (typeof XMLHttpRequest != 'undefined') { return new XMLHttpRequest(); } 
  try{ return new ActiveXObject("Msxml2.XMLHTTP");} 
  catch(e){ 
    try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch(e){}    }  
  return false; 
}
var ans;

function getoutput()
{
  var http = getHTTPObject();

  http.open("GET",'getoutput.php?file=output<?php echo $num;?>&ran='+Math.random()); 
  http.onreadystatechange = function() { 
    if(http.readyState == 4){
      ans = http.responseText;
      if(ans==""){
        setTimeout(function(){getoutput()},10000);
      }
      else{
        clearInterval(time1);
        plotoutput(ans);
      }
    }
  } 
  http.send(null);
}

var iz;

function gettab()
{
  izst = iz;
  while(iz < ans.length && ans.substr(iz,1) != "\t" && ans.substr(iz,1) != "\n") iz++;
  iz++;
  if(iz >ans.length) iz = ans.length; 
  return ans.substr(izst,iz-izst-1);
}

function plotoutput()
{
  iz = 0;
  parent.document.getElementById("tit").innerHTML = "Results";
  //parent.document.getElementById("fra").scrolling = "yes";
  //st = "<br/>To download this file right click <a href='../processed/output<?php echo $num;?>'>here</a> and save.";
  //st = "<br/><a href='Webtool.html'><img width=53 height=40 src='back.png'/></a>"
  //parent.document.getElementById("fo").innerHTML = st;
  
  st = "<div style='width:695px; height:290px; overflow:scroll'>";
  st += "<table>"; 
  do{
    st += "<tr><td>"+gettab()+"</td><td>"+gettab()+"</td><td>"+gettab()+"</td></tr>";
  }while(iz < ans.length);
  st += "</table>";
  st += "</div><br/><input type='image' src= 'back.png' width=53 height=40 value='Back' onclick='history.back()'>";
  //<a href='Webtool.html'><img style='margin:0px; border:0px;' width=53 height=40 src='back.png'/></a>";
  
  ById("main").innerHTML = st;
}

function ById(su){ return document.getElementById(su);}

var ndots = 3;

function dots()
{
  ndots++; if(ndots == 5) ndots = 1;
  if(ndots == 1) ById("dots").innerHTML = ".";
  if(ndots == 2) ById("dots").innerHTML = "..";
  if(ndots == 3) ById("dots").innerHTML = "...";
  if(ndots == 4) ById("dots").innerHTML = "...."; 
}

var time1, time2;

function initi()
{
  time1 = setInterval(function(){dots()},300);
  getoutput();
}

function emailform()
{
  alert("email");
  st = "</br>";
  st += "<b>Email Results</b><br/><br/>";
  st += "<b>Email Address:</b><input type='text' id='email' name='email' size='40'/>";
  document.getElementById("email").innerHTML = st;
}

</script>
</head>


<body style="background-color:#f0f0ff;">
<div id="main">
<?php 
 $er = ""; 
 $text = $_POST['textarea'];

 if($text != ""){
   $Handle = fopen("../upload/submit".$num,'w');
   fwrite($Handle,$text."\n");
   fclose($Handle);
 }
 else{ 
   if ($_FILES["file"]["error"] > 0){
     $er = "There was a problem uploading the file.";
     if($_FILES["file"]["tmp_name"]=="") $er = "No file has been selected.";
   }
   else{
     if($_FILES["file"]["size"] == 0) $er = "This is an empty file.";
     if($_FILES["file"]["type"] != "text/plain") $er = "This is not a text file.";
   
     if($er == 0){
       move_uploaded_file($_FILES["file"]["tmp_name"],"../upload/submit".$num);
     }
   }
 }
 
 if($er != ""){ 
   echo "<b>".$er."</b></br><br/>";
  // echo "<a href='uploadfile.html'><img style='margin:0px; border:0px;' width=53 height=40 src='back.png'/></a>";
   echo "<input type='image' src= 'back.png' width=53 height=40 value='Back' onclick='history.back()'>";
  
 }
 else{
   $Handle2 = fopen("../upload/submitnum",'w');
   fwrite($Handle2,($num+1)."\n");
   fclose($Handle2);
   ?>
   <b>Please wait while your data is being processed<span id='dots'>...</span></b></br>
   <span id="email">(Note, this can take a few minutes or more. If you prefer, you can recieve the results by <a href="javascript:emailform();">email</a>)</span>
  
   <script type="text/javascript">initi();</script>
 <?php
 } 
?> 
</div>
</body>
</html>

