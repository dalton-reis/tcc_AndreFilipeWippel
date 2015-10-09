<?php
	// IN
	$idPrancha = $_POST["idPrancha"];
	// OUT
    $erro = false;
    $msg = "";
    $simbolosId = array();
    $simbolosAudio = array();
    $simbolosImg = array();
	// Variaveis
	$i = 0;
    
	$con = mysqli_connect("localhost","root","","tagarela_bd");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query = "SELECT simb1, simb2, simb3, simb4, simb5, simb6, simb7, simb8, simb9 FROM pranchas "
				."WHERE id = '$idPrancha'";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$simbolosId[0] = $row["simb1"];
				$simbolosId[1] = $row["simb2"];
				$simbolosId[2] = $row["simb3"];
				$simbolosId[3] = $row["simb4"];
				$simbolosId[4] = $row["simb5"];
				$simbolosId[5] = $row["simb6"];
				$simbolosId[6] = $row["simb7"];
				$simbolosId[7] = $row["simb8"];
				$simbolosId[8] = $row["simb9"];
			}
		}	
		for ($i = 0; $i < 9; $i++) {
			if ($simbolosId[$i] > 0) {
				$query = "SELECT img, audio FROM simbolos "
						 ."WHERE id = '$simbolosId[$i]'";
				$res = mysqli_query($con,$query);
				if (mysqli_num_rows($res) > 0) {
					while ($row = mysqli_fetch_assoc($res)) {
						$simbolosImg[$i] = $row["img"];
						$simbolosAudio[$i] = $row["audio"];
					}
				}
			}
			else {
				$simbolosId[$i] = 0;
				$simbolosImg[$i] = "no-symbol.png";
				$simbolosAudio[$i] = "no-sound.mp3";
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["simbolosId"] = $simbolosId;
    $ret["simbolosImg"] = $simbolosImg;
    $ret["simbolosAudio"] = $simbolosAudio;
    
    sleep(1);
    echo json_encode($ret);
?>