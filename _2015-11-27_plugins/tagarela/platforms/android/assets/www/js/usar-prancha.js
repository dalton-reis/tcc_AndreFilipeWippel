$(document).ready(function usarPrancha() {

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
	
	// Verifica quem é o tutor e quem é o paciente
	var tutor = localStorage.idUser;
	var paciente = localStorage.idBuilder;
	if (localStorage.perfil == 3) {
		tutor = localStorage.idBuilder;
		paciente = localStorage.idUser;
	}
	// Data-hora atual e atividade
	var hoje = new Date();
	var dia = hoje.getDate();
	var mes = hoje.getMonth()+1;
	var ano = hoje.getFullYear();
	var hora = hoje.getHours();
	var min = hoje.getMinutes();
	var seg = hoje.getSeconds();
	var data = dia+'/'+mes+'/'+ano;
	var hora = hora+':'+min+':'+seg;
	var dataHora = data+" - "+hora;
	var atv = "Usou a prancha "+localStorage.idPrancha;

	/*var dados = {
		"idBuilder" : paciente,
		"espTut" : tutor,
		"dataHora" : dataHora,
		"atv" : atv,
		"idPrancha" : localStorage.idPrancha
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/usar-prancha.php",
	    data     : dados,
	    dataType : "json",
	    success  : function gravarLog(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < 9; i++) {
					$(".simbolos").append("<li style='display:inline-block;'>"
										 +"<img src='img/"+ret.simbolosImg[i]+"' title='"+ret.simbolosAudio[i]+"' alt='"+ret.simbolosId[i]+"' class='img-simbolo' style='margin:20px' height='150' width='150'/>"
										 +"</li>");
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
       		
       		$(".img-simbolo").click(function() {
		  		var src = "audio/"+$(this).attr("title");
  				audioElement.setAttribute("src",src);
    			audioElement.play();
			});
	   	}
	});*/
	db.transaction(transPranchaUso, nokQuery);
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transPranchaUso(tx) {
    	tx.executeSql("SELECT simb1,simb2,simb3,simb4,simb5,simb6,simb7,simb8,simb9 FROM pranchas WHERE id = ?", [localStorage.idPrancha], okQueryPranchaUso, nokQuery);
    }
    var simbolosId = [];
    function okQueryPranchaUso(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	simbolosId[0] = results.rows.item(i).simb1;
			simbolosId[1] = results.rows.item(i).simb2;
			simbolosId[2] = results.rows.item(i).simb3;
			simbolosId[3] = results.rows.item(i).simb4;
			simbolosId[4] = results.rows.item(i).simb5;
			simbolosId[5] = results.rows.item(i).simb6;
			simbolosId[6] = results.rows.item(i).simb7;
			simbolosId[7] = results.rows.item(i).simb8;
			simbolosId[8] = results.rows.item(i).simb9;
			db.transaction(transSimbPranchaUso, nokQuery);
	    }
    }
	function transSimbPranchaUso(tx) {
    	for (var i=0; i<9; i++) {
    		tx.executeSql("SELECT img,audio,id FROM simbolos WHERE id = ?", [simbolosId[i]], okQuerySimbPranchaUso, nokQuery);
    	}
		db.transaction(transBuilderUso, nokQuery);
    }
    var srcAudio;
    function okQuerySimbPranchaUso(tx, results) {
		var len = results.rows.length;
	    if (len > 0) {    
	        for (var i=0; i<len; i++) {
		    	$(".simbolos").append("<li style='display:inline-block;'>"
									 +"<img src='"+results.rows.item(i).img+"' title='"+results.rows.item(i).audio+"' alt='"+results.rows.item(i).id+"' class='img-simbolo' style='margin:20px' height='150' width='150'/>"
									 +"</li>");
		    }
		}
		else {
			$(".simbolos").append("<li style='display:inline-block;'>"
								 +"<img src='img/no-symbol.png' title='file:///android_asset/www/audio/no-sound.mp3' alt='0' class='img-simbolo' style='margin:20px' height='150' width='150'/>"
								 +"</li>");
		}
		$(".img-simbolo").click(function() {
    		//var appPath = window.location.pathname;
    		//appPath = appPath.substr(appPath, appPath.length - 17); // tira o 'usar-prancha.html' do path
    		srcAudio = $(this).attr("title");
			var my_media = new Media(srcAudio, onSuccess, onError);
			my_media.play();
		});
    }
	function transBuilderUso(tx) {
    	tx.executeSql("SELECT id FROM builder WHERE paciente = ? AND esp_tut = ?", [paciente,tutor], okQueryBuilderUso, nokQuery);
    }
	var builderUso;
	function okQueryBuilderUso(tx, results) {
    	var len = results.rows.length;
        for (var i=0; i<len; i++) {
	    	builderUso = results.rows.item(i).id;
	    	db.transaction(transInsUso, nokQuery);
	    }
    }
	function transInsUso(tx) {
    	tx.executeSql("INSERT INTO log (builder,data_hora,atividade,sinc) VALUES (?,?,?,1)", [builderUso,dataHora,atv]);
    }
    
    function onSuccess() {
        var aux = 0;
    }
	function onError(error) {
    	alert('Não foi possível reproduzir o reproduzir o arquivo de audio: '+srcAudio);
    }
    
});