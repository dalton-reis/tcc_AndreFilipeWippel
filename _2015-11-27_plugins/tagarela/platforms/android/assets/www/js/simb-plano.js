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
					$(".simbolos").append("<li class='simbs' style='display:inline-block'><a href='#'>"
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

			$(".img-simb").click(function criarPlanoEPrancha() {
				var alt = $(this).attr("alt");
				simbPlano = Number(alt);
				
				// Grava o plano e a prancha na base
				var dados = {
					"idUser" : localStorage.idUser,
					"perfil" : localStorage.perfil,	
					"idBuilder" : localStorage.idBuilder,
					"simbPlano" : simbPlano,
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
					url      : "http://tagarela-afwippel.rhcloud.com/scripts/simb-plano.php",
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
	db.transaction(transSimbsPlan, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transSimbsPlan(tx) {
    	var catSel = localStorage.catSel;
        tx.executeSql("SELECT id, img, audio FROM simbolos WHERE categoria = ?", [catSel], okQuerySimbsPlan, nokQuery);
    }
    var simbPlano;
	function okQuerySimbsPlan(tx, results) {
    	var len = results.rows.length;
        if (len > 0) {
	        for (var i=0; i<len; i++) {
	            $(".simbolos").append("<li class='simbs' style='display:inline-block'><a href='#'>"
									 +"<img src='"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='"+results.rows.item(i).id+"' class='img-simb' style='margin:20px' height='150' width='150'/>"
									 +"</a></li>");
	        }
	        $(".img-simb").click(function criarPlanoEPrancha() {
				var alt = $(this).attr("alt");
				simbPlano = Number(alt);
				db.transaction(transBuilderPlaPran, nokQuery);
			});
	    }
	    else {
	    	alert("Não há símbolos nesta categoria!");
	    }
    }
	function transBuilderPlaPran(tx) {
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
		tx.executeSql("SELECT id FROM builder WHERE paciente = ? AND esp_tut = ?", [paciente,espTut], okQueryBuilderPlaPran, nokQuery);
    }
	var builderPlaPran;
	function okQueryBuilderPlaPran(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	builderPlaPran = results.rows.item(i).id;
			db.transaction(transInsPlano, nokQuery);
	    }
    }
	function transInsPlano(tx) {
    	tx.executeSql("INSERT INTO planos (builder,simbolo,sinc) VALUES (?,?,1)", [builderPlaPran,simbPlano]);
		tx.executeSql("SELECT MAX(id) AS idplano FROM planos", [], okQueryInsPlano, nokQuery);
	}
	function okQueryInsPlano(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	tx.executeSql("INSERT INTO pranchas (plano,simb_prancha,simb1,simb2,simb3,simb4,simb5,simb6,simb7,simb8,simb9,sinc) VALUES (?,?,?,?,?,?,?,?,?,?,?,1)", [results.rows.item(i).idplano,localStorage.idSimbPrancha,localStorage.idSimb1,localStorage.idSimb2,localStorage.idSimb3,localStorage.idSimb4,localStorage.idSimb5,localStorage.idSimb6,localStorage.idSimb7,localStorage.idSimb8,localStorage.idSimb9]);
			location.href = "../builder.html";
	    }
    }
	
	$(".add-simb").click(function() {
  		location.href = "../prancha/cad-simbolo.html";
	});

});