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
		"idUser" : localStorage.idUser,
		"perfil" : localStorage.perfil,	
		"idBuilder" : localStorage.idBuilder,
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/escolher-plano.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.planosId.length; i++) {
					$(".planos").append("<li style='display:inline-block'><a href='#'>"
									   +"<img src='../img/"+ret.planosImg[i]+"' title='"+ret.planosAudio[i]+"' alt='"+ret.planosId[i]+"' class='img-plano' style='margin:20px' height='150' width='150'/>"
									   +"</a></li>");
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

			$(".img-plano").click(function gravarPrancha() {
				var alt = $(this).attr("alt");
				plano = Number(alt);
				
				// Grava a prancha na base
				var dados = {
					"plano" : plano,
					"simbPrancha" : localStorage.idSimbPrancha,
					"simb1" : localStorage.idSimb1,
					"simb2" : localStorage.idSimb2,
					"simb3" : localStorage.idSimb3,
					"simb4" : localStorage.idSimb4,
					"simb5" : localStorage.idSimb5,
					"simb6" : localStorage.idSimb6,
					"simb7" : localStorage.idSimb7,
					"simb8" : localStorage.idSimb8,
					"simb9" : localStorage.idSimb9,
				};    
				$.ajax({
					type     : "post",
					url      : "http://tagarela-afwippel.rhcloud.com/scripts/gravar-prancha.php",
					data     : dados,
					dataType : "json",
					success  : function(ret) {
						$("body").removeClass("loading");
						if (ret.erro) {
							alert(ret.msg);
						}
						else {
							location.href = "../builder.html";
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
					}
				});				
			});
       	}
	});*/
	db.transaction(transBuilderEscPla, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transBuilderEscPla(tx) {
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
		tx.executeSql("SELECT id FROM builder WHERE paciente = ? AND esp_tut = ?", [paciente,espTut], okQueryBuilderEscPla, nokQuery);
    }
	var builderEscPla;
	function okQueryBuilderEscPla(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	builderEscPla = results.rows.item(i).id;
			db.transaction(transPlanosEsc, nokQuery);
	    }
    }
	function transPlanosEsc(tx) {
    	tx.executeSql("SELECT id, simbolo FROM planos WHERE builder = ?", [builderEscPla], okQueryPlanosEsc, nokQuery);
    }
	var planosEscId = [];
    var planosEscIdAux = [];
    var simbsPlanoEsc = [];
    function okQueryPlanosEsc(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	planosEscId[i] = results.rows.item(i).id;
			planosEscIdAux[i] = 0;
	    	simbsPlanoEsc[i] = results.rows.item(i).simbolo;
	    	db.transaction(transSimbPlanoEsc, nokQuery);
	    }
    }
    function transSimbPlanoEsc(tx) {
    	for (var i=0; i<planosEscId.length; i++) {
    		if (planosEscIdAux[i] == 0) {
    			tx.executeSql("SELECT img,audio,planos.id AS plano FROM simbolos,planos WHERE simbolos.id = ? AND planos.id = ?", [simbsPlanoEsc[i],planosEscId[i]], okQuerySimbPlanoEsc, nokQuery);
    			planosEscIdAux[i] = 1;
    			break;
    		}
    	}
    }
    var plano;
	function okQuerySimbPlanoEsc(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	$(".planos").append("<li style='display:inline-block'><a href='#'>"
							   +"<img src='"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='"+results.rows.item(i).plano+"' class='img-plano' style='margin:20px' height='150' width='150'/>"
							   +"</a></li>");
	    }
	    $(".img-plano").click(function gravarPrancha() {
			var alt = $(this).attr("alt");
			plano = Number(alt);
			db.transaction(transInsPrancha, nokQuery);
		});
    }
	function transInsPrancha(tx) {
    	tx.executeSql("INSERT INTO pranchas (plano,simb_prancha,simb1,simb2,simb3,simb4,simb5,simb6,simb7,simb8,simb9,sinc) VALUES (?,?,?,?,?,?,?,?,?,?,?,1)", [plano,localStorage.idSimbPrancha,localStorage.idSimb1,localStorage.idSimb2,localStorage.idSimb3,localStorage.idSimb4,localStorage.idSimb5,localStorage.idSimb6,localStorage.idSimb7,localStorage.idSimb8,localStorage.idSimb9]);
		location.href = "../builder.html";
	}
});