const getBaseUri = (()=>{
	function getBaseUri(){
		if(typeof window !== "undefined"){
			var loc = window.location
			return loc.protocol + "//" + loc.host + loc.pathname
		}
		else{
			throw Error("getBaseUri only works in web apps.")
		}
	}
	return getBaseUri
})()
