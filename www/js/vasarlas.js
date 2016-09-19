var Bolt = function(){

this.TERMEKEK = [
					{
        				id:    "hu.wificaster.app.elofiz.1.1nap",
        				alias: "Napijegy",
        				type:  store.NON_RENEWING_SUBSCRIPTION,
        				kedvezmeny : ""
    				},
					{
        				id:    "hu.wificaster.app.elofiz.1.1het",
        				alias: "Hetijegy",
        				type:  store.NON_RENEWING_SUBSCRIPTION,
        				kedvezmeny : "-10%"
    				},
    				{
        				id:    "hu.wificaster.app.elofiz.1.1ho",
        				alias: "Havi előfizetés",
        				type:  store.NON_RENEWING_SUBSCRIPTION,
        				kedvezmeny : "-25%"
    				}
],

this.initializeStore = function() {
		store.verbosity = store.INFO;
		for (var n=0; n< this.TERMEKEK.length; n++)
		{
			store.register(this.TERMEKEK[n]);
		}	
		store.ready(function() {
			console.log("\\o/ STORE READY \\o/");
			Init();
		});
		store.refresh();
		
},

this.TermekLista = document.getElementById("TERMEK_LISTA"),
this.PRODUCT = [];

this.showTermekek = function() {
	
	for (var n=0; n< this.TERMEKEK.length; n++)
	{
		var product = store.get(TERMEKEK[n].id);
		PRODUCT[PRODUCT.length] = {};
		if (!product) {
             PRODUCT[PRODUCT.length-1] = null;
        }
        else if (product.state === store.REGISTERED) {
            $el.html("<div class=\"loading\" />");
        }
        else if (product.state === store.INVALID) {
            PRODUCT[PRODUCT.length-1] = null;
        }
        else {
        	PRODUCT[PRODUCT.length-1] = product;
        }
	}
	for (var n=0; n< this.PRODUCT.length; n++)
	{
		if (PRODUCT[n])
		{
			var G = document.createElement("div");
				G.setAttribute("class","gomb nagy");
				G.innerHTML = PRODUCT[n].title + "<off>"+(PRODUCT[n].owned?"ELŐFIZETVE":"")+"</off><ar>"+PRODUCT[n].price+"</ar>";
				G.setAttribute("onclick","");
			TL.appendChild(G);
		}		 
	}
// 	<div class="gomb nagy">Napijegy<ar>1 000 Ft</ar></div>
// 				<div class="gomb nagy">Hetijegy<off>-10%</off><ar>6 300 Ft</ar></div>
// 				<div class="gomb nagy">Havi előfizetés<off>-25%</off><ar>22 500 Ft</ar></div>
}

};


