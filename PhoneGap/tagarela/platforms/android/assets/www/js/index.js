$(document).ready(function() {
		
	$(".logar").click(function logar() {
		/*var dados = {
			"usuario" : $(".usuario").val(),
			"senha"   : $(".senha").val()
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://tagarela-afwippel.rhcloud.com/scripts/index.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	$("body").removeClass("loading");
		   		if (ret.erro) {
			    	alert(ret.msg);
			    }
			    else {
			    	localStorage.idUser = ret.id;
			    	localStorage.perfil = ret.perfil;
			    	location.href = "home.html";
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
		db.transaction(transUsuLogin, nokQuery);
	});

	$(".sair").click(function sair() {
		$(".formulario").each(function(){
			this.reset();
		});
	});
	
	function transUsuLogin(tx) {
        var usu = $(".usuario").val();
        var senha = $(".senha").val();
        tx.executeSql("SELECT id, perfil FROM usuarios WHERE usuario = ? AND senha = ?", [usu,senha], okQueryUsuLogin, nokQuery);
    }
    function okQueryUsuLogin(tx, results) {
    	var len = results.rows.length;
        if (len > 0) {
	        for (var i=0; i<len; i++) {
	            localStorage.idUser = results.rows.item(i).id;
				localStorage.perfil = results.rows.item(i).perfil;
	        	location.href = "home.html";
	        }
	    }
	    else {
	    	alert("Combinação de usuário e senha incorreta!");
	    }
    }
    function nokQuery(erro) {
		alert("Erro ao realizar query na tabela USUARIOS! Erro: "+erro.code);
	}
	
});
