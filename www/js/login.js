var LoggedIn;
var LoggedInName;

var LastPopup;
var LastModal;

var Ido_Timer;
var Ido_Counter;


function LoginInit()
{
	if (localStorage)
	{
		if (localStorage.getItem(AppName+"_login_nev"))
		{
			document.getElementById("Login_nev").value = localStorage.getItem(AppName+"_login_nev");
			Login(localStorage.getItem(AppName+"_login_nev"),localStorage.getItem(AppName+"_login_jelszo"));
		}
	}
}


function Logine()
{
	if (LoggedIn) { document.getElementById("loggedin").innerHTML=LoggedInName; PopUp("LOGGEDIN"); } else { PopUp("LOGIN"); }
}

function Login(nev,jelszo)
{
	if (!nev && (document.getElementById("Login_nev").value==="" || document.getElementById("Login_jelszo").value===""))
	{
		Uzenet("A név vagy a jelszó mező nem lehet üres !","warning");
		return;
	}
	ajax_hivas("http://"+PHP_SERVER+"/code/login/login.php?nev="+(nev || document.getElementById("Login_nev").value)+"&jelszo="+md5((jelszo || document.getElementById("Login_jelszo").value)),"Login_callback","LOGin");
}
function Login_callback(RESP)
{
	var R = RESP.split(":");
	RESP = R[0];
	var PARAM = R[1];
	if (RESP==="OK")
	{
		if (document.getElementById("Login_save").checked)
		{
			localStorage.setItem(AppName+"_login_nev",document.getElementById("Login_nev").value);
			localStorage.setItem(AppName+"_login_jelszo",document.getElementById("Login_jelszo").value);
		}
		if (document.getElementById("LOGIN").style.display=="block")
		{ 
			document.getElementById("USER_ID").innerHTML = document.getElementById("Login_nev").value;
			document.getElementById("Login_nev").value="";
			document.getElementById("Login_jelszo").value="";
			document.getElementById("LOGIN").style.display="none";
		}
		else	// automatikus belépés
		{
			document.getElementById("USER_ID").innerHTML = localStorage.getItem(AppName+"_login_nev");
			
		}
		LoggedIn = true;
		LoggedInName = document.getElementById("USER_ID").innerHTML;
		document.getElementById("USER_ID").style.display="inline-block";
	}
	if (RESP==="ERROR")
	{
		Uzenet("Hibás bejelentkezési név vagy jelszó!","warning");
	}
	if (RESP==="CODE" && PARAM)
	{
		PopUp("CODE", true,PARAM);
		document.getElementById("Login_nev").value = PARAM;
	}
}

function Logout()
{
	LoggedIn = false;
	LoggedInName = "";
	document.getElementById("USER_ID").innerHTML = "";
	document.getElementById("USER_ID").style.display="none";
	if (localStorage.getItem(AppName+"_login_nev"))
	{
		localStorage.removeItem(AppName+"_login_nev");
		localStorage.removeItem(AppName+"_login_jelszo");
	}
	document.getElementById("LOGGEDIN").style.display="none";
}

function Regisztracio()
{
	ajax_hivas("http://"+PHP_SERVER+"/code/login/regisztracio.php?nev="+document.getElementById("REG_nev").value+"&jelszo="+md5(document.getElementById("REG_jelszo").value)+"&tel="+document.getElementById("REG_tel").value,"Regisztracio_callback","REG");
}
function Regisztracio_callback(RESP)
{
	if (RESP==="OK" || RESP=="UPDATE") 
	{  
		PopUp("CODE",true);
	}
	if (RESP==="USER_EXISTS")
	{
		Uzenet("Már létezik ilyen nevű regisztrált felhasználó !", "warning");
	}
}

function Code_Check()
{
	ajax_hivas("http://"+PHP_SERVER+"/code/login/code_check.php?nev="+document.getElementById("Login_nev").value+"&reg_code="+document.getElementById("REG_CODE").value,"Code_Check_callback","CODECHECK");
}
function Code_Check_callback(RESP)
{
	var R = RESP.split(":");
	RESP = R[0];
	var PARAM = R[1];
	if (RESP==="OK")
	{
		Uzenet("Köszönjük!<br>A regisztrációját sikeresen aktiválta.");
		document.getElementById("CODE").style.display = "none";
		LastPopup = null;
		LastModal = null;
		var UID = document.getElementById("USER_ID")
		UID.innerHTML = PARAM;
		UID.style.display = "inline-block";
	}
	if (RESP==="ERROR")
	{
		Uzenet("A megadott kód helytelen.<br>Próbálkozzon újra, vagy ha nem kapta meg, kérje az SMS ismételt kiküldését.", "warning");
	}
}

function PopUp(ABLAK, modal, PARAM)
{
	if (!ABLAK) { return };
	var PPs = document.getElementsByTagName("popup");
	for (var n=0; n<PPs.length; n++)
	{
		PPs[n].style.display = "none";
	}
	var ablak = document.getElementById(ABLAK);
	ablak.style.display = "block";
	if (ABLAK !== "MESSAGE")
	{ 	LastPopup = ABLAK;
		LastModal = modal;
	}	
	if (ABLAK==="MESSAGE" && PARAM)
	{
		ablak.getElementsByTagName("hatter")[0].addEventListener("touchend",function(){ this.parentNode.style.display='none'; PopUp(LastPopup, LastModal); });
		ablak.childNodes[1].addEventListener("touchend",function(){ this.parentNode.style.display='none'; PopUp(LastPopup, LastModal); });
	}
	else if (!modal)
			{ 
				ablak.getElementsByTagName("hatter")[0].addEventListener("touchend",function(){ this.parentNode.style.display='none'; });
			}
			else
			{
				if (ablak.getElementsByTagName("exit").length>0) { ablak.getElementsByTagName("exit")[0].addEventListener("touchend",function(){ this.parentNode.parentNode.style.display='none'; }); }
			}
	switch(ABLAK)
	{
		case "REGISZT" : setTimeout(function(){document.getElementById('REG_nev').focus();},100); break;
		case "CODE" :
						if (PARAM)
						{
							document.getElementById("CODE_TIME").style.display = "none";
							document.getElementById("noSMS").style.display = "block";
						}
						else
						{
							Ido_Time(60);
							Ido_Timer = setInterval( function(){ Ido_Time(); },1000);
						}
						break;
						
	}
}


function Uzenet(MESSAGE,IKON)
{
	document.getElementById("uzenet").innerHTML = MESSAGE;
	var ikon = document.getElementsByTagName("ikon")[0];
	ikon.style.background = "url('img/"+(IKON || "info")+".png') no-repeat center";
	ikon.style.backgroundSize = "contain";
	PopUp("MESSAGE", false, MESSAGE);
}


function Ido_Time(x)
{
	if (!x) { Ido_Counter--; } 
	else 
	{
	 	Ido_Counter = x;
	 	document.getElementById("CODE_TIME").style.display = "block";
		document.getElementById("noSMS").style.display = "none"; 
	 }
	document.getElementById("code_time").innerHTML = Ido_Counter;
	if (Ido_Counter==0)
	{
		clearInterval(Ido_Timer);
		Ido_Timer=0;
		document.getElementById("CODE_TIME").style.display = "none";
		document.getElementById("noSMS").style.display = "block";
	}
}