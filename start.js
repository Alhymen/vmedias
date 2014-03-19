var http = require("http");
//var mysql = require('mysql');
var controller = require("./controllers/controller");

var securiteService = require("./services/securiteService");
var errorService = require("./services/errorService");
var requestService = require("./services/requestService");
var templateService = require("./services/templateService");
//var benchmark = require("./services/benchmark");

//var client= mysql.createConnection({
//	host     : 'f70969e1-ba35-42aa-a31a-a2e801344c87.mysql.sequelizer.com',
//	user     : 'oozlsaowbpyfpjje',
//	password : 'UPFnynJ7PtNnBwDmSegtBgYAx8YJmQGBXkjentAu85UwvuyNgTCFpcQNXeWyv8T7',
//	database : 'dbf70969e1ba3542aaa31aa2e801344c87',
//});

//client.connect(function(err) {
//	var post  = {id: 1, title: 'Hello MySQL'};
//	var query = client.query('select * from valentinosony', function(err, result) {
//		console.log(result);
//	});

//});

controller.Init(securiteService, securiteService, requestService, templateService);

http.createServer(function (request, response) { controller.ExecuteRequest(request, response) }).listen(8080);

