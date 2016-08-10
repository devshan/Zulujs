var AppDispatcher = require('../../zulu-lib/Dispatcher');

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

		for (var i = 0; i < modulePaths.length; i++) {

			var tmpModule = require(modulePaths[i]);
			for (var key in tmpModule) {

				if (key != key.toUpperCase())
					continue;

				var func = tmpModule[key];
				AppDispatcher.register(function(payload) {
				  if (payload.action === key) {
				    func(payload.data, payload.langObj);
				  }
				});
			}
		}
	}
}