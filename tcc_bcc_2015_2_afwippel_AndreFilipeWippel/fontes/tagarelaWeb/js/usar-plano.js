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
					var corBorda;
					switch (ret.pranchasCat[i]) {
						case '1':
							corBorda = "yellow";
							break;
						case '2':
							corBorda = "red";
							break;
						case '3':
							corBorda = "green";
							break;
						case '4':
							corBorda = "blue";
							break;
						default:
							corBorda = "black";
							break;
					}
					$(".pranchas").append("<a href='usar-prancha.html'>"
										 +"<img src='img/"+ret.pranchasImg[i]+"' title='"+ret.pranchasAudio[i]+"' alt='"+ret.pranchasId[i]+"' class='img-prancha' style='margin:25px; border:10px solid "+corBorda+"' height='175' width='175'/>"
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
		  		localStorage.gravarLog = "true";
			});
       	}
	});
		
});