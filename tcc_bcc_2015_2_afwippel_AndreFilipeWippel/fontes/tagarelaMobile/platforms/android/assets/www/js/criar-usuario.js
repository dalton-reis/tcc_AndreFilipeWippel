$(document).ready(function() {
	
	$('select').material_select();
	
	$(".cad-usu").click(function() {
		localStorage.usuarioSel = $(".usuario").val();
		localStorage.senhaSel = $(".senha").val();
		localStorage.perfilSel = $("select[name=perfil]").val();
		
		location.href = "cat-usuario.html";
	});

});
