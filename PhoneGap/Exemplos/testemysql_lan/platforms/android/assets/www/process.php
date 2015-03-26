<?php
	$name = $_POST['name'];
	$id = 0;
	
	$errors = array(); //Guarda os erros
    $form_data = array(); //Dados que retornarao para a pagina html
	
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "teste";
	
	// Cria conexao
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	// Checa conexao
	if (!$conn) {
		$errors['connect'] = 'Não foi possível conectar no banco! Erro: ' . mysqli_connect_error();
	}

	$sql = "SELECT id FROM teste WHERE nome = '$name'";
	$result = mysqli_query($conn, $sql);

	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_assoc($result)) {
			$id = $row["id"];
		}
	} else {
		$errors['select'] = 'Não foi encontrado ninguém com o nome: ' . $name;
	}

    /* O nome nao pode ser zerado */
    if (empty($name)) {
        $errors['name'] = 'O nome não pode ser zerado!';
    }
    
    if (!empty($errors)) { //Se ocorreu erros na validacao
    	$form_data['success'] = false;
    	$form_data['errors']  = $errors;
    } else {
    	$form_data['success'] = true;
    	$form_data['posted'] = "ID retornado do banco: " . $id;
    }

    //Retorna os dados para a pagina html
    echo json_encode($form_data);
	
	mysqli_close($conn);