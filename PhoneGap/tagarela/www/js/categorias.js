$(document).ready(function() {

	// Exclui o simbolo da posicao selecionada na prancha
	$(".excluir").click(function() {
  		if (localStorage.posSel == 1)
  			localStorage.simb1 = "../img/adicionar.png";		
  		if (localStorage.posSel == 2)
  			localStorage.simb2 = "../img/adicionar.png";		
  		if (localStorage.posSel == 3)
  			localStorage.simb3 = "../img/adicionar.png";		
  		if (localStorage.posSel == 4)
  			localStorage.simb4 = "../img/adicionar.png";		
  		if (localStorage.posSel == 5)
  			localStorage.simb5 = "../img/adicionar.png";		
  		if (localStorage.posSel == 6)
  			localStorage.simb6 = "../img/adicionar.png";		
  		if (localStorage.posSel == 7)
  			localStorage.simb7 = "../img/adicionar.png";		
  		if (localStorage.posSel == 8)
  			localStorage.simb8 = "../img/adicionar.png";		
  		if (localStorage.posSel == 9)
  			localStorage.simb9 = "../img/adicionar.png";
	});
	
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