/*exported OktaLogin*/
var OktaLogin = {

	oktaDivId: "okta_login",

    initializeWidget: function(parentNode /*, widgetModel, config*/) {
		kony.print("OktaLogin: initialising widget")

		/*The Okta CSS can be loaded from the CDN without issues.*/
		parentNode.innerHTML = `<link
			href="https://global.oktacdn.com/okta-signin-widget/4.3.2/css/okta-sign-in.min.css"
			type="text/css" rel="stylesheet"/>
		`
		/*Loading the Okta JS from CDN won't work because it will define OktaSignIn as a RequireJs module, which can only be
		loaded from another RequireJs module. Could this wrapper be defined as an RequireJs module?
		For now, the quick workaround is to manually download the Okta JS lib into a component and load it from the component's controller.*/
		//parentNode.innerHTML += `<script src="https://global.oktacdn.com/okta-signin-widget/4.3.2/js/okta-sign-in.min.js" type="text/javascript" async="async"></script>`

		/*Create is the div in which the Okta login screen will be loaded*/
		parentNode.innerHTML += `<div
			id="${this.oktaDivId}"
			style="border: 1px solid red;background-color: red">
		</div>`
		//parentNode.innerHTML += `<div id="${this.oktaDivId}"></div>`

		/*Note: Requiring the script by manipulating the DOM does not work because of the same AMD issue as above.*/
		/*var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://global.oktacdn.com/okta-signin-widget/4.3.2/js/okta-sign-in.min.js";
		//script.innerHTML = 'alert(1)';
		document.getElementsByTagName('head').item(0).appendChild(script);
		*/

		/*------------------------------------------------
		// Load the HTML and script as an object.
		var loc = window.location;
		var baseUrl = loc.protocol + "//" + loc.host + "/" + loc.pathname.split('/')[1];
		var okta_login_uri = baseUrl + "/desktopweb/web/localfiles/okta_login.html"
		//e.g: http://127.0.0.1:9989/OidcDemo/desktopweb/web/localfiles/okta_login.html
		parentNode.innerHTML = `<object data="${okta_login_uri}" width="100%" height="100%"></object>`
		*/

		/*-----------------------------------------------
		//Using AJAX won't work because the script in the content returned won't run.
		var req = new XMLHttpRequest();
		req.onreadystatechange = () => {
			if (req.readyState === XMLHttpRequest.DONE) {
				if (req.status === 200) {
					alert(req.responseText);
					parentNode.innerHTML = req.responseText
				} else {
					alert('There was a problem with the request.');
				}
			}
		}
		req.open('GET', okta_login_uri);
		req.send();
		*/
    },

    modelChange: function(/*widgetModel, propertyChanged, propertyValue*/) {
    }
};
