$(document).ready(function() {

	// Carrega a foto do paciente (builder)
	$(".foto-img").html("<img src='"+localStorage.builder+"' alt='' class='left' />");
	
	// Informações do paciente
	$(".info-nome").html("<b>Nome:</b>"+localStorage.nome_pac);
	$(".info-email").html("<b>E-Mail:</b>"+localStorage.email_pac);
	$(".info-tel").html("<b>Telefone:</b>"+localStorage.tel_pac);
	
	// Função Obs e Hist. Log
	$(".fun-nok").click(function(){
		alert("Esta função ainda não está terminada.");
	});

	// Carrega os planos vinculados ao builder
	var planos;
	if (localStorage.builder == "img/pessoas-amarelo/giovanna-paciente.png")
		planos = new Array("img/plano1.png");
	if (localStorage.builder == "img/pessoas-amarelo/gabriel-irmao.png")
		planos = new Array("img/plano2.png");
	for	(var i = 0; i < planos.length; i++) {
		$(".planos").append("<li><a href='usar-plano.html'><img src='"+planos[i]+"' alt='' class='img-plano' /></a></li>");    	
	}
	
	$(".img-plano").mouseover(function() {
  		localStorage.plano = $(this).attr("src");
	});
		
});