<?php
	// IN
	$aux = $_POST["aux"];
	// OUT
    $erro = false;
    $msg = "";
    $convitesPaciente = array();
    $convitesEsptut = array();
    $convitesMsg = array();
    $i = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Erro ao consistir a tabela de convites!";
	}
	else {
		$query = "SELECT paciente,esp_tut,msg FROM convites";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$convitesPaciente[$i] = $row["paciente"];
				$convitesEsptut[$i] = $row["esp_tut"];
				$convitesMsg[$i] = $row["msg"];
				$i = $i + 1;
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["convitesPaciente"] = $convitesPaciente;
    $ret["convitesEsptut"] = $convitesEsptut;
    $ret["convitesMsg"] = $convitesMsg;
    
    echo json_encode($ret);
?>