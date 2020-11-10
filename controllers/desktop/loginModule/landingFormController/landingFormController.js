define(["main", "loginModule/login_okta"], function(main, login){


	return{

		preShow: function(){
			//If the user has already logged in, go to home screen.
			if(main.getIdentity().usePersistedLogin()) {
				(new kony.mvc.Navigation("home")).navigate()
			}
		},

		postShow: function(){
			login('#okta_login')
			.then((profile) => {
				alert("TODO: Navigate to home screen.")
			})
			.catch(error => {
				alert("TODO: Navigate to error screen.")
			})
		},

		onNavigate: function(){
			this.view.preShow = this.preShow
			this.view.postShow = this.postShow
		}
	};
});
