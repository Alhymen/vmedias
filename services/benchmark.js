var vm = require('vm');

function Benchmark () {
}

Benchmark.prototype = {
	Execute : function (name, func, params, nbRepeat){
		var startTime, stopTime, timeLaps;
		nbRepeat = nbRepeat || 10000;
		
		var reqVm = "func(";
		for (var param in params) {
			reqVm += "'" + params[param] + "',";
		}

		if (reqVm[reqVm.length - 1] == ',')
			reqVm = reqVm.substr(0, reqVm.length - 1);

		reqVm += ");";
		
		var initSandbox = {
			func : func
		}
		var context = vm.createContext(initSandbox);
		startTime = new Date();
		
		for (var i = 0; i < nbRepeat; i++) {
			vm.runInContext (reqVm, context);
		}
		stopTime =  new Date();
		
		timeLaps = stopTime.getTime() - startTime.getTime();
		console.log ("temps effectué pour l'action " + name + " : " + parseInt (timeLaps/10)/100 + " secondes.");
		return timeLaps;
	},
	Compare : function (name, func1, func2, params, nbRepeat){
		var timeLaps1 = this.Execute (name, func1, params, nbRepeat),
		timeLaps2 = this.Execute (name, func2, params, nbRepeat);
		console.log ("La fonction " + (timeLaps1 < timeLaps2 ? 1 : 2) + " est plus rapide de " + parseInt((1 - (timeLaps1 < timeLaps2 ? timeLaps1 / timeLaps2 : timeLaps2 / timeLaps1))*10000)/100 + "%.");
	}
}

module.exports = new Benchmark();
