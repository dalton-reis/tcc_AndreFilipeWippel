$(document).ready(function() {

	var audioElement = document.createElement("audio");
	$.get();

	// Busca simbolos da prancha
	var dados = {
		"idPrancha" : localStorage.idPrancha
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://teste-afwippel.rhcloud.com/scripts/usar-prancha.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	for	(var i = 0; i < 9; i++) {
					$(".simbolos").append("<li><img src='img/"+ret.simbolosImg[i]+"' title='"+ret.simbolosAudio[i]+"' alt='"+ret.simbolosId[i]+"' class='img-simbolo'/></li>");
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
	});

});