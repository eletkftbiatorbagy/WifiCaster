

function Regisztracio()
{
	ajax_hivas("http://"+PHP_SERVER+"/code/login/regisztracio.php?nev="+document.getElementById("REG_nev").value+"&jelszo="+md5(document.getElementById("REG_jelszo").value)+"&tel="+document.getElementById("REG_tel").value,"Regisztracio_callback","REG");
}

function Regisztracio_callback(RESP)
{
	console.log("callback_resp = "+RESP);
	if (RESP==="OK") 
	{  
		PopUp("CODE");
	}
}

function PopUp(ABLAK)
{
	var PPs = document.getElementsByTagName("popup");
	for (var n=0; n<PPs.length; n++)
	{
		PPs[n].style.display = "none";
	}
	document.getElementById(ABLAK).style.display = "block";
	switch(ABLAK)
	{
		case "REGISZT" : setTimeout(function(){document.getElementById('REG_nev').focus();},100); break;
		
	}
	console.log ("ABLAK = "+ABLAK);
}