$(document).ready(function() {

	// Exclui o simbolo da posicao selecionada na prancha
	$(".excluir").click(function excluirSimbolo() {
  		if (localStorage.posSel == 1) {
  			localStorage.simb1 = "../img/adicionar.png";
			localStorage.idSimb1 = 0;
		}
  		if (localStorage.posSel == 2) {
  			localStorage.simb2 = "../img/adicionar.png";
			localStorage.idSimb2 = 0;
		}
  		if (localStorage.posSel == 3) {
  			localStorage.simb3 = "../img/adicionar.png";
			localStorage.idSimb3 = 0;
		}
  		if (localStorage.posSel == 4) {
  			localStorage.simb4 = "../img/adicionar.png";
			localStorage.idSimb4 = 0;
		}
  		if (localStorage.posSel == 5) {
  			localStorage.simb5 = "../img/adicionar.png";
			localStorage.idSimb5 = 0;
		}
  		if (localStorage.posSel == 6) {
  			localStorage.simb6 = "../img/adicionar.png";
			localStorage.idSimb6 = 0;
		}
  		if (localStorage.posSel == 7) {
  			localStorage.simb7 = "../img/adicionar.png";
			localStorage.idSimb7 = 0;
		}
  		if (localStorage.posSel == 8) {
  			localStorage.simb8 = "../img/adicionar.png";
			localStorage.idSimb8 = 0;
		}
  		if (localStorage.posSel == 9) {
  			localStorage.simb9 = "../img/adicionar.png";
			localStorage.idSimb9 = 0;
		}
	});
	
	// Guarda a categoria que foi selecionada
	$(".amarelo").click(function() {
  		localStorage.catSel = 1;
	});
	$(".vermelho").click(function() {
  		localStorage.catSel = 2;
	});
	$(".verde").click(function() {
  		localStorage.catSel = 3;
	});
	$(".azul").click(function() {
  		localStorage.catSel = 4;
	});
	
});