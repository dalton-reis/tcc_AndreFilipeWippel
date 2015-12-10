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
		"filtroSel" : localStorage.filtroSel,
		"idUser" : localStorage.idUser,
		"perfil" : localStorage.perfil,	
		"idBuilder" : localStorage.idBuilder,
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/planos.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.planosId.length; i++) {
					$(".planos").append("<li style='display:inline-block'><a href='../compartilhar/pranchas.html'>"
									   +"<img src='../img/"+ret.planosImg[i]+"' title='"+ret.planosAudio[i]+"' alt='"+ret.planosId[i]+"' class='img-plano' style='margin:20px' height='150' width='150'/>"
									   +"</a></li>");
				}
				if (ret.planosId.length == 0) {
					alert("Não há planos a exibir!");
					location.href = "filtro.html";
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

			$(".img-plano").mouseover(function() {
				var alt = $(this).attr("alt");
		  		localStorage.plano = Number(alt);
			});
       	}
	});*/
	db.transaction(transBuilderFilPla, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transBuilderFilPla(tx) {
    	var paciente;
		var espTut;
		if (localStorage.perfil == 3) {
			paciente = localStorage.idUser;
    		espTut = localStorage.idBuilder;
		}
		else {
			paciente = localStorage.idBuilder;
    		espTut = localStorage.idUser;
		}
		tx.executeSql("SELECT id FROM builder WHERE paciente = ? AND esp_tut = ?", [paciente,espTut], okQueryBuilderFilPla, nokQuery);
    }
	var builderFilPla;
	function okQueryBuilderFilPla(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	builderFilPla = results.rows.item(i).id;
			db.transaction(transPlanosFil, nokQuery);
	    }
    }
	function transPlanosFil(tx) {
    	if (localStorage.filtroSel == "paciente") {
			tx.executeSql("SELECT id, simbolo FROM planos WHERE builder = ?", [builderFilPla], okQueryPlanosFil, nokQuery);
		}
		else {
			tx.executeSql("SELECT id, simbolo FROM planos WHERE builder <> ?", [builderFilPla], okQueryPlanosFil, nokQuery);
		}
    }
	var planosFilId = [];
    var planosFilIdAux = [];
    var simbsPlanoFil = [];
    function okQueryPlanosFil(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	planosFilId[i] = results.rows.item(i).id;
			planosFilIdAux[i] = 0;
	    	simbsPlanoFil[i] = results.rows.item(i).simbolo;
	    	db.transaction(transSimbPlanoFil, nokQuery);
	    }
		if (len == 0) {
			alert("Não há planos a exibir!");
			location.href = "filtro.html";
		}
    }
    function transSimbPlanoFil(tx) {
    	for (var i=0; i<planosFilId.length; i++) {
    		if (planosFilIdAux[i] == 0) {
    			tx.executeSql("SELECT categoria,img,audio,planos.id AS plano FROM simbolos,planos WHERE simbolos.id = ? AND planos.id = ?", [simbsPlanoFil[i],planosFilId[i]], okQuerySimbPlanoFil, nokQuery);
    			planosFilIdAux[i] = 1;
    			break;
    		}
    	}
    }
    function okQuerySimbPlanoFil(tx, results) {
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
				$(".planos").append("<li style='display:inline-block'><a href='../compartilhar/pranchas.html'>"
							   +"<img src='../img/"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='"+results.rows.item(i).plano+"' class='img-plano' style='margin:20px; border:10px solid "+corBorda+"' height='150' width='150'/>"
							   +"</a></li>");
	    	}
			else {
	    		$(".planos").append("<li style='display:inline-block'><a href='../compartilhar/pranchas.html'>"
							   +"<img src='"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='"+results.rows.item(i).plano+"' class='img-plano' style='margin:20px; border:10px solid "+corBorda+"' height='150' width='150'/>"
							   +"</a></li>");
	    	}
	    }
	    $(".img-plano").mouseover(function() {
			var alt = $(this).attr("alt");
		  	localStorage.plano = Number(alt);
		});
    }
	
});