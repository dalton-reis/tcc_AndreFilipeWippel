<?php
	// IN
	$idUser = $_POST["idUser"];
	$perfil = $_POST["perfil"];
    $idBuilder = $_POST["idBuilder"];
	$simbPlano = $_POST["simbPlano"];
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
	// Variaveis
	$plano = 0;
	$paciente = 0;
    $espTut = 0;
    $builder = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		if ($perfil == 3) {
			$paciente = $idUser;
    		$espTut = $idBuilder;
		}
		else {
			$paciente = $idBuilder;
    		$espTut = $idUser;
		}
		$query = "SELECT id FROM builder "
				."WHERE paciente = '$paciente' AND esp_tut = '$espTut'";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$builder = $row["id"];				
			}
			$query1 = "INSERT INTO planos (builder, simbolo) "
					 ."VALUES ($builder, '$simbPlano')";
			mysqli_query($con,$query1);
			
			$query2 = "SELECT MAX(id) AS idPlano FROM planos";
			$res2 = mysqli_query($con,$query2);
			if (mysqli_num_rows($res2) > 0) {
				$row2 = mysqli_fetch_assoc($res2);
				$plano = $row2["idPlano"];
				
				$query4 = "INSERT INTO pranchas (plano, simb_prancha, simb1, simb2, simb3, simb4, simb5, simb6, simb7, simb8, simb9) "
						 ."VALUES ($plano, '$simbPrancha', '$simb1', '$simb2', '$simb3', '$simb4', '$simb5', '$simb6', '$simb7', '$simb8', '$simb9')";
				mysqli_query($con,$query4);
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    
    sleep(1);
    echo json_encode($ret);
?>