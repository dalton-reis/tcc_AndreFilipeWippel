<?php
	// IN
	$idUser = $_POST["idUser"];
	$perfil = $_POST["perfil"];
    // OUT
    $erro = false;
    $msg = "";
    $fotoImg = "";
    $fotoAudio = "";
    $infoNome = "";
    $infoEmail = "";
    $infoTel = "";
    $buildersId = array();
    $buildersAudio = array();
    $buildersImg = array();
    // Variaveis
    $i = 0;
    
	$con = mysqli_connect("localhost","root","","tagarela_bd");
	if (!$con) {
		$erro = true;
		$msg = "Não foi possível conectar no banco de dados! Erro: " . mysqli_connect_error();
	}
	else {
		$query = "SELECT img, audio FROM simbolos "
				."WHERE simbolos.id = (SELECT simbolo FROM usuarios WHERE usuarios.id = '$idUser')";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$fotoImg = $row["img"];
				$fotoAudio = $row["audio"];
			}
		}
		
		$query = "SELECT nome, email, telefone FROM info "
				."WHERE usuario = '$idUser'";
		$res = mysqli_query($con,$query);
		if (mysqli_num_rows($res) > 0) {
			while ($row = mysqli_fetch_assoc($res)) {
				$infoNome = $row["nome"];				
				$infoEmail = $row["email"];
				$infoTel = $row["telefone"];
			}
		}
		
		if ($perfil == 3) {
			$query = "SELECT esp_tut FROM builder "
					."WHERE paciente = '$idUser'";
			$res = mysqli_query($con,$query);
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$buildersId[$i] = $row["esp_tut"];
					
					$query2 = "SELECT img, audio FROM simbolos "
							 ."WHERE simbolos.id = (SELECT simbolo FROM usuarios WHERE usuarios.id = '$buildersId[$i]')";
					$res2 = mysqli_query($con,$query2);
					if (mysqli_num_rows($res2) > 0) {
						while ($row2 = mysqli_fetch_assoc($res2)) {
							$buildersImg[$i] = $row2["img"];
							$buildersAudio[$i] = $row2["audio"];
						}
					}
					
					$i = $i + 1;
				}
			}
		}
		else {
			$query = "SELECT paciente FROM builder "
					."WHERE esp_tut = '$idUser'";
			$res = mysqli_query($con,$query);
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$buildersId[$i] = $row["paciente"];
					
					$query2 = "SELECT img, audio FROM simbolos "
							 ."WHERE simbolos.id = (SELECT simbolo FROM usuarios WHERE usuarios.id = '$buildersId[$i]')";
					$res2 = mysqli_query($con,$query2);
					if (mysqli_num_rows($res2) > 0) {
						while ($row2 = mysqli_fetch_assoc($res2)) {
							$buildersImg[$i] = $row2["img"];
							$buildersAudio[$i] = $row2["audio"];
						}
					}
					
					$i = $i + 1;
				}
			}
		}
	}
	mysqli_close($con);

    $ret = array();
    $ret["erro"] = $erro;
    $ret["msg"] = $msg;
    $ret["fotoImg"] = $fotoImg;
    $ret["fotoAudio"] = $fotoAudio;
    $ret["infoNome"] = $infoNome;
    $ret["infoEmail"] = $infoEmail;
    $ret["infoTel"] = $infoTel;
    $ret["buildersId"] = $buildersId;
    $ret["buildersImg"] = $buildersImg;
    $ret["buildersAudio"] = $buildersAudio;
    
    sleep(1);
    echo json_encode($ret);
?>