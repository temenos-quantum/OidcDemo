define(["main", "./options"], function(main, options){

	function restoreWindowOpen(){
		if(window.__open) window.open = window.__open
	}
	
	function overrideWindowOpen(){
		window.__open = window.open
		window.open = url => {window.location = url}
	}

	function login(isSSOEnabled){

		if(typeof window === "undefined") throw new Error("This is not a web app")
		/* To navigate to the OIDC/Oauth2.0 login screen in the same window as the web app,
		* 1. Add redirect_uri as a QueryParam in the Authorize Request in the Fabric identity service's
		* advanced tab. This will make Fabric redirect back to the app, rather than try to close the 
		* pop-up that will no longer be created.
		* 2. Hack window.open to trick the SDK into opening the login in the same window as the app.
		* 3. TODO: Revover the user session after navigating back.
		*/
		overrideWindowOpen()
		
		return new Promise((resolve, reject) => {
			main.getIdentity().login(options, response => { //Success
				restoreWindowOpen()
				resolve(response)
			}, error => {
				restoreWindowOpen()
				reject(error)
			})
		})
	}
   
    return login;
});