var Url = require('url');
var benchmark=require('../services/benchmarkService');
/*var SecuriteService = require("../services_bis/securiteService");
var ErrorService = require("../services_bis/errorService");
var RequestService = require("../services_bis/requestService");
var TemplateService = require("../services_bis/templateService");
var ContextService = require("../services_bis/contextService");*/
var Vm = require('vm');
function Controller() { }

// Principal controller
// Parses url and chooses the good controller to call
Controller.prototype = {
	// First method to call in order to configure the master controller
	Init: function (contextService) {
        this.contextService=contextService;
        this.controllers = {};
        var fs = require("fs"),
            dossierControllers = "./controllers";

        var directoryControllers = fs.readdirSync(dossierControllers);
        for (var i in directoryControllers) {
            var controllerName = directoryControllers[i].replace (".js", "");
            if (controllerName != "controller") {
                this.controllers[controllerName] = require("./" + directoryControllers[i]);
                this.controllers[controllerName].Init(controllerName.replace ("Controller", ""), contextService);
            }
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

        req = this.contextService.requestService.GetControllerAndAction(url.pathname);
        this.controllers[req.controller+"Controller"][req.action](args, response, req.ajax);
	}
};
module.exports = new Controller();