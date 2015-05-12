$(document).ready(function() {

	// Carrega as pranchas vinculadas ao plano
	var pranchas;
	if (localStorage.plano == "img/plano1.png")
		pranchas = new Array("img/prancha1.png", "img/prancha2.png");
	if (localStorage.plano == "img/plano2.png")
		pranchas = new Array("img/prancha3.png");
	for	(var i = 0; i < pranchas.length; i++) {
		$(".pranchas").append("<li><a href='usar-prancha.html'><img src='"+pranchas[i]+"' alt='' class='img-prancha' /></a></li>");    	
	}
	
	$(".img-prancha").mouseover(function() {
  		localStorage.prancha = $(this).attr("src");
	});
		
});