var underscore = require("underscore"),
    path = require("path"),
    url = require("url"),
    fs = require("fs");

function TemplateService() {
}

TemplateService.prototype = {
    DisplayViewHTML: function(pathTemplate, params) {
//        var self = this;
        var dataPage = fs.readFileSync(pathTemplate);
        if (!dataPage) {
            throw "error";
        }
        // see with / no-with statement, best use is with "no-with". for this purpose, we need to add a reference object to underscore (this)
        underscore.extend(underscore.templateSettings, { variable: "that" } );
        // precompile is a better choice than templates sections
        var preCompilePage = underscore.template(dataPage.toString('utf8', 0, dataPage.length));
        var page = { "renderBody": preCompilePage(params) };

        dataMaster = fs.readFileSync("./views/shared/master.tpl");
        if (!dataMaster) {
        	throw "error";
        }

        var preCompileMaster = underscore.template(dataMaster.toString('utf8', 0, dataMaster.length));
        return preCompileMaster(page);
    },
    DisplayViewJSON: function(params) {
        return params;
    }
};

module.exports = new TemplateService();