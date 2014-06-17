var ControllerCore = require('./controllerCore.js');

function HomeController() { }

HomeController.prototype = ControllerCore.extend ({
	index: function () {
		var model = {};
		model.name = "sony";

		this.RenderView(model);
    }
});

module.exports = HomeController;