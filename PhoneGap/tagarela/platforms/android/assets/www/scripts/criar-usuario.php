<?php
	$usuario = $_POST["usuario"];
	$senha = $_POST["senha"];
    $perfil = $_POST["perfil"];
    $erro = false;
    $msg = "";
    	
	$con = mysqli_connect("localhost","root","","tagarela_bd");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query = "INSERT INTO usuarios (usuario, senha, perfil, simbolo) "
				."VALUES ('$usuario', '$senha', '$perfil', '16') ";
		mysqli_query($con,$query);
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
        
    sleep(1);
    echo json_encode($ret);
?>
