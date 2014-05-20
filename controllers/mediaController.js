var ControllerCore = require('./controllerCore.js');

function mediaController() { }

mediaController.prototype = ControllerCore.extend({
	list: function () {
		
		var page = this.context.args["page"];

		this.RenderView(page);
	},
	detail: function () {
		return "";
	}
});

module.exports = mediaController;