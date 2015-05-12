$(document).ready(function() {

	// Carrega a foto do usuário
	var user_foto = "";
	if (localStorage.perfil == "especialista")
		user_foto = "img/pessoas-amarelo/rodrigo-fonoaudiologo.png";
	if (localStorage.perfil == "tutor")
		user_foto = "img/pessoas-amarelo/dalton-pai.png";
	if (localStorage.perfil == "paciente")
		user_foto = "img/pessoas-amarelo/giovanna-paciente.png";
	$(".foto-img").html("<img src='"+user_foto+"' alt='' class='left' />");
	
	// Informações do especialista
	if (localStorage.perfil == "especialista") {
		$(".info-nome").html("<b>Nome:</b>"+localStorage.nome_esp);
		$(".info-email").html("<b>E-Mail:</b>"+localStorage.email_esp);
		$(".info-tel").html("<b>Telefone:</b>"+localStorage.tel_esp);	
		$(".button-salvar").click(function(){
		    localStorage.nome_esp = $(".input-nome").val();
		    localStorage.email_esp = $(".input-email").val();
		    localStorage.tel_esp = $(".input-tel").val();
			$(".info-nome").html("<b>Nome:</b>"+localStorage.nome_esp);
			$(".info-email").html("<b>E-Mail:</b>"+localStorage.email_esp);
			$(".info-tel").html("<b>Telefone:</b>"+localStorage.tel_esp);		    
		});
	}
	// Informações do tutor
	if (localStorage.perfil == "tutor") {
		$(".info-nome").html("<b>Nome:</b>"+localStorage.nome_tut);
		$(".info-email").html("<b>E-Mail:</b>"+localStorage.email_tut);
		$(".info-tel").html("<b>Telefone:</b>"+localStorage.tel_tut);	
		$(".button-salvar").click(function(){
		    localStorage.nome_tut = $(".input-nome").val();
		    localStorage.email_tut = $(".input-email").val();
		    localStorage.tel_tut = $(".input-tel").val();
			$(".info-nome").html("<b>Nome:</b>"+localStorage.nome_tut);
			$(".info-email").html("<b>E-Mail:</b>"+localStorage.email_tut);
			$(".info-tel").html("<b>Telefone:</b>"+localStorage.tel_tut);		    
		});
	}
	// Informações do paciente
	if (localStorage.perfil == "paciente") {
		$(".info-nome").html("<b>Nome:</b>"+localStorage.nome_pac);
		$(".info-email").html("<b>E-Mail:</b>"+localStorage.email_pac);
		$(".info-tel").html("<b>Telefone:</b>"+localStorage.tel_pac);	
		$(".button-salvar").click(function(){
		    localStorage.nome_pac = $(".input-nome").val();
		    localStorage.email_pac = $(".input-email").val();
		    localStorage.tel_pac = $(".input-tel").val();
			$(".info-nome").html("<b>Nome:</b>"+localStorage.nome_pac);
			$(".info-email").html("<b>E-Mail:</b>"+localStorage.email_pac);
			$(".info-tel").html("<b>Telefone:</b>"+localStorage.tel_pac);		    
		});
	}
	
	// Função Obs e Hist. Log
	$(".fun-nok").click(function(){
		alert("Esta função ainda não está terminada.");
	});
	
	// Carrega os pacientes (builders)
	var builders = new Array("img/pessoas-amarelo/giovanna-paciente.png", "img/pessoas-amarelo/gabriel-irmao.png");
	for	(var i = 0; i < builders.length; i++) {
		$(".builders").append("<li><a href='builder.html'><img src='"+builders[i]+"' alt='' class='foto-pac' /></a></li>");
	}
	
	$(".foto-pac").mouseover(function() {
  		localStorage.builder = $(this).attr("src");
	});
			
});