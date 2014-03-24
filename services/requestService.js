function RequestService() { }


RequestService.prototype = {
	Init: function (uri, response) {
		this.uri = uri;
		this.response = response;
	},
	// Get the controller and the action from an URI
	GetControllerAndAction: function () {
		
		this.controller = null;
		this.action = null;

		var len = this.uri.length;

		if (len >= 1) {
			if (this.uri == '/')
				return ({ Controller: 'home', Action: 'index' })
			if (this.uri[0] == '/' && (len > 1)) {
				this.uri = this.uri.substr(1, len - 1);
				var posSlash = this.uri.indexOf('/');
				if (posSlash > 0) {
					this.controller = this.uri.substr(0, posSlash);
					this.action = this.uri.substr(posSlash + 1, len);
				}
				else {
					this.controller = this.uri;
					this.action = 'index';
				}
				return ({ Controller: this.controller, Action: this.action });
			}
		}

		throw "error url";
	},
	View: function(res) {
		this.response.writeHead(200, { "Content-Type": "text/plain" });
		this.response.write(res);
		this.response.end();
	}
}

module.exports = RequestService;