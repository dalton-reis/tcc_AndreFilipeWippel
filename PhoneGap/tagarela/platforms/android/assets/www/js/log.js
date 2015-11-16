$(document).ready(function() {

	// Verifica quem é o tutor e quem é o paciente
	var tutor = localStorage.idUser;
	var paciente = localStorage.idBuilder;
	if (localStorage.perfil == 3) {
		tutor = localStorage.idBuilder;
		paciente = localStorage.idUser;
	}

	// Busca o historico de atividades do builder
	var dados = {
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
	});
	  								
});