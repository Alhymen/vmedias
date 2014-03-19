var Url = require('url')
var Vm = require('vm');
var Parallel = require('../services/parallelService');

function Controller() { }
 
// Principal controller
// Parses url and chooses the good controller to call
Controller.prototype = {
	// First method to call in order to configure the master controller
	Init: function (securiteService, errorService, requestService, templateService) {
		this.SecuriteService = securiteService;
		this.ErrorService = errorService;
		this.RequestService = requestService;
		this.TemplateService = templateService;
		this.queue = [];
	},
	// Analyses and Executes the request of the client
	ExecuteRequest: function (request, response) {
		// We ommit the favicon
		if (request.url == "/favicon.ico") {
			response.end();
			return;
		}

		var that = this;
		var reqVm;
		var context;

		Parallel.RunNew(function () {
			// We Get the controller name, the action name and the arguments
			var url = Url.parse(request.url, true);
			var req = that.GetControllerAndAction(url.pathname);
			var args = url.query;

			// We generate the string for the call of the action of a contreoler
			reqVm = "resp = controller." + req.Action + "(";
			for (var arg in args) {
				reqVm += "'" + args[arg] + "',";
			}
			if (reqVm[reqVm.length - 1] == ',')
				reqVm = reqVm.substr(0, reqVm.length - 1);
			reqVm += ");";

			// The context for the execution of the action
			context = {
				resp: '',
				controller: require("./" + req.Controller + "Controller")
			}

		}).Continue(function () {
			// We run the action
			Vm.runInNewContext(reqVm, context);
		}).Continue(function () {
			// We answer the client
			var resp = context.resp;
			response.writeHead(200, { "Content-Type": "text/plain" });
			response.write(resp);
			response.end();
		});
	},
	// Get the controller and the action from an URI
	GetControllerAndAction: function (uri) {
		var len = uri.length;

		if (len >= 1) {
			if (uri == '/')
				return ({ Controller: 'home', Action: 'index' })
			if (uri[0] == '/' && (len > 1)) {
				uri = uri.substr(1, len - 1);
				var posSlash = uri.indexOf('/');
				if (posSlash > 0) {
					return ({ Controller: uri.substr(0, posSlash), Action: uri.substr(posSlash + 1, len) })
				}
				return ({ Controller: uri, Action: 'index' })
			}
		}

		throw "error url";
	}
}

module.exports = new Controller();