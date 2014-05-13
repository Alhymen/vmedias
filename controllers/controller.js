var Url = require('url');
var ContextPrototype = require('../context')

function Controller() { }

// Principal controller
// Parses url and chooses the good controller to call
Controller.prototype = {
	// First method to call in order to configure the master controller
	Init: function (securiteService, errorService, requestService, templateService) {
		this.securiteService = securiteService;
		this.errorService = errorService;
		this.requestService = requestService;
		this.templateService = templateService;

		this.controllers = {};

		var fs = require("fs"), dossierControllers = "./controllers";

		var directoryControllers = fs.readdirSync(dossierControllers);
		for (var i in directoryControllers) {
			var controllerName = directoryControllers[i].replace(".js", "");
			if (controllerName != "controller")
				this.controllers[controllerName] = require("./" + directoryControllers[i]);
			
		}
	},
	// Analyses and Executes the request of the client
	ExecuteRequest: function (request, response) {
		// We ommit the favicon
		if (request.url == "/favicon.ico") {
			response.end();
			return;
		}

		var req,
            // We Get the controller name, the action name and the arguments
            url = Url.parse(request.url, true),
            args = url.query;

		req = this.requestService.GetControllerAndAction(url.pathname);
		// parsing to isolate controller and action names

		var controller = new this.controllers[req.controller + "Controller"]();
		var context = new ContextPrototype();

		context.args = args;
		context.response = response;
		context.isAjax = req.ajax;

		context.securiteService = this.securiteService;
		context.errorService = this.errorService;
		context.requestService = this.requestService;
		context.templateService = this.templateService;

		context.actionName = req.action;
		context.controllerName = req.controller + "Controller";
		context.url = url;

		controller.Init(context);
		controller[req.action]();
	}
};
module.exports = new Controller();