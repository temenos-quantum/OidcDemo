define(["main"], function(main){

	return{

		preShow: function(){
			//If the user has already logged in, go to home screen.
			if(main.getIdentity().usePersistedLogin()) {
				(new kony.mvc.Navigation("home")).navigate()
			}
		},

		postShow: function(){
			this.view.loginButton.onClick = () => {
				(new kony.mvc.Navigation("login")).navigate()
			}
		},

		onNavigate: function(){
			this.view.preShow = this.preShow
			this.view.postShow = this.postShow
		}
	};
});
