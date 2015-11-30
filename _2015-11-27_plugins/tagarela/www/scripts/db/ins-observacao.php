<?php
	$id = $_POST["id"];
	$builder = $_POST["builder"];
	$descricao = $_POST["descricao"];
    $obs = $_POST["obs"];
    $erro = false;
    $msg = "";
    	
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Erro ao consistir a tabela de observacoes!";
	}
	else {
		$query1 = "INSERT INTO observacoes (builder, descricao, obs) "
				."VALUES ('$builder', '$descricao', '$obs') ";
		mysqli_query($con,$query1);	
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["id"] = $id;
        
    echo json_encode($ret);
?>
