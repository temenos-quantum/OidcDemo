define(["main", "./options"], function(main, options){

	const oktaDomain = "dev-359971.oktapreview.com/"
	const clientId = "0oauvn4cr8D84VcO50h7"
	const redirectUri = "https://100032668.auth.konycloud.com/oauth2/callback"
	const issuer = `https://${oktaDomain}/oauth2/default`
	const baseUrl = `https://${oktaDomain}`

	function createSignInWidget(divId){

		/*global OktaSignIn*/
		var widget = new OktaSignIn({
			baseUrl,
			el: divId,
			clientId,
			//baseUrl: "https://techjutsu.okta.com",
			redirectUri,
			//authParams: {issuer}
		});

		return widget.showSignInToGetTokens({
			//getAccessToken: true, // Return an access token from the authorization server
			// pkce: true,
			//getIdToken: true, // Return an ID token from the authorization server
			scopes: ["openid", "email", "profile"]
		}).then(function(tokens) {
			console.log('Tokens retrieved and logged to console.' + tokens)
			return tokens
		}).catch(function(error) {
			console.log(error);
			return error
		})
	}
	
	function login(divId){

		if(typeof window === "undefined") throw new Error("This is not a web app")
		if(typeof OktaSignIn === "undefined"){
			throw new Error(
				"OktaSignIn is undefined. Add CDN links to the headers. See " +
				"https://developer.okta.com/code/javascript/okta_sign-in_widget"
			)
		}
		
		return createSignInWidget(divId)
		.then(tokens => {
			kony.print("TODO: Send access token to Fabric custom identity")
		})
		.catch(e => {
			kony.print("TODO: Handle Fabric authentication error")
		})
	}
   
    return login;
});