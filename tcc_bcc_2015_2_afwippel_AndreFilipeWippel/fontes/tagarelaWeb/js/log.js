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
		        if (ret.datas.length == 0) {
		        	alert("O usuário ainda não interagiu com nenhuma prancha!");
		        	location.href = "../builder.html";
		        }
		        for	(var i = (ret.datas.length-1); i >= 0; i--) {
		        	if (i == (ret.datas.length-1)) {
		        		$(".log").append("<p align='center'>---------- INICIO ----------</p>");    	
					}
					$(".log").append("<a href='#' class='press-log' title='"+ret.pranchas[i]+"'><p>["+ret.datas[i]+"] - "+ret.atvs[i]+"</p></a>");
					if (i == 0) {
						$(".log").append("<p align='center'>----------  FIM   ----------</p>");
					}
				}
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
       		
       		$(".press-log").click(function() {
		  		var title = $(this).attr("title");
		  		localStorage.idPrancha = Number(title);
		  		localStorage.gravarLog = "false";
		  		location.href = "../usar-prancha.html";
		  	});
       	}
	});
	  								
});