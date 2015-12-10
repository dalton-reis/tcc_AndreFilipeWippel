<?php
	// IN
	$aux = $_POST["aux"];
	// OUT
    $erro = false;
    $msg = "";
    $qtdSimbWeb = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Erro ao consistir a tabela de símbolos!";
	}
	else {
		$query = "SELECT COUNT(*) AS qtd_web FROM simbolos";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$qtdSimbWeb = $row["qtd_web"];
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["qtdSimbWeb"] = $qtdSimbWeb;
    
    echo json_encode($ret);
?>