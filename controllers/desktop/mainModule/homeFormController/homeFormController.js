define(["main"], function(main){

	return{

		preShow: function(){},

		postShow: function(){

			//Fetch the user profile.
			var idp = kony.sdk.getDefaultInstance().getIdentityService("MyOktaIdP")
			main.getIdentity().getProfile(true,
				response => { //onSuccess
				this.view.profileLabel.text = response.user_attributes.given_name
				//Note: You can also get other profile info —e.g. family_name, locale, email and more. 
			},
			e => { //onFailure
				(new kony.mvc.Navigation("error", e)).navigate()
			})
		},

		onNavigate: function(){
			this.view.preShow = this.preShow
			this.view.postShow = this.postShow
		}
	};
});
