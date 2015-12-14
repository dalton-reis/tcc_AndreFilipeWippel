<?php
	$erro = false;
    $msg = "";
	$sucesso = "";
	$temArq = false;
	
	if (isset($_GET['img'])) {
		$uploaddir = $_GET['dirimg'];
		foreach ($_FILES as $file) {
			$temArq = true;
			if (move_uploaded_file($file['tmp_name'], $uploaddir . basename($file['name']))) {
				$sucesso = "Imagem copiada com sucesso para: " . $uploaddir . $file['name'];
			}
			else {
				$erro = true;
				$msg = "Não foi possível copiar a imagem para o servidor!";
			}
		}
	}
	else {
		$erro = true;
		$msg = "Selecione um arquivo de imagem!";
	}
	
	$data = array();
    $data["erro"] = $erro;
    $data["msg"] = $msg;
    $data["sucesso"] = $sucesso;
	
	echo json_encode($data);
?>