$(document).ready(function() {

	// Busca planos do builder
	var dados = {
		"idUser" : localStorage.idUser,
		"perfil" : localStorage.perfil,	
		"idBuilder" : localStorage.idBuilder,
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/escolher-plano.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.planosId.length; i++) {
					var corBorda;
					switch (ret.planosCat[i]) {
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
					$(".planos").append("<li style='display:inline-block'><a href='#'>"
									   +"<img src='../img/"+ret.planosImg[i]+"' title='"+ret.planosAudio[i]+"' alt='"+ret.planosId[i]+"' class='img-plano' style='margin:20px; border:10px solid "+corBorda+"' height='150' width='150'/>"
									   +"</a></li>");
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

			$(".img-plano").click(function gravarPrancha() {
				var alt = $(this).attr("alt");
				plano = Number(alt);
				
				// Grava a prancha na base
				var dados = {
					"plano" : plano,
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
					url      : "http://tagarela-afwippel.rhcloud.com/scripts/gravar-prancha.php",
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
			
});