$(document).ready(function() {

	// Busca pranchas do plano
	var dados = {
		"idPlano" : localStorage.plano
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/pranchas.php",
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
					$(".pranchas").append("<li style='display:inline-block'><a href='#'>"
										 +"<img src='../img/"+ret.pranchasImg[i]+"' title='"+ret.pranchasAudio[i]+"' alt='"+ret.pranchasId[i]+"' class='img-prancha' style='margin:20px; border:10px solid "+corBorda+"' height='150' width='150'/>"
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

			$(".img-prancha").click(function reutilizarPrancha() {
				var alt = $(this).attr("alt");
				prancha = Number(alt);
				
				// Busca os simbolos da prancha
				var dados = {
					"prancha" : prancha,
				};    
				$.ajax({
					type     : "post",
					url      : "http://tagarela-afwippel.rhcloud.com/scripts/buscar-prancha.php",
					data     : dados,
					dataType : "json",
					success  : function(ret) {
						$("body").removeClass("loading");
						if (ret.erro) {
							alert(ret.msg);
						}
						else {
							localStorage.simb1 = "../img/"+ret.simbolosImg[0]; localStorage.simb2 = "../img/"+ret.simbolosImg[1]; localStorage.simb3 = "../img/"+ret.simbolosImg[2];
							localStorage.simb4 = "../img/"+ret.simbolosImg[3]; localStorage.simb5 = "../img/"+ret.simbolosImg[4]; localStorage.simb6 = "../img/"+ret.simbolosImg[5];
							localStorage.simb7 = "../img/"+ret.simbolosImg[6]; localStorage.simb8 = "../img/"+ret.simbolosImg[7]; localStorage.simb9 = "../img/"+ret.simbolosImg[8];
							localStorage.simb1Cat = ret.simbolosCat[0]; localStorage.simb2Cat = ret.simbolosCat[1]; localStorage.simb3Cat = ret.simbolosCat[2];
							localStorage.simb4Cat = ret.simbolosCat[3]; localStorage.simb5Cat = ret.simbolosCat[4]; localStorage.simb6Cat = ret.simbolosCat[5];
							localStorage.simb7Cat = ret.simbolosCat[6]; localStorage.simb8Cat = ret.simbolosCat[7]; localStorage.simb9Cat = ret.simbolosCat[8];
							localStorage.idSimb1 = ret.simbolosId[0]; localStorage.idSimb2 = ret.simbolosId[1]; localStorage.idSimb3 = ret.simbolosId[2];
							localStorage.idSimb4 = ret.simbolosId[3]; localStorage.idSimb5 = ret.simbolosId[4]; localStorage.idSimb6 = ret.simbolosId[5];
							localStorage.idSimb7 = ret.simbolosId[6]; localStorage.idSimb8 = ret.simbolosId[7]; localStorage.idSimb9 = ret.simbolosId[8];
							localStorage.idSimbPrancha = 0;
							localStorage.idPlanoPrancha = 0;
							
							location.href = "../prancha/prancha.html";
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