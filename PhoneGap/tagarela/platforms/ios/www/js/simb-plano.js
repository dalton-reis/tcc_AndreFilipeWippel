$(document).ready(function() {

	// Busca pranchas do plano
	var dados = {
		"catSel" : localStorage.catSel
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/simbolos.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.simbolosId.length; i++) {
					$(".simbolos").append("<li class='simbs' style='display:inline-block'><a href='#'>"
										 +"<img src='../img/"+ret.simbolosImg[i]+"' title='"+ret.simbolosAudio[i]+"' alt='"+ret.simbolosId[i]+"' class='img-simb' style='margin:20px' height='150' width='150'/>"
										 +"</a></li>");
				}
				if (ret.simbolosId.length == 0) {
					alert("Não há símbolos nesta categoria!");
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

			$(".img-simb").click(function criarPlanoEPrancha() {
				var alt = $(this).attr("alt");
				simbPlano = Number(alt);
				
				// Grava o plano e a prancha na base
				var dados = {
					"idUser" : localStorage.idUser,
					"perfil" : localStorage.perfil,	
					"idBuilder" : localStorage.idBuilder,
					"simbPlano" : simbPlano,
					"simbPrancha" : localStorage.idSimbPrancha,
					"simb1" : localStorage.idSimb1,
					"simb2" : localStorage.idSimb2,
					"simb3" : localStorage.idSimb3,
					"simb4" : localStorage.idSimb4,
					"simb5" : localStorage.idSimb5,
					"simb6" : localStorage.idSimb6,
					"simb7" : localStorage.idSimb7,
					"simb8" : localStorage.idSimb8,
					"simb9" : localStorage.idSimb9,
				};    
				$.ajax({
					type     : "post",
					url      : "http://tagarela-afwippel.rhcloud.com/scripts/simb-plano.php",
					data     : dados,
					dataType : "json",
					success  : function(ret) {
						$("body").removeClass("loading");
						if (ret.erro) {
							alert(ret.msg);
						}
						else {
							location.href = "../builder.html";
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
       	}
	});
	
	$(".add-simb").click(function() {
  		location.href = "../prancha/cad-simbolo.html";
	});

});