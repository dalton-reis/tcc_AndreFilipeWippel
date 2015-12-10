<?php
	$nome = $_POST["nome"];
	$significado = $_POST["significado"];
    $categoria = $_POST["categoria"];
	$img = $_POST["img"];
	$audio = $_POST["audio"];
    $erro = false;
    $msg = "";
    	
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query2 = "INSERT INTO simbolos (nome, significado, categoria, img, audio) "
				 ."VALUES ('$nome', '$significado', '$categoria', '$img', '$audio') ";
		mysqli_query($con,$query2);
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
        
    sleep(1);
    echo json_encode($ret);
?>