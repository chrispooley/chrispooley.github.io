<?php
 $email = $_GET['email'];
 $password = $_GET['password'];
 $i = 0; 
 if($email == "Anagha.Joshi@roslin.ed.ac.uk" && $password == "treswebtool") $i = 1;
 if($email == "anagha.joshi@roslin.ed.ac.uk" && $password == "treswebtool") $i = 1;
 if($email == "admin" && $password == "admin") $i = 2;

 echo $i;
?>
