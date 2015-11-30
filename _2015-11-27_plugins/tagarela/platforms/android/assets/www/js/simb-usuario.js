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
										 +"<img src='img/"+ret.simbolosImg[i]+"' title='"+ret.simbolosAudio[i]+"' alt='"+ret.simbolosId[i]+"' class='img-simb' style='margin:20px' height='150' width='150'/>"
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

			$(".img-simb").click(function cadastrarUsuario() {
				var alt = $(this).attr("alt");
				idSimbUsuario = Number(alt);
				
				// Insere o novo usuario com a senha e perfil informados
				var dados = {
					"usuario" : localStorage.usuarioSel,
					"senha"   : localStorage.senhaSel,
					"perfil"  : localStorage.perfilSel,
					"simbolo" : idSimbUsuario,
				};    
				$.ajax({
				    type     : "post",
				    url      : "http://tagarela-afwippel.rhcloud.com/scripts/criar-usuario.php",
				    data     : dados,
				    dataType : "json",
				    success  : function(ret) {
				    	$("body").removeClass("loading");
				   		if (ret.erro) {
					    	alert(ret.msg);
					    }
					    else {
					    	localStorage.idUser = ret.id;
					    	localStorage.perfil = ret.perfil;
					    	location.href = "home.html";
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
	db.transaction(transSimbsUsu, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transSimbsUsu(tx) {
    	var catSel = localStorage.catSel;
        tx.executeSql("SELECT id, img, audio FROM simbolos WHERE categoria = ?", [catSel], okQuerySimbsUsu, nokQuery);
    }
    var idSimbUsuario;
    function okQuerySimbsUsu(tx, results) {
    	var len = results.rows.length;
        if (len > 0) {
	        for (var i=0; i<len; i++) {
	            $(".simbolos").append("<li class='simbs' style='display:inline-block'><a href='#'>"
									 +"<img src='"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='"+results.rows.item(i).id+"' class='img-simb' style='margin:20px' height='150' width='150'/>"
								  	 +"</a></li>");
	        }
	        $(".img-simb").click(function cadastrarUsuario() {
				var alt = $(this).attr("alt");
				idSimbUsuario = Number(alt);
				db.transaction(transUsuUsu, nokQuery);
			});
	    }
	    else {
	    	alert("Não há símbolos nesta categoria!");
	    }
    }
    function transUsuUsu(tx) {
    	tx.executeSql("INSERT INTO usuarios (usuario,senha,perfil,simbolo,sinc) VALUES (?,?,?,?,1)", [localStorage.usuarioSel,localStorage.senhaSel,localStorage.perfilSel,idSimbUsuario], okQueryUsuUsu, nokQuery);
    }
	function okQueryUsuUsu(tx, results) {
	   	db.transaction(transUsu2Usu, nokQuery);
	}
	function transUsu2Usu(tx) {
    	tx.executeSql("SELECT id,perfil FROM usuarios WHERE usuario = ? AND senha = ?", [localStorage.usuarioSel,localStorage.senhaSel], okQueryUsu2Usu, nokQuery);
    }
	var id;
	var perfil;
	function okQueryUsu2Usu(tx, results) {
	   	var len = results.rows.length;
	    if (len > 0) {
	        for (var i=0; i<len; i++) {
	            id = results.rows.item(i).id;
				perfil = results.rows.item(i).perfil;
				db.transaction(transInfoUsu, nokQuery);
	        }
	    }
	    else {
	    	alert("Erro ao criar usuário!");
	    }
	}
	function transInfoUsu(tx) {
    	tx.executeSql("INSERT INTO info (usuario,nome,email,telefone,sinc) VALUES (?,?,'','',1) ", [id,localStorage.usuarioSel]);
		localStorage.idUser = id;
		localStorage.perfil = perfil;
		location.href = "home.html";
    }
	
	$(".add-simb").click(function() {
  		location.href = "prancha/cad-simbolo.html";
	});
	
});