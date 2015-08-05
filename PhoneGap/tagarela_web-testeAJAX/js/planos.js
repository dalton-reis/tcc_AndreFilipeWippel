$(document).ready(function() {

	// Carrega os planos conforme filtro selecionado
	var planos;
	if (localStorage.filtroSel == "paciente") {
		if (localStorage.builder == "img/pessoas-amarelo/giovanna-paciente.png")
			planos = new Array("../img/plano1.png");
		if (localStorage.builder == "img/pessoas-amarelo/gabriel-irmao.png")
			planos = new Array("../img/plano2.png");	
	}
	if (localStorage.filtroSel == "todos")
		planos = new Array("../img/plano1.png", "../img/plano2.png");
	
	for	(var i = 0; i < planos.length; i++) {
		$(".planos").append("<li><a href='../compartilhar/pranchas.html'><img src='"+planos[i]+"' alt='' class='img-plano' /></a></li>");    	
	}
	
	$(".img-plano").mouseover(function() {
  		localStorage.plano = $(this).attr("src");
	});
		
});