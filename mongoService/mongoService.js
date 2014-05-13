
var benchmark = require("./services/benchmark");

var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var Db = mongo.Db, Connection = mongo.Connection, Server = mongo.Server;
var myCollection;
var db = MongoClient.connect("mongodb://localhost:" + Connection.DEFAULT_PORT + "/vmedias", function (err, db) {
	if (err)
		throw err;
	console.log("connecter avec MongoDB !");
	myCollection = db.collection('user');
	myCollection.find().toArray(function (err, results) {
		if (err)
			throw err;
		console.log("results :", results);
	});
});


