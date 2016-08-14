var emitter = require('../../zulu-lib/EventEmitter');
var Promise = require("bluebird");
/**
 * add module entry paths here
 * eg: modules
 */
var modulePaths = [
	'../modules/user.js'
];

/**
 * TODO: remove duplicate actions
 */
module.exports = {

	register: function () {
		this.loadedModules = {};
		emitter.loadedModules = {};
		for (var i = 0; i < modulePaths.length; i++) {

			var tmpModule = require(modulePaths[i]);
			for (var key in tmpModule) {

				if (key != key.toUpperCase())
					continue;

				var func = tmpModule[key];
				emitter.loadedModules[key] = func;
				this.loadedModules[key] = func;
				emitter.on(key, function (data, langObj) {
					func(data, langObj);
				});
			}
		}
	},

	dispatch: function (action, data, langObj) {
		emitter.emit(action, data, langObj);
	},

	getResult: function (action, data, langObj) {
		// return new Promise(function (resolve, reject) {
		// 	this.loadedModules[action].then(function (result) {
		// 		resolve(result);
		// 	}).catch(function (error) {
		// 		reject(error);
		// 	});
		// });
		
		var func = this.loadedModules[action];
		return func(data, langObj);
	}
};