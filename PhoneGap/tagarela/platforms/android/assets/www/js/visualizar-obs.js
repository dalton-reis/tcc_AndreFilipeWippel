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

	$("select[name=obs]").change(function() {
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
	
	
	
	
	
	
	
	
	
	
/*	var ids;
	var obs;
	if (localStorage.perfil == 1) {
		ids = new Array(1, 2, 3);
		obs = new Array("Obs Rodrigo 1", "Obs Rodrigo 2", "Obs Rodrigo 3");
		$(".nov-obs").append("<a href='criar-obs.html' class='button radius expand'>Nova Observação</a>");
	}
	if (localStorage.perfil == 2) {
		ids = new Array(4, 5);
		obs = new Array("Obs Dalton 1", "Obs Dalton 2");
		$(".nov-obs").append("<a href='criar-obs.html' class='button radius expand'>Nova Observação</a>");
	}
	if (localStorage.perfil == 3) {
		ids = new Array(6);
		obs = new Array("Obs Giovanna 1");
	}
	
	for	(var i = 0; i < ids.length; i++) {
		$(".obs").append("<option value='"+ids[i]+"'>"+obs[i]+"</option>");    	
	}
	
	$("select[name=obs]").change(function() {
    	var id = $(this).val();
    	var texto;
    	switch (id) {
		    case '1':
		        texto = "Observação do Rodrigo de número 1. Observação do Rodrigo de número 1. Observação do Rodrigo de número 1."
		        	   +"Observação do Rodrigo de número 1. Observação do Rodrigo de número 1. Observação do Rodrigo de número 1."
		        	   +"Observação do Rodrigo de número 1. Observação do Rodrigo de número 1. Observação do Rodrigo de número 1."
		        	   +"Observação do Rodrigo de número 1. Observação do Rodrigo de número 1. Observação do Rodrigo de número 1.";
		        break;
		    case '2':
		        texto = "Observação do Rodrigo de número 2";
		        break;
		    case '3':
		        texto = "Observação do Rodrigo de número 3";
		        break;
		    case '4':
		        texto = "Observação do Dalton de número 1";
		        break;
		    case '5':
		        texto = "Observação do Dalton de número 2";
		        break;
		    case '6':
		        texto = "Observação da Giovanna de número 1";
		        break;
		    default:
		    	texto = "";
		    	break;
		}    			
    	$(".texto-obs").text(texto);
	})*/
		
});