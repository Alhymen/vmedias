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
				context.model = mongo.getclient();
				templateservice.write(context);
				that._contextService.requestService.View(results[0].nom);
			});
		});

		
	},
	detail: function () {
		
	}
}

module.exports = new homeController();
























//function getUlClients(client) {
//	var ulRet;

//	ulRet = cache.get("getUlClients", "clients", function () {
		
//		var ul = "<ul>";
//		for (var client in clients) {
//			ul += "<li>" + client.nom + "</li>";
//		}

//		ul += "</ul>";

//		return ul;
//	});

//	return ulRet;
//}

//function getDivClients(client) {
//	var divRet;

//	divRet = cache.get("getDivClients", "clients", function () {
		
//		var div = "<div>";
//		for (var client in clients) {
//			div += "<div>" + client.nom + "</div>";
//		}

//		ul += "</div>";

//		return div;
//	});

//	return divRet;
//}

//function updateClient() {
//	mongo.client.update({});
//	cache.update("clients");
//}


///*
//getUlClients() =>

//<ul>
//	<li>a</li>
//	<li>b</li>
//	<li>c</li>
//	<li>d</li>
//</ul>

//*/








