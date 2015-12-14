<?php
	// IN
	$qtdBaixar = $_POST["qtdBaixar"];
	// OUT
    $erro = false;
    $msg = "";
    $simbolosNome = array();
    $simbolosSign = array();
    $simbolosCat = array();
	$simbolosImg = array();
	$simbolosAudio = array();
	$i = 0;
    $teste = $qtdBaixar;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Erro ao consistir a tabela de símbolos!";
	}
	else {
		$query = "SELECT id,nome,significado,categoria,img,audio FROM simbolos ORDER BY id DESC LIMIT $qtdBaixar";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$teste = 999;
				$simbolosNome[$i] = $row["nome"];
				$simbolosSign[$i] = $row["significado"];
				$simbolosCat[$i] = $row["categoria"];
				$simbolosImg[$i] = $row["img"];
				$simbolosAudio[$i] = $row["audio"];
				$i = $i + 1;
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["simbolosNome"] = $simbolosNome;
    $ret["simbolosSign"] = $simbolosSign;
    $ret["simbolosCat"] = $simbolosCat;
    $ret["simbolosImg"] = $simbolosImg;
    $ret["simbolosAudio"] = $simbolosAudio;
    $ret["teste"] = $teste;
    
    echo json_encode($ret);
?>