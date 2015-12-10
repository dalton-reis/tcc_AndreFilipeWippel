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
	
	// Verifica quem é o tutor e quem é o paciente
	var tutor = localStorage.idUser;
	var paciente = localStorage.idBuilder;
	if (localStorage.perfil == 3) {
		tutor = localStorage.idBuilder;
		paciente = localStorage.idUser;
	}

	/*var dados = {
		"idBuilder" : paciente,
		"espTut" : tutor,
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/log.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		        $(".log").append("<p align='center'>---------- INICIO ----------</p>");    	
				for	(var i = 0; i < ret.datas.length; i++) {
					$(".log").append("<p>["+ret.datas[i]+"] - "+ret.atvs[i]+"</p>");
				}
				$(".log").append("<p align='center'>----------  FIM   ----------</p>");
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
	db.transaction(transBuilderLog, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transBuilderLog(tx) {
    	tx.executeSql("SELECT id FROM builder WHERE esp_tut = ? AND paciente = ?", [tutor,paciente], okQueryBuilderLog, nokQuery);
    }
	var builderLog;
	function okQueryBuilderLog(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	builderLog = results.rows.item(i).id;
	    	db.transaction(transLog, nokQuery);
	    }
    }
	function transLog(tx) {
    	tx.executeSql("SELECT prancha,data_hora AS datahr,atividade FROM log WHERE builder = ?", [builderLog], okQueryLog, nokQuery);
    }
	function okQueryLog(tx, results) {
    	var len = results.rows.length;
		if (len == 0) {
		   	alert("O usuário ainda não interagiu com nenhuma prancha!");
		   	location.href = "../builder.html";
		}
		for	(var i = (len-1); i >= 0; i--) {
		   	if (i == (len-1)) {
		   		$(".log").append("<p align='center'>---------- INICIO ----------</p>");    	
			}
			$(".log").append("<a href='#' class='press-log' title='"+results.rows.item(i).prancha+"'><p>["+results.rows.item(i).datahr+"] - "+results.rows.item(i).atividade+"</p></a>");
			if (i == 0) {
				$(".log").append("<p align='center'>----------  FIM   ----------</p>");
			}
		}
		$(".press-log").click(function() {
			var title = $(this).attr("title");
			localStorage.idPrancha = Number(title);
			localStorage.gravarLog = "false";
			location.href = "../usar-prancha.html";
		});
    }
	
});