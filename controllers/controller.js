var Url = require('url')
var Vm = require('vm');
var Parallel = require('../services/parallelService');
var SecuriteService = require("../services/securiteService");
var ErrorService = require("../services/errorService");
var RequestService = require("../services/requestService");
var TemplateService = require("../services/templateService");
var ContextService = require("../services/contextService");

function Controller() { }
 
// Principal controller
// Parses url and chooses the good controller to call
Controller.prototype = {
	// First method to call in order to configure the master controller
	Init: function () {
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

		var vmContext = null;



		Parallel.RunNew(function () {

			// We Get the controller name, the action name and the arguments
			var url = Url.parse(request.url, true);

			var contextService = new ContextService();
			contextService.Init(new SecuriteService(), new ErrorService(), new RequestService(), new TemplateService());
			contextService.requestService.Init(url.pathname, response);

			var req = contextService.requestService.GetControllerAndAction();
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
			vmContext = {
				resp: '',
				controller: require("./" + req.Controller + "Controller")
			};

			vmContext.controller.Init(contextService);

		}).Continue(function () {
			// We run the action
			Vm.runInNewContext(reqVm, vmContext);
		});
	}
}

module.exports = new Controller();