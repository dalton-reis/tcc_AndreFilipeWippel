$(document).ready(function() {

	// Verifica conexão com o servidor
	localStorage.conectado = 0;
	var dados = {
		"dadoEnv" : 1
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/verifica-conexao.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	if (ret.dadoRet == 1) {
		    	localStorage.conectado = 1;
		    	consistirDados();
		    }
	    },
		error    : function(ret) {
		   	$("body").removeClass("loading");
		},
		beforeSend: function() {
		   	$("body").addClass("loading");
		},
        complete: function() { 
        	$("body").removeClass("loading");
        }
	});
	
	/*var dados = {
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
	});*/
	db.transaction(transSimbsEscolher, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transSimbsEscolher(tx) {
    	var catSel = localStorage.catSel;
        tx.executeSql("SELECT id, img, audio FROM simbolos WHERE categoria = ?", [catSel], okQuerySimbsEscolher, nokQuery);
    }
    function okQuerySimbsEscolher(tx, results) {
    	var len = results.rows.length;
        if (len > 0) {
	        for (var i=0; i<len; i++) {
	            var corBorda;
	            switch (localStorage.catSel) {
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
	            if (localStorage.dinamico == "iOS") {
	    			$(".simbolos").append("<li class='simbs' style='display:inline-block'><a href='../prancha/prancha.html'>"
									 +"<img src='../img/"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='"+results.rows.item(i).id+"' class='img-simb' style='margin:20px; border:10px solid "+corBorda+"' height='150' width='150'/>"
									 +"</a></li>");
	        	}
	    		else {
	            	$(".simbolos").append("<li class='simbs' style='display:inline-block'><a href='../prancha/prancha.html'>"
									 +"<img src='"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='"+results.rows.item(i).id+"' class='img-simb' style='margin:20px; border:10px solid "+corBorda+"' height='150' width='150'/>"
									 +"</a></li>");
	        	}
	        }
	        $(".img-simb").click(function addSimbolo() {
				var alt = $(this).attr("alt");
				if (localStorage.posSel == 1) {
					localStorage.simb1 = $(this).attr("src");
					localStorage.simb1Cat = localStorage.catSel;
					localStorage.idSimb1 = Number(alt);
				}
				if (localStorage.posSel == 2) {
					localStorage.simb2 = $(this).attr("src");		
					localStorage.simb2Cat = localStorage.catSel;
					localStorage.idSimb2 = Number(alt);
				}
				if (localStorage.posSel == 3) {
					localStorage.simb3 = $(this).attr("src");		
					localStorage.simb3Cat = localStorage.catSel;
					localStorage.idSimb3 = Number(alt);
				}
				if (localStorage.posSel == 4) {
					localStorage.simb4 = $(this).attr("src");		
					localStorage.simb4Cat = localStorage.catSel;
					localStorage.idSimb4 = Number(alt);
				}
				if (localStorage.posSel == 5) {
					localStorage.simb5 = $(this).attr("src");		
					localStorage.simb5Cat = localStorage.catSel;
					localStorage.idSimb5 = Number(alt);
				}
				if (localStorage.posSel == 6) {
					localStorage.simb6 = $(this).attr("src");		
					localStorage.simb6Cat = localStorage.catSel;
					localStorage.idSimb6 = Number(alt);
				}
				if (localStorage.posSel == 7) {
					localStorage.simb7 = $(this).attr("src");		
					localStorage.simb7Cat = localStorage.catSel;
					localStorage.idSimb7 = Number(alt);
				}
				if (localStorage.posSel == 8) {
					localStorage.simb8 = $(this).attr("src");		
					localStorage.simb8Cat = localStorage.catSel;
					localStorage.idSimb8 = Number(alt);
				}
				if (localStorage.posSel == 9) {
					localStorage.simb9 = $(this).attr("src");		
					localStorage.simb9Cat = localStorage.catSel;
					localStorage.idSimb9 = Number(alt);
				}
			});
	    }
	    else {
	    	alert("Não há símbolos nesta categoria!");
	    }
    }
	
	$(".add-simb").click(function() {
  		location.href = "../prancha/cad-simbolo.html";
	});
	
});