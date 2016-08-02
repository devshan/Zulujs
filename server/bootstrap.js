module.exports = {
	boot: function (app) {

		global.logger = require('../zulu-lib/Logger');
		app.get('/*', function (req, res) {
		    var urlTokens = req.originalUrl.trim().split('/');
		    var moduleName = urlTokens[1];
		    var action = urlTokens[2];
		    
		    var module = require('./modules/' + moduleName);
		    var func = module[action];
		    var response = func({});
		    res.send(response);
		});
	}
}