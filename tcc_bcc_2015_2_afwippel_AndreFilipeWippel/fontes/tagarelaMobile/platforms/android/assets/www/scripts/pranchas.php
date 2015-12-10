<?php
	// IN
	$idPlano = $_POST["idPlano"];
	// OUT
    $erro = false;
    $msg = "";
    $pranchasId = array();
    $pranchasAudio = array();
    $pranchasImg = array();
	// Variaveis
	$simbolo = 0;
    $i = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query = "SELECT id, simb_prancha FROM pranchas "
				."WHERE plano = '$idPlano'";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$pranchasId[$i] = $row["id"];
				$simbolo = $row["simb_prancha"];
			
				$query2 = "SELECT img, audio FROM simbolos "
						 ."WHERE id = '$simbolo'";
				$res2 = mysqli_query($con,$query2);
				if (mysqli_num_rows($res2) > 0) {
					while ($row2 = mysqli_fetch_assoc($res2)) {
						$pranchasImg[$i] = $row2["img"];
						$pranchasAudio[$i] = $row2["audio"];
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
    $ret["pranchasId"] = $pranchasId;
    $ret["pranchasImg"] = $pranchasImg;
    $ret["pranchasAudio"] = $pranchasAudio;
    
    sleep(1);
    echo json_encode($ret);
?>