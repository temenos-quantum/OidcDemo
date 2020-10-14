define([], function(){

	const DEFAULT_MESSAGE = "Unknown error."
	return{

		preShow: function(){},

		postShow: function(){
			this.view.errorMessageArea.text = JSON.stringify(this.message)
			this.view.topHeader.onCancel = () => {
				(new kony.mvc.Navigation("landing")).navigate()
			}
		},

		onNavigate: function(context, goingBack){
			this.message = context? (context.message || context.error || DEFAULT_MESSAGE) : DEFAULT_MESSAGE
			this.view.preShow = this.preShow
			this.view.postShow = this.postShow
		}
	};
});
