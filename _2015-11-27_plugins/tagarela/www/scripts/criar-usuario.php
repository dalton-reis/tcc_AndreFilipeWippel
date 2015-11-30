<?php
	$usuario = $_POST["usuario"];
	$senha = $_POST["senha"];
    $perfilIns = $_POST["perfil"];
    $simbUsu = $_POST["simbolo"];
    $erro = false;
    $msg = "";
    $id = 0;
	$perfil = 0;
    	
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query1 = "INSERT INTO usuarios (usuario, senha, perfil, simbolo) "
				."VALUES ('$usuario', '$senha', '$perfilIns', '$simbUsu') ";
		mysqli_query($con,$query1);
		
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
			$query2 = "INSERT INTO info (usuario, nome, email, telefone) "
					 ."VALUES ('$id', '$usuario', '', '') ";
			mysqli_query($con,$query2);
		}
		else {
			$erro = true;
			$msg = "Usuário e senha não são válidos!";
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
