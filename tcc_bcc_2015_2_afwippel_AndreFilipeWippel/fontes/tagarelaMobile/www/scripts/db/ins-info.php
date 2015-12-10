<?php
	$id = $_POST["id"];
	$usuario = $_POST["usuario"];
	$nome = $_POST["nome"];
    $email = $_POST["email"];
    $telefone = $_POST["telefone"];
    $erro = false;
    $msg = "";
    	
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Erro ao consistir a tabela de informações pessoais!";
	}
	else {
		$query1 = "INSERT INTO info (usuario, nome, email, telefone) "
				."VALUES ('$usuario', '$nome', '$email', '$telefone') ";
		mysqli_query($con,$query1);	
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["id"] = $id;
        
    echo json_encode($ret);
?>
