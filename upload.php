<?php
   $Handle = fopen("../upload/savenew",'r');
   $save = fread($Handle,filesize("../upload/savenew"));
   echo $save;
   fclose($Handle); 
?>
