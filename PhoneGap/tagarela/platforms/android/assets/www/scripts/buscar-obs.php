<?php
	// IN
	$idObs = $_POST["idObs"];
	// OUT
    $erro = false;
    $msg = "";
    $obsTexto = "";
    
	$con = mysqli_connect("127.2.255.2","adminwirF1YI","VeLImWhtsfKI","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query = "SELECT obs FROM observacoes "
				 ."WHERE id = '$idObs'";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			$row = mysqli_fetch_assoc($res);
			$obsTexto = $row["obs"];
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["obsTexto"] = $obsTexto;
    
    sleep(1);
    echo json_encode($ret);
?>