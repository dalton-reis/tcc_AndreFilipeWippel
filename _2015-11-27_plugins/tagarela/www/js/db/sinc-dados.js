// FUNCOES DE ERRO E SUCESSO ****************************************************************************************************************************************************************
function nokTransSinc(erro) {
	alert("Erro ao sincronizar os dados com o servidor! Erro: "+erro.code);
}
function okTransSinc() {
	var aux = 0;
}

// CRIACAO DAS TABELAS **********************************************************************************************************************************************************************
function criarTabelas(erro) {
	db.transaction(criarTab, nokTransSinc, okTransSinc);
}
function criarTab(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS builder (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, paciente INTEGER, esp_tut INTEGER, sinc INTEGER)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS convites (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, paciente INTEGER, esp_tut INTEGER, msg TEXT, sinc INTEGER)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS info (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, usuario INTEGER, nome TEXT, email TEXT, telefone TEXT, sinc INTEGER)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS log (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, builder INTEGER, data_hora TEXT, atividade TEXT, sinc INTEGER)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS observacoes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, builder INTEGER, descricao TEXT, obs TEXT, sinc INTEGER)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS planos (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, builder INTEGER, simbolo INTEGER, sinc INTEGER)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS pranchas (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, plano INTEGER, simb_prancha INTEGER, simb1 INTEGER, simb2 INTEGER, simb3 INTEGER, simb4 INTEGER, simb5 INTEGER, simb6 INTEGER, simb7 INTEGER, simb8 INTEGER, simb9 INTEGER, sinc INTEGER)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS simbolos (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome TEXT, significado TEXT, categoria INTEGER, img TEXT, audio TEXT, sinc INTEGER)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, usuario TEXT, senha TEXT, perfil INTEGER, simbolo INTEGER, sinc INTEGER)');
}

// CONSISTENCIA DAS TABELAS *****************************************************************************************************************************************************************
function consistirDados(erro) {
//	alert("Consistindo os dados com o servidor...");
	db.transaction(consTabelas, nokTransSinc, okTransSinc);
}
function consTabelas(tx) {
	consBuilder(tx);
	/*tx.executeSql('DROP TABLE IF EXISTS builder');
	tx.executeSql('CREATE TABLE IF NOT EXISTS builder (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, paciente INTEGER, esp_tut INTEGER, sinc INTEGER)');
	tx.executeSql('INSERT INTO builder (paciente, esp_tut, sinc) VALUES (3, 1, 0)');
	tx.executeSql('INSERT INTO builder (paciente, esp_tut, sinc) VALUES (3, 2, 0)');
	tx.executeSql('INSERT INTO builder (paciente, esp_tut, sinc) VALUES (4, 2, 0)');
	tx.executeSql('INSERT INTO builder (paciente, esp_tut, sinc) VALUES (3, 5, 0)');
	tx.executeSql('INSERT INTO builder (paciente, esp_tut, sinc) VALUES (4, 5, 0)');*/
	
	consConvites(tx);
	/*tx.executeSql('DROP TABLE IF EXISTS convites');
	tx.executeSql('CREATE TABLE IF NOT EXISTS convites (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, paciente INTEGER, esp_tut INTEGER, msg TEXT, sinc INTEGER)');*/

	consInfo(tx);
	/*tx.executeSql('DROP TABLE IF EXISTS info ');
	tx.executeSql('CREATE TABLE IF NOT EXISTS info (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, usuario INTEGER, nome TEXT, email TEXT, telefone TEXT, sinc INTEGER)');
	tx.executeSql('INSERT INTO info (usuario, nome, email, telefone, sinc) VALUES (1, "Rodrigo França", "rodrigo.franca@quer.com", "1234567", 0)');
	tx.executeSql('INSERT INTO info (usuario, nome, email, telefone, sinc) VALUES (2, "Dalton", "dalton@furb.br", "(47) 9999-9999", 0)');
	tx.executeSql('INSERT INTO info (usuario, nome, email, telefone, sinc) VALUES (3, "Giovanna", "", "", 0)');
	tx.executeSql('INSERT INTO info (usuario, nome, email, telefone, sinc) VALUES (4, "Gabriel", "", "", 0)');
	tx.executeSql('INSERT INTO info (usuario, nome, email, telefone, sinc) VALUES (5, "Rose", "rose@gmail.com.br", "", 0)');*/

	consLog(tx);
	/*tx.executeSql('DROP TABLE IF EXISTS log ');
	tx.executeSql('CREATE TABLE IF NOT EXISTS log (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, builder INTEGER, data_hora TEXT, atividade TEXT, sinc INTEGER)');*/

	consObservacoes(tx);
	/*tx.executeSql('DROP TABLE IF EXISTS observacoes ');
	tx.executeSql('CREATE TABLE IF NOT EXISTS observacoes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, builder INTEGER, descricao TEXT, obs TEXT, sinc INTEGER)');
	tx.executeSql('INSERT INTO observacoes (builder, descricao, obs, sinc) VALUES (2, "testes", "testes1", 0)');
	tx.executeSql('INSERT INTO observacoes (builder, descricao, obs, sinc) VALUES (2, "teste2", "testadno!", 0)');
	tx.executeSql('INSERT INTO observacoes (builder, descricao, obs, sinc) VALUES (1, "obs1", "teste do rodrigo e giovanna!!", 0)');
	tx.executeSql('INSERT INTO observacoes (builder, descricao, obs, sinc) VALUES (1, "obs2", "02/09/2015", 0)');
	tx.executeSql('INSERT INTO observacoes (builder, descricao, obs, sinc) VALUES (1, "observacao do andre", "Observacao feita pelo André Filipe Wippel", 0)');
	tx.executeSql('INSERT INTO observacoes (builder, descricao, obs, sinc) VALUES (2, "André", "André Filipe Wippel!", 0)');*/

	consPlanos(tx);
	/*tx.executeSql('DROP TABLE IF EXISTS planos ');
	tx.executeSql('CREATE TABLE IF NOT EXISTS planos (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, builder INTEGER, simbolo INTEGER, sinc INTEGER)');
	tx.executeSql('INSERT INTO planos (builder, simbolo, sinc) VALUES (1, 5, 0)');
	tx.executeSql('INSERT INTO planos (builder, simbolo, sinc) VALUES (4, 6, 0)');*/

	consPranchas(tx);
	/*tx.executeSql('DROP TABLE IF EXISTS pranchas ');
	tx.executeSql('CREATE TABLE IF NOT EXISTS pranchas (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, plano INTEGER, simb_prancha INTEGER, simb1 INTEGER, simb2 INTEGER, simb3 INTEGER, simb4 INTEGER, simb5 INTEGER, simb6 INTEGER, simb7 INTEGER, simb8 INTEGER, simb9 INTEGER, sinc INTEGER)');
	tx.executeSql('INSERT INTO pranchas (plano, simb_prancha, simb1, simb2, simb3, simb4, simb5, simb6, simb7, simb8, simb9, sinc) VALUES (1, 8, 10, 10, 10, 3, 10, 12, 10, 10, 10, 0)');
	tx.executeSql('INSERT INTO pranchas (plano, simb_prancha, simb1, simb2, simb3, simb4, simb5, simb6, simb7, simb8, simb9, sinc) VALUES (1, 9, 0, 0, 0, 3, 0, 11, 0, 0, 0, 0)');
	tx.executeSql('INSERT INTO pranchas (plano, simb_prancha, simb1, simb2, simb3, simb4, simb5, simb6, simb7, simb8, simb9, sinc) VALUES (2, 13, 0, 0, 4, 3, 14, 0, 0, 0, 15, 0)');*/

	//consSimbolos(tx);
    tx.executeSql('DROP TABLE IF EXISTS simbolos ');
	tx.executeSql('CREATE TABLE IF NOT EXISTS simbolos (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome TEXT, significado TEXT, categoria INTEGER, img TEXT, audio TEXT, sinc INTEGER)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Rodrigo", "Fonoaudiólogo", 1, "pessoas-amarelo/rodrigo-fonoaudiologo.png", "pessoas-amarelo/Rodrigo.mp3", 0)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Dalton", "Pai e Tutor", 1, "pessoas-amarelo/dalton-pai.png", "pessoas-amarelo/Dalton.mp3", 0)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Giovanna", "", 1, "pessoas-amarelo/giovanna-paciente.png", "pessoas-amarelo/Giovana.mp3", 0)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Gabriel", "", 1, "pessoas-amarelo/gabriel-irmao.png", "pessoas-amarelo/Gabriel.mp3", 0)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Necessidades Básicas", "Possui as pranchas de necessidades básicas", 0, "substantivos-vermelho/banheiro.png", "interface-preto/Apoio.mp3", 0)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Atividades Físicas", "Pranchas das atividades físicas", 0, "verbos-verde/andar-cavalo.png", "interface-preto/Apoio.mp3", 0)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Rose", "Pedagoga", 1, "pessoas-amarelo/rose-prof-pedagoga.png", "pessoas-amarelo/Professora.mp3", 0)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Prancha - Beber", "", 0, "verbos-verde/beber.png", "verbos-verde/Beber.mp3", 0)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Prancha - Tomar Banho", "", 0, "verbos-verde/tomar-banho.png", "substantivos-vermelho/Banho.mp3", 0)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Beber", "", 3, "verbos-verde/beber.png", "verbos-verde/Beber.mp3", 0)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Tomar Banho", "", 3, "verbos-verde/tomar-banho.png", "substantivos-vermelho/Banho.mp3", 0)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Água", "", 2, "substantivos-vermelho/agua.png", "substantivos-vermelho/Agua.mp3", 0)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Prancha - Brincar", "", 0, "verbos-verde/brincar.png", "verbos-verde/Brincar.mp3", 0)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Brincar", "", 3, "verbos-verde/brincar.png", "verbos-verde/Brincar.mp3", 0)');
	tx.executeSql('INSERT INTO simbolos (nome, significado, categoria, img, audio, sinc) VALUES ("Fantoches", "", 2, "substantivos-vermelho/fantoches.png", "substantivos-vermelho/Fantoches.mp3", 0)');

	consUsuarios(tx);
	/*tx.executeSql('DROP TABLE IF EXISTS usuarios ');
	tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, usuario TEXT, senha TEXT, perfil INTEGER, simbolo INTEGER, sinc INTEGER)');
	tx.executeSql('INSERT INTO usuarios (usuario, senha, perfil, simbolo, sinc) VALUES ("rodrigo", "123", 1, 1, 0)');
	tx.executeSql('INSERT INTO usuarios (usuario, senha, perfil, simbolo, sinc) VALUES ("dalton", "123", 2, 2, 0)');
	tx.executeSql('INSERT INTO usuarios (usuario, senha, perfil, simbolo, sinc) VALUES ("giovanna", "123", 3, 3, 0)');
	tx.executeSql('INSERT INTO usuarios (usuario, senha, perfil, simbolo, sinc) VALUES ("gabriel", "123", 3, 4, 0)');
	tx.executeSql('INSERT INTO usuarios (usuario, senha, perfil, simbolo, sinc) VALUES ("rose", "123", 1, 7, 0)');*/
}

// CONSISTENCIA DA TABELA DE USUARIOS *******************************************************************************************************************************************************
function consUsuarios(tx) {
	tx.executeSql("SELECT id,usuario,senha,perfil,simbolo,sinc FROM usuarios WHERE sinc <> 0", [], okConsUsuarios, nokTransSinc);
}
function okConsUsuarios(tx, results) {
   	var len = results.rows.length;
    var cont = 0;
    for (var i=0; i<len; i++) {
    	var dados = {
			"id" : results.rows.item(i).id,
			"usuario" : results.rows.item(i).usuario,
			"senha"   : results.rows.item(i).senha,
			"perfil"  : results.rows.item(i).perfil,
			"simbolo" : results.rows.item(i).simbolo
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/ins-usuario.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	if (ret.erro) {
			    	alert(ret.msg);
			    }
			    else {
			    	db.transaction(updateUsuario, nokTransSinc, okTransSinc);
				}			    	
		    },
		    error    : function(ret) {
		    	alert("Erro ao consistir a tabela de usuarios!");
		    },
		    complete:  function() { 
				cont++;
				if (cont == len)
					db.transaction(selectUsuarios, nokTransSinc, okTransSinc);
		   	}
		});
    }
    if (len == 0)
    	db.transaction(selectUsuarios, nokTransSinc, okTransSinc);
}
function updateUsuario(tx) {
	tx.executeSql("UPDATE usuarios SET sinc = 0 WHERE sinc <> 0");
}
var usuariosUsuario = [];
var usuariosSenha = [];
var usuariosPerfil = [];
var usuariosSimbolo = [];
function selectUsuarios(tx) {
	var dados = {
		"aux" : 1
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/sel-usuarios.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.usuariosUsuario.length; i++) {
					usuariosUsuario[i] = ret.usuariosUsuario[i];
					usuariosSenha[i] = ret.usuariosSenha[i];
					usuariosPerfil[i] = ret.usuariosPerfil[i];
					usuariosSimbolo[i] = ret.usuariosSimbolo[i];
				}
				db.transaction(localUsuarios, nokTransSinc, okTransSinc);
		    }    	
	    },
	    error    : function(ret) {
	    	alert("Erro ao consistir a tabela de usuarios!");
	    }
	});
}
function localUsuarios(tx) {
	tx.executeSql('DROP TABLE IF EXISTS usuarios ');
	tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, usuario TEXT, senha TEXT, perfil INTEGER, simbolo INTEGER, sinc INTEGER)');
	for	(var i = 0; i < usuariosUsuario.length; i++) {
		tx.executeSql("INSERT INTO usuarios (usuario,senha,perfil,simbolo,sinc) VALUES (?,?,?,?,0)", [usuariosUsuario[i],usuariosSenha[i],usuariosPerfil[i],usuariosSimbolo[i]]);
	}
}

// CONSISTENCIA DA TABELA INFO *****************************************************************************************************************************************************
function consInfo(tx) {
	tx.executeSql("SELECT id,usuario,nome,email,telefone,sinc FROM info WHERE sinc <> 0", [], okConsInfo, nokTransSinc);
}
function okConsInfo(tx, results) {
   	var len = results.rows.length;
    var cont = 0;
    for (var i=0; i<len; i++) {
    	var urlOpe = "http://tagarela-afwippel.rhcloud.com/scripts/db/ins-info.php";
		if (results.rows.item(i).sinc == 2) {
			urlOpe = "http://tagarela-afwippel.rhcloud.com/scripts/db/alt-info.php";
		}
		var dados = {
			"id" : results.rows.item(i).id,
			"usuario" : results.rows.item(i).usuario,
			"nome"   : results.rows.item(i).nome,
			"email"  : results.rows.item(i).email,
			"telefone" : results.rows.item(i).telefone
		};    
		$.ajax({
		    type     : "post",
		    url      : urlOpe,
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	if (ret.erro) {
			    	alert(ret.msg);
			    }
			    else {
			    	db.transaction(updateInfo, nokTransSinc, okTransSinc);
				}			    	
		    },
		    error    : function(ret) {
		    	alert("Erro ao consistir a tabela de informações pessoais!");
		    },
		    complete:  function() { 
				cont++;
				if (cont == len)
					db.transaction(selectInfo, nokTransSinc, okTransSinc);
		   	}
		});
    }
    if (len == 0)
    	db.transaction(selectInfo, nokTransSinc, okTransSinc);
}
function updateInfo(tx) {
	tx.executeSql("UPDATE info SET sinc = 0 WHERE sinc <> 0");
}
var infoUsuario = [];
var infoNome = [];
var infoEmail = [];
var infoTelefone = [];
function selectInfo(tx) {
	var dados = {
		"aux" : 1
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/sel-info.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.infoUsuario.length; i++) {
					infoUsuario[i] = ret.infoUsuario[i];
					infoNome[i] = ret.infoNome[i];
					infoEmail[i] = ret.infoEmail[i];
					infoTelefone[i] = ret.infoTelefone[i];
				}
				db.transaction(localInfo, nokTransSinc, okTransSinc);
		    }    	
	    },
	    error    : function(ret) {
	    	alert("Erro ao consistir a tabela de informações pessoais!");
	    }
	});
}
function localInfo(tx) {
	tx.executeSql('DROP TABLE IF EXISTS info');
	tx.executeSql('CREATE TABLE IF NOT EXISTS info (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, usuario INTEGER, nome TEXT, email TEXT, telefone TEXT, sinc INTEGER)');
	for	(var i = 0; i < infoUsuario.length; i++) {
		tx.executeSql("INSERT INTO info (usuario,nome,email,telefone,sinc) VALUES (?,?,?,?,0)", [infoUsuario[i],infoNome[i],infoEmail[i],infoTelefone[i]]);
	}
}

// CONSISTENCIA DA TABELA DE OBSERVACOES ****************************************************************************************************************************************************
function consObservacoes(tx) {
	tx.executeSql("SELECT id,builder,descricao,obs,sinc FROM observacoes WHERE sinc <> 0", [], okConsObservacoes, nokTransSinc);
}
function okConsObservacoes(tx, results) {
   	var len = results.rows.length;
    var cont = 0;
    for (var i=0; i<len; i++) {
    	var dados = {
			"id" : results.rows.item(i).id,
			"builder" : results.rows.item(i).builder,
			"descricao"   : results.rows.item(i).descricao,
			"obs"  : results.rows.item(i).obs,
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/ins-observacao.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	if (ret.erro) {
			    	alert(ret.msg);
			    }
			    else {
			    	db.transaction(updateObservacao, nokTransSinc, okTransSinc);
				}			    	
		    },
		    error    : function(ret) {
		    	alert("Erro ao consistir a tabela de observacoes!");
		    },
		    complete:  function() { 
				cont++;
				if (cont == len)
					db.transaction(selectObservacoes, nokTransSinc, okTransSinc);
		   	}
		});
    }
    if (len == 0)
    	db.transaction(selectObservacoes, nokTransSinc, okTransSinc);
}
function updateObservacao(tx) {
	tx.executeSql("UPDATE observacoes SET sinc = 0 WHERE sinc <> 0");
}
var observacoesBuilder = [];
var observacoesDescricao = [];
var observacoesObs = [];
function selectObservacoes(tx) {
	var dados = {
		"aux" : 1
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/sel-observacoes.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.observacoesBuilder.length; i++) {
					observacoesBuilder[i] = ret.observacoesBuilder[i];
					observacoesDescricao[i] = ret.observacoesDescricao[i];
					observacoesObs[i] = ret.observacoesObs[i];
				}
				db.transaction(localObservacoes, nokTransSinc, okTransSinc);
		    }    	
	    },
	    error    : function(ret) {
	    	alert("Erro ao consistir a tabela de observacoes!");
	    }
	});
}
function localObservacoes(tx) {
	tx.executeSql('DROP TABLE IF EXISTS observacoes');
	tx.executeSql('CREATE TABLE IF NOT EXISTS observacoes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, builder INTEGER, descricao TEXT, obs TEXT, sinc INTEGER)');
	for	(var i = 0; i < observacoesBuilder.length; i++) {
		tx.executeSql("INSERT INTO observacoes (builder,descricao,obs,sinc) VALUES (?,?,?,0)", [observacoesBuilder[i],observacoesDescricao[i],observacoesObs[i]]);
	}
}

// CONSISTENCIA DA TABELA DE BUILDERS *******************************************************************************************************************************************************
function consBuilder(tx) {
	tx.executeSql("SELECT id,paciente,esp_tut,sinc FROM builder WHERE sinc <> 0", [], okConsBuilders, nokTransSinc);
}
function okConsBuilders(tx, results) {
   	var len = results.rows.length;
    var cont = 0;
    for (var i=0; i<len; i++) {
    	var dados = {
			"id" : results.rows.item(i).id,
			"paciente" : results.rows.item(i).paciente,
			"esptut"   : results.rows.item(i).esp_tut,
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/ins-builder.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	if (ret.erro) {
			    	alert(ret.msg);
			    }
			    else {
			    	db.transaction(updateBuilder, nokTransSinc, okTransSinc);
				}			    	
		    },
		    error    : function(ret) {
		    	alert("Erro ao consistir a tabela de builders!");
		    },
		    complete:  function() { 
				cont++;
				if (cont == len)
					db.transaction(selectBuilders, nokTransSinc, okTransSinc);
		   	}
		});
    }
    if (len == 0)
    	db.transaction(selectBuilders, nokTransSinc, okTransSinc);
}
function updateBuilder(tx) {
	tx.executeSql("UPDATE builder SET sinc = 0 WHERE sinc <> 0");
}
var buildersPaciente = [];
var buildersEsptut = [];
function selectBuilders(tx) {
	var dados = {
		"aux" : 1
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/sel-builders.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.buildersPaciente.length; i++) {
					buildersPaciente[i] = ret.buildersPaciente[i];
					buildersEsptut[i] = ret.buildersEsptut[i];
				}
				db.transaction(localBuilders, nokTransSinc, okTransSinc);
		    }    	
	    },
	    error    : function(ret) {
	    	alert("Erro ao consistir a tabela de builders!");
	    }
	});
}
function localBuilders(tx) {
	tx.executeSql('DROP TABLE IF EXISTS builder');
	tx.executeSql('CREATE TABLE IF NOT EXISTS builder (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, paciente INTEGER, esp_tut INTEGER, sinc INTEGER)');
	for	(var i = 0; i < buildersPaciente.length; i++) {
		tx.executeSql("INSERT INTO builder (paciente,esp_tut,sinc) VALUES (?,?,0)", [buildersPaciente[i],buildersEsptut[i]]);
	}
}

// CONSISTENCIA DA TABELA DE CONVITES *******************************************************************************************************************************************************
function consConvites(tx) {
	tx.executeSql("SELECT id,paciente,esp_tut,msg,sinc FROM convites WHERE sinc <> 0", [], okConsConvites, nokTransSinc);
}
function okConsConvites(tx, results) {
   	var len = results.rows.length;
    var cont = 0;
    for (var i=0; i<len; i++) {
    	var dados = {
			"id" : results.rows.item(i).id,
			"paciente" : results.rows.item(i).paciente,
			"esptut"   : results.rows.item(i).esp_tut,
			"msg"   : results.rows.item(i).msg,
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/ins-convite.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	if (ret.erro) {
			    	alert(ret.msg);
			    }
			    else {
			    	db.transaction(updateConvite, nokTransSinc, okTransSinc);
				}			    	
		    },
		    error    : function(ret) {
		    	alert("Erro ao consistir a tabela de convites!");
		    },
		    complete:  function() { 
				cont++;
				if (cont == len)
					db.transaction(selectConvites, nokTransSinc, okTransSinc);
		   	}
		});
    }
    if (len == 0)
    	db.transaction(selectConvites, nokTransSinc, okTransSinc);
}
function updateConvite(tx) {
	tx.executeSql("UPDATE convites SET sinc = 0 WHERE sinc <> 0");
}
var convitesPaciente = [];
var convitesEsptut = [];
var convitesMsg = [];
function selectConvites(tx) {
	var dados = {
		"aux" : 1
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/sel-convites.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.convitesPaciente.length; i++) {
					convitesPaciente[i] = ret.convitesPaciente[i];
					convitesEsptut[i] = ret.convitesEsptut[i];
					convitesMsg[i] = ret.convitesMsg[i];
				}
				db.transaction(localConvites, nokTransSinc, okTransSinc);
		    }    	
	    },
	    error    : function(ret) {
	    	alert("Erro ao consistir a tabela de convites!");
	    }
	});
}
function localConvites(tx) {
	tx.executeSql('DROP TABLE IF EXISTS convites');
	tx.executeSql('CREATE TABLE IF NOT EXISTS convites (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, paciente INTEGER, esp_tut INTEGER, msg TEXT, sinc INTEGER)');
	for	(var i = 0; i < convitesPaciente.length; i++) {
		tx.executeSql("INSERT INTO convites (paciente,esp_tut,msg,sinc) VALUES (?,?,?,0)", [convitesPaciente[i],convitesEsptut[i],convitesMsg[i]]);
	}
}

// CONSISTENCIA DA TABELA DE LOG ************************************************************************************************************************************************************
function consLog(tx) {
	tx.executeSql("SELECT id,builder,data_hora,atividade,sinc FROM log WHERE sinc <> 0", [], okConsLogs, nokTransSinc);
}
function okConsLogs(tx, results) {
   	var len = results.rows.length;
    var cont = 0;
    for (var i=0; i<len; i++) {
    	var dados = {
			"id" : results.rows.item(i).id,
			"builder" : results.rows.item(i).builder,
			"dataHora"   : results.rows.item(i).data_hora,
			"atividade"   : results.rows.item(i).atividade,
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/ins-log.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	if (ret.erro) {
			    	alert(ret.msg);
			    }
			    else {
			    	db.transaction(updateLog, nokTransSinc, okTransSinc);
				}			    	
		    },
		    error    : function(ret) {
		    	alert("Erro ao consistir a tabela de log!");
		    },
		    complete:  function() { 
				cont++;
				if (cont == len)
					db.transaction(selectLogs, nokTransSinc, okTransSinc);
		   	}
		});
    }
    if (len == 0)
    	db.transaction(selectLogs, nokTransSinc, okTransSinc);
}
function updateLog(tx) {
	tx.executeSql("UPDATE log SET sinc = 0 WHERE sinc <> 0");
}
var logsBuilder = [];
var logsDatahora = [];
var logsAtividade = [];
function selectLogs(tx) {
	var dados = {
		"aux" : 1
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/sel-logs.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.logsBuilder.length; i++) {
					logsBuilder[i] = ret.logsBuilder[i];
					logsDatahora[i] = ret.logsDatahora[i];
					logsAtividade[i] = ret.logsAtividade[i];
				}
				db.transaction(localLogs, nokTransSinc, okTransSinc);
		    }    	
	    },
	    error    : function(ret) {
	    	alert("Erro ao consistir a tabela de log!");
	    }
	});
}
function localLogs(tx) {
	tx.executeSql('DROP TABLE IF EXISTS log');
	tx.executeSql('CREATE TABLE IF NOT EXISTS log (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, builder INTEGER, data_hora TEXT, atividade TEXT, sinc INTEGER)');
	for	(var i = 0; i < logsBuilder.length; i++) {
		tx.executeSql("INSERT INTO log (builder,data_hora,atividade,sinc) VALUES (?,?,?,0)", [logsBuilder[i],logsDatahora[i],logsAtividade[i]]);
	}
}

// CONSISTENCIA DA TABELA DE PLANOS *********************************************************************************************************************************************************
function consPlanos(tx) {
	tx.executeSql("SELECT id,builder,simbolo,sinc FROM planos WHERE sinc <> 0", [], okConsPlanos, nokTransSinc);
}
function okConsPlanos(tx, results) {
   	var len = results.rows.length;
    var cont = 0;
    for (var i=0; i<len; i++) {
    	var dados = {
			"id" : results.rows.item(i).id,
			"builder" : results.rows.item(i).builder,
			"simbolo"   : results.rows.item(i).simbolo,
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/ins-plano.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	if (ret.erro) {
			    	alert(ret.msg);
			    }
			    else {
			    	db.transaction(updatePlano, nokTransSinc, okTransSinc);
				}			    	
		    },
		    error    : function(ret) {
		    	alert("Erro ao consistir a tabela de planos!");
		    },
		    complete:  function() { 
				cont++;
				if (cont == len)
					db.transaction(selectPlanos, nokTransSinc, okTransSinc);
		   	}
		});
    }
    if (len == 0)
    	db.transaction(selectPlanos, nokTransSinc, okTransSinc);
}
function updatePlano(tx) {
	tx.executeSql("UPDATE planos SET sinc = 0 WHERE sinc <> 0");
}
var planosBuilder = [];
var planosSimbolo = [];
function selectPlanos(tx) {
	var dados = {
		"aux" : 1
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/sel-planos.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.planosBuilder.length; i++) {
					planosBuilder[i] = ret.planosBuilder[i];
					planosSimbolo[i] = ret.planosSimbolo[i];
				}
				db.transaction(localPlanos, nokTransSinc, okTransSinc);
		    }    	
	    },
	    error    : function(ret) {
	    	alert("Erro ao consistir a tabela de planos!");
	    }
	});
}
function localPlanos(tx) {
	tx.executeSql('DROP TABLE IF EXISTS planos');
	tx.executeSql('CREATE TABLE IF NOT EXISTS planos (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, builder INTEGER, simbolo INTEGER, sinc INTEGER)');
	for	(var i = 0; i < planosBuilder.length; i++) {
		tx.executeSql("INSERT INTO planos (builder,simbolo,sinc) VALUES (?,?,0)", [planosBuilder[i],planosSimbolo[i]]);
	}
}

// CONSISTENCIA DA TABELA DE PRANCHAS *******************************************************************************************************************************************************
function consPranchas(tx) {
	tx.executeSql("SELECT id,plano,simb_prancha,simb1,simb2,simb3,simb4,simb5,simb6,simb7,simb8,simb9,sinc FROM pranchas WHERE sinc <> 0", [], okConsPranchas, nokTransSinc);
}
function okConsPranchas(tx, results) {
   	var len = results.rows.length;
    var cont = 0;
    for (var i=0; i<len; i++) {
    	var dados = {
			"id" : results.rows.item(i).id,
			"plano" : results.rows.item(i).plano,
			"simbPrancha"   : results.rows.item(i).simb_prancha,
			"simb1"   : results.rows.item(i).simb1,
			"simb2"   : results.rows.item(i).simb2,
			"simb3"   : results.rows.item(i).simb3,
			"simb4"   : results.rows.item(i).simb4,
			"simb5"   : results.rows.item(i).simb5,
			"simb6"   : results.rows.item(i).simb6,
			"simb7"   : results.rows.item(i).simb7,
			"simb8"   : results.rows.item(i).simb8,
			"simb9"   : results.rows.item(i).simb9,
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/ins-prancha.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	if (ret.erro) {
			    	alert(ret.msg);
			    }
			    else {
			    	db.transaction(updatePrancha, nokTransSinc, okTransSinc);
				}			    	
		    },
		    error    : function(ret) {
		    	alert("Erro ao consistir a tabela de prancha!");
		    },
		    complete:  function() { 
				cont++;
				if (cont == len)
					db.transaction(selectPranchas, nokTransSinc, okTransSinc);
		   	}
		});
    }
    if (len == 0)
    	db.transaction(selectPranchas, nokTransSinc, okTransSinc);
}
function updatePrancha(tx) {
	tx.executeSql("UPDATE pranchas SET sinc = 0 WHERE sinc <> 0");
}
var pranchasPlano = [];
var pranchasSimbprancha = [];
var pranchasSimb1 = [];
var pranchasSimb2 = [];
var pranchasSimb3 = [];
var pranchasSimb4 = [];
var pranchasSimb5 = [];
var pranchasSimb6 = [];
var pranchasSimb7 = [];
var pranchasSimb8 = [];
var pranchasSimb9 = [];
function selectPranchas(tx) {
	var dados = {
		"aux" : 1
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/sel-pranchas.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.pranchasPlano.length; i++) {
					pranchasPlano[i] = ret.pranchasPlano[i];
					pranchasSimbprancha[i] = ret.pranchasSimbprancha[i];
					pranchasSimb1[i] = ret.pranchasSimb1[i];
					pranchasSimb2[i] = ret.pranchasSimb2[i];
					pranchasSimb3[i] = ret.pranchasSimb3[i];
					pranchasSimb4[i] = ret.pranchasSimb4[i];
					pranchasSimb5[i] = ret.pranchasSimb5[i];
					pranchasSimb6[i] = ret.pranchasSimb6[i];
					pranchasSimb7[i] = ret.pranchasSimb7[i];
					pranchasSimb8[i] = ret.pranchasSimb8[i];
					pranchasSimb9[i] = ret.pranchasSimb9[i];
				}
				db.transaction(localPranchas, nokTransSinc, okTransSinc);
		    }    	
	    },
	    error    : function(ret) {
	    	alert("Erro ao consistir a tabela de pranchas!");
	    }
	});
}
function localPranchas(tx) {
	tx.executeSql('DROP TABLE IF EXISTS pranchas');
	tx.executeSql('CREATE TABLE IF NOT EXISTS pranchas (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, plano INTEGER, simb_prancha INTEGER, simb1 INTEGER, simb2 INTEGER, simb3 INTEGER, simb4 INTEGER, simb5 INTEGER, simb6 INTEGER, simb7 INTEGER, simb8 INTEGER, simb9 INTEGER, sinc INTEGER)');
	for	(var i = 0; i < pranchasPlano.length; i++) {
		tx.executeSql("INSERT INTO pranchas (plano,simb_prancha,simb1,simb2,simb3,simb4,simb5,simb6,simb7,simb8,simb9,sinc) VALUES (?,?,?,?,?,?,?,?,?,?,?,0)", [pranchasPlano[i],pranchasSimbprancha[i],pranchasSimb1[i],pranchasSimb2[i],pranchasSimb3[i],pranchasSimb4[i],pranchasSimb5[i],pranchasSimb6[i],pranchasSimb7[i],pranchasSimb8[i],pranchasSimb9[i]]);
	}
}

// CONSISTENCIA DA TABELA DE SIMBOLOS *******************************************************************************************************************************************************
var qtdSimbLocal = 0;
var qtdSimbWeb = 0;
var qtdBaixar = 0;
function consSimbolos(tx) {
	tx.executeSql("SELECT COUNT(*) AS qtd_local FROM simbolos WHERE sinc = 0", [], okConsSimbolos, nokTransSinc);
}
function okConsSimbolos(tx, results) {
   	qtdSimbLocal = results.rows.item(0).qtd_local;
	var dados = {
		"aux" : 1
	};  
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/count-simbolos.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	qtdSimbWeb = ret.qtdSimbWeb;
				if (qtdSimbWeb > qtdSimbLocal) {
					qtdBaixar = qtdSimbWeb - qtdSimbLocal;
					baixarSimbolos();
				}
				else {
					db.transaction(webSimbolos, nokTransSinc, okTransSinc);
				}
			}			    	
	    },
	    error    : function(ret) {
	    	alert("Erro ao consistir a tabela de símbolos!");
	    }
	});
}
var simbolosNome = [];
var simbolosSign = [];
var simbolosCat = [];
var simbolosImg = [];
var simbolosAudio = [];
function baixarSimbolos() {
   	var dados = {
		"qtdBaixar" : qtdBaixar
	};  
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/baixar-simbolos.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.simbolosNome.length; i++) {
					simbolosNome[i] = ret.simbolosNome[i];
					simbolosSign[i] = ret.simbolosSign[i];
					simbolosCat[i] = ret.simbolosCat[i];
					simbolosImg[i] = ret.simbolosImg[i];
					simbolosAudio[i] = ret.simbolosAudio[i];
				}
				db.transaction(localSimbolos, nokTransSinc, okTransSinc);
			}		    	
	    },
	    error    : function(ret) {
	    	alert("Erro ao consistir a tabela de símbolos!");
	    }
	});
}
function localSimbolos(tx) {
	var ft = new FileTransfer();
	for	(var i = 0; i < simbolosNome.length; i++) {
		var urlImg = "http://tagarela-afwippel.rhcloud.com/img/"+simbolosImg[i];
		var localImg = "file:///storage/sdcard0/tagarela/img/"+simbolosImg[i];
		var urlAud = "http://tagarela-afwippel.rhcloud.com/audio/"+simbolosAudio[i];
    	var localAud = "file:///storage/sdcard0/tagarela/audio/"+simbolosAudio[i];
    	
		tx.executeSql("INSERT INTO simbolos (nome,significado,categoria,img,audio,sinc) VALUES (?,?,?,?,?,0)", [simbolosNome[i],simbolosSign[i],simbolosCat[i],localImg,localAud]);
		ft.download(encodeURI(urlImg), localImg, successDownload, failDownload);
    	ft.download(encodeURI(urlAud), localAud, successDownload, failDownload);
	}
	db.transaction(webSimbolos, nokTransSinc, okTransSinc);
}
function successDownload(entry) {
   	var aux = 0;
}
function failDownload(error) {
   	alert("Erro ao baixar arquivo do servidor!");
}
function webSimbolos(tx) {
	tx.executeSql("SELECT id,nome,significado,categoria,img,audio,sinc FROM simbolos WHERE sinc <> 0", [], okWebSimbolos, nokTransSinc);
}
var simbsNomeLocal = [];
var simbsCatLocal = [];
var simbsImgLocal = [];
var simbsAudioLocal = [];
function okWebSimbolos(tx, results) {
   	var len = results.rows.length;
	for (var i=0; i<len; i++) {
    	simbsNomeLocal[i] = results.rows.item(i).nome;
		simbsCatLocal[i] = results.rows.item(i).categoria;
		simbsImgLocal[i] = results.rows.item(i).img;
		simbsAudioLocal[i] = results.rows.item(i).audio;
		var imgWeb;
		var audioWeb;
		if (simbsCatLocal[i] == 1) {
			imgWeb = "pessoas-amarelo/"+simbsNomeLocal[i]+".png";
			audioWeb = "pessoas-amarelo/"+simbsNomeLocal[i]+".3gpp";
		}
		if (simbsCatLocal[i] == 2) {
			imgWeb = "substantivos-vermelho/"+simbsNomeLocal[i]+".png";
			audioWeb = "substantivos-vermelho/"+simbsNomeLocal[i]+".3gpp";
		}	
		if (simbsCatLocal[i] == 3) {
			imgWeb = "verbos-verde/"+simbsNomeLocal[i]+".png";
			audioWeb = "verbos-verde/"+simbsNomeLocal[i]+".3gpp";
		}
		if (simbsCatLocal[i] == 4) {
			imgWeb = "descritivos-azul/"+simbsNomeLocal[i]+".png";
			audioWeb = "descritivos-azul/"+simbsNomeLocal[i]+".3gpp";
		}
		var dados = {
			"id" : results.rows.item(i).id,
			"nome" : simbsNomeLocal[i],
			"significado"   : results.rows.item(i).significado,
			"categoria"  : simbsCatLocal[i],
			"img" : imgWeb,
			"audio" : audioWeb
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://tagarela-afwippel.rhcloud.com/scripts/db/ins-simbolo.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	if (ret.erro) {
			    	alert(ret.msg);
			    }		    	
		    },
		    error    : function(ret) {
		    	alert("Erro ao consistir a tabela de usuarios!");
		    }
		});
    }
	if (len > 0) {
		db.transaction(updateSimbolo, nokTransSinc, okTransSinc);
	}
}
function updateSimbolo(tx) {
	tx.executeSql("UPDATE simbolos SET sinc = 0 WHERE sinc <> 0");
	uploadSimbolos();
}
function uploadSimbolos(tx) {
	var opImg = new FileUploadOptions();
	var ftImg = new FileTransfer();
	var opAudio = new FileUploadOptions();
	var ftAudio = new FileTransfer();
	for	(var i = 0; i < simbsNomeLocal.length; i++) {
		var imgLocal = simbsImgLocal[i];
		var imgWeb;
		if (simbsCatLocal[i] == 1) {
			imgWeb = "../img/pessoas-amarelo/"+simbsNomeLocal[i]+".png";
		}
		if (simbsCatLocal[i] == 2) {
			imgWeb = "../img/substantivos-vermelho/"+simbsNomeLocal[i]+".png";
		}	
		if (simbsCatLocal[i] == 3) {
			imgWeb = "../img/verbos-verde/"+simbsNomeLocal[i]+".png";
		}
		if (simbsCatLocal[i] == 4) {
			imgWeb = "../img/descritivos-azul/"+simbsNomeLocal[i]+".png";
		}
		opImg.fileKey = "file";
    	opImg.fileName = imgLocal.substr(imgLocal.lastIndexOf('/')+1);
    	opImg.mimeType = "image/png";
    	opImg.chunkedMode = false;
    	var params = {};
        params.value1 = imgWeb;
        opImg.params = params;
    	ftImg.upload(imgLocal, encodeURI("http://tagarela-afwippel.rhcloud.com/scripts/upload.php"), successUpload, failUpload, opImg);
    
		var audioLocal = simbsAudioLocal[i];
		var audioWeb;
		if (simbsCatLocal[i] == 1) {
			audioWeb = "../audio/pessoas-amarelo/"+simbsNomeLocal[i]+".3gpp";
		}
		if (simbsCatLocal[i] == 2) {
			audioWeb = "../audio/substantivos-vermelho/"+simbsNomeLocal[i]+".3gpp";
		}	
		if (simbsCatLocal[i] == 3) {
			audioWeb = "../audio/verbos-verde/"+simbsNomeLocal[i]+".3gpp";
		}
		if (simbsCatLocal[i] == 4) {
			audioWeb = "../audio/descritivos-azul/"+simbsNomeLocal[i]+".3gpp";
		}
		opAudio.fileKey = "file";
    	opAudio.fileName = audioLocal.substr(audioLocal.lastIndexOf('/')+1);
    	opAudio.mimeType = "audio/3gpp";
    	opAudio.chunkedMode = false;
    	var params = {};
        params.value1 = audioWeb;
        opAudio.params = params;
    	ftAudio.upload(audioLocal, encodeURI("http://tagarela-afwippel.rhcloud.com/scripts/upload.php"), successUpload, failUpload, opAudio);
	}
}
function successUpload(entry) {
   	var aux = 0;
}
function failUpload(error) {
   	alert("Erro ao enviar arquivo para o servidor!");
}
