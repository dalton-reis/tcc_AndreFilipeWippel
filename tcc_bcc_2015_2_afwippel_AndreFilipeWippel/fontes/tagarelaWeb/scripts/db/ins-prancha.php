<?php
	$id = $_POST["id"];
	$plano = $_POST["plano"];
	$simbprancha = $_POST["simbPrancha"];
    $simb1 = $_POST["simb1"];
    $simb2 = $_POST["simb2"];
    $simb3 = $_POST["simb3"];
    $simb4 = $_POST["simb4"];
    $simb5 = $_POST["simb5"];
    $simb6 = $_POST["simb6"];
    $simb7 = $_POST["simb7"];
    $simb8 = $_POST["simb8"];
    $simb9 = $_POST["simb9"];
    $erro = false;
    $msg = "";
    	
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Erro ao consistir a tabela de pranchas!";
	}
	else {
		$query1 = "INSERT INTO pranchas (plano, simb_prancha, simb1, simb2, simb3, simb4, simb5, simb6, simb7, simb8, simb9) "
				."VALUES ('$plano', '$simbprancha', '$simb1', '$simb2', '$simb3', '$simb4', '$simb5', '$simb6', '$simb7', '$simb8', '$simb9') ";
		mysqli_query($con,$query1);	
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["id"] = $id;
        
    echo json_encode($ret);
?>
