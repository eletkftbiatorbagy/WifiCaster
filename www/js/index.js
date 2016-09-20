
var UjAblak;
var myScroll;
var dev = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;		// app vagy browser ?
var InitOk = false;
var no_wifi_timer;

if (dev) {var bolt = new Bolt;}			// in-app-purchase inicializálás  (vasarlas.js)

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false); console.log("addevent deviceReady");
    },
    onDeviceReady: function() {
    	myScroll =  new IScroll('#LOGS');
  		if (!window.device) { Init(); }
  		else
  		{
			nonRenewing.initialize({
				verbosity: store.DEBUG,
				products: [{
					id: 'hu.wificaster.app.elofiz.1.1nap',
					duration: 60
				}, {
					id: 'hu.wificaster.app.elofiz.1.1het',
					duration: 420
				}, {
					id: 'hu.wificaster.app.elofiz.1.30nap',
					duration: 900
				}]
			});
			
			nonRenewing.onStatusChange(function(status) {
				if (status) {
					document.getElementsByClassName('status')[0].innerHTML =
						'isSubscribed: ' + status.subscriber + '\n' +
						'expiryDate: ' + status.expiryDate + '\n';
				}
				else {
					document.getElementsByClassName('status')[0].innerHTML =
						'???';
				}
			});
			
			var button = document.getElementById('kosar');
				button.addEventListener('touchend', function(event) {
					console.log('showMainScreen -> openSubscriptionManager');
					event.preventDefault();
					nonRenewing.openSubscriptionManager();
				});
  		}
  			
    }
};




function Init()
{
	if (InitOk) { return; }
	dev = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;		// app vagy browser ?
	console.log("device = "+dev);
	//console.log("userAgent = "+navigator.userAgent);
	console.log("- Init -");
	
	if (dev) 
	{ 
		window.plugins.insomnia.keepAwake(); 
	} 
	server_update();
	
	LoginInit();
	
	InitOk = true;
}

var error=function(msg) {};

var startTimer = function()
{
	console.log("Starting server timer");
	no_wifi_timer = setTimeout(function(){ no_wifi(); },3000);
}
var no_wifi = function()
{
		console.log("No Wifi");
		document.getElementById("wifi2").innerHTML="Wifi : <span style='color:red;'>nem csatlakozik</span>";
		document.getElementById("WifiZona").innerHTML=WifiZona; 
		document.getElementById("Wifi").style.display="block";		
		document.getElementById("FoMenu").style.display="none";
};
var clearTimer = function()
{
	clearTimeout(no_wifi_timer);
	no_wifi_timer=0;
}

function server_update()
{
	document.getElementById("wifi").innerHTML="Szerver adatok lekérése";
	clearTimer();
	startTimer();
	ajax_hivas("http://"+PHP_SERVER+"/code/server.php?rnd="+Math.random(),"statusz_callback","data");
	document.getElementById("Wifi").style.display="none";
	document.getElementById("FoMenu").style.display="block";	
}

function statusz_callback(resp)
{
	clearTimer();
	document.getElementById("Wifi").style.display="none";		
	document.getElementById("FoMenu").style.display="block";
	var data = JSON.parse(resp);
    document.getElementById("wifi").innerHTML="Wifi csatlakoztatva : "+WifiZona;
    for (var w=0; w < data.length; w++)
    {
    	if (data[w].aktiv)
    	{
    		document.getElementById("Musor").innerHTML = data[w].musor;
    		var SL = document.getElementById("StreamLista");
    		var mL = 0;
    		if (data[w].kamerak.length==1) { mL=33; }
    		if (data[w].kamerak.length==2) { mL=16.5; }
    		var lista = "<h2>"+data[w].musor+"</h2><ul style='margin-left:"+mL+"%'>";
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
					if (UjAblak) { document.getElementById(UjAblak).style.display='block'; }

					
					if (UjAblak==="Stream") {
						var STR = document.getElementById("stream");
						var VID = document.createElement("video");
							VID.id = "video_stream";
							VID.setAttribute("controls","true");
							VID.setAttribute("autoplay","true");
							VID.onpause = function() {
												VideoStop(true);
											};
						var SOU = document.createElement("source");
							SOU.src= streamtipus+'://'+WOWZA+':1935/'+STREAM_APP+'/'+stream+(streamtipus=='http'?'/playlist.m3u8':'');	
						VID.appendChild(SOU);
						STR.appendChild(VID);
							
						// '<video id="video_stream" controls autoplay><source src="'+streamtipus+'://'+WOWZA+':1935/'+STREAM_APP+'/'+stream+(streamtipus=='http'?'/playlist.m3u8':'')+'" autoplay="true"></video>';
						
						document.getElementById("stream_nev").innerHTML = nev;
						document.getElementById("stream_musor").innerHTML = musor;
					}
		
}

function VideoStop(paused)
{
	if (!paused) {document.getElementById('video_stream').pause();  }
	setTimeout( function(){
		document.getElementById('video_stream').parentNode.removeChild(document.getElementById('video_stream'));
		document.getElementById('Stream').style.display='none';
		document.getElementById('FoMenu').style.display='block';
	},0);	
}


(function(){
			var oldLog = console.log;
			console.log = function (message) {
				oldLog.apply(console, arguments);
 				var t = new Date();
 				var timestamp = "<time>" + t.getFullYear() + "-" + ("0" + (t.getMonth() + 1)).slice(-2) + "-" + ("0" + (t.getDate() + 1)).slice(-2) + "&nbsp;&nbsp;&nbsp" + ("0"+t.getHours()).slice(-2) + ":" + ("0"+t.getMinutes()).slice(-2) + ":" + ("0"+t.getSeconds()).slice(-2) + "</time>";
 				document.getElementById("logs").innerHTML += "<span style='color:white;'>"+timestamp + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"+message + "</span><br>";
 			};
	})();