$(document).ready(function() {

	// Verifica conexão com o servidor
	localStorage.conectado = 0;
	var dados = {
		"dadoEnv" : 1
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/verifica-conexao.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	if (ret.dadoRet == 1) {
		    	localStorage.conectado = 1;
		    	consistirDados();
		    }
	    },
		error    : function(ret) {
		   	$("body").removeClass("loading");
		},
		beforeSend: function() {
		   	$("body").addClass("loading");
		},
        complete: function() { 
        	$("body").removeClass("loading");
        }
	});
	
	$(".cad-obs").click(function criarObs() {
		/*var dados = {
			"idBuilder" : localStorage.idBuilder,
			"espTut" : localStorage.idUser,
			"descricao" : $(".descricao").val(),
			"obs"       : $(".obs").val(),
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://tagarela-afwippel.rhcloud.com/scripts/criar-obs.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	$("body").removeClass("loading");
		   		if (ret.erro) {
			    	alert(ret.msg);
			    }
			    else {
			    	location.href = "../builder.html";
				}			    	
		    },
		    error    : function(ret) {
		    	$("body").removeClass("loading");
		   		alert("Erro no servidor (TIMEOUT)!");
		    },
		    beforeSend: function() {
		      	$("body").addClass("loading");
		    },
        	complete: function() { 
				$("body").removeClass("loading");
        	}
		});*/
		db.transaction(transBuilderCriarObs, nokQuery);
		function nokQuery(erro) {
			alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
		}
		function transBuilderCriarObs(tx) {
			tx.executeSql("SELECT id FROM builder WHERE paciente = ? AND esp_tut = ?", [localStorage.idBuilder,localStorage.idUser], okQueryBuilderCriarObs, nokQuery);
		}
		var builderCriObs;
		function okQueryBuilderCriarObs(tx, results) {
			var len = results.rows.length;
			for (var i=0; i<len; i++) {
				builderCriObs = results.rows.item(i).id;
				db.transaction(transInsObs, nokQuery);
			}
		}
		function transInsObs(tx) {
			tx.executeSql("INSERT INTO observacoes (builder, descricao, obs, sinc) VALUES (?, ?, ?, 1) ", [builderCriObs,$(".descricao").val(),$(".obs").val()]);
			location.href = "../builder.html";
		}
	});

});
