<?php
	// IN
	$idPaciente = $_POST["idPaciente"];
	$idEspTut = $_POST["idEspTut"];
	// OUT
    $erro = false;
    $msg = "";
    $msgConvite = "";
        
	$con = mysqli_connect("127.2.255.2","adminwirF1YI","VeLImWhtsfKI","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query = "SELECT msg FROM convites "
				."WHERE esp_tut = '$idEspTut' AND paciente = '$idPaciente'";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$msgConvite = $row["msg"];
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["msgConvite"] = $msgConvite;
    
    sleep(1);
    echo json_encode($ret);
?>