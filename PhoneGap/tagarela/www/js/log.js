$(document).ready(function() {

	// Carrega o log do usuario
	var data;
	var log;
	if (localStorage.perfil == 1) {
		data = new Array("01/05/2015 - 11:22:33", "02/05/2015 - 11:22:33", "03/05/2015 - 11:22:33", "04/05/2015 - 11:22:33", "05/05/2015 - 11:22:33");
		log = new Array("Log Rodrigo 1", "Log Rodrigo 2", "Log Rodrigo 3", "Log Rodrigo 4", "Log Rodrigo 5");
	}
	if (localStorage.perfil == 2) {
		data = new Array("06/05/2015 - 11:22:33", "07/05/2015 - 11:22:33", "08/05/2015 - 11:22:33", "09/05/2015 - 11:22:33", "10/05/2015 - 11:22:33");
		log = new Array("Log Dalton 1", "Log Dalton 2", "Log Dalton 3", "Log Dalton 4", "Log Dalton 5");
	}
	if (localStorage.perfil == 3) {
		data = new Array("11/05/2015 - 11:22:33", "12/05/2015 - 11:22:33", "13/05/2015 - 11:22:33", "14/05/2015 - 11:22:33", "15/05/2015 - 11:22:33");
		log = new Array("Log Giovanna 1", "Log Giovanna 2", "Log Giovanna 3", "Log Giovanna 4", "Log Giovanna 5");
	}
		
	$(".log").append("<p align='center'>---------- INICIO ----------</p>");    	
	for	(var i = 0; i < data.length; i++) {
		$(".log").append("<p>["+data[i]+"] "+log[i]+"</p>");    	
	}
	$(".log").append("<p align='center'>----------  FIM   ----------</p>");    	
		  								
});