define([], function(){

	return{

		preShow: function(){},

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
