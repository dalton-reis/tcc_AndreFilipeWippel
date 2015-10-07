<?php
	// IN
	$idUser = $_POST["idUsuario"];
	// OUT
    $erro = false;
    $msg = "";
    $pacientesId = array();
    $pacientesAudio = array();
    $pacientesImg = array();
	// Variaveis
	$simbolo = 0;
    $i = 0;
    
	$con = mysqli_connect("localhost","root","","tagarela_bd");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query = "SELECT paciente FROM convites "
				."WHERE esp_tut = '$idUser'";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$pacientesId[$i] = $row["paciente"];
				
				$query3 = "SELECT simbolo FROM usuarios "
						."WHERE id = '$pacientesId[$i]'";
				$res3 = mysqli_query($con,$query3);
				$row3 = mysqli_fetch_assoc($res3);
				$simbolo = $row3["simbolo"];
			
				$query2 = "SELECT img, audio FROM simbolos "
						 ."WHERE id = '$simbolo'";
				$res2 = mysqli_query($con,$query2);
				$row2 = mysqli_fetch_assoc($res2);
				$pacientesImg[$i] = $row2["img"];
				$pacientesAudio[$i] = $row2["audio"];
								
				$i = $i + 1;
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["pacientesId"] = $pacientesId;
    $ret["pacientesImg"] = $pacientesImg;
    $ret["pacientesAudio"] = $pacientesAudio;
    
    sleep(1);
    echo json_encode($ret);
?>