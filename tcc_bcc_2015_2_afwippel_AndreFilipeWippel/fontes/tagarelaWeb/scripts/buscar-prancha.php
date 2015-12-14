<?php
	// IN
	$prancha = $_POST["prancha"];
	// OUT
    $erro = false;
    $msg = "";
    $simbolosId = array();
    $simbolosImg = array();
	$simbolosCat = array();
	// Variaveis
	$simbolo = 0;
    $i = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query = "SELECT simb1, simb2, simb3, simb4, simb5, simb6, simb7, simb8, simb9 FROM pranchas "
				."WHERE id = '$prancha'";
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
				$query = "SELECT categoria, img, audio FROM simbolos "
						 ."WHERE id = '$simbolosId[$i]'";
				$res = mysqli_query($con,$query);
				if (mysqli_num_rows($res) > 0) {
					$row = mysqli_fetch_assoc($res);
					if ($row["categoria"] != 1) {
						$simbolosImg[$i] = $row["img"];
						$simbolosCat[$i] = $row["categoria"];
					}
					else {
						$simbolosId[$i] = 0;
						$simbolosImg[$i] = "adicionar.png";
						$simbolosCat[$i] = 1;
					}
				}
			}
			else {
				$simbolosId[$i] = 0;
				$simbolosImg[$i] = "adicionar.png";
				$simbolosCat[$i] = 1;
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["simbolosId"] = $simbolosId;
    $ret["simbolosImg"] = $simbolosImg;
    $ret["simbolosCat"] = $simbolosCat;
    
    sleep(1);
    echo json_encode($ret);
?>