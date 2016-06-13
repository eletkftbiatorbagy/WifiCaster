var SERVER 		= 	"dream4sys.xstream.hu";			// Wowza szerver elérése
var STREAM_APP 	=	"dream4sys";					// Wowza application név
var PHP_SERVER 	= 	"wificaster.xstream.hu";		// adat szerver elérhetősége
var WifiZona 	=  	"XStream";				// wifi nevének előtagja   pl:   wificaster  ==  wificaster_konferencia    vagy  wificaster_focimeccs
var wifi = WifiZona;								// a webes DEBUG-hoz kell csak
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
	
	document.getElementById("wifi").innerHTML=navigator.userAgent;
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) { wifi_check(); } else { document.getElementById("wifi").innerHTML="Wifi : "+wifi; server_update(); }	
}


function wifi_check()
{
	wifi = WifiWizard.getCurrentSSID(); 
	document.getElementById("wifi").innerHTML="Wifi csatlakoztatva : "+wifi;
	if (wifi.substr(0,WifiZona.length)===WifiZona)
	{	document.getElementById("FoMenu").style.display="block";	document.getElementById("Wifi").style.display="none"; server_update();  }
	else
	{ 	document.getElementById("WifiZona").innerHTML=WifiZona; document.getElementById("Wifi").style.display="block";		document.getElementById("FoMenu").style.display="none";	 }
}


function server_update()
{
	document.getElementById("wifi").innerHTML="Szerver adatok lekérése";
	ajax_hivas("http://"+PHP_SERVER+"/code/server.php?rnd="+Math.random(),"statusz_callback","data");
}

function statusz_callback(resp)
{
	var data = JSON.parse(resp);
	//<img id="live" 		src="img/live.png" ontouchstart="go('Stream');">
    //<nev style="top:63vh;">Élő videó</nev>
    document.getElementById("wifi").innerHTML="Wifi csatlakoztatva : "+wifi;
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
						document.getElementById("stream").innerHTML = '<video id="video_stream" controls autoplay><source src="'+streamtipus+'://'+SERVER+':1935/'+STREAM_APP+'/'+stream+(streamtipus=='http'?'/playlist.m3u8':'')+'" autoplay="true"></video>';
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
 				var t = new Date();
 				var timestamp = "<time>" + t.getFullYear() + "-" + ("0" + (t.getMonth() + 1)).slice(-2) + "-" + ("0" + (t.getDate() + 1)).slice(-2) + "&nbsp;&nbsp;&nbsp" + ("0"+t.getHours()).slice(-2) + ":" + ("0"+t.getMinutes()).slice(-2) + ":" + ("0"+t.getSeconds()).slice(-2) + "</time>";
// 				switch (level)
// 				{
// 					case 1:		ccolor="lime"; 		break;
// 					case 2:		ccolor="#ffff00"; 	break;
// 					case 3:		ccolor="ffa0a0"; 	break;
// 					default: 	ccolor="ffa0a0"; 	break;
// 				}
// 				if (level > 0) { document.getElementById(cpanel).childNodes[1].innerHTML = document.getElementById(cpanel).childNodes[1].innerHTML.substr(-5000) + timestamp + "<span>" + message + "</span><br>"; }
 				document.getElementById("StreamLista").innerHTML += "<span style='color:white;'>"+timestamp + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"+message + "</span><br>";
 			};
	})();