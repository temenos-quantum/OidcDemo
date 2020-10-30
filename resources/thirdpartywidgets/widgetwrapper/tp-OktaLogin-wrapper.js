/*exported OktaLogin*/
var OktaLogin = {

	initializeWidget: function(parentNode /*, widgetModel, config*/) {
		kony.print("OktaLogin: initialising widget")

		var oktaDivId = "okta_login"
		/*The Okta CSS and JS are added in Project Settings>Responsive Web/HTML Head*/

		/*Create is the div in which the Okta login screen will be loaded*/
		parentNode.innerHTML = `<div
			id="${oktaDivId}"
			style="border: 1px solid red;background-color: red">
		</div>`

		debugger;
		//TODO: Define oktaDomain, clientId and redirectUri as widget properties.
		var oktaDomain = "dev-359971.oktapreview.com/"
		var clientId = "0oaugi3kt4nGfNyGZ0h7"
		var redirectUri = ""

		/*global window*/
		if(typeof window !== "undefined"){
			/*global getBaseUri*/
			redirectUri = getBaseUri()
			//e.g. http://127.0.0.1:9989/OidcDemo/
		}
		else{
			/*Note: Can't use Fabric Identity's callback URL because it assumes the 3rd party login occurs in a pop-up window
				and tries to close it, resulting in error "Cannot read property 'postMessage' of null"*/
			redirectUri = "https://100032668.auth.konycloud.com/oauth2/callback"
		}

		debugger

		// Based on sample code found at https://developer.okta.com/code/javascript/okta_sign-in_widget/
		/*global OktaSignIn*/
		var signIn = new OktaSignIn({
			baseUrl: `https://${oktaDomain}`,
			el: `#${oktaDivId}`,
			authParams: {
				issuer: `https://${oktaDomain}/oauth2/default`
			}
		});

		signIn.showSignInToGetTokens({
			clientId,
			redirectUri, // Must be in the list of redirect URIs enabled for the OIDC app
			getAccessToken: true, // Return an access token from the authorization server
			pkce: true,
			getIdToken: true, // Return an ID token from the authorization server
			scope: 'openid profile offline_access'
		});

		debugger
		//After going to the Okta login screen and coming back
		if(signIn.hasTokensInUrl()){
			kony.print("We have Okta tokens!")
			signIn.authClient.token.parseFromUrl().then(
				//If we get here, the user just logged in.
				function success(res) {
					debugger
					var accessToken = res.tokens.accessToken;
					var idToken = res.tokens.idToken;

					signIn.authClient.tokenManager.add('accessToken', accessToken);
					signIn.authClient.tokenManager.add('idToken', idToken);

					kony.print("Hello, " + idToken.claims.email + "! You just logged in! :)");
				},
				//TODO: Facing error AuthSdkError "Unable to retrieve OAuth redirect params cookie"
				function error(err) {
					debugger
					kony.print(err);
				}
			)
		}

    },

    modelChange: function(/*widgetModel, propertyChanged, propertyValue*/) {
    }
};
