function mediaController() { }

mediaController.prototype = {
	Init: function () {
	},
	list: function (page) {
		return page;
	},
	detail: function () {
		return "";
	}
}

module.exports = new mediaController();