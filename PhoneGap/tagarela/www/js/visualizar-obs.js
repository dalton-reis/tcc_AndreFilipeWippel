$(document).ready(function() {
  	
	if (localStorage.perfil == 1 || localStorage.perfil == 2) {
		$(".nov-obs").append("<a href='criar-obs.html'><img src='../img/add-obs.png' alt='' height='150' width='175' /></a>");
	}
		
	// Carrega todas as observações cadastradas pelo usuario
	var dados = {
		"idBuilder" : localStorage.idBuilder,
		"espTut" : localStorage.idUser,
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/visualizar-obs.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.obsId.length; i++) {
		    		$(".obs").append("<option value='"+ret.obsId[i]+"'>"+ret.obsDesc[i]+"</option>");
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
			$('select').material_select();
       	}
	});

	$("select[name=obs]").change(function mostrarObs() {
    	var id = $(this).val();
    	if (id > 0) {
	    	var dados = {
				"idObs" : id
			};    
			$.ajax({
			    type     : "post",
			    url      : "http://tagarela-afwippel.rhcloud.com/scripts/buscar-obs.php",
			    data     : dados,
			    dataType : "json",
			    success  : function(ret) {
			    	$("body").removeClass("loading");
			   		if (ret.erro) {
				    	alert(ret.msg);
				    }
				    else {
				    	$(".texto-obs").text(ret.obsTexto);
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
    	}
    	else {
    		$(".texto-obs").text("");
    	}
	});
		
});