define([], function() {

	return {

		preShow: function (){},

		postShow: function (){

			this.view.logoutButton.onClick = () => {
				var idp = kony.sdk.getDefaultInstance().getIdentityService("MyOktaIdP")
				idp.logout(() => { //Success
					(new kony.mvc.Navigation("landing")).navigate()
				}, e => { //Failure
					(new kony.mvc.Navigation("error")).navigate(e)
				})
			}
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.preShow = this.preShow
			this.view.postShow = this.postShow
		},

		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
		}
	};
});