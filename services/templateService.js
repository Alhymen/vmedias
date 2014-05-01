var underscore = require("underscore"),
    path = require("path"),
    url = require("url"),
    fs = require("fs");

function TemplateService() {
}

TemplateService.prototype = {
    DisplayViewHTML: function(pathTemplate, params) {
//        var self = this;
        var data = fs.readFileSync(pathTemplate);
        if (!data){
            throw "error";
        }
        // see with / no-with statement, best use is with "no-with". for this purpose, we need to add a reference object to underscore (this)
        underscore.extend(underscore.templateSettings, { variable: "that" } );
        // precompile is a better choice than templates sections
        var preCompile = underscore.template (data.toString('utf8', 0, data.length));
        return preCompile(params);
    },
    DisplayViewJSON: function(params) {
        return params;
    }
};

module.exports = new TemplateService();