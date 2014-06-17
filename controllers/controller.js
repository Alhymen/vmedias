var Url = require('url');
var ContextPrototype = require('../context');
var fs = require("fs");

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

		var dossierControllers = "./controllers";

		var directoryControllers = fs.readdirSync(dossierControllers);
		for (var i in directoryControllers) {
			var controllerName = directoryControllers[i].replace(".js", "");
			if (controllerName != "controller")
				this.controllers[controllerName] = require("./" + directoryControllers[i]);
			
		}
	},

	// Analyses and Executes the request of the client
	ExecuteRequest: function (request, response) {

		var that = this;

		console.log("url 10 : " + request.url.substr(0, 9));

		if (request.url == "/favicon.ico") {
			response.end();
			return;
		}

		if (request.url.substr(0, 9) == "/contents") {
			//this.context.response.writeHead(200, { "Content-Type": "text/html" });
			response.write(fs.readFileSync("." + request.url));
        	response.end();
        	return;
        }

        var req,
			// We Get the controller name, the action name and the arguments
			url = Url.parse(request.url, true),
			args = url.query;

        	

        req = that.requestService.GetControllerAndAction(url.pathname);
        var controller = new that.controllers[req.controller + "Controller"]();
        var context = new ContextPrototype();

        context.args = args;
        context.response = response;
        context.isAjax = req.ajax;

        context.securiteService = that.securiteService;
        context.errorService = that.errorService;
        context.requestService = that.requestService;
        context.templateService = that.templateService;

        context.actionName = req.action;
        context.controllerName = req.controller + "Controller";
        context.url = url;

        controller.Init(context);
        controller[req.action]();

	}
};
module.exports = new Controller();