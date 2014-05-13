function RequestService() { }


RequestService.prototype = {
	// Get the controller and the action from an URI
	GetControllerAndAction: function (uri) {
		var len = uri.length;
		if (len >= 1) {
			if (uri == '/')
				return ({ controller: 'home', action: 'index', ajax : false});
			if (uri[0] == '/' && (len > 1)) {
                var controller,
                    action,
    				newUri = uri.substr(1, len - 1);
				var posSlash = newUri.indexOf('/');
				if (posSlash > 0) {
					controller = newUri.substr(0, posSlash);
					action = newUri.substr(posSlash + 1, len);
				}
				else {
					controller = newUri;
					action = 'index';
				}
				return ({ controller: controller, action: action, ajax : false });
			}
		}
		throw "error url";
	}
};

module.exports = new RequestService();