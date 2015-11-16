$(document).ready(function() {

	db.transaction(criarTabelas, nokCriarTabelas, okCriarTabelas);
	
	function criarTabelas(tx) {
		tx.executeSql('DROP TABLE IF EXISTS builder');
		tx.executeSql('CREATE TABLE IF NOT EXISTS builder (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, paciente INTEGER, esp_tut INTEGER)');
		tx.executeSql('INSERT INTO builder (paciente, esp_tut) VALUES (3, 1)');
		tx.executeSql('INSERT INTO builder (paciente, esp_tut) VALUES (3, 2)');
		tx.executeSql('INSERT INTO builder (paciente, esp_tut) VALUES (4, 2)');
		tx.executeSql('INSERT INTO builder (paciente, esp_tut) VALUES (3, 5)');
		tx.executeSql('INSERT INTO builder (paciente, esp_tut) VALUES (4, 5)');
		
		tx.executeSql('DROP TABLE IF EXISTS convites');
		tx.executeSql('CREATE TABLE IF NOT EXISTS convites (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, paciente INTEGER, esp_tut INTEGER, msg TEXT)');
		tx.executeSql('INSERT INTO convites (paciente, esp_tut, msg) VALUES (3, 2, "Dalton favor me adicionar!")');

		tx.executeSql('DROP TABLE IF EXISTS info');
		tx.executeSql('CREATE TABLE IF NOT EXISTS info (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, usuario INTEGER, nome TEXT, email TEXT, telefone TEXT)');
		tx.executeSql('INSERT INTO info (usuario, nome, email, telefone) VALUES (1, "Rodrigo França", "rodrigo.franca@quer.com", "1234567")');
		tx.executeSql('INSERT INTO info (usuario, nome, email, telefone) VALUES (2, "Dalton", "dalton@furb.br", "(47) 9999-9999")');
		tx.executeSql('INSERT INTO info (usuario, nome, email, telefone) VALUES (3, "Giovanna", "", "")');
		tx.executeSql('INSERT INTO info (usuario, nome, email, telefone) VALUES (4, "Gabriel", "", "")');
		tx.executeSql('INSERT INTO info (usuario, nome, email, telefone) VALUES (5, "Rose", "rose@gmail.com.br", "")');

		tx.executeSql('DROP TABLE IF EXISTS log');
		tx.executeSql('CREATE TABLE IF NOT EXISTS log (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, builder INTEGER, data_hora TEXT, atividade TEXT)');
		tx.executeSql('INSERT INTO log (builder, data_hora, atividade) VALUES (2, "06/05/2015 - 11:22:33", "Usou a prancha Escrever")');

		tx.executeSql('DROP TABLE IF EXISTS observacoes');
		tx.executeSql('CREATE TABLE IF NOT EXISTS observacoes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, builder INTEGER, descricao TEXT, obs TEXT)');
		tx.executeSql('INSERT INTO observacoes (builder, descricao, obs) VALUES (2, "testes", "testes1")');
		tx.executeSql('INSERT INTO observacoes (builder, descricao, obs) VALUES (2, "teste2", "testadno!")');
		tx.executeSql('INSERT INTO observacoes (builder, descricao, obs) VALUES (1, "obs1", "teste do rodrigo e giovanna!!")');
		tx.executeSql('INSERT INTO observacoes (builder, descricao, obs) VALUES (1, "obs2", "02/09/2015")');
		tx.executeSql('INSERT INTO observacoes (builder, descricao, obs) VALUES (1, "observacao do andre", "Observacao feita pelo André Filipe Wippel")');
		tx.executeSql('INSERT INTO observacoes (builder, descricao, obs) VALUES (2, "André", "André Filipe Wippel!")');

		tx.executeSql('DROP TABLE IF EXISTS planos');
		tx.executeSql('CREATE TABLE IF NOT EXISTS planos (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, builder INTEGER, simbolo INTEGER)');
		tx.executeSql('INSERT INTO planos (builder, simbolo) VALUES (1, 5)');
		tx.executeSql('INSERT INTO planos (builder, simbolo) VALUES (4, 6)');

		tx.executeSql('DROP TABLE IF EXISTS pranchas');
		tx.executeSql('CREATE TABLE IF NOT EXISTS pranchas (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, plano INTEGER, simb_prancha INTEGER, simb1 INTEGER, simb2 INTEGER, simb3 INTEGER, simb4 INTEGER, simb5 INTEGER, simb6 INTEGER, simb7 INTEGER, simb8 INTEGER, simb9 INTEGER)');
		tx.executeSql('INSERT INTO pranchas (plano, simb_prancha, simb1, simb2, simb3, simb4, simb5, simb6, simb7, simb8, simb9) VALUES (1, 8, 10, 10, 10, 3, 10, 12, 10, 10, 10)');
		tx.executeSql('INSERT INTO pranchas (plano, simb_prancha, simb1, simb2, simb3, simb4, simb5, simb6, simb7, simb8, simb9) VALUES (1, 9, 0, 0, 0, 3, 0, 11, 0, 0, 0)');
		tx.executeSql('INSERT INTO pranchas (plano, simb_prancha, simb1, simb2, simb3, simb4, simb5, simb6, simb7, simb8, simb9) VALUES (2, 13, 0, 0, 4, 3, 14, 0, 0, 0, 15)');

		tx.executeSql('DROP TABLE IF EXISTS simbolos');
		tx.executeSql('CREATE TABLE IF NOT EXISTS simbolos (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome TEXT, significado TEXT, categoria INTEGER, img TEXT, audio TEXT)');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Rodrigo", "Fonoaudiólogo", 1, "pessoas-amarelo/rodrigo-fonoaudiologo.png", "pessoas-amarelo/Rodrigo.mp3")');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Dalton", "Pai e Tutor", 1, "pessoas-amarelo/dalton-pai.png", "pessoas-amarelo/Dalton.mp3")');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Giovanna", "", 1, "pessoas-amarelo/giovanna-paciente.png", "pessoas-amarelo/Giovana.mp3")');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Gabriel", "", 1, "pessoas-amarelo/gabriel-irmao.png", "pessoas-amarelo/Gabriel.mp3")');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Necessidades Básicas", "Possui as pranchas de necessidades básicas", 0, "substantivos-vermelho/banheiro.png", "interface-preto/Apoio.mp3")');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Atividades Físicas", "Pranchas das atividades físicas", 0, "verbos-verde/andar-cavalo.png", "interface-preto/Apoio.mp3")');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Rose", "Pedagoga", 1, "pessoas-amarelo/rose-prof-pedagoga.png", "pessoas-amarelo/Professora.mp3")');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Prancha - Beber", "", 0, "verbos-verde/beber.png", "verbos-verde/Beber.mp3")');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Prancha - Tomar Banho", "", 0, "verbos-verde/tomar-banho.png", "substantivos-vermelho/Banho.mp3")');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Beber", "", 3, "verbos-verde/beber.png", "verbos-verde/Beber.mp3")');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Tomar Banho", "", 3, "verbos-verde/tomar-banho.png", "substantivos-vermelho/Banho.mp3")');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Água", "", 2, "substantivos-vermelho/agua.png", "substantivos-vermelho/Agua.mp3")');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Prancha - Brincar", "", 0, "verbos-verde/brincar.png", "verbos-verde/Brincar.mp3")');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Brincar", "", 3, "verbos-verde/brincar.png", "verbos-verde/Brincar.mp3")');
		tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio) VALUES ("Fantoches", "", 2, "substantivos-vermelho/fantoches.png", "substantivos-vermelho/Fantoches.mp3")');

		tx.executeSql('DROP TABLE IF EXISTS usuarios');
		tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, usuario TEXT, senha TEXT, perfil INTEGER, simbolo INTEGER)');
		tx.executeSql('INSERT INTO usuarios (usuario, senha, perfil, simbolo) VALUES ("rodrigo", "123", 1, 1)');
		tx.executeSql('INSERT INTO usuarios (usuario, senha, perfil, simbolo) VALUES ("dalton", "123", 2, 2)');
		tx.executeSql('INSERT INTO usuarios (usuario, senha, perfil, simbolo) VALUES ("giovanna", "123", 3, 3)');
		tx.executeSql('INSERT INTO usuarios (usuario, senha, perfil, simbolo) VALUES ("gabriel", "123", 3, 4)');
		tx.executeSql('INSERT INTO usuarios (usuario, senha, perfil, simbolo) VALUES ("rose", "123", 1, 7)');
	}
	
	function nokCriarTabelas(erro) {
		alert("Não foi possível sincronizar os dados com o servidor! Erro: "+erro.code);
	}
	
	function okCriarTabelas() {
		alert("Sincronização com o servidor realizada com sucesso!");
	}
	
});