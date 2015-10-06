$(document).ready(function() {

	// Carrega as pranchas vinculadas ao plano
	var pranchas;
	if (localStorage.plano == "../img/plano1.png")
		pranchas = new Array("../img/prancha1.png", "../img/prancha2.png");
	if (localStorage.plano == "../img/plano2.png")
		pranchas = new Array("../img/prancha3.png");
	
	for	(var i = 0; i < pranchas.length; i++) {
		$(".pranchas").append("<li style='display:inline-block'><a href='../prancha/prancha.html'><img src='"+pranchas[i]+"' alt='' class='img-prancha' style='margin:20px' height='150' width='150'/></a></li>");    	
	}
	
	$(".img-prancha").click(function() {
  		if ($(this).attr("src") == "../img/prancha1.png") {
  			localStorage.simb1 = "../img/adicionar.png";
  			localStorage.simb2 = "../img/adicionar.png";
  			localStorage.simb3 = "../img/adicionar.png";
  			localStorage.simb4 = "../img/pessoas-amarelo/giovanna-paciente.png";
  			localStorage.simb5 = "../img/verbos-verde/beber.png";
  			localStorage.simb6 = "../img/substantivos-vermelho/suco.png";
  			localStorage.simb7 = "../img/adicionar.png";
  			localStorage.simb8 = "../img/adicionar.png";
  			localStorage.simb9 = "../img/adicionar.png";
  		}
  		if ($(this).attr("src") == "../img/prancha2.png") {
  			localStorage.simb1 = "../img/adicionar.png";
  			localStorage.simb2 = "../img/adicionar.png";
  			localStorage.simb3 = "../img/adicionar.png";
  			localStorage.simb4 = "../img/pessoas-amarelo/giovanna-paciente.png";
  			localStorage.simb5 = "../img/verbos-verde/andar.png";
  			localStorage.simb6 = "../img/adicionar.png";
  			localStorage.simb7 = "../img/adicionar.png";
  			localStorage.simb8 = "../img/adicionar.png";
  			localStorage.simb9 = "../img/adicionar.png";	
  		}
  		if ($(this).attr("src") == "../img/prancha3.png") {
  			localStorage.simb1 = "../img/adicionar.png";
  			localStorage.simb2 = "../img/adicionar.png";
  			localStorage.simb3 = "../img/adicionar.png";
  			localStorage.simb4 = "../img/pessoas-amarelo/gabriel-irmao.png";
  			localStorage.simb5 = "../img/verbos-verde/eu-quero-assistir.png";
  			localStorage.simb6 = "../img/substantivos-vermelho/cocorico.png";
  			localStorage.simb7 = "../img/adicionar.png";
  			localStorage.simb8 = "../img/adicionar.png";
  			localStorage.simb9 = "../img/adicionar.png";
  		}  		
	});
		
});