$(document).ready(function() {

	$(".enviar-conv").click(function() {
		// Insere o convite
		var dados = {
			"nome"     : $(".nome").val(),
			"paciente" : localStorage.idUser,
			"msg" : $(".msg").val()	
		};    
		$.ajax({
		    type     : "post",
		    url      : "../scripts/enviar-convite.php",
		    data     : dados,
		    dataType : "json",
		    success  : function(ret) {
		    	$("body").removeClass("loading");
		   		if (ret.erro) {
			    	alert(ret.msg);
			    }
			    else {
			    	location.href = "../home.html";
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
