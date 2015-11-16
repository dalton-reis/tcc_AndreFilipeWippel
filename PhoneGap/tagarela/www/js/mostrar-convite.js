$(document).ready(function() {

	// Busca a mensagem
	var dados = {
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
	});
	
	$(".aceitar").click(function aceitarConvite(){
	    // Insere vinculo como builder
		var dados = {
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
		});
	});
		
});