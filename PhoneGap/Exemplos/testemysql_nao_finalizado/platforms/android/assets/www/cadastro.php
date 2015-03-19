<?php

	$con = mysql_connect('localhost','root','');

	mysql_select_db('teste',$con);
	
	$nome  = mysql_real_escape_string($_REQUEST['nome']);
	$email = mysql_real_escape_string($_REQUEST['email']);
	
	$sql = "INSERT INTO pessoa(nome,email) VALUE('$nome','$email')";
	$res = mysql_query($sql);
	
	if($res == true){
		$cadastro = 1;
	}
	else{
		$cadastro = 0;
	}
	
	echo (json_encode($cadastro));
	
?>