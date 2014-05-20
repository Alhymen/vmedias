function ControllerCore() { }

ControllerCore.prototype = {
	context: null,
	extend: function (prototype) {
		var prototypeReturn = prototype;
		for (var func in ControllerCore.prototype) {
			prototypeReturn[func] = ControllerCore.prototype[func];
		}
		return prototypeReturn;
	},

	Init: function (context) {
		this.context = context;
	},

	GetTemplatePath: function (name) {
		return "./views/" + this.context.controllerName + "/" + name + ".tpl";
	},

	RenderView: function (model) {

		if (!this.context.isAjax) {
			result = this.context.templateService.DisplayViewHTML(this.GetTemplatePath(this.context.actionName), model);
		}
		else {
			result = this.context.templateService.DisplayViewJSON(model);
		}


		this.context.response.writeHead(200, { "Content-Type": "text/html" });
		this.context.response.write(result);
		this.context.response.end();
	}
};

module.exports = new ControllerCore();