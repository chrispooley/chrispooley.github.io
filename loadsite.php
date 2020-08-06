<?php
   //$Handle = fopen("../upload/savenew",'r');
   //$save = fread($Handle,filesize("../upload/savenew"));
   //$Handle = fopen("savenew/savenew",'r');
   $Handle = fopen("../../MKODB_analysis/saveEAT",'r');
  
   $save = fread($Handle,filesize("../../MKODB_analysis/saveEAT"));
   echo $save;
   fclose($Handle); 
?>
