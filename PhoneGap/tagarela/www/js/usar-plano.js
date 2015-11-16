$(document).ready(function() {

	// Busca pranchas do plano
	var dados = {
		"idPlano" : localStorage.idPlano
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/usar-plano.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.pranchasId.length; i++) {
					$(".pranchas").append("<a href='usar-prancha.html'>"
										 +"<img src='img/"+ret.pranchasImg[i]+"' title='"+ret.pranchasAudio[i]+"' alt='"+ret.pranchasId[i]+"' class='img-prancha' style='margin:25px'/>"
										 +"</a>");
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

			$(".img-prancha").click(function() {
		  		var alt = $(this).attr("alt");
		  		localStorage.idPrancha = Number(alt);
			});
       	}
	});
		
});