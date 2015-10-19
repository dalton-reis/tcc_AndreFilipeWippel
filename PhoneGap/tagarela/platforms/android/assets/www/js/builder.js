$(document).ready(function() {

	$('.modal-trigger').leanModal();
	
	var audioElement = document.createElement("audio");
	$.get();
            
	// Busca foto, info e planos do builder
	var dados = {
		"idUser" : localStorage.idUser,
		"perfil" : localStorage.perfil,	
		"idBuilder" : localStorage.idBuilder,
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/builder.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	$(".foto-img").html("<img src='img/"+ret.fotoImg+"' title='"+ret.fotoAudio+"' alt='' class='left' style='margin:25px' height='175' width='175' />");
		    	
		    	$(".info-nome").html("<b>Nome: </b>"+ret.infoNome);
				$(".info-email").html("<b>E-Mail: </b>"+ret.infoEmail);
				$(".info-tel").html("<b>Telefone: </b>"+ret.infoTel);	
				
				for	(var i = 0; i < ret.planosId.length; i++) {
					$(".planos").append("<li><a href='usar-plano.html'>"
										     +"<img src='img/"+ret.planosImg[i]+"' title='"+ret.planosAudio[i]+"' alt='"+ret.planosId[i]+"' class='img-plano' />"
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

			$(".img-plano").click(function() {
		  		var alt = $(this).attr("alt");
		  		localStorage.idPlano = Number(alt);
			});
       	}
	});
	
	$(".foto-img").click(function() {
    	var src = "audio/"+$(this).children("img").attr("title");
  		audioElement.setAttribute("src",src);
    	audioElement.play();
    });

	$(".criar-prancha").click(function(){
		localStorage.simb1 = "../img/adicionar.png";
		localStorage.simb2 = "../img/adicionar.png";
		localStorage.simb3 = "../img/adicionar.png";
		localStorage.simb4 = "../img/adicionar.png";
		localStorage.simb5 = "../img/adicionar.png";
		localStorage.simb6 = "../img/adicionar.png";
		localStorage.simb7 = "../img/adicionar.png";
		localStorage.simb8 = "../img/adicionar.png";
		localStorage.simb9 = "../img/adicionar.png";
	});

});