$(document).ready(function() {

	// Busca simbolos da categoria selecionada
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
										 +"<img src='img/"+ret.simbolosImg[i]+"' title='"+ret.simbolosAudio[i]+"' alt='"+ret.simbolosId[i]+"' class='img-simb' style='margin:20px' height='150' width='150'/>"
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

			$(".img-simb").click(function cadastrarUsuario() {
				var alt = $(this).attr("alt");
				idSimbUsuario = Number(alt);
				
				// Insere o novo usuario com a senha e perfil informados
				var dados = {
					"usuario" : localStorage.usuarioSel,
					"senha"   : localStorage.senhaSel,
					"perfil"  : localStorage.perfilSel,
					"simbolo" : idSimbUsuario,
				};    
				$.ajax({
				    type     : "post",
				    url      : "http://tagarela-afwippel.rhcloud.com/scripts/criar-usuario.php",
				    data     : dados,
				    dataType : "json",
				    success  : function(ret) {
				    	$("body").removeClass("loading");
				   		if (ret.erro) {
					    	alert(ret.msg);
					    }
					    else {
					    	localStorage.idUser = ret.id;
					    	localStorage.perfil = ret.perfil;
					    	location.href = "home.html";
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
  		location.href = "prancha/cad-simbolo.html";
	});
	
});