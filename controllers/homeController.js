var ControllerCore = require('./controllerCore.js');

function HomeController() { }

HomeController.prototype = ControllerCore.extend ({
	index: function () {
    }
});

module.exports = HomeController;