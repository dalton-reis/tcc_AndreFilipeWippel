$(document).ready(function mostrarConvites() {

	/*var dados = {
		"idUsuario" : localStorage.idUser
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/acc-convite.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < ret.pacientesId.length; i++) {
					$(".pacientes").append("<a href='mostrar-convite.html'>"
										  +"<img src='../img/"+ret.pacientesImg[i]+"' title='"+ret.pacientesAudio[i]+"' alt='"+ret.pacientesId[i]+"' class='img-paciente' style='margin:25px'/>"
										  +"</a>");
				}
				if (ret.pacientesId.length == 0) {
					alert("Não há convites pendentes!");
					location.href = "../home.html";
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

			$(".img-paciente").click(function() {
		  		var alt = $(this).attr("alt");
		  		localStorage.idPaciente = Number(alt);
			});
       	}
	});*/
	db.transaction(transAccConv, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transAccConv(tx) {
    	tx.executeSql("SELECT paciente FROM convites WHERE esp_tut = ?", [localStorage.idUser], okQueryAccConv, nokQuery);
    }
    var pacienteId;
    function okQueryAccConv(tx, results) {
    	var len = results.rows.length;
        if (len > 0) {	
        	for (var i=0; i<len; i++) {
	    		pacienteId = results.rows.item(i).paciente;
	    		db.transaction(transAccUsu, nokQuery);
	    	}
	    }
	    else {
	    	alert("Não há convites pendentes!");
			location.href = "../home.html";
	    }
    }
    function transAccUsu(tx) {
    	tx.executeSql("SELECT simbolo FROM usuarios WHERE id = ?", [pacienteId], okQueryAccUsu, nokQuery);
    }
    var simbolo;
    function okQueryAccUsu(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	simbolo = results.rows.item(i).simbolo;
	    	db.transaction(transAccSimb, nokQuery);
	    }
    }
    function transAccSimb(tx) {
    	tx.executeSql("SELECT img,audio FROM simbolos WHERE id = ?", [simbolo], okQueryAccSimb, nokQuery);
    }
    function okQueryAccSimb(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	$(".pacientes").append("<a href='mostrar-convite.html'>"
								  +"<img src='../img/"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='"+pacienteId+"' class='img-paciente' style='margin:25px'/>"
							 	  +"</a>");
		}
		$(".img-paciente").click(function() {
			var alt = $(this).attr("alt");
			localStorage.idPaciente = Number(alt);
		});
    }    
		
});