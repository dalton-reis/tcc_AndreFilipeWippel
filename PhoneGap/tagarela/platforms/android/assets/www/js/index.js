function logar(p) {
    if (p == 1)
    	localStorage.perfil = "Especialista";
    else if (p == 2)
    	localStorage.perfil = "Tutor";
    else
    	localStorage.perfil = "Paciente";
   	    
	location.href = "home.html";
}