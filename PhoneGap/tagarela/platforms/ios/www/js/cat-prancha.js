$(document).ready(function() {

	// Guarda a categoria que foi selecionada
	$(".verde").click(function() {
  		localStorage.catSel = "verde";
	});
	
	$(".vermelho").click(function() {
  		localStorage.catSel = "vermelho";
	});
	
	$(".azul").click(function() {
  		localStorage.catSel = "azul";
	});
	
	$(".amarelo").click(function() {
  		localStorage.catSel = "amarelo";
	});
	
});