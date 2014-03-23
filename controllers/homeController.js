var mysql = require('mysql');

function homeController() { }

homeController.prototype = {
	Init: function () {
	},
	index: function () {
		var client = mysql.createConnection({
			host: 'f70969e1-ba35-42aa-a31a-a2e801344c87.mysql.sequelizer.com',
			user: 'oozlsaowbpyfpjje',
			password: 'UPFnynJ7PtNnBwDmSegtBgYAx8YJmQGBXkjentAu85UwvuyNgTCFpcQNXeWyv8T7',
			database: 'dbf70969e1ba3542aaa31aa2e801344c87',
		});

		client.connect(function (err) {
			var query = client.query('select * from valentinosony', function (err, result) {
				return result;
			});
		});
	},
	detail: function () {
		return "";
	}
}

module.exports = new homeController();