define(["core/getSdk", "core/getIdp"], function (getSdk, getIdp) {

	const cfg = {
        idp: "MyOktaIdP"
		//TODO: Add other services.
    }

	function getIdentity(){
		//TODO: Get a different idp depending in channel?
		return getIdp(cfg.idp)
	}

    return {
        getIdentity
    };
});