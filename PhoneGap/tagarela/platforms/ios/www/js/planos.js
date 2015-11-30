$(document).ready(function() {

	// Carrega os planos conforme filtro selecionado
	var dados = {
		"filtroSel" : localStorage.filtroSel,
		"idUser" : localStorage.idUser,
		"perfil" : localStorage.perfil,	
		"idBuilder" : localStorage.idBuilder,
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/planos.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.planosId.length; i++) {
					$(".planos").append("<li style='display:inline-block'><a href='../compartilhar/pranchas.html'>"
									   +"<img src='../img/"+ret.planosImg[i]+"' title='"+ret.planosAudio[i]+"' alt='"+ret.planosId[i]+"' class='img-plano' style='margin:20px' height='150' width='150'/>"
									   +"</a></li>");
				}
				if (ret.planosId.length == 0) {
					alert("Não há planos a exibir!");
					location.href = "filtro.html";
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

			$(".img-plano").mouseover(function() {
				var alt = $(this).attr("alt");
		  		localStorage.plano = Number(alt);
			});
       	}
	});
		
});