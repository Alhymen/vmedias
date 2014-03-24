var mysql = require('mysql');

function homeController() { }

function Context(response) {
	this.Return = function (resp) {
		response.writeHead(200, { "Content-Type": "text/plain" });
		response.write(resp);
		response.end();
	}
}

homeController.prototype = {
	_context: null,
	Init: function (context) {
		this._context = context;
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
				Context.View(query);
				Context.Model(query);
			});
		});
	},
	detail: function () {
		return "";
	}
}

module.exports = new homeController();