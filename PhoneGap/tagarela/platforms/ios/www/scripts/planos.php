<?php
	// IN
	$filtroSel = $_POST["filtroSel"];
	$idUser = $_POST["idUser"];
	$perfil = $_POST["perfil"];
    $idBuilder = $_POST["idBuilder"];
	// OUT
    $erro = false;
    $msg = "";
    $planosId = array();
    $planosAudio = array();
    $planosImg = array();
	// Variaveis
    $paciente = 0;
    $espTut = 0;
    $builder = 0;
    $simbolo = 0;
    $i = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		if ($perfil == 3) {
			$paciente = $idUser;
    		$espTut = $idBuilder;
		}
		else {
			$paciente = $idBuilder;
    		$espTut = $idUser;
		}
		$query = "SELECT id FROM builder "
				."WHERE paciente = '$paciente' AND esp_tut = '$espTut'";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$builder = $row["id"];				
			}
		}	
		
		if ($filtroSel == "paciente") {
			$query = "SELECT id, simbolo FROM planos "
					."WHERE builder = '$builder'";
		}
		else {
			$query = "SELECT id, simbolo FROM planos "
					."WHERE builder <> '$builder'";
		}
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$planosId[$i] = $row["id"];
				$simbolo = $row["simbolo"];
			
				$query2 = "SELECT img, audio FROM simbolos "
						 ."WHERE id = '$simbolo'";
				$res2 = mysqli_query($con,$query2);
				if (mysqli_num_rows($res2) > 0) {
					while ($row2 = mysqli_fetch_assoc($res2)) {
						$planosImg[$i] = $row2["img"];
						$planosAudio[$i] = $row2["audio"];
					}
				}
				$i = $i + 1;
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["planosId"] = $planosId;
    $ret["planosImg"] = $planosImg;
    $ret["planosAudio"] = $planosAudio;
    
    sleep(1);
    echo json_encode($ret);
?>