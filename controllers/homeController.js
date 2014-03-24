var mongo = require('mongodb');

function homeController() { }

homeController.prototype = {
	_contextService: null,
	Init: function (contextService) {
		this._contextService = contextService;
	},
	index: function () {
		var MongoClient = mongo.MongoClient;
		var that = this;
		var Db = mongo.Db,
			Connection = mongo.Connection,
			Server = mongo.Server;

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

				that._contextService.requestService.View(results[0].nom);
			});
		});

		
	},
	detail: function () {
		
	}
}

module.exports = new homeController();