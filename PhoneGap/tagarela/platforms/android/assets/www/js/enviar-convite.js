$(document).ready(function() {

	$(".enviar-conv").click(function enviarConvite() {
		/*var dados = {
			"nome"     : $(".nome").val(),
			"paciente" : localStorage.idUser,
			"msg" : $(".msg").val()
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://tagarela-afwippel.rhcloud.com/scripts/enviar-convite.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	$("body").removeClass("loading");
		   		if (ret.erro) {
			    	alert(ret.msg);
			    }
			    else {
			    	location.href = "../home.html";
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
		db.transaction(transEnvConv, nokQuery);
	});
	
	function transEnvConv(tx) {
		var nome = $(".nome").val();
    	tx.executeSql("SELECT id FROM usuarios WHERE usuario = ?", [nome], okQueryEnvConv, nokQuery);
    }
    var esptut;
    function okQueryEnvConv(tx, results) {
    	var len = results.rows.length;
        if (len > 0) {	
        	for (var i=0; i<len; i++) {
	    		esptut = results.rows.item(i).id;
	    		db.transaction(transInsEnvConv, nokQuery);
	    	}
	    }
	    else {
	    	alert("Não existe usuário apto para receber convites com este nome!");
	    }
	}
	function transInsEnvConv(tx) {
    	var msg = $(".msg").val();
    	tx.executeSql("INSERT INTO convites (paciente,esp_tut,msg) VALUES ('$paciente', '$esptut', '$mensagem') ", [localStorage.idUser,esptut,msg], okQueryInsEnvConv, nokQuery);
    }
    function okQueryInsEnvConv(tx, results) {
    	location.href = "../home.html";
	}
	
});
