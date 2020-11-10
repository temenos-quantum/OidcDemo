define(["main", "./options"], function(main, options){

	/*global window, OktaSignIn*/
	const oktaDomain = "dev-359971.oktapreview.com"
	const clientId = "0oauvn4cr8D84VcO50h7"
	const baseUrl = "https://" + oktaDomain

	//Okta won't allow the redirectUri to have the trailing #_[form name] fragment, so we take that off.
	const redirectUri = window.location.href.split("#")[0]

	//const isSecure = selfUri.split('/')[0] === "https"*/

	function loginWithOktaWidget(divId){

		var widget = new OktaSignIn({
			el: divId, //e.g. "#okta_login",
			clientId,
			baseUrl,
			redirectUri
		});

		return widget.showSignInToGetTokens({
			scopes: ["openid", "email", "profile"]
		}).then(function(tokens) {
			kony.print("Okta sign-in widget tokens: " + JSON.stringify(tokens))
			widget.hide();
			return tokens
		}).catch(function(error) {
			kony.print("Okta sign-in widget error" + JSON.stringify(error));
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

		return loginWithOktaWidget(divId)
		.then(tokens => {
			//TODO: Call Fabric custom identity to hit Okta's /introspect endpoint with access_token and get a Fabric session.
			kony.print("TODO: Call Fabric custom identity to hit /introspect with access_token: " + tokens.accessToken.accessToken)
		})
		.catch(e => {
			kony.print("TODO: Handle Fabric authentication error: " + JSON.stringify(e))
		})
	}

    return login;
});
