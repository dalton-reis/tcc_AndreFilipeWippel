<?php
	// IN
	$aux = $_POST["aux"];
	// OUT
    $erro = false;
    $msg = "";
    $usuariosUsuario = array();
    $usuariosSenha = array();
    $usuariosPerfil = array();
	$usuariosSimbolo = array();
	$i = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Erro ao consistir a tabela de usuarios!";
	}
	else {
		$query = "SELECT usuario,senha,perfil,simbolo FROM usuarios";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$usuariosUsuario[$i] = $row["usuario"];
				$usuariosSenha[$i] = $row["senha"];
				$usuariosPerfil[$i] = $row["perfil"];
				$usuariosSimbolo[$i] = $row["simbolo"];
				$i = $i + 1;
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["usuariosUsuario"] = $usuariosUsuario;
    $ret["usuariosSenha"] = $usuariosSenha;
    $ret["usuariosPerfil"] = $usuariosPerfil;
    $ret["usuariosSimbolo"] = $usuariosSimbolo;
    
    echo json_encode($ret);
?>