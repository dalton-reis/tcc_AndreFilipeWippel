$(document).ready(function() {

	$('.modal-trigger').leanModal();
	
	var audioElement = document.createElement("audio");
	$.get();
	
	// Mostra a função de aceitar ou de enviar convites
	if (localStorage.perfil == 3)
		$(".convites").append("<li><a href='convites/enviar-convite.html'><img src='img/enviar-convite.png' alt='' style='margin-left:13px' /></a></li>");
    else
    	$(".convites").append("<li><a href='convites/acc-convite.html'><img src='img/aceitar-convite.png' alt='' style='margin-left:13px' /></a></li>");
    	
	// Busca foto, info e builders do usuario
	var dados = {
		"idUser" : localStorage.idUser,
		"perfil" : localStorage.perfil
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/home.php",
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
				
				for	(var i = 0; i < ret.buildersId.length; i++) {
					$(".builders").append("<li><a href='builder.html'>"
										     +"<img src='img/"+ret.buildersImg[i]+"' title='"+ret.buildersAudio[i]+"' alt='"+ret.buildersId[i]+"' class='foto-builder' style='margin-bottom:13px' height='175' width='175' />"
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

			$(".foto-builder").click(function() {
		  		var alt = $(this).attr("alt");
		  		localStorage.idBuilder = Number(alt);
		  		localStorage.builder = $(this).attr("src");
			});
       	}
	});
	
	$(".foto-img").click(function() {
    	var src = "audio/"+$(this).children("img").attr("title");
  		audioElement.setAttribute("src",src);
    	audioElement.play();
    });

	$(".button-salvar").click(function(){
	    // Atualiza info do usuario
		var dados = {
			"idUser" : localStorage.idUser,
			"infoNome" : $(".input-nome").val(),
			"infoEmail" : $(".input-email").val(),
			"infoTel" : $(".input-tel").val()
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://tagarela-afwippel.rhcloud.com/scripts/home-modal.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	$("body").removeClass("loading");
		   		if (ret.erro) {
			    	alert(ret.msg);
			    }
			    else {
	    			$(".info-nome").html("<b>Nome:</b>"+ret.retNome);
					$(".info-email").html("<b>E-Mail:</b>"+ret.retEmail);
					$(".info-tel").html("<b>Telefone:</b>"+ret.retTel);		    	
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
		
});