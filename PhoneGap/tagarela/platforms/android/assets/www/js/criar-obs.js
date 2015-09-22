$(document).ready(function() {

	$(".cad-obs").click(function() {
		// Insere a nova observacao com os dados informados
		var dados = {
			"idBuilder" : localStorage.idBuilder,
			"espTut" : localStorage.idUser,
			"descricao" : $(".descricao").val(),
			"obs"       : $(".obs").val(),
		};    
		$.ajax({
		    type     : "post",
		    url      : "http://teste-afwippel.rhcloud.com/scripts/criar-obs.php",
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

});
