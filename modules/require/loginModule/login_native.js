define(["main"], function (main) {

	function login(idpName, isSSOEnabled, browserWidget){

		//TODO: Pass deeplink URL's options.success_url as per 
		//https://docs.kony.com/konylibrary/konyfabric/kony_fabric_user_guide/Content/KonyStudio/Invoking_Identity_Service_Viz.htm

		var options = {isSSOEnabled}

		if (typeof browserWidget === "undefined"){
			//Open in the device's preferred browser.
			options.UseDeviceBrowser = true
		}
		else if(typeof browserWidget !== "undefined" && typeof browserWidget.setCookies === "function"){
			//Reference to the browser widget in which the login screen must be rendered.
			options.browserWidget = browserWidget,
		}
		else{
			throw Error("This is not a browser widget: " + JSON.stringify(browserWidget))
		}

		return new Promise((resolve, reject) => {
			main.getIdentity().login(options, response => { //Success
				resolve(response)
			}, error => {
				reject(error)
			})
		})
	}

    return login
});