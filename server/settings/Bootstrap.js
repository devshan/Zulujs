var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var baseModule = require('../../zulu-lib/BaseModule');

module.exports = {
	
	boot: function (app) {

		global.logger = require('../../zulu-lib/Logger');
		global.meta = {};

		fs.readdirSync(__dirname + '/../../meta/').reduce(function(list, file) {
			var pathString = path.join(__dirname + '/../../meta/', file);
			var isDir = fs.statSync(pathString).isDirectory();
			var fileName = file.substring(0, file.length - 4);
			meta[fileName] = pathString;
	    }, []);

	    for (var key in meta ) {
	    	meta[key] = yaml.safeLoad(fs.readFileSync(meta[key], 'utf8'));
	    }

		app.get('/*', function (req, res) {
		    var urlTokens = req.originalUrl.trim().split('/');
		    var moduleName = urlTokens[1];
		    var action = urlTokens[2];
		    
		    var module = require('../modules/' + moduleName);
		    var func = module[action];
		    var response = func(req.body);
		    res.send(response);
		});

		app.post('/*', function (req, res) {

		    var urlTokens = req.originalUrl.trim().split('/');
		    var moduleName = urlTokens[1];
		    var action = urlTokens[2];
		    
		    var module = require('../modules/' + moduleName);
		    var func = module[action];
		    var data = req.body.data;
		    var actionMeta = meta[moduleName]['ACTION ' + req.body.action];

		    var filteredInputData = baseModule.filter(actionMeta, data);
		    var response = func(filteredInputData);

		    res.send(response);
		});

		app.put('/*', function (req, res) {
		    var urlTokens = req.originalUrl.trim().split('/');
		    var moduleName = urlTokens[1];
		    var action = urlTokens[2];
		    
		    var module = require('../modules/' + moduleName);
		    var func = module[action];
		    var response = func(req.body);
		    res.send(response);
		});

		app.delete('/*', function (req, res) {
		    var urlTokens = req.originalUrl.trim().split('/');
		    var moduleName = urlTokens[1];
		    var action = urlTokens[2];
		    
		    var module = require('../modules/' + moduleName);
		    var func = module[action];
		    var response = func(req.body);
		    res.send(response);
		});
	}
}