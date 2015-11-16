$(document).ready(function() {

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
	alert("TESTE");
	db.transaction(transPranchasPlano, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transPranchasPlano(tx) {
    	alert("ini transPranchasPlano");
    	tx.executeSql("SELECT id,simb_prancha FROM pranchas WHERE plano = ?", [localStorage.idPlano], okQueryPranchasPlano, nokQuery);
    	alert("fim transPranchasPlano");
    }
    var pranchasId;
    var simbPrancha;
    function okQueryPranchasPlano(tx, results) {
    	alert("ini okQueryPranchasPlano");
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	pranchasId = results.rows.item(i).id;
	    	simbPrancha = results.rows.item(i).simb_prancha;
	    	alert(simbPrancha);
	    	db.transaction(transSimbPranchasPlano, nokQuery);
	    }
    	alert("fim okQueryPranchasPlano");
    }
    function transSimbPranchasPlano(tx) {
    	alert("ini transSimbPranchasPlano");
    	tx.executeSql("SELECT img,audio FROM simbolos WHERE id = ?", [simbPrancha], okQuerySimbPranchasPlano, nokQuery);
    	alert("fim transSimbPranchasPlano");
    }
    function okQuerySimbPranchasPlano(tx, results) {
    	alert("ini okQuerySimbPranchasPlano");
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	$(".pranchas").append("<a href='usar-prancha.html'>"
								 +"<img src='img/"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='"+pranchasId+"' class='img-prancha' style='margin:25px'/>"
								 +"</a>");
	    }
	    $(".img-prancha").click(function() {
			var alt = $(this).attr("alt");
			localStorage.idPrancha = Number(alt);
		});
    	alert("fim okQuerySimbPranchasPlano");
    }
		
});