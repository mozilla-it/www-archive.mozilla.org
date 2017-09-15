   var proxy    = null;
    var wsdl_uri = "http://www.xmethods.net/sd/2001/BabelFishService.wsdl";

    function Translate (aValue) 
    {
      if (!proxy) {
        var listener = { 
          onLoad: function (aProxy) 
          {
            proxy = aProxy;
            proxy.setListener(listener);
            requestTranslation(aValue);
          },
         
          onError: function (aError) 
          {
         //   alert(aError);
          },
      
          BabelFishCallback : function (aTranslatedValue) 
          {
			document.getElementById("results").innerHTML=aTranslatedValue;          	
          }
        };
        createProxy(listener);
      }
      else {
        requestTranslation(aValue);
      }
    }

    function createProxy(aCreationListener) 
    {
      try {
        var factory = new WebServiceProxyFactory();
        factory.createProxyAsync(wsdl_uri, "BabelFishPort", "", true, aCreationListener);
      }
      catch (ex) {
        alert(ex);
      }
    }

    function requestTranslation (value) 
    {
      if (proxy) {
	var parambabel="en_pt";
	if (document.forms[1].optionto[0].checked) parambabel="en_pt";
	if (document.forms[1].optionto[1].checked) parambabel="en_fr";
	if (document.forms[1].optionto[2].checked) parambabel="en_de";
    proxy.BabelFish(parambabel, value);
	      }
      else {
        alert("Error: Proxy set up not complete!");
      }
    }

