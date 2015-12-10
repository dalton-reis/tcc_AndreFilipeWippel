$(document).ready(function() {

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
				
	$(".btn-imagem").on("click", selImagem);
	$(".btn-audio").on("click", selAudio);
	$(".gravar-simb").on("click", gravarSimbolo);
/*
	$(".gravar-simb").on("click", uploadPhoto);
	function uploadPhoto() {
    	// upload de uma imagem
    	var options = new FileUploadOptions();
    	options.fileKey = "file";
    	options.fileName = imgURI.substr(imgURI.lastIndexOf('/')+1);
    	options.mimeType = "image/png";
    	options.chunkedMode = false;
    	var params = {};
        params.value1 = "../img/"+$(".nome").val()+".png";
        options.params = params;
    	
    	var ft = new FileTransfer();
    	ft.upload(imgURI, encodeURI("http://tagarela-afwippel.rhcloud.com/scripts/upload.php"), win, fail, options);
    
		// upload de um audio
    	var options = new FileUploadOptions();
    	options.fileKey = "file";
    	options.fileName = audURI.substr(audURI.lastIndexOf('/')+1);
    	options.mimeType = "audio/3gpp";
    	options.chunkedMode = false;
    	var params = {};
        params.value1 = "../audio/"+$(".nome").val()+".3gpp";
        options.params = params;
    	
    	var ft = new FileTransfer();
    	ft.upload(audURI, encodeURI("http://tagarela-afwippel.rhcloud.com/scripts/upload.php"), win, fail, options);
    
    	// download de uma imagem e um audio
    	var ft = new FileTransfer();
    	ft.download(encodeURI("http://tagarela-afwippel.rhcloud.com/img/Andre.png"), "file:///storage/sdcard0/tagarela/Andre.png", winImg, failDown);
    	var ft1 = new FileTransfer();
    	ft1.download(encodeURI("http://tagarela-afwippel.rhcloud.com/audio/Andre.3gpp"), "file:///storage/sdcard0/tagarela/Andre.3gpp", winAud, failDown);
    }
    function win(r) {
    	alert("Code = " + r.responseCode);
    	alert("Response = " + r.response);
    	alert("Sent = " + r.bytesSent);
    }
	function fail(error) {
    	alert("An error has occurred: Code = " + error.code);
    	alert("upload error source " + error.source);
    	alert("upload error target " + error.target);
    }
    function winImg(entry) {
    	alert("download complete: " + entry.toURL());
    	$(".img-simb").attr("src", "file:///storage/sdcard0/tagarela/Andre.png");
    }
	function winAud(entry) {
    	alert("download complete: " + entry.toURL());
    	$(".img-simb").attr("title", "file:///storage/sdcard0/tagarela/Andre.3gpp");
    }
	function failDown(error) {
    	alert("download error source " + error.source);
		alert("download error target " + error.target);
		alert("upload error code" + error.code);
    }
*/
	function selImagem(event) {
		navigator.camera.getPicture(onPhotoURISuccess,onFail,{quality:50,destinationType:navigator.camera.DestinationType.FILE_URI,sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY});
	}
	var imgURI = null;
	function onPhotoURISuccess(imageURI) {
		imgURI = imageURI;
		$(".img-simb").attr("src", imageURI);
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
	function onFail(message) {
    	alert("A imagem não foi selecionada!");
    }
    
	function selAudio(event) {
		captureAudio();
	}
	function captureAudio() {
        navigator.device.capture.captureAudio(captureSuccess, captureError, {limit: 1});
    }
    var audURI = null;
    function captureSuccess(mediaFiles) {
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            audURI = "file:///storage/sdcard0/" + mediaFiles[i].name;
            $(".img-simb").attr("title", "file:///storage/sdcard0/" + mediaFiles[i].name);
        }
    }
	function captureError(error) {
        alert("Erro ao gravar audio: " + error.code);
    }
	
	var nome = "";
	var significado = "";
	var categoria = 0;
	function gravarSimbolo() {
		nome = $(".nome").val();
		significado = $(".desc").val();
		categoria = localStorage.catSel;
		if (imgURI == null) {
			alert("Selecione uma imagem para o símbolo!");
		}
		else if (audURI == null) {
			alert("Grave um áudio para o símbolo!");
		}
		else if (nome == "") {
			alert("Insira um nome para o símbolo!");
		}
		else {
			db.transaction(transInsSimbolo, nokQuery);
		}
	}
	function nokQuery(erro) {
		alert("Erro ao realizar operação no banco de dados! Erro: "+erro.code);
	}
	function transInsSimbolo(tx) {
    	tx.executeSql("INSERT INTO simbolos (nome,significado,categoria,img,audio,sinc) VALUES (?,?,?,?,?,1)", [nome,significado,categoria,imgURI,audURI]);
		alert("Símbolo cadastrado com sucesso!");
		location.href = "javascript:window.history.go(-2)";
	}
	
	var srcAudio;
	$(".img-simb").click(function() {
		srcAudio = $(this).attr("title");
		var my_media = new Media(srcAudio, onSuccess, onError);
		my_media.play();
	});
	function onSuccess() {
        var sucesso = 1;
    }
	function onError(error) {
    	var erro = 1;
    }
    
});