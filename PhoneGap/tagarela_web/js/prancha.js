$(document).ready(function() {

	// Carrega os simbolos atraves das variaveis globais
	var simbolos = [];
	simbolos[0] = localStorage.simb1;
	simbolos[1] = localStorage.simb2;
	simbolos[2] = localStorage.simb3;
	simbolos[3] = localStorage.simb4;
	simbolos[4] = localStorage.simb5;
	simbolos[5] = localStorage.simb6;
	simbolos[6] = localStorage.simb7;
	simbolos[7] = localStorage.simb8;
	simbolos[8] = localStorage.simb9;
	
	var existeSimb = false;
	for	(var i = 0; i < 9; i++) {
		$(".simbolos").append("<li style='display:inline-block;'><a href='../prancha/categorias.html'><img src='"+simbolos[i]+"' alt='' style='margin:20px' height='150' width='150'/></a></li>");
		if (simbolos[i] != "../img/adicionar.png")
			existeSimb = true;
	}
	
	// Esconde o botão avançar, caso nao houver nenhum simbolo na prancha
	if (existeSimb == false) {
		$(".ir").hide();
		$(".voltar").css("height", "100%");
	}
	
	// Guarda a posicao do simbolo selecionado na prancha
	$("li").click(function() {
  		localStorage.posSel = $(this).parent().children().index(this) + 1;
	});
	
});