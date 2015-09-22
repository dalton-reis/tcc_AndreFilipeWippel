<?php
	$usuario = $_POST["usuario"];
	$senha = $_POST["senha"];
    $erro = false;
    $msg = "";
    $id = 0;
	$perfil = 0;
	
	$con = mysqli_connect("127.2.255.2","adminwirF1YI","VeLImWhtsfKI","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query = "SELECT id, perfil "
				."FROM usuarios "
				."WHERE usuario = '$usuario' AND senha = '$senha'";
		$res = mysqli_query($con,$query);
	
		if (mysqli_num_rows($res) > 0) {
			$erro = false;
			while ($row = mysqli_fetch_assoc($res)) {
				$id = $row["id"];
				$perfil = $row["perfil"];
			}
		}
		else {
			$erro = true;
			$msg = "Usuário e senha incorretos!";
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["id"] = $id;
    $ret["perfil"] = $perfil;
    
    sleep(1);
    echo json_encode($ret);
?>