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
		"idPlano" : localStorage.plano
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/pranchas.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.pranchasId.length; i++) {
					$(".pranchas").append("<li style='display:inline-block'><a href='#'>"
										 +"<img src='../img/"+ret.pranchasImg[i]+"' title='"+ret.pranchasAudio[i]+"' alt='"+ret.pranchasId[i]+"' class='img-prancha' style='margin:20px' height='150' width='150'/>"
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

			$(".img-prancha").click(function reutilizarPrancha() {
				var alt = $(this).attr("alt");
				prancha = Number(alt);
				
				// Busca os simbolos da prancha
				var dados = {
					"prancha" : prancha,
				};    
				$.ajax({
					type     : "post",
					url      : "http://tagarela-afwippel.rhcloud.com/scripts/buscar-prancha.php",
					data     : dados,
					dataType : "json",
					success  : function(ret) {
						$("body").removeClass("loading");
						if (ret.erro) {
							alert(ret.msg);
						}
						else {
							localStorage.simb1 = "../img/"+ret.simbolosImg[0]; localStorage.simb2 = "../img/"+ret.simbolosImg[1]; localStorage.simb3 = "../img/"+ret.simbolosImg[2];
							localStorage.simb4 = "../img/"+ret.simbolosImg[3]; localStorage.simb5 = "../img/"+ret.simbolosImg[4]; localStorage.simb6 = "../img/"+ret.simbolosImg[5];
							localStorage.simb7 = "../img/"+ret.simbolosImg[6]; localStorage.simb8 = "../img/"+ret.simbolosImg[7]; localStorage.simb9 = "../img/"+ret.simbolosImg[8];
							localStorage.idSimb1 = ret.simbolosId[0]; localStorage.idSimb2 = ret.simbolosId[1]; localStorage.idSimb3 = ret.simbolosId[2];
							localStorage.idSimb4 = ret.simbolosId[3]; localStorage.idSimb5 = ret.simbolosId[4]; localStorage.idSimb6 = ret.simbolosId[5];
							localStorage.idSimb7 = ret.simbolosId[6]; localStorage.idSimb8 = ret.simbolosId[7]; localStorage.idSimb9 = ret.simbolosId[8];
							localStorage.idSimbPrancha = 0;
							localStorage.idPlanoPrancha = 0;
							
							location.href = "../prancha/prancha.html";
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
	db.transaction(transPranchasPlanoFil, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transPranchasPlanoFil(tx) {
    	tx.executeSql("SELECT id,simb_prancha FROM pranchas WHERE plano = ?", [localStorage.plano], okQueryPranchasPlanoFil, nokQuery);
    }
    var pranchasFilId = [];
    var pranchasFilIdAux = [];
    var simbsPranchaFil = [];
    function okQueryPranchasPlanoFil(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	pranchasFilId[i] = results.rows.item(i).id;
	    	pranchasFilIdAux[i] = 0;
	    	simbsPranchaFil[i] = results.rows.item(i).simb_prancha;
	    	db.transaction(transSimbPranchasPlanoFil, nokQuery);
	    }
    }
    function transSimbPranchasPlanoFil(tx) {
    	for (var i=0; i<pranchasFilId.length; i++) {
    		if (pranchasFilIdAux[i] == 0) {
    			tx.executeSql("SELECT img,audio,pranchas.id AS prancha FROM simbolos,pranchas WHERE simbolos.id = ? AND pranchas.id = ?", [simbsPranchaFil[i],pranchasFilId[i]], okQuerySimbPranchasPlanoFil, nokQuery);
    			pranchasFilIdAux[i] = 1;
    			break;
    		}
    	}
    }
    var prancha;
	function okQuerySimbPranchasPlanoFil(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	$(".pranchas").append("<li style='display:inline-block'><a href='#'>"
								 +"<img src='"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='"+results.rows.item(i).prancha+"' class='img-prancha' style='margin:20px' height='150' width='150'/>"
								 +"</a></li>");
	    }
	    $(".img-prancha").click(function reutilizarPrancha() {
			var alt = $(this).attr("alt");
			prancha = Number(alt);
			db.transaction(transPranchaFil, nokQuery);
		});
    }
	function transPranchaFil(tx) {
    	tx.executeSql("SELECT simb1,simb2,simb3,simb4,simb5,simb6,simb7,simb8,simb9 FROM pranchas WHERE id = ?", [prancha], okQueryPranchaFil, nokQuery);
    }
    var simbolosFilId = [];
    function okQueryPranchaFil(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	simbolosFilId[0] = results.rows.item(i).simb1;
			simbolosFilId[1] = results.rows.item(i).simb2;
			simbolosFilId[2] = results.rows.item(i).simb3;
			simbolosFilId[3] = results.rows.item(i).simb4;
			simbolosFilId[4] = results.rows.item(i).simb5;
			simbolosFilId[5] = results.rows.item(i).simb6;
			simbolosFilId[6] = results.rows.item(i).simb7;
			simbolosFilId[7] = results.rows.item(i).simb8;
			simbolosFilId[8] = results.rows.item(i).simb9;
			db.transaction(transSimbPranchaFil, nokQuery);
	    }
    }
	function transSimbPranchaFil(tx) {
    	for (var i=0; i<9; i++) {
    		tx.executeSql("SELECT categoria,img,audio,id FROM simbolos WHERE id = ?", [simbolosFilId[i]], okQuerySimbPranchaFil, nokQuery);
    	}
    }
    var cont = -1;
	function okQuerySimbPranchaFil(tx, results) {
		cont++;
		var xid;
		var ximg;
		var len = results.rows.length;
	    if (len > 0) {    
	        for (var i=0; i<len; i++) {
		    	if (results.rows.item(i).categoria != 1) {
					xid = results.rows.item(i).id;
					ximg = results.rows.item(i).img;
				}
				else {
					xid = 0;
					ximg = "../img/adicionar.png";
				}
		    }
		}
		else {
			xid = 0;
			ximg = "../img/adicionar.png";
		}
		switch (cont) {
			case 0:
				localStorage.simb1 = ximg;
				localStorage.idSimb1 = xid;
				break;
			case 1:
				localStorage.simb2 = ximg;
				localStorage.idSimb2 = xid;
				break;
			case 2:
				localStorage.simb3 = ximg;
				localStorage.idSimb3 = xid;
				break;
			case 3:
				localStorage.simb4 = ximg;
				localStorage.idSimb4 = xid;
				break;
			case 4:
				localStorage.simb5 = ximg;
				localStorage.idSimb5 = xid;
				break;
			case 5:
				localStorage.simb6 = ximg;
				localStorage.idSimb6 = xid;
				break;
			case 6:
				localStorage.simb7 = ximg;
				localStorage.idSimb7 = xid;
				break;
			case 7:
				localStorage.simb8 = ximg;
				localStorage.idSimb8 = xid;
				break;
			case 8:
				localStorage.simb9 = ximg;
				localStorage.idSimb9 = xid;
				localStorage.idSimbPrancha = 0;
				localStorage.idPlanoPrancha = 0;
				location.href = "../prancha/prancha.html";
				break;
		}
    }
	
});