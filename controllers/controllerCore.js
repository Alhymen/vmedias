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

	RenderView: function (res) {
		// TODO gérer 302 via les etags et 200
		this.context.response.writeHead(200, { "Content-Type": "text/html" });
		this.context.response.write(res);
		this.context.response.end();
	}
};

module.exports = new ControllerCore();