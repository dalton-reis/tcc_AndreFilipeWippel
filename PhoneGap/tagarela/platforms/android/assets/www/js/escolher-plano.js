$(document).ready(function() {

	// Carrega os planos vinculados ao paciente
	var planos;
	if (localStorage.builder == "img/pessoas-amarelo/giovanna-paciente.png")
		planos = new Array("../img/plano1.png");
	if (localStorage.builder == "img/pessoas-amarelo/gabriel-irmao.png")
		planos = new Array("../img/plano2.png");
	for	(var i = 0; i < planos.length; i++) {
		$(".planos").append("<li><a href='../builder.html'><img src='"+planos[i]+"' alt='' /></a></li>");    	
	}
			
});