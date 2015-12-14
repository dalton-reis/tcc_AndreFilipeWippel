<?php
	$erro = false;
    $msg = "";
	$sucesso = "";
	
	if (isset($_GET['aud'])) {
		$uploaddir = $_GET['diraud'];
		foreach ($_FILES as $file) {
			if (move_uploaded_file($file['tmp_name'], $uploaddir . basename($file['name']))) {
				$sucesso = "Áudio copiado com sucesso para: " . $uploaddir . $file['name'];
			}
			else {
				$erro = true;
				$msg = "Não foi possível copiar o áudio para o servidor!";
			}
		}
	}
	else {
		$erro = true;
		$msg = "Selecione um arquivo de áudio!";
	}
	
	$data = array();
    $data["erro"] = $erro;
    $data["msg"] = $msg;
    $data["sucesso"] = $sucesso;
	
	echo json_encode($data);
?>