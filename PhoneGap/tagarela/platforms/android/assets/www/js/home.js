$(document).ready(function() {

	$('.modal-trigger').leanModal();
	
	var audioElement = document.createElement("audio");
	$.get();
	
	// Mostra a função de aceitar ou de enviar convites
	if (localStorage.perfil == 3)
		$(".convites").append("<li><a href='convites/enviar-convite.html'><img src='img/enviar-convite.png' alt='' style='margin-left:13px' /></a></li>");
    else
    	$(".convites").append("<li><a href='convites/acc-convite.html'><img src='img/aceitar-convite.png' alt='' style='margin-left:13px' /></a></li>");
    	
	/*var dados = {
		"idUser" : localStorage.idUser,
		"perfil" : localStorage.perfil
	};
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/home.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	$(".foto-img").html("<img src='img/"+ret.fotoImg+"' title='"+ret.fotoAudio+"' alt='' class='left' style='margin:25px' height='175' width='175' />");
		    	
		    	$(".info-nome").html("<b>Nome: </b>"+ret.infoNome);
				$(".info-email").html("<b>E-Mail: </b>"+ret.infoEmail);
				$(".info-tel").html("<b>Telefone: </b>"+ret.infoTel);	
				
				for	(var i = 0; i < ret.buildersId.length; i++) {
					$(".builders").append("<li><a href='builder.html'>"
										     +"<img src='img/"+ret.buildersImg[i]+"' title='"+ret.buildersAudio[i]+"' alt='"+ret.buildersId[i]+"' class='foto-builder' style='margin-bottom:13px' height='175' width='175' />"
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

			$(".foto-builder").click(function() {
		  		var alt = $(this).attr("alt");
		  		localStorage.idBuilder = Number(alt);
		  		localStorage.builder = $(this).attr("src");
			});
       	}
	});*/
	db.transaction(transFotoHome, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function nokQuery2(erro) {
		alert("Erro2");
	}
	function transFotoHome(tx) {
    	tx.executeSql("SELECT img,audio FROM simbolos WHERE simbolos.id = (SELECT simbolo FROM usuarios WHERE usuarios.id = ?)", [localStorage.idUser], okQueryFotoHome, nokQuery);
    }
    function okQueryFotoHome(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	$(".foto-img").html("<img src='img/"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='' class='left' style='margin:25px' height='175' width='175' />");
	    }
	    db.transaction(transInfoHome, nokQuery);
    }
    function transInfoHome(tx) {
    	tx.executeSql("SELECT nome,email,telefone FROM info WHERE usuario = ?", [localStorage.idUser], okQueryInfoHome, nokQuery);
    }
    function okQueryInfoHome(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	$(".info-nome").html("<b>Nome: </b>"+results.rows.item(i).nome);
			$(".info-email").html("<b>E-Mail: </b>"+results.rows.item(i).email);
			$(".info-tel").html("<b>Telefone: </b>"+results.rows.item(i).telefone);
	    }
	    db.transaction(transBuildersHome, nokQuery);
    }
    function transBuildersHome(tx) {
    	alert("ini transBuildersHome");
    	if (localStorage.perfil == 3) {
    		tx.executeSql("SELECT esp_tut FROM builder WHERE paciente = ?", [localStorage.idUser], okQueryBuilderPacHome, nokQuery);
    	}
    	else {
    		tx.executeSql("SELECT paciente FROM builder WHERE esp_tut = ?", [localStorage.idUser], okQueryBuilderEspHome, nokQuery);
    	}
    	alert("fim transBuildersHome");
    }
    var builderId = [];
    function okQueryBuilderPacHome(tx, results) {
    	alert("ini okQueryBuilderPacHome");
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	builderId[i] = results.rows.item(i).esp_tut;
	    	db.transaction(transSimbHome, nokQuery);
	    }
    	alert("fim okQueryBuilderPacHome");
    }
    function okQueryBuilderEspHome(tx, results) {
    	alert("ini okQueryBuilderEspHome");
    	var len = results.rows.length;
    	alert(len);
    	for (var i=0; i<len; i++) {
	    	builderId[i] = results.rows.item(i).paciente;
			db.transaction(transSimbHome, nokQuery);
	    }
   		alert("fim okQueryBuilderEspHome");
    }
    function transSimbHome(tx) {
    	alert("ini transSimbHome");
    	for (var i=0; i<builderId.length; i++) {
    		tx.executeSql("SELECT img,audio FROM simbolos WHERE simbolos.id = (SELECT simbolo FROM usuarios WHERE usuarios.id = ?)", [builderId[i]], okQuerySimbHome, nokQuery2);
    	}
    	alert("fim transSimbHome");
    }
    function okQuerySimbHome(tx, results) {
    	alert("ini okQuerySimbHome");
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	$(".builders").append("<li><a href='builder.html'>"
								 +"<img src='img/"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='3' class='foto-builder' style='margin-bottom:13px' height='175' width='175' />"
								 +"</a></li>");
	    }
	    $(".foto-builder").click(function() {
			var alt = $(this).attr("alt");
			localStorage.idBuilder = Number(alt);
			localStorage.builder = $(this).attr("src");
		});
    	alert("fim okQuerySimbHome");
    }
   	
   	$(".foto-img").click(function mostrarInfo() {
    	var src = "audio/"+$(this).children("img").attr("title");
  		audioElement.setAttribute("src",src);
    	audioElement.play();
    });

	$(".button-salvar").click(function alterarInfo(){
	    /*var dados = {
			"idUser" : localStorage.idUser,
			"infoNome" : $(".input-nome").val(),
			"infoEmail" : $(".input-email").val(),
			"infoTel" : $(".input-tel").val()
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://tagarela-afwippel.rhcloud.com/scripts/home-modal.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	$("body").removeClass("loading");
		   		if (ret.erro) {
			    	alert(ret.msg);
			    }
			    else {
	    			$(".info-nome").html("<b>Nome:</b>"+ret.retNome);
					$(".info-email").html("<b>E-Mail:</b>"+ret.retEmail);
					$(".info-tel").html("<b>Telefone:</b>"+ret.retTel);		    	
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
		db.transaction(transSalvarInfoHome, nokQuery);
	});
		
	function transSalvarInfoHome(tx) {
		var infoNome = $(".input-nome").val();
		var infoEmail = $(".input-email").val();
		var infoTel = $(".input-tel").val();
    	tx.executeSql("UPDATE info SET nome = ?, email = ?, telefone = ? WHERE usuario = ?", [infoNome,infoEmail,infoTel,localStorage.idUser], okQuerySalvarInfoHome, nokQuery);
    }
    function okQuerySalvarInfoHome(tx, results) {
    	db.transaction(transInfoSalvaHome, nokQuery);
    }
    function transInfoSalvaHome(tx) {
		tx.executeSql("SELECT nome,email,telefone FROM info WHERE usuario = ?", [localStorage.idUser], okQueryInfoSalvaHome, nokQuery);
    }
    function okQueryInfoSalvaHome(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	$(".info-nome").html("<b>Nome:</b>"+results.rows.item(i).nome);
			$(".info-email").html("<b>E-Mail:</b>"+results.rows.item(i).email);
			$(".info-tel").html("<b>Telefone:</b>"+results.rows.item(i).telefone);
	    }
    }    
    
});