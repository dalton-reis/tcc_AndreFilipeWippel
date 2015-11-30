<?php
	// IN
	$aux = $_POST["aux"];
	// OUT
    $erro = false;
    $msg = "";
    $planosBuilder = array();
    $planosSimbolo = array();
    $i = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Erro ao consistir a tabela de planos!";
	}
	else {
		$query = "SELECT builder,simbolo FROM planos";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$planosBuilder[$i] = $row["builder"];
				$planosSimbolo[$i] = $row["simbolo"];
				$i = $i + 1;
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["planosBuilder"] = $planosBuilder;
    $ret["planosSimbolo"] = $planosSimbolo;
    
    echo json_encode($ret);
?>