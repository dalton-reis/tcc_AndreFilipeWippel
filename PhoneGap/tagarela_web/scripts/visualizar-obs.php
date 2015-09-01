<?php
	// IN
	$idBuilder = $_POST["idBuilder"];
	$espTut = $_POST["espTut"];
    // OUT
    $erro = false;
    $msg = "";
    $obsId = array();
    $obsDesc = array();
    // Variaveis
    $i = 0;
    $id = 0;
    
	$con = mysqli_connect("localhost","root","","tagarela_bd");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query = "SELECT id FROM builder "
				."WHERE esp_tut = '$espTut' AND paciente = '$idBuilder'";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$id = $row["id"];
					
				$query2 = "SELECT id, descricao FROM observacoes "
						 ."WHERE builder = '$id'";
				$res2 = mysqli_query($con,$query2);
				if (mysqli_num_rows($res2) > 0) {
					while ($row2 = mysqli_fetch_assoc($res2)) {
						$obsId[$i] = $row2["id"];
						$obsDesc[$i] = $row2["descricao"];
						$i = $i + 1;
					}
				}
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["obsId"] = $obsId;
    $ret["obsDesc"] = $obsDesc;
    
    sleep(1);
    echo json_encode($ret);
?>