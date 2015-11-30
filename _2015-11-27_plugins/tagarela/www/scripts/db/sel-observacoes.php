<?php
	// IN
	$aux = $_POST["aux"];
	// OUT
    $erro = false;
    $msg = "";
    $observacoesBuilder = array();
    $observacoesDescricao = array();
    $observacoesObs = array();
	$i = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Erro ao consistir a tabela de observacoes!";
	}
	else {
		$query = "SELECT builder,descricao,obs FROM observacoes";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$observacoesBuilder[$i] = $row["builder"];
				$observacoesDescricao[$i] = $row["descricao"];
				$observacoesObs[$i] = $row["obs"];
				$i = $i + 1;
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["observacoesBuilder"] = $observacoesBuilder;
    $ret["observacoesDescricao"] = $observacoesDescricao;
    $ret["observacoesObs"] = $observacoesObs;
    
    echo json_encode($ret);
?>