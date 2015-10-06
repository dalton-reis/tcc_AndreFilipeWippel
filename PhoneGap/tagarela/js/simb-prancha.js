$(document).ready(function() {

	// Carrega todos os simbolos vinculados a categoria selecionada
	var simbolos;
	
	switch (localStorage.catSel) {
	    case "verde":
	        simbolos = new Array("../img/verbos-verde/andar.png", "../img/verbos-verde/beber.png", "../img/verbos-verde/brincar.png",
	        					 "../img/verbos-verde/descansar.png", "../img/verbos-verde/escovar-dentes.png", "../img/verbos-verde/escrever.png",
	        					 "../img/verbos-verde/eu-quero-assistir.png", "../img/verbos-verde/ler.png", "../img/verbos-verde/ouvir-musica.png",
	        					 "../img/verbos-verde/pintar.png");
	        break; 
	    case "vermelho":
	        simbolos = new Array("../img/substantivos-vermelho/agua.png", "../img/substantivos-vermelho/banheiro.png", "../img/substantivos-vermelho/cocorico.png",
	        					 "../img/substantivos-vermelho/fantoches.png", "../img/substantivos-vermelho/lanche.png", "../img/substantivos-vermelho/macarrao.png",
	        					 "../img/substantivos-vermelho/matematica.png", "../img/substantivos-vermelho/pao.png", "../img/substantivos-vermelho/sopa.png",
	        					 "../img/substantivos-vermelho/waffer.png");
	        break; 
	    case "azul":
	        simbolos = new Array("../img/descritivos-azul/frio.png", "../img/descritivos-azul/quente.png");   
	        break; 
	    case "amarelo":
	        simbolos = new Array("../img/pessoas-amarelo/ana-mae.png", "../img/pessoas-amarelo/dalton-pai.png", "../img/pessoas-amarelo/gabriel-irmao.png",
	        					 "../img/pessoas-amarelo/giovanna-paciente.png", "../img/pessoas-amarelo/rodrigo-fonoaudiologo.png");	        
	        break;
	}
	
	for	(var i = 0; i < simbolos.length; i++) {
		$(".simbolos").append("<li class='simbs' style='display:inline-block'><a href='../prancha/escolher-plano.html'><img src='"+simbolos[i]+"' alt='' class='img-simb' style='margin:20px' height='150' width='150'/></a></li>");  	
	}
	
	$(".img-simb").click(function() {
  		if (localStorage.posSel == 1)
  			localStorage.simb1 = $(this).attr("src");		
  		if (localStorage.posSel == 2)
  			localStorage.simb2 = $(this).attr("src");		
  		if (localStorage.posSel == 3)
  			localStorage.simb3 = $(this).attr("src");		
  		if (localStorage.posSel == 4)
  			localStorage.simb4 = $(this).attr("src");		
  		if (localStorage.posSel == 5)
  			localStorage.simb5 = $(this).attr("src");		
  		if (localStorage.posSel == 6)
  			localStorage.simb6 = $(this).attr("src");		
  		if (localStorage.posSel == 7)
  			localStorage.simb7 = $(this).attr("src");		
  		if (localStorage.posSel == 8)
  			localStorage.simb8 = $(this).attr("src");		
  		if (localStorage.posSel == 9)
  			localStorage.simb9 = $(this).attr("src");		
	});
	
});