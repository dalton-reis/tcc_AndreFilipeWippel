<?php
	// IN
	$catSel = $_POST["catSel"];
	// OUT
    $erro = false;
    $msg = "";
    $simbolosId = array();
    $simbolosAudio = array();
    $simbolosImg = array();
    $simbolosCat = array();
    $i = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query2 = "SELECT categoria, id, img, audio FROM simbolos "
				 ."WHERE categoria = '$catSel'";
		$res2 = mysqli_query($con,$query2);
		if (mysqli_num_rows($res2) > 0) {
			while ($row2 = mysqli_fetch_assoc($res2)) {
				$simbolosId[$i] = $row2["id"];
				$simbolosImg[$i] = $row2["img"];
				$simbolosCat[$i] = $row2["categoria"];
				$simbolosAudio[$i] = $row2["audio"];
				$i = $i + 1;
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
    $ret["simbolosAudio"] = $simbolosAudio;
    
    sleep(1);
    echo json_encode($ret);
?>