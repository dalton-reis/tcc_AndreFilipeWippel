<?php
	// IN
	$aux = $_POST["aux"];
	// OUT
    $erro = false;
    $msg = "";
    $infoUsuario = array();
    $infoNome = array();
    $infoEmail = array();
	$infoTelefone = array();
	$i = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Erro ao consistir a tabela de informações pessoais!";
	}
	else {
		$query = "SELECT usuario,nome,email,telefone FROM info";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$infoUsuario[$i] = $row["usuario"];
				$infoNome[$i] = $row["nome"];
				$infoEmail[$i] = $row["email"];
				$infoTelefone[$i] = $row["telefone"];
				$i = $i + 1;
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["infoUsuario"] = $infoUsuario;
    $ret["infoNome"] = $infoNome;
    $ret["infoEmail"] = $infoEmail;
    $ret["infoTelefone"] = $infoTelefone;
    
    echo json_encode($ret);
?>