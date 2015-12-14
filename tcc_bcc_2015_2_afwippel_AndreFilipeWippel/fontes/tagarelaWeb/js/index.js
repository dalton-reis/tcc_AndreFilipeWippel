$(document).ready(function() {
		
	$(".logar").click(function logar() {
		// Busca perfil e id do usuario
		var dados = {
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
		});
	});

	$(".sair").click(function sair() {
		$(".formulario").each(function(){
			this.reset();
		});
	});

});
