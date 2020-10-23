define(function () {

	//TODO: Move this into kronin.
	function isBrowser(widget){

		if(typeof widget === "undefined") {
			throw new Error("Must provide a widget")
		}
		else {
			return (widget.wType && widget.wType.toUpperCase() === "BROWSER") || (
				typeof widget.evaluateJavaScriptAsync === "function" &&
				typeof widget.getHTMLFilesInWebFolder === "function"
			);
		}
	}

	return isBrowser;
});
