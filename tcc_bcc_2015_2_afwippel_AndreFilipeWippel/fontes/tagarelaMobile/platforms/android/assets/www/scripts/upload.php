<?php
	$new_image_name = $_POST["value1"];
	move_uploaded_file($_FILES["file"]["tmp_name"], $new_image_name);
?>