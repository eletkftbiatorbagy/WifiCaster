var SERVER 	= 	"192.168.11.5";
var JOB 	=	"wificaster";
var STREAM	= 	"stream1"; 
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
    	
    }
};


function gol(ablak)
{
	UjAblak = ablak;
	
	
					document.getElementById('FoMenu').style.display='none';
					if (UjAblak) { document.getElementById(UjAblak+(PayPal?'':'PP')).style.display='block'; }
					if (!PayPal) { return; }
					
					if (UjAblak==="Stream") {
						var video = document.getElementById("stream1");
						video.innerHTML = '<video id="stream1" controls autoplay><source src="http://'+SERVER+':1935/'+JOB+'/'+STREAM+'/playlist.m3u8" autoplay="true"></video>';
					}
		
}


