function logar(p) {
    if (p == 1)
    	localStorage.perfil = "especialista";
    else if (p == 2)
    	localStorage.perfil = "tutor";
    else
    	localStorage.perfil = "paciente";
   	    
	location.href = "home.html";
}