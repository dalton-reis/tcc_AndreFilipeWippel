<?php
	// IN
	$idUser = $_POST["idUser"];
	$infoNome = $_POST["infoNome"];
	$infoEmail = $_POST["infoEmail"];
	$infoTel = $_POST["infoTel"];
	// OUT
    $erro = false;
    $msg = "";
    $retNome = "";
    $retEmail = "";
    $retTel = "";
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query = "UPDATE info SET nome = '$infoNome', email = '$infoEmail', telefone = '$infoTel' "
				."WHERE usuario = '$idUser'";
		$res = mysqli_query($con,$query);
		if (!$res) {
			$erro = true;
			$msg = "Erro ao atualizar os dados no banco!";			
		}
		
		$query = "SELECT nome, email, telefone FROM info "
				."WHERE usuario = '$idUser'";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$retNome = $row["nome"];				
				$retEmail = $row["email"];
				$retTel = $row["telefone"];
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["retNome"] = $retNome;
    $ret["retEmail"] = $retEmail;
    $ret["retTel"] = $retTel;
    
    sleep(1);
    echo json_encode($ret);
?>