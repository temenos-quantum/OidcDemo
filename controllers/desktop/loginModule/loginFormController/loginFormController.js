define([], function(){

	return{

		preShow: function(){},

		postShow: function(){
			this.view.topHeader.onCancel = () => {
				(new kony.mvc.Navigation("landing")).navigate()
			}
			
			//Get a reference to the identity service.
			var idp = kony.sdk.getDefaultInstance().getIdentityService("MyOktaIdP")
			idp.login({ //Options
				//Reference to the browser widget in which the login screen must be rendered.
				browserWidget: this.view.loginBrowser
			},
			() => { //Success
				//Take the user to the home screen.
				(new kony.mvc.Navigation("home")).navigate()
			},
			e => { //Failure
				//Take the user to the error screen to show the error message.
				var message = `${e.message}\n${e.stack}`
				kony.print(message);
				(new kony.mvc.Navigation("error", {message})).navigate()
			})
		},

		onNavigate: function(){
			this.view.preShow = this.preShow
			this.view.postShow = this.postShow
		}
	};
});
