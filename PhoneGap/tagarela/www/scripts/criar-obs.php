<?php
	$idBuilder = $_POST["idBuilder"];
	$espTut = $_POST["espTut"];
	$descricao = $_POST["descricao"];
    $obs = $_POST["obs"];
    $erro = false;
    $msg = "";
    $builder = 0;
    	
	$con = mysqli_connect("localhost","root","","tagarela_bd");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query1 = "SELECT id FROM builder "
				 ."WHERE paciente = '$idBuilder' AND esp_tut = '$espTut'";
		$res1 = mysqli_query($con,$query1);
		$row1 = mysqli_fetch_assoc($res1);
		$builder = $row1["id"];					
		
		$query = "INSERT INTO observacoes (builder, descricao, obs) "
				."VALUES ('$builder', '$descricao', '$obs') ";
		mysqli_query($con,$query);
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
        
    sleep(1);
    echo json_encode($ret);
?>
