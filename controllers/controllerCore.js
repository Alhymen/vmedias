function ControllerCore () { }

ControllerCore.prototype = {
    contextService: null,
    nameController: null,
    extend : function(prototype) {
        var prototypeReturn = prototype;
        for (var func in ControllerCore.prototype){
            prototypeReturn[func] = ControllerCore.prototype[func];
        }
        return prototypeReturn;
    },
    Init: function (nameController, contextService) {
        this.nameController = nameController;
        this.contextService = contextService;
    },
    GetTemplatePath: function(name){
        return "./views/" + this.nameController + "/" + name + ".tpl";
    },
    RenderView: function(res, response) {
        // TODO gérer 302 via les etags et 200
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(res);
        response.end();
    }
};

module.exports = new ControllerCore();