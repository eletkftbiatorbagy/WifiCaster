var SERVER 		= 	"xstream.hu";
var PHP_SERVER 	= 	"wificaster.xstream.hu";
var WifiZona 	=  	"XStream 2.4GHz";
var wifi = WifiZona;							// a webes debughoz
var JOB 	=	"live";
var PayPal = true;
var UjAblak;
var myScroll;


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
  		Init();	
    }
};


function Init()
{
	if (window.device) { wifi_check(); } else { server_update(); }	
}


function wifi_check()
{
	wifi = WifiWizard.getCurrentSSID(); 
	if (wifi.substr(0,WifiZona.length)===WifiZona)
	{	document.getElementById("FoMenu").style.display="block";	document.getElementById("Wifi").style.display="none"; server_update();  }
	else
	{ 	document.getElementById("WifiZona").innerHTML=WifiZona; document.getElementById("Wifi").style.display="block";		document.getElementById("FoMenu").style.display="none";	 }
}


function server_update()
{
	ajax_hivas("http://"+PHP_SERVER+"/code/server.php?rnd="+Math.random(),"statusz_callback","data");
}

function statusz_callback(resp)
{
	var data = JSON.parse(resp);
	
	//<img id="live" 		src="img/live.png" ontouchstart="go('Stream');">
    //<nev style="top:63vh;">Élő videó</nev>
    
    for (var w=0; w < data.length; w++)
    {
    	if (data[w].wifi === wifi)
    	{
    		document.getElementById("Musor").innerHTML = data[w].musor;
    		var SL = document.getElementById("StreamLista");
    		var lista = "<h2>"+data[w].musor+"</h2><ul>";
    		for (var k=0; k < data[w].kamerak.length; k++)
    		{
    			lista += '<li>';
    			lista += '<img src="img/live.png" ontouchstart="go(\'Stream\',\''+data[w].tipus+'\',\''+data[w].kamerak[k].stream+'\',\''+data[w].musor+'\',\''+data[w].kamerak[k].nev+'\');">';
    			lista += '<h3>'+data[w].kamerak[k].nev+'</h3>'
    			lista += '</li>';
    		}
    		SL.innerHTML = lista + "</ul>";
    	}
    }
    
	
}

function go(ablak,streamtipus,stream,musor,nev)
{
	UjAblak = ablak;
	
	
					document.getElementById('FoMenu').style.display='none';
					if (UjAblak) { document.getElementById(UjAblak+(PayPal?'':'PP')).style.display='block'; }
					if (!PayPal) { return; }
					
					if (UjAblak==="Stream") {
						document.getElementById("stream").innerHTML = '<video id="video_stream" controls autoplay><source src="'+streamtipus+'://'+SERVER+':1935/'+JOB+'/'+stream+(streamtipus=='http'?'/playlist.m3u8':'')+'" autoplay="true"></video>';
						document.getElementById("stream_nev").innerHTML = nev;
						document.getElementById("stream_musor").innerHTML = musor;
					}
		
}


(function(){
			var oldLog = console.log;
			console.log = function (message) {
				oldLog.apply(console, arguments);
				// var level = 0;
// 				while (message.substr(0,1)==="•")
// 				{
// 					message = message.substr(1);
// 					level++;
// 				}
// 				var ccolor = "";
// 				var cpanel = CONSOLE_ID[level];
// 				var t = new Date();
// 				var timestamp = "<time>" + t.getFullYear() + "-" + ("0" + (t.getMonth() + 1)).slice(-2) + "-" + ("0" + (t.getDate() + 1)).slice(-2) + "&nbsp;&nbsp;&nbsp" + ("0"+t.getHours()).slice(-2) + ":" + ("0"+t.getMinutes()).slice(-2) + ":" + ("0"+t.getSeconds()).slice(-2) + "</time>";
// 				switch (level)
// 				{
// 					case 1:		ccolor="lime"; 		break;
// 					case 2:		ccolor="#ffff00"; 	break;
// 					case 3:		ccolor="ffa0a0"; 	break;
// 					default: 	ccolor="ffa0a0"; 	break;
// 				}
// 				if (level > 0) { document.getElementById(cpanel).childNodes[1].innerHTML = document.getElementById(cpanel).childNodes[1].innerHTML.substr(-5000) + timestamp + "<span>" + message + "</span><br>"; }
// 				if (document.getElementById(cpanel).childNodes[1]) { document.getElementById("CONSOLE_LOG").childNodes[1].innerHTML = document.getElementById("CONSOLE_LOG").childNodes[1].innerHTML.substr(-5000) + timestamp + "<span style='color:"+ccolor+";'>"+message + "</span><br>"; }
 			};
	})();