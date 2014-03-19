function homeController() { }

homeController.prototype = {
	Init: function () {
	},
	index: function () {

		return process.env.OPENSHIFT_MYSQL_DB_URL || "looooooooooooooooooool";
	},
	detail: function () {
		return "";
	}
}

module.exports = new homeController();