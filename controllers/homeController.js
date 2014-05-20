var ControllerCore = require('./controllerCore.js');

function HomeController() { }

HomeController.prototype = ControllerCore.extend ({
	index: function () {
		var model = "hello word";

		this.RenderView(model);
    }
});

module.exports = HomeController;