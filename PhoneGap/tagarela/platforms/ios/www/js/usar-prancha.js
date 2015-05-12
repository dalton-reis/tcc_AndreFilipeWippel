$(document).ready(function() {

	// Carrega os simbolos vinculados a prancha
	var simbolos;
	var audios;
	if (localStorage.prancha == "img/prancha1.png") {
		simbolos = new Array("img/no-symbol.png", "img/no-symbol.png", "img/no-symbol.png",
							 "img/pessoas-amarelo/giovanna-paciente.png", "img/verbos-verde/beber.png", "img/substantivos-laranja/suco.png",
							 "img/no-symbol.png", "img/no-symbol.png", "img/no-symbol.png");
		audios = new Array("no-sound", "no-sound", "no-sound",
						   "giovana", "beber", "suco",
						   "no-sound", "no-sound", "no-sound");
	}
	if (localStorage.prancha == "img/prancha2.png") {
		simbolos = new Array("img/no-symbol.png", "img/no-symbol.png", "img/no-symbol.png",
							 "img/pessoas-amarelo/giovanna-paciente.png", "img/verbos-verde/andar.png", "img/no-symbol.png",
							 "img/no-symbol.png", "img/no-symbol.png", "img/no-symbol.png");
		audios = new Array("no-sound", "no-sound", "no-sound",
						   "giovana", "andar", "no-sound",
						   "no-sound", "no-sound", "no-sound");
	}
	if (localStorage.prancha == "img/prancha3.png") {
		simbolos = new Array("img/no-symbol.png", "img/no-symbol.png", "img/no-symbol.png",
							 "img/pessoas-amarelo/gabriel-irmao.png", "img/verbos-verde/eu-quero-assistir.png", "img/substantivos-laranja/cocorico.png",
							 "img/no-symbol.png", "img/no-symbol.png", "img/no-symbol.png");
		audios = new Array("no-sound", "no-sound", "no-sound",
						   "gabriel", "assistir", "fantoches",
						   "no-sound", "no-sound", "no-sound");
	}
	for	(var i = 0; i < simbolos.length; i++) {
		$(".simbolos").append("<li><img src='"+simbolos[i]+"' alt='"+audios[i]+"' class='img-simbolo play' /></a></li>");
	}
	
	var alt;
	$(".img-simbolo").mouseover(function() {
  	 	alt = $(this).attr("alt");
  		localStorage.audio = "audio/"+alt+".mp3";
	});

});