$(document).ready(function() {

	var audioElement = document.createElement("audio");
	$.get();
	
	$(".img-simb").click(function() {
		var src = $(this).attr("title");
  		audioElement.setAttribute("src",src);
    	audioElement.play();
	});
			
	$("#imagem").on("change", prepararImagem);
	$("#audio").on("change", prepararAudio);
	
	$(".gravar-simb").on("click", gravarSimbolo);
	
	var dirimg;
	var diraud;
	var pasta;
	if (localStorage.catSel == 1) {
		dirimg = "../img/pessoas-amarelo/";
		diraud = "../audio/pessoas-amarelo/";
		pasta = "pessoas-amarelo/";
	}
	if (localStorage.catSel == 2) {
		dirimg = "../img/substantivos-vermelho/";
		diraud = "../audio/substantivos-vermelho/";
		pasta = "substantivos-vermelho/";
	}	
	if (localStorage.catSel == 3) {
		dirimg = "../img/verbos-verde/";
		diraud = "../audio/verbos-verde/";
		pasta = "verbos-verde/";
	}
	if (localStorage.catSel == 4) {
		dirimg = "../img/descritivos-azul/";
		diraud = "../audio/descritivos-azul/";
		pasta = "descritivos-azul/";
	}
	var img = null;
	var imgSel = null;
	var aud = null;
	var audSel = null;
	
	function prepararImagem(event) {
		img = event.target.files;
		imgSel = event.target.files[0];
		if (imgSel.type == "image/jpeg" || imgSel.type == "image/png") {
			uploadImagem();
		}
		else {
			alert("Este formato de arquivo não é aceito neste campo!");
			img = null;
			$(".img-simb").attr("src", "../img/sem-imagem.png");
		}
	}
	function prepararAudio(event) {
		aud = event.target.files;
		audSel = event.target.files[0];
		if (audSel.type == "audio/mp3") {
			uploadAudio();
		}
		else {
			alert("Este formato de arquivo não é aceito neste campo!");
			aud = null;
			$(".img-simb").attr("title", "../audio/no-sound.mp3");
		}
	}
	
	function gravarSimbolo() {
		if (img != null && aud != null) {
			var dados = {
				"nome"     : $(".nome").val(),
				"significado" : $(".desc").val(),
				"categoria" : localStorage.catSel,
				"img" : pasta+imgSel.name,
				"audio" : pasta+audSel.name
			};    
			$.ajax({
				type     : "post",
				url      : "http://tagarela-afwippel.rhcloud.com/scripts/cad-simbolo.php",
				data     : dados,
				dataType : "json",
				success  : function(ret) {
					$("body").removeClass("loading");
					if (ret.erro) {
						alert(ret.msg);
					}
					else {
						alert("Símbolo cadastrado com sucesso!");
						location.href = "javascript:window.history.go(-2)";
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
		}
		else {
			alert("O arquivo da imagem ou do áudio não foram selecionados corretamente!");
		}
	}
	
	function uploadImagem() {
		var data = new FormData();
		$.each(img, function(key, value) {
			data.append(key, value);
		});
		$.ajax({
			url: "http://tagarela-afwippel.rhcloud.com/scripts/upload-imagem.php?img&dirimg="+dirimg,
			type: "post",
			data: data,
			cache: false,
			dataType: "json",
			processData: false,
			contentType: false,
			success: function(data, textStatus, jqXHR) {
				if (data.erro) {
					alert(data.msg);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Erro: " + textStatus);
			},
			complete: function() { 
				$(".img-simb").attr("src", dirimg+imgSel.name);
				var corBorda;
				switch (localStorage.catSel) {
					case '1':
						corBorda = "yellow";
						break;
					case '2':
						corBorda = "red";
						break;
					case '3':
						corBorda = "green";
						break;
					case '4':
						corBorda = "blue";
						break;
					default:
						corBorda = "black";
						break;
				}
				$(".img-simb").css({"border":"10px solid "+corBorda});
			}
		});
	}
	function uploadAudio() {
		var data = new FormData();
		$.each(aud, function(key, value) {
			data.append(key, value);
		});
		$.ajax({
			url: "http://tagarela-afwippel.rhcloud.com/scripts/upload-audio.php?aud&diraud="+diraud,
			type: "post",
			data: data,
			cache: false,
			dataType: "json",
			processData: false,
			contentType: false,
			success: function(data, textStatus, jqXHR) {
				if (data.erro) {
					alert(data.msg);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Erro: " + textStatus);
			},
			complete: function() { 
				$(".img-simb").attr("title", diraud+audSel.name);
			}
		});
	}

});