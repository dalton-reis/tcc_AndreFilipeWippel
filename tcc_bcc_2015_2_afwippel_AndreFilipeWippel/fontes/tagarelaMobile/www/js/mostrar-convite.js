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
	
	/*var dados = {
		"idPaciente" : localStorage.idPaciente,
		"idEspTut" : localStorage.idUser
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/mostrar-convite.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	$(".mensagem").text(ret.msgConvite);
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
	db.transaction(transMosConv, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transMosConv(tx) {
    	tx.executeSql("SELECT msg FROM convites WHERE esp_tut = ? AND paciente = ?", [localStorage.idUser,localStorage.idPaciente], okQueryMosConv, nokQuery);
    }
    function okQueryMosConv(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	$(".mensagem").text(results.rows.item(i).msg);
	    }
	}
	
	$(".aceitar").click(function aceitarConvite() {
	    /*var dados = {
			"idPac" : localStorage.idPaciente,
			"idET" : localStorage.idUser
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://tagarela-afwippel.rhcloud.com/scripts/aceitar.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	$("body").removeClass("loading");
		   		if (ret.erro) {
			    	alert(ret.msg);
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
		db.transaction(transMosBuilder, nokQuery);
	});
	
	function transMosBuilder(tx) {
    	tx.executeSql("INSERT INTO builder (paciente,esp_tut,sinc) VALUES (?,?,1) ", [localStorage.idPaciente,localStorage.idUser], okQueryMosBuilder, nokQuery);
    }
    function okQueryMosBuilder(tx, results) {
    	db.transaction(transMosConvDel, nokQuery);
	}
	function transMosConvDel(tx) {
    	tx.executeSql("DELETE FROM convites WHERE paciente = ? AND esp_tut = ?", [localStorage.idPaciente,localStorage.idUser]);
    	location.href = "../home.html";
    }	
	
});