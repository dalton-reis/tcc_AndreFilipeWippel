$(document).ready(function() {

	// Carrega todas as observações cadastradas pelo usuario
	var ids;
	var obs;
	if (localStorage.perfil == "especialista") {
		ids = new Array(1, 2, 3);
		obs = new Array("Obs Rodrigo 1", "Obs Rodrigo 2", "Obs Rodrigo 3");
	}
	if (localStorage.perfil == "tutor") {
		ids = new Array(4, 5);
		obs = new Array("Obs Dalton 1", "Obs Dalton 2");
	}
	if (localStorage.perfil == "paciente") {
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
	})
		
});