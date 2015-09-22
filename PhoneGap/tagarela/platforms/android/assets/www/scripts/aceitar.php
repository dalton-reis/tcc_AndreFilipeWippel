<?php
	// IN
	$idPac = $_POST["idPac"];
	$idET = $_POST["idET"];
	// OUT
    $erro = false;
    $msg = "";
           
	$con = mysqli_connect("127.2.255.2","adminwirF1YI","VeLImWhtsfKI","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query = "INSERT INTO builder (paciente, esp_tut) "
				."VALUES ('$idPac', '$idET') ";
		mysqli_query($con,$query);
		
		$query2 = "DELETE FROM convites "
				."WHERE paciente = '$idPac' AND esp_tut = '$idET'";
		mysqli_query($con,$query2);
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    
    sleep(1);
    echo json_encode($ret);
?>