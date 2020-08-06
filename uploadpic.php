<?php

class SimpleImage {
   var $image;
   var $image_type;
 
   function load($filename) {
      $image_info = getimagesize($filename);
      $this->image_type = $image_info[2];
      if( $this->image_type == IMAGETYPE_JPEG ) {
         $this->image = imagecreatefromjpeg($filename);
      } elseif( $this->image_type == IMAGETYPE_GIF ) {
         $this->image = imagecreatefromgif($filename);
      } elseif( $this->image_type == IMAGETYPE_PNG ) {
         $this->image = imagecreatefrompng($filename);
      }
   }
   function save($filename, $image_type=IMAGETYPE_JPEG, $compression=75, $permissions=null) {
      if( $image_type == IMAGETYPE_JPEG ) {
         imagejpeg($this->image,$filename,$compression);
      } elseif( $image_type == IMAGETYPE_GIF ) {
         imagegif($this->image,$filename);         
      } elseif( $image_type == IMAGETYPE_PNG ) {
         imagepng($this->image,$filename);
      }   
      if( $permissions != null) {
         chmod($filename,$permissions);
      }
   }
   function output($image_type=IMAGETYPE_JPEG) {
      if( $image_type == IMAGETYPE_JPEG ) {
         imagejpeg($this->image);
      } elseif( $image_type == IMAGETYPE_GIF ) {
         imagegif($this->image);         
      } elseif( $image_type == IMAGETYPE_PNG ) {
         imagepng($this->image);
      }   
   }
   function getWidth() {
      return imagesx($this->image);
   }
   function getHeight() {
      return imagesy($this->image);
   }
   function resizeToHeight($height) {
      $ratio = $height / $this->getHeight();
      $width = $this->getWidth() * $ratio;
      $this->resize($width,$height);
   }
   function resizeToWidth($width) {
      $ratio = $width / $this->getWidth();
      $height = $this->getheight() * $ratio;
      $this->resize($width,$height);
   }
   function scale($scale) {
      $width = $this->getWidth() * $scale/100;
      $height = $this->getheight() * $scale/100; 
      $this->resize($width,$height);
   }
   function resize($width,$height) {
      $new_image = imagecreatetruecolor($width, $height);
      imagecopyresampled($new_image, $this->image, 0, 0, 0, 0, $width, $height, $this->getWidth(), $this->getHeight());
      $this->image = $new_image;   
   }      
}

$password = $_POST['password'];
$email = $_POST['email'];

$flag = "-1";


if(($email == "glen.mchale@ntu.ac.uk" && $password == "raincoats") ||
  ($email == "admin" && $password == "raincoats")){


$flag = "0";
	
$width = $_POST['picwidth'];
$height = $_POST['picheight'];
$width2 = $_POST['picwidth2'];
$picx = $width; $picy = $height;

if(isset($_FILES['file']['name'])){
  $errorCode = $_FILES['file']['error'];

  if($errorCode != UPLOAD_ERR_OK){ $flag = 1;}
  else{
  
    $filename = $_FILES['file']['name'];
    if(is_uploaded_file($_FILES['file']['tmp_name'])){
      move_uploaded_file($_FILES['file']['tmp_name'],"Pics/".$filename);
      $flag = $filename;
      
      $image = new SimpleImage();
    
      if($width2 > 0){
        $image->load("Pics/".$filename);
        $image->resizeToWidth($width2);
        $image->save("Pics/"."big_".$filename);
      }
   
      if($width > 0){
        if($height == 0){
          $image->load("Pics/".$filename);
          $image->resizeToWidth($width);
	  //$picx = imagesx($image);
	  //$picy = imagesy($image);
	  //$image->getWidth()
	 $picx = $image->getwidth();	
	  $picy = $image->getheight();	
          $image->save("Pics/".$filename);
        }
        else{

          $image->load("Pics/".$filename);
                  //$image->resize($width,$height);
 	  $image->resizeToWidth($width);		
	  $picx = $image->getwidth();	
	  $picy = $image->getheight();	
	  //$picx = imagesx($image);
	  //$picy = imagesy($image);
          $image->save("Pics/".$filename);
        }
      }
      else{
        if($height > 0){
          $image->load("Pics/".$filename);
          $image->resizeToHeight($height);
 	  $picx = $image->getwidth();	
	  $picy = $image->getheight();	
  	  //$picx = imagesx($image);
	  //$picy = imagesy($image);
          $image->save("Pics/".$filename);
        }
      }

    }

  }
}


}

echo "<script type='text/javascript'> parent.submittedpic('".$flag."',".$picx.",".$picy.")</script>";
?>
