/**
*	AFV (Adsense For Video)
*	@autor <a href='mailto:jcolmenarez@frontuari.com'>Jorge Colmenarez</a>
*	@colabotaror <a href='mailto:ccolmenarez@frontuari.com'>Carlos Colmenarez</a>
*	@created 2016-04-03 
*	@version beta 0.5
*	@comment This Script pause a video after playing in the time programming and show the adversiting under the video
**/
//var urlfile = JQuery('#link').attr('src');
//urlfile = urlfile.substring(0,30);
//if(urlfile == 'http://www.adsmaster.net23.net'){
	var entrar = false;
	var time_cok = 7.25;
	var adhac_tm_min = 20;
	var adhac_tm_max = 25;
	var time = 0;
	var opacity = 0;
	var hide_ads = false;
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
	/**
	*	Metodo que captura la IP del Visitante
	**/
	function GetIP(){
		$.getJSON("https://api.ipify.org?format=json",function(data){
			ip = data.ip; 
			var fecha = new Date();
			dia = fecha.getDate();
			mes = fecha.getMonth() + 1;
			ano = fecha.getFullYear();
		});
	}
	/**
	*	Metodo que captura los parametros en la URL
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
	*	Metodo que obtiene un valor Aleatorio en un rango de valores
	*	@param min valor mínimo 
	*	@param max valor máximo
	**/
	function randomIntFromInterval(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	//	Obtenemos los parametos y lo establecemos en la variable varsGet
	var varsGet = getQueryParams(window.location.search);
	//	Verificamos si la variable Show esta definida para mostrar siempre el anuncio
	if(varsGet["show"] && varsGet["show"]=="s"){
		localStorage.clear();
		opacity = 1;
	}
	else if(varsGet["show"] && varsGet["show"]!="s"){
		localStorage.clear();
	}
	//	Verificamos si la variable ads esta definida y su valor es 's' para activar la función del codigo. 
	if(varsGet["ads"] == "si"){
		entrar = true;
	}
	//	Verificamos si la variable time esta definida para establecer el valor en que se dará pause al video
	if(varsGet["time"]){
		time = varsGet["time"]*1000;
	}
	//	Verificamos si la variable entrar tiene como valor true para cargar la logica del negocio
	if(entrar){
		logicaNegocio();
	}
	/**	
	*	Metodo que superpone el anuncio en el video
	**/
	function setAdHac(){
		var a={"position":"absolute","top": "10%","left": "10%","width": "100%","minwidth":"300px","max-width":"366px","min-height":"250px",margin:"0px auto",overflow:"hidden","text-align":"center","opacity":opacity,"zindex":"9999"};
		jQuery("#ytplayer").append(jQuery("#content-ads").prependTo("#ytplayer"));
		jQuery("#content-ads").css(a);
		hide_ads = true;
	}
	/**
	*	Metodo que activa la funcion del video pausa, para mostrar el anuncio en el video cuando se detenga.
	**/
	function logicaNegocio(){
		//	Llamado de metodo que captura los datos del visitante
		GetIP();
		//Ver si Se puede Usar localStorage
		if(window['localStorage']){
			if(localStorage.getItem("ip")){
				if(localStorage.getItem("ip") == ip){
					if(localStorage.getItem("mes") == mes){
						if(localStorage.getItem("dia") == dia){
							valido = false;
							llamarAPIVideo(valido);
						}else{
							valido = true;
							llamarAPIVideo(valido);
						}
					}else{
						valido = true;
						llamarAPIVideo(valido);
					}
				}else{
					valido = true;
					llamarAPIVideo(valido);
				}
			}else{
				valido = true;
				llamarAPIVideo(valido);
			}
		}else{
			valido = true;
			llamarAPIVideo(v)
		}
		/**
		*	Metodo que ejecuta la logica del negocio (video-pausa-anuncio)
		**/
		function llamarAPIVideo(v){
			//	Verificamos si se puede ejecutar la logica
			if(v){
				var tag=document.createElement("script");tag.src="https://www.youtube.com/iframe_api";
				var firstScriptTag=document.getElementsByTagName("script")[0];
				firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);
				var player;
				//	Función que oculta la publicidad
			   	function hide_publicidad(i){
			    	valor = setInterval(function(){
				        if(i>1){
							jQuery('#content-ads').css("display","none");
							clearInterval(valor);
				        }
				        i++;
			    	},500);
			   	}
			   	//	Fin ocultar publicidad
			   	//	Función que verifica si se dió clic en el iframe
				function clickActivo(){
					return $(document.activeElement).is($('.iframe-ads')) || $(document.activeElement).is($('.iframe-ads'));
			   	}
			   	//	Fin verificación clic
				var ant = setInterval(function(){
					if(clickActivo() && hide_ads){
						//	Establecer datos de la ip solo cuando se ha ejecutado el clic sobre el anuncio
						localStorage.setItem("ip",ip);
						localStorage.setItem("dia",dia);
						localStorage.setItem("mes",mes);
						localStorage.setItem("ano",ano);
						//	Removemos el anuncio para que no sea necesario recargar la página
						hide_publicidad(1);
						clearInterval(ant);
					}
				},100);
			}
		}
	}
	//Fin logica Negocio
	//	Definición de la  API de Youtube
	function onYouTubeIframeAPIReady(){
		player=new YT.Player('player',{
			events: {
				'onStateChange':onPlayerStateChange
			}
		});
	}
	function onPlayerStateChange(e){
		if(e.data==YT.PlayerState.PLAYING && entrar){
			hide_ads = false;
			if(time==0)
				time=1e3*randomIntFromInterval(adhac_tm_min,adhac_tm_max);
			setTimeout(pauseVideo,time);
		}
	}
	function pauseVideo() {
		player.pauseVideo();
		setAdHac();
	}
	//	Fin API Youtuve
//}else{
//	alert("¡No te servira el código, por plagiador!");
//}