$(document).ready(function() {

	// Busca todos os simbolos da categoria selecionada
	var dados = {
		"catSel" : localStorage.catSel
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/simbolos.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.simbolosId.length; i++) {
					$(".simbolos").append("<li class='simbs' style='display:inline-block'><a href='../prancha/prancha.html'>"
										 +"<img src='../img/"+ret.simbolosImg[i]+"' title='"+ret.simbolosAudio[i]+"' alt='"+ret.simbolosId[i]+"' class='img-simb' style='margin:20px' height='150' width='150'/>"
										 +"</a></li>");
				}
				if (ret.simbolosId.length == 0) {
					alert("Não há símbolos nesta categoria!");
				}
		    }
	    },
	    error    : function(ret) {
	    	$("body").removeClass("loading");
	   		alert("Erro no servidor (TIMEOUT)!");
	    },
	    beforeSend: function() {
	    	$("body").addClass("loading");
	    },
       	complete: function() { 
       		$("body").removeClass("loading");

			$(".img-simb").click(function addSimbolo() {
				var alt = $(this).attr("alt");
				if (localStorage.posSel == 1) {
					localStorage.simb1 = $(this).attr("src");
					localStorage.idSimb1 = Number(alt);
				}
				if (localStorage.posSel == 2) {
					localStorage.simb2 = $(this).attr("src");		
					localStorage.idSimb2 = Number(alt);
				}
				if (localStorage.posSel == 3) {
					localStorage.simb3 = $(this).attr("src");		
					localStorage.idSimb3 = Number(alt);
				}
				if (localStorage.posSel == 4) {
					localStorage.simb4 = $(this).attr("src");		
					localStorage.idSimb4 = Number(alt);
				}
				if (localStorage.posSel == 5) {
					localStorage.simb5 = $(this).attr("src");		
					localStorage.idSimb5 = Number(alt);
				}
				if (localStorage.posSel == 6) {
					localStorage.simb6 = $(this).attr("src");		
					localStorage.idSimb6 = Number(alt);
				}
				if (localStorage.posSel == 7) {
					localStorage.simb7 = $(this).attr("src");		
					localStorage.idSimb7 = Number(alt);
				}
				if (localStorage.posSel == 8) {
					localStorage.simb8 = $(this).attr("src");		
					localStorage.idSimb8 = Number(alt);
				}
				if (localStorage.posSel == 9) {
					localStorage.simb9 = $(this).attr("src");		
					localStorage.idSimb9 = Number(alt);
				}
			});
       	}
	});
	
	$(".add-simb").click(function() {
  		location.href = "../prancha/cad-simbolo.html";
	});
	
});