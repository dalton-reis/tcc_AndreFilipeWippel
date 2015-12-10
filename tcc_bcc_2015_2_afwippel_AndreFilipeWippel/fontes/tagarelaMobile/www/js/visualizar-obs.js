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
	
	if (localStorage.perfil == 1 || localStorage.perfil == 2) {
		$(".nov-obs").append("<a href='criar-obs.html'><img src='../img/add-obs.png' alt='' height='150' width='175' /></a>");
	}
		
	/*var dados = {
		"idBuilder" : localStorage.idBuilder,
		"espTut" : localStorage.idUser,
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/visualizar-obs.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.obsId.length; i++) {
		    		$(".obs").append("<option value='"+ret.obsId[i]+"'>"+ret.obsDesc[i]+"</option>");
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
			$('select').material_select();
       	}
	});*/
	db.transaction(transBuilderObs, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transBuilderObs(tx) {
    	tx.executeSql("SELECT id FROM builder WHERE esp_tut = ? AND paciente = ?", [localStorage.idUser,localStorage.idBuilder], okQueryBuilderObs, nokQuery);
    }
	var builderObs;
	function okQueryBuilderObs(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	builderObs = results.rows.item(i).id;
	    	db.transaction(transObs, nokQuery);
	    }
    }
	function transObs(tx) {
    	tx.executeSql("SELECT id,descricao FROM observacoes WHERE builder = ?", [builderObs], okQueryObs, nokQuery);
    }
	function okQueryObs(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
			$(".obs").append("<option value='"+results.rows.item(i).id+"'>"+results.rows.item(i).descricao+"</option>");
	    }
		$('select').material_select();
    }
	
	$("select[name=obs]").change(function mostrarObs() {
    	var id = $(this).val();
    	if (id > 0) {
	    	/*var dados = {
				"idObs" : id
			};    
			$.ajax({
			    type     : "post",
			    url      : "http://tagarela-afwippel.rhcloud.com/scripts/buscar-obs.php",
			    data     : dados,
			    dataType : "json",
			    success  : function(ret) {
			    	$("body").removeClass("loading");
			   		if (ret.erro) {
				    	alert(ret.msg);
				    }
				    else {
				    	$(".texto-obs").text(ret.obsTexto);
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
			});*/
			db.transaction(transMostrarObs, nokQuery);
			function transMostrarObs(tx) {
				tx.executeSql("SELECT obs FROM observacoes WHERE id = ?", [id], okQueryMostrarObs, nokQuery);
			}
			function okQueryMostrarObs(tx, results) {
				var len = results.rows.length;
				for (var i=0; i<len; i++) {
					$(".texto-obs").text(results.rows.item(i).obs);
				}
			}
    	}
    	else {
    		$(".texto-obs").text("");
    	}
	});
		
});