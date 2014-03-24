var http = require("http");
var controller = require("./controllers/controller");


//var benchmark = require("./services/benchmark");

//var mongo = require('mongodb');

//var MongoClient = mongo.MongoClient;
//var Db = mongo.Db, Connection = mongo.Connection, Server = mongo.Server;
//var myCollection;
//var db = MongoClient.connect("mongodb://localhost:" + Connection.DEFAULT_PORT + "/vmedias", function (err, db) {
//	if (err)
//		throw err;
//	console.log("connecter avec MongoDB !");
//	myCollection = db.collection('user');
//	myCollection.find().toArray(function (err, results) {
//		if (err)
//			throw err;
//		console.log("results :", results);
//	});
//});

controller.Init();

http.createServer(function (request, response) { controller.ExecuteRequest(request, response) }).listen(8080);
