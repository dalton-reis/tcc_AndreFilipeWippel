<?php
	// IN
	$plano = $_POST["plano"];
	$simbPrancha = $_POST["simbPrancha"];
	$simb1 = $_POST["simb1"];
	$simb2 = $_POST["simb2"];
	$simb3 = $_POST["simb3"];
	$simb4 = $_POST["simb4"];
	$simb5 = $_POST["simb5"];
	$simb6 = $_POST["simb6"];
	$simb7 = $_POST["simb7"];
	$simb8 = $_POST["simb8"];
	$simb9 = $_POST["simb9"];
	// OUT
    $erro = false;
    $msg = "";
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query = "INSERT INTO pranchas (plano, simb_prancha, simb1, simb2, simb3, simb4, simb5, simb6, simb7, simb8, simb9) "
				."VALUES ($plano, '$simbPrancha', '$simb1', '$simb2', '$simb3', '$simb4', '$simb5', '$simb6', '$simb7', '$simb8', '$simb9')";
		mysqli_query($con,$query);
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    
    sleep(1);
    echo json_encode($ret);
?>