var http = require("http");
var controller = require("./controllers/controller");
var securiteService = require("./services/securiteService");
var errorService = require("./services/errorService");
var requestService = require("./services/requestService");
var templateService = require("./services/templateService");

controller.Init(securiteService, errorService, requestService, templateService);

http.createServer(function (request, response) { controller.ExecuteRequest(request, response) }).listen(8080);
