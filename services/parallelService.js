function ParallelService() { }

// Service which puts in parallel functions
ParallelService.prototype = {
	// The queue of callbacks
	CallBackQueue: [],
	// Takes the callback of Queue  and execute it
	Run: function () {
		var that = this;
		if (this.CallBackQueue.length) {
			process.nextTick(function () {
				that.CallBackQueue.shift()();
				that.Run();
			});
		}
	},

	// Creates a new instance of ParallelService and starts the parallelism mechanics
	RunNew: function (callBack) {
		var newParallel = new ParallelService();

		newParallel.CallBackQueue.push(callBack);
		newParallel.Run();

		return newParallel;
	},

	// Adds a new callback to queue
	Continue: function (callBack) {
		if (!this.CallBackQueue.length) {
			this.CallBackQueue.push(callBack);
			this.Run();
		}

		this.CallBackQueue.push(callBack);

		return this;
	}
}

module.exports = new ParallelService();