$(document).ready(function(){

	//Metodo para Capturar las variables de Tipo get Usando Javascript
	var entrar = false;
	/**
	*	Comentado por Jorge Colmenarez 2015-09-04 23:05 
	*	Reemplazo de función por optimización de codigo
	function getVariables(){
		var loc = document.location.href;
		var getString = loc.split('?')[1];
		if(!getString){
			var loc = document.location.href+"?ads=no";
			var getString = loc.split('?')[1];
		}
	    var GET = getString.split('&');
	  	var get = {};//this object will be filled with the key-value pairs and returned.
	   
	   for(var i = 0, l = GET.length; i < l; i++){
	      var tmp = GET[i].split('=');
	      get[tmp[0]] = unescape(decodeURI(tmp[1]));
	   }
	   return get;
	}
	**/
	/**
	*	Agregado por Jorge Colmenarez 2015-09-04 23:02
	*	Función getQueryParams permite obtener un objeto con los parametros enviados por get
	**/
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
	/**
	*	Fin Jorge Colmenarez
	**/
	//--------------------------------------------------------------------------------//
	/**
	*	Comentado por Jorge Colmenarez 2015-09-04 23:07
	*	var varsGet = getVariables(); 
	*	Llamado de nueva función getQueryParams(x);
	*/
	var varsGet = getQueryParams($(location).attr('search'));
	/**
	*	Agregado por Jorge Colmenarez 2015-09-07 11:30
	*	Hacer visible el anuncio mediante el parametro show 
	*/
	if(varsGet["show"]=="s"){
		localStorage.clear();
		$('#content-ads').css("opacity","3");
	}else if(varsGet["show"]=="n"){
		localStorage.clear();
	}
	/**
	*	Fin Jorge Colmenarez
	**/
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
			//alert(dia+"/"+mes+"/"+ano);
			//-----------------------------------------------------------------

			//Ver si Se puede Usar localStorage
			if(window['localStorage']){
				//alert("validacion localStorage");
				if(localStorage.getItem("ip")){
					//alert("la variable ip trae algo");
					if(localStorage.getItem("ip") == ip){
						//alert("las ip son iguales");
						if(localStorage.getItem("mes") == mes){
							//alert("el mes es igual");
							if(localStorage.getItem("dia") == dia){
								//alert("el dia es igual");
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
