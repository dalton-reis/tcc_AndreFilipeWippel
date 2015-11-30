<?php
	// IN
	$aux = $_POST["aux"];
	// OUT
    $erro = false;
    $msg = "";
    $logsBuilder = array();
    $logsDatahora = array();
    $logsAtividade = array();
    $i = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Erro ao consistir a tabela de log!";
	}
	else {
		$query = "SELECT builder,data_hora,atividade FROM log";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$logsBuilder[$i] = $row["builder"];
				$logsDatahora[$i] = $row["data_hora"];
				$logsAtividade[$i] = $row["atividade"];
				$i = $i + 1;
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["logsBuilder"] = $logsBuilder;
    $ret["logsDatahora"] = $logsDatahora;
    $ret["logsAtividade"] = $logsAtividade;
    
    echo json_encode($ret);
?>