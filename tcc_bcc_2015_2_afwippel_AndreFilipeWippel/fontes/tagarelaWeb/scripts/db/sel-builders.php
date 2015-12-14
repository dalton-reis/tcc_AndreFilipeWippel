<?php
	// IN
	$aux = $_POST["aux"];
	// OUT
    $erro = false;
    $msg = "";
    $buildersPaciente = array();
    $buildersEsptut = array();
    $i = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Erro ao consistir a tabela de builders!";
	}
	else {
		$query = "SELECT paciente,esp_tut FROM builder";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$buildersPaciente[$i] = $row["paciente"];
				$buildersEsptut[$i] = $row["esp_tut"];
				$i = $i + 1;
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["buildersPaciente"] = $buildersPaciente;
    $ret["buildersEsptut"] = $buildersEsptut;
    
    echo json_encode($ret);
?>