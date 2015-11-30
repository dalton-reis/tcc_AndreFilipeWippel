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
	
	$('.modal-trigger').leanModal();
	
	/*var dados = {
		"idUser" : localStorage.idUser,
		"perfil" : localStorage.perfil,	
		"idBuilder" : localStorage.idBuilder,
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/builder.php",
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
				
				for	(var i = 0; i < ret.planosId.length; i++) {
					$(".planos").append("<li><a href='usar-plano.html'>"
										     +"<img src='img/"+ret.planosImg[i]+"' title='"+ret.planosAudio[i]+"' alt='"+ret.planosId[i]+"' class='img-plano' />"
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

			$(".img-plano").click(function() {
		  		var alt = $(this).attr("alt");
		  		localStorage.idPlano = Number(alt);
			});
       	}
	});*/
	db.transaction(transFotoCons, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transFotoCons(tx) {
    	tx.executeSql("SELECT img,audio FROM simbolos WHERE simbolos.id = (SELECT simbolo FROM usuarios WHERE usuarios.id = ?)", [localStorage.idBuilder], okQueryFotoCons, nokQuery);
    }
    function okQueryFotoCons(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	$(".foto-img").html("<img src='img/"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='' class='left' style='margin:25px' height='175' width='175' />");
	    }
	    db.transaction(transInfoCons, nokQuery);
    }
    function transInfoCons(tx) {
    	tx.executeSql("SELECT nome,email,telefone FROM info WHERE usuario = ?", [localStorage.idBuilder], okQueryInfoCons, nokQuery);
    }
    function okQueryInfoCons(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	$(".info-nome").html("<b>Nome: </b>"+results.rows.item(i).nome);
			$(".info-email").html("<b>E-Mail: </b>"+results.rows.item(i).email);
			$(".info-tel").html("<b>Telefone: </b>"+results.rows.item(i).telefone);
	    }
	    db.transaction(transBuildersCons, nokQuery);
    }
    var pacienteCons;
    var espTutCons;
    function transBuildersCons(tx) {
    	if (localStorage.perfil == 3) {
    		pacienteCons = localStorage.idUser;
    		espTutCons = localStorage.idBuilder;
    	}
    	else {
    		pacienteCons = localStorage.idBuilder;
    		espTutCons = localStorage.idUser;
    	}
    	tx.executeSql("SELECT id FROM builder WHERE paciente = ? AND esp_tut = ?", [pacienteCons,espTutCons], okQueryBuilderCons, nokQuery);
    }
    var builderId;
    function okQueryBuilderCons(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	builderId = results.rows.item(i).id;
	    	db.transaction(transPlanosCons, nokQuery);
	    }
    }
    function transPlanosCons(tx) {
    	tx.executeSql("SELECT id,simbolo FROM planos WHERE builder = ?", [builderId], okQueryPlanosCons, nokQuery);
    }
    var planosId = [];
    var planosIdAux = [];
    var simbsPlano = [];
    function okQueryPlanosCons(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	planosId[i] = results.rows.item(i).id;
			planosIdAux[i] = 0;
	    	simbsPlano[i] = results.rows.item(i).simbolo;
	    	db.transaction(transSimbCons, nokQuery);
	    }
    }
    function transSimbCons(tx) {
    	for (var i=0; i<planosId.length; i++) {
    		if (planosIdAux[i] == 0) {
    			tx.executeSql("SELECT img,audio,planos.id AS plano FROM simbolos,planos WHERE simbolos.id = ? AND planos.id = ?", [simbsPlano[i],planosId[i]], okQuerySimbCons, nokQuery);
    			planosIdAux[i] = 1;
    			break;
    		}
    	}
    }
    function okQuerySimbCons(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	$(".planos").append("<li><a href='usar-plano.html'>"
							   +"<img src='img/"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='"+results.rows.item(i).plano+"' class='img-plano' />"
							   +"</a></li>");
	    }
	    $(".img-plano").click(function() {
			var alt = $(this).attr("alt");
			localStorage.idPlano = Number(alt);
		});
    }
		
	var srcAudio;
	$(".foto-img").click(function mostrarInfo() {
    	var appPath = window.location.pathname;
    	appPath = appPath.substr(appPath, appPath.length - 12); // tira o 'builder.html' do path
    	srcAudio = appPath + "audio/" + $(this).children("img").attr("title");
		var my_media = new Media(srcAudio, onSuccess, onError);
		my_media.play();
    });
    function onSuccess() {
        var aux = 0;
    }
	function onError(error) {
    	alert('Não foi possível reproduzir o reproduzir o arquivo de audio: '+srcAudio);
    }

	$(".criar-prancha").click(function limparPrancha(){
		localStorage.simb1 = "../img/adicionar.png"; localStorage.simb2 = "../img/adicionar.png"; localStorage.simb3 = "../img/adicionar.png";
		localStorage.simb4 = "../img/adicionar.png"; localStorage.simb5 = "../img/adicionar.png"; localStorage.simb6 = "../img/adicionar.png";
		localStorage.simb7 = "../img/adicionar.png"; localStorage.simb8 = "../img/adicionar.png"; localStorage.simb9 = "../img/adicionar.png";
		
		localStorage.idSimb1 = 0; localStorage.idSimb2 = 0; localStorage.idSimb3 = 0;
		localStorage.idSimb4 = 0; localStorage.idSimb5 = 0; localStorage.idSimb6 = 0;
		localStorage.idSimb7 = 0; localStorage.idSimb8 = 0; localStorage.idSimb9 = 0;
		
		localStorage.idSimbPrancha = 0;

		localStorage.idPlanoPrancha = 0;
	});

});