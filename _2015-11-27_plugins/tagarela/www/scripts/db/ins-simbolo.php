<?php
	$id = $_POST["id"];
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
		$msg = "Erro ao consistir a tabela de símbolos!";
	}
	else {
		$query1 = "INSERT INTO simbolos (nome, significado, categoria, img, audio) "
				."VALUES ('$nome', '$significado', $categoria, '$img', '$audio') ";
		mysqli_query($con,$query1);	
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["id"] = $id;
        
    echo json_encode($ret);
?>
