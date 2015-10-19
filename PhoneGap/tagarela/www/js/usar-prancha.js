$(document).ready(function() {

	var audioElement = document.createElement("audio");
	$.get();

	// Busca simbolos da prancha
	var dados = {
		"idPrancha" : localStorage.idPrancha
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/usar-prancha.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
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
	});

});