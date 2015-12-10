<?php
	// IN
	$aux = $_POST["aux"];
	// OUT
    $erro = false;
    $msg = "";
    $pranchasPlano = array();
    $pranchasSimbprancha = array();
    $pranchasSimb1 = array();
    $pranchasSimb2 = array();
    $pranchasSimb3 = array();
    $pranchasSimb4 = array();
    $pranchasSimb5 = array();
    $pranchasSimb6 = array();
    $pranchasSimb7 = array();
    $pranchasSimb8 = array();
    $pranchasSimb9 = array();
    $i = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if (!$con) {
		$erro = true;
		$msg = "Erro ao consistir a tabela de pranchas!";
	}
	else {
		$query = "SELECT plano,simb_prancha,simb1,simb2,simb3,simb4,simb5,simb6,simb7,simb8,simb9 FROM pranchas";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$pranchasPlano[$i] = $row["plano"];
				$pranchasSimbprancha[$i] = $row["simb_prancha"];
				$pranchasSimb1[$i] = $row["simb1"];
				$pranchasSimb2[$i] = $row["simb2"];
				$pranchasSimb3[$i] = $row["simb3"];
				$pranchasSimb4[$i] = $row["simb4"];
				$pranchasSimb5[$i] = $row["simb5"];
				$pranchasSimb6[$i] = $row["simb6"];
				$pranchasSimb7[$i] = $row["simb7"];
				$pranchasSimb8[$i] = $row["simb8"];
				$pranchasSimb9[$i] = $row["simb9"];
				$i = $i + 1;
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["pranchasPlano"] = $pranchasPlano;
    $ret["pranchasSimbprancha"] = $pranchasSimbprancha;
    $ret["pranchasSimb1"] = $pranchasSimb1;
    $ret["pranchasSimb2"] = $pranchasSimb2;
    $ret["pranchasSimb3"] = $pranchasSimb3;
    $ret["pranchasSimb4"] = $pranchasSimb4;
    $ret["pranchasSimb5"] = $pranchasSimb5;
    $ret["pranchasSimb6"] = $pranchasSimb6;
    $ret["pranchasSimb7"] = $pranchasSimb7;
    $ret["pranchasSimb8"] = $pranchasSimb8;
    $ret["pranchasSimb9"] = $pranchasSimb9;
    
    echo json_encode($ret);
?>