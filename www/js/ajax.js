function ajax_hivas(url,callback,ID)
{
				url = url + "&callback="+callback;
				var script = document.createElement('script');
				script.setAttribute("id",ID);
				script.setAttribute('src', url);
				document.getElementsByTagName('head')[0].appendChild(script);
}

function FreeCallback(ID)
{
	var CALLBACK_item = document.getElementById(ID);
	if (CALLBACK_item) { CALLBACK_item.parentNode.removeChild(CALLBACK_item); }
}