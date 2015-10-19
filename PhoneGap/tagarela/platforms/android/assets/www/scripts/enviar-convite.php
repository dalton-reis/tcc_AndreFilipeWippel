<?php
	$nome = $_POST["nome"];
	$paciente = $_POST["paciente"];
    $mensagem = $_POST["msg"];
    $erro = false;
    $msg = "";
    	
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query = "SELECT id "
				."FROM usuarios "
				."WHERE usuario = '$nome'";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			$erro = false;
			while ($row = mysqli_fetch_assoc($res)) {
				$esptut = $row["id"];
				$query2 = "INSERT INTO convites (paciente, esp_tut, msg) "
						 ."VALUES ('$paciente', '$esptut', '$mensagem') ";
				mysqli_query($con,$query2);
			}
		}
		else {
			$erro = true;
			$msg = "Não existe usuário apto para receber convites com este nome!";
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
        
    sleep(1);
    echo json_encode($ret);
?>
