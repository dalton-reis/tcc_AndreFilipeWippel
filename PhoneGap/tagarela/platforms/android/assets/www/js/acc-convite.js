$(document).ready(function() {

	// Busca convites pendentes
	var dados = {
		"idUsuario" : localStorage.idUser
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/acc-convite.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.pacientesId.length; i++) {
					$(".pacientes").append("<a href='mostrar-convite.html'>"
										  +"<img src='../img/"+ret.pacientesImg[i]+"' title='"+ret.pacientesAudio[i]+"' alt='"+ret.pacientesId[i]+"' class='img-paciente' style='margin:25px'/>"
										  +"</a>");
				}
				if (ret.pacientesId.length == 0) {
					alert("Não há convites pendentes!");
					location.href = "../home.html";
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

			$(".img-paciente").click(function() {
		  		var alt = $(this).attr("alt");
		  		localStorage.idPaciente = Number(alt);
			});
       	}
	});	
		
});