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
		"idPlano" : localStorage.idPlano
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/usar-plano.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.pranchasId.length; i++) {
					$(".pranchas").append("<a href='usar-prancha.html'>"
										 +"<img src='img/"+ret.pranchasImg[i]+"' title='"+ret.pranchasAudio[i]+"' alt='"+ret.pranchasId[i]+"' class='img-prancha' style='margin:25px'/>"
										 +"</a>");
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

			$(".img-prancha").click(function() {
		  		var alt = $(this).attr("alt");
		  		localStorage.idPrancha = Number(alt);
			});
       	}
	});*/
	db.transaction(transPranchasPlano, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transPranchasPlano(tx) {
    	tx.executeSql("SELECT id,simb_prancha FROM pranchas WHERE plano = ?", [localStorage.idPlano], okQueryPranchasPlano, nokQuery);
    }
    var pranchasId = [];
    var pranchasIdAux = [];
    var simbsPrancha = [];
    function okQueryPranchasPlano(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	pranchasId[i] = results.rows.item(i).id;
	    	pranchasIdAux[i] = 0;
	    	simbsPrancha[i] = results.rows.item(i).simb_prancha;
	    	db.transaction(transSimbPranchasPlano, nokQuery);
	    }
    }
    function transSimbPranchasPlano(tx) {
    	for (var i=0; i<pranchasId.length; i++) {
    		if (pranchasIdAux[i] == 0) {
    			tx.executeSql("SELECT categoria,img,audio,pranchas.id AS prancha FROM simbolos,pranchas WHERE simbolos.id = ? AND pranchas.id = ?", [simbsPrancha[i],pranchasId[i]], okQuerySimbPranchasPlano, nokQuery);
    			pranchasIdAux[i] = 1;
    			break;
    		}
    	}
    }
    function okQuerySimbPranchasPlano(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	var corBorda;
	        switch (results.rows.item(i).categoria) {
				case 1:
					corBorda = "yellow";
					break;
				case 2:
					corBorda = "red";
					break;
				case 3:
					corBorda = "green";
					break;
				case 4:
					corBorda = "blue";
					break;
				default:
					corBorda = "black";
					break;
			}
	    	if (localStorage.dinamico == "iOS") {
	    		$(".pranchas").append("<a href='usar-prancha.html'>"
								 +"<img src='img/"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='"+results.rows.item(i).prancha+"' class='img-prancha' style='margin:25px; border:10px solid "+corBorda+"' height='175' width='175'/>"
								 +"</a>");
	    	}
	    	else {
	    		$(".pranchas").append("<a href='usar-prancha.html'>"
								 +"<img src='"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='"+results.rows.item(i).prancha+"' class='img-prancha' style='margin:25px; border:10px solid "+corBorda+"' height='175' width='175'/>"
								 +"</a>");
	    	}
	    }
	    $(".img-prancha").click(function() {
			var alt = $(this).attr("alt");
			localStorage.idPrancha = Number(alt);
			localStorage.gravarLog = "true";
		});
    }
		
});