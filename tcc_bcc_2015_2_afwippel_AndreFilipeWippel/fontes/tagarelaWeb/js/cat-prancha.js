$(document).ready(function() {

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