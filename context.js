function Context() { }

Context.prototype = {
	securiteService : null,
	errorService: null,
	requestService: null,
	templateService: null,
	args: {},
	response: null,
	isAjax: null,
	actionName: null,
	controllerName: null,
	url: null
};

module.exports = Context;