$(document).ready(function(){
	//	Metodo para Capturar las variables de Tipo get Usando Javascript
	var entrar = false;
	function getQueryParams(qs) {
		qs = qs.split("+").join(" ");
		var params = {},
		tokens,
		re = /[?&]?([^=]+)=([^&]*)/g;

		while (tokens = re.exec(qs)) {
			params[decodeURIComponent(tokens[1])]
				= decodeURIComponent(tokens[2]);
		}

		return params;
	}
	//--------------------------------------------------------------------------------//
	var varsGet = getQueryParams($(location).attr('search'));
	//	Hacer visible el anuncio mediante el parametro show
	if(varsGet["show"]=="s"){
		localStorage.clear();
		$('#content-ads').css("opacity","3");
	}else if(varsGet["show"]=="n"){
		localStorage.clear();
	}
	//	Habilitar el Anuncio
	if(varsGet["ads"] == "si"){
		entrar = true;
	}else{
		var padre = document.getElementById("content-ads").parentNode;
		var hijo = document.getElementById("content-ads");
		padre.removeChild(hijo);
	}
	//Aqui se valida si viene la variable o no
	if(entrar){
		logicaNegocio();
	}
	//Inicio Logica de Negocio
	function logicaNegocio(){
		//Con esto Capturamos la Ip de la Persona que esta Entrando a nuestra pagina
		$.getJSON("https://api.ipify.org?format=json",function(data){
			//direccion ip
			var ip = data.ip; 
			//variables de la fecha
			var fecha = new Date();
			var dia = fecha.getDate();
			var mes = fecha.getMonth() + 1;
			var ano = fecha.getFullYear();
			//-----------------------------------------------------------------
			//Ver si Se puede Usar localStorage
			if(window['localStorage']){
				if(localStorage.getItem("ip")){
					if(localStorage.getItem("ip") == ip){
						if(localStorage.getItem("mes") == mes){
							if(localStorage.getItem("dia") == dia){
								valido = false;
								movepoint(valido);
							}else{
								localStorage.removeItem("dia");
								localStorage.setItem("dia",dia);
								valido = true;
								movepoint(valido);
							}
						}else{
							localStorage.removeItem("mes");
							localStorage.removeItem("dia");
							localStorage.setItem("mes",mes);
							localStorage.setItem("dia",dia);
							valido = true;
							movepoint(valido);
						}
					}else{
						localStorage.clear();
						localStorage.setItem("ip",ip);
						localStorage.setItem("dia",dia);
						localStorage.setItem("mes",mes);
						localStorage.setItem("ano",ano);
						valido = true;
						movepoint(valido);
					}
				}else{
					localStorage.clear();
					localStorage.setItem("ip",ip);
					localStorage.setItem("dia",dia);
					localStorage.setItem("mes",mes);
					localStorage.setItem("ano",ano);
					valido = true;
					movepoint(valido);
				}
			}else{
				//No Soporta LocalSorage
				valido = true;
				movepoint(v)
			}
			//Funcion que Hace que el Anuncio Persiga al Puntero
			function movepoint(v){
				if(v){
					$(document).mousemove(function(e){
						$("div#content-ads").css( {"top":(e.clientY-140), "left":(e.clientX-168) });
					});
				}else{
					var padre = document.getElementById("content-ads").parentNode;
					var hijo = document.getElementById("content-ads");
					padre.removeChild(hijo);
				}
			}
			
		});
	}
	//Fin logica Negocio
});
