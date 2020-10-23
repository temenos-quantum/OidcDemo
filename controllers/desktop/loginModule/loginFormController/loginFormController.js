define(["main", "loginModule/login_web"], function(main, login){

	return{

		preShow: function(){},

		postShow: function(){
			this.view.topHeader.onCancel = () => {
				(new kony.mvc.Navigation("landing")).navigate()
			}
			
			login(true).then(() => { //Success
				(new kony.mvc.Navigation("home")).navigate()
			}).catch( e => { //Failure
				debugger
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
