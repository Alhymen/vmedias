function BenchmarkService () {
}

BenchmarkService.prototype = {
	Execute: function (name, func, nbRepeat) {
		var startTime,
			stopTime,
			timeLaps;

		console.log("Début de " + name);

		nbRepeat = nbRepeat || 10000;
		
		startTime = new Date();
		
		
		for (var i = 0; i < nbRepeat; i++) {
			func();
		}

		stopTime =  new Date();
		
		timeLaps = stopTime.getTime() - startTime.getTime();

		console.log("temps effectué pour l'action " + name + " : " + parseInt(timeLaps / 10) / 100 + " secondes.");

		return timeLaps;
	},
	Compare: function (name1, name2, func1, func2, nbRepeat) {
		var timeLaps1 = this.Execute(name1, func1, nbRepeat),
			timeLaps2 = this.Execute(name2, func2, nbRepeat);

		if (timeLaps1 > timeLaps2)
			this.ShowResult(name2, timeLaps2, timeLaps1);
		else
			this.ShowResult(name1, timeLaps1, timeLaps2);
	
	},
	ShowResult: function (name, timeLaps1, timeLaps2) {
		console.log("La fonction " + name + " est plus rapide de " + parseInt((1 - (timeLaps1 / timeLaps2)) * 10000) / 100 + "%.");
	}
}

module.exports = new BenchmarkService();
