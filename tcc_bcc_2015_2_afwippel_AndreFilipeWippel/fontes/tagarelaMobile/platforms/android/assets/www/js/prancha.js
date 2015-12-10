$(document).ready(function atualizaSimbolos() {

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
	var simbolosCat = [];
	simbolosCat[0] = localStorage.simb1Cat;
	simbolosCat[1] = localStorage.simb2Cat;
	simbolosCat[2] = localStorage.simb3Cat;
	simbolosCat[3] = localStorage.simb4Cat;
	simbolosCat[4] = localStorage.simb5Cat;
	simbolosCat[5] = localStorage.simb6Cat;
	simbolosCat[6] = localStorage.simb7Cat;
	simbolosCat[7] = localStorage.simb8Cat;
	simbolosCat[8] = localStorage.simb9Cat;
	
	var existeSimb = false;
	for	(var i = 0; i < 9; i++) {
		var corBorda;
	    switch (simbolosCat[i]) {
			case '1':
				corBorda = "yellow";
				break;
			case '2':
				corBorda = "red";
				break;
			case '3':
				corBorda = "green";
				break;
			case '4':
				corBorda = "blue";
				break;
			default:
				corBorda = "black";
				break;
		}
		if (simbolos[i] != "../img/adicionar.png") {
			if (localStorage.dinamico == "iOS") {
				$(".simbolos").append("<li style='display:inline-block;'><a href='../prancha/categorias.html'><img src='../img/"+simbolos[i]+"' alt='' style='margin:20px; border:10px solid "+corBorda+"' height='150' width='150'/></a></li>");
			}
			else {
				$(".simbolos").append("<li style='display:inline-block;'><a href='../prancha/categorias.html'><img src='"+simbolos[i]+"' alt='' style='margin:20px; border:10px solid "+corBorda+"' height='150' width='150'/></a></li>");
			}
			existeSimb = true;
		}
		else {
			$(".simbolos").append("<li style='display:inline-block;'><a href='../prancha/categorias.html'><img src='"+simbolos[i]+"' alt='' style='margin:20px' height='150' width='150'/></a></li>");
		}
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