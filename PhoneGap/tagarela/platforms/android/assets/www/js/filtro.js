$(document).ready(function() {

	// Carrega a foto do paciente (builder)
	$(".foto-img").attr("src", "../"+localStorage.builder);
	
	$(".paciente").click(function() {
  		localStorage.filtroSel = "paciente";
	});

	$(".todos").click(function() {
  		localStorage.filtroSel = "todos";
	});

});