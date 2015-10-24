$(document).ready(function() {

	// Busca o historico de atividades do paciente
	var dados = {
		"idBuilder" : localStorage.idBuilder,
		"espTut" : localStorage.idUser,
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