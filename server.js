#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var templateSystem = new (require ("template"))();

//var http    = require('http');

/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };

        self.routes['/ressources/*'] = function(req, res) {
			if (req.headers["if-none-match"]) {
				res.writeHead(304, {"Content-Type": "text/javascript", "etag" : "33030"});
				res.end ();
			}
			else {
				fs.open("ressources/" + req.params[0], "r", function(err, fd) {
					if (err) {
						console.log ("ERREUR : n°" + err.errno + ":" + err.code + " path : " + err.path);
						// TODO envoyer exception à log avec err.errno, err.code et err.path
						return;
					}
					fs.fstat(fd, function(err, stats) {
						var bufferSize=stats.size,
							buffer=new Buffer(bufferSize);

						fs.read(fd, buffer, 0, bufferSize, 0, function (err, bytesRead, bufferRead){
							var content = bufferRead.toString('utf8', 0, bytesRead);
							res.writeHead(200, {"Content-Type": "text/javascript", "etag" : "33030"});
							res.end (content);
						});
					});
				//fs.close(fd); TODO fermer tous les fichiers avant de supprimer le dossier à la fin de vie du serveur
				});		
			}
        };

        self.routes['/images/*'] = function(req, res) {
			console.log ("image !!!");
/*			if (req.headers["if-none-match"]) {
				res.writeHead(304, {"Content-Type": "image/png", "etag" : "33030"});
				res.end ();
			}
			else {*/
				fs.open("images/" + req.params[0], "r", function(err, fd) {
					if (err) {
						console.log ("ERREUR : n°" + err.errno + ":" + err.code + " path : " + err.path);
						// TODO envoyer exception à log avec err.errno, err.code et err.path
						return;
					}
					fs.fstat(fd, function(err, stats) {
						var bufferSize=stats.size,
							buffer=new Buffer(bufferSize);

						fs.read(fd, buffer, 0, bufferSize, 0, function (err, bytesRead, bufferRead){
							res.writeHead(200, {"Content-Type": "image/png", "etag" : "33030"});
							res.end (bufferRead, "binary");
						});
					});
				//fs.close(fd); TODO fermer tous les fichiers avant de supprimer le dossier à la fin de vie du serveur
				});		
//			}
        };
		
        self.routes['/ajax/*'] = function(req, res) {
			console.log ("requete ajax !");
			if (req.params[0]=="" || req.params[0]=="index.html"){
				res.writeHead(200, {"Content-Type": "application/json"});
				res.end ('{"content":"<a href=\\"./lien1.html\\">lien 1</a><br /><a href=\\"./lien2.html\\"><img src=\\"./images/header_1.png\\"></img></a><br />"}');
			}
			if (req.params[0]=="lien1.html"){
				res.writeHead(200, {"Content-Type": "application/json"});
				res.end ('{"content":"coucou lien 1 !<br /><a href=\\"./index.html\\">retour à l\'accueil</a>"}');
			}
			if (req.params[0]=="lien2.html"){
				res.writeHead(200, {"Content-Type": "application/json"});
				res.end ('{"content":"coucou lien 2 !<br /><a href=\\"./index.html\\">retour à l\'accueil</a>"}');
			}
			// TODO recuperation du modele
			// envoie du JSON du modele au client
			
		}

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/lien1.html'] = self.routes['/'] = function(req, res) {
/*			if (req.headers["if-none-match"]) {
				res.writeHead(304, {"Content-Type": "text/html", "etag" : "5483-1387485461001"});
				res.end ();
			}
			else {*/
				templateSystem.Get ("lien1.tpl", {}, function (content){
					res.writeHead(200, {"Content-Type": "text/html", "etag" : "5483-1387485461001"});
					res.end (content);
				});
//			}
        };
		
        self.routes['/lien2.html'] = self.routes['/'] = function(req, res) {
/*			if (req.headers["if-none-match"]) {
				res.writeHead(304, {"Content-Type": "text/html", "etag" : "5483-1387485461002"});
				res.end ();
			}
			else {*/
				templateSystem.Get ("lien2.tpl", {}, function (content){
					res.writeHead(200, {"Content-Type": "text/html", "etag" : "5483-1387485461002"});
					res.end (content);
				});
//			}
        };

        self.routes['/index.html'] = self.routes['/'] = function(req, res) {
/*			if (req.headers["if-none-match"]) {
				res.writeHead(304, {"Content-Type": "text/html", "etag" : "5483-1387485461000"});
				res.end ();
			}
			else {*/
				templateSystem.Get ("index.tpl", {}, function (content){
					res.writeHead(200, {"Content-Type": "text/html", "etag" : "5483-1387485461000"});
					res.end (content);
				});
//			}
        };
		
	    self.routes['/hello.html'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.end('Hello World\n');
        };
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express();

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
		if (typeof(http) != 'undefined') {
			http.createServer(function (request, response) {
				response.writeHead(200, {'Content-Type': 'text/plain'});
				response.end('Hello World\n');
			}).listen(8080);
		}
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();

