<?php
	// IN
	$dadoEnv = $_POST["dadoEnv"];
	// OUT
    $dadoRet = 0;
    
	$con = mysqli_connect("127.6.181.2","adminHh2zviV","q7DGyPAINIsG","tagarela_bd","3306");
	if ($con) {
		$dadoRet = $dadoEnv;
	}
	
	$ret = array();
    $ret["dadoRet"] = $dadoRet;

    echo json_encode($ret);
?>