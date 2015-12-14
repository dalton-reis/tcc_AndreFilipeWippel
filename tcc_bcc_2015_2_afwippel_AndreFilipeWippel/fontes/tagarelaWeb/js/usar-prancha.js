$(document).ready(function usarPrancha() {

	var audioElement = document.createElement("audio");
	$.get();
	
	// Verifica quem é o tutor e quem é o paciente
	var tutor = localStorage.idUser;
	var paciente = localStorage.idBuilder;
	if (localStorage.perfil == 3) {
		tutor = localStorage.idBuilder;
		paciente = localStorage.idUser;
	}
	// Data-hora atual e atividade
	var hoje = new Date();
	var dia = hoje.getDate();
	var mes = hoje.getMonth()+1;
	var ano = hoje.getFullYear();
	var hora = hoje.getHours();
	var min = hoje.getMinutes();
	var seg = hoje.getSeconds();
	var data = dia+'/'+mes+'/'+ano;
	var hora = hora+':'+min+':'+seg;
	var dataHora = data+" - "+hora;
	var atv = "Usou a prancha "+localStorage.idPrancha;

	// Busca simbolos da prancha
	var dados = {
		"idBuilder" : paciente,
		"espTut" : tutor,
		"dataHora" : dataHora,
		"atv" : atv,
		"idPrancha" : localStorage.idPrancha,
		"gravarLog" : localStorage.gravarLog
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/usar-prancha.php",
	    data     : dados,
	    dataType : "json",
	    success  : function gravarLog(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < 9; i++) {
					var corBorda = null;
					switch (ret.simbolosCat[i]) {
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
					}
					$(".simbolos").append("<li style='display:inline-block;'>"
										 +"<img src='img/"+ret.simbolosImg[i]+"' title='"+ret.simbolosAudio[i]+"' alt='"+ret.simbolosId[i]+"' class='img-simbolo' style='margin:20px; border:10px solid "+corBorda+"' height='150' width='150'/>"
										 +"</li>");
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
       		
       		$(".img-simbolo").click(function() {
		  		var src = "audio/"+$(this).attr("title");
  				audioElement.setAttribute("src",src);
    			audioElement.play();
			});
	   	}
	});

});