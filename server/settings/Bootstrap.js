var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var session = require('express-session');
var baseModule = require('../../zulu-lib/BaseModule');
var SessionConfig = require('./SessionConfig');
var Localize = require('localize');
var langObj = new Localize('./translations/');
var moduleRegistry = require('./ModuleRegistry');
var AppDispatcher = require('../../zulu-lib/Dispatcher');

module.exports = {
	
	boot: function (app) {

		//set up logger
		global.logger = require('../../zulu-lib/Logger');

		//load all app related meta data
		global.meta = {};

		//register module action events
		moduleRegistry.register();

		//set session details
		var sessionConfigs = SessionConfig.getSessionConfigs();
		app.use(session(sessionConfigs));

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
		    var language = 'en';

		    //set user language
		    if (req.session && req.session.lang) {
		    	language = req.session.lang;
		    }
		    
		    langObj.setLocale(language);
		    var module = require('../modules/' + moduleName);
		    var func = module[action];
		    var data = req.body.data;
		    var actionMeta = meta[moduleName]['ACTION ' + req.body.action];

		    var filteredInputData = baseModule.filter(actionMeta, data);

		    func(filteredInputData, langObj).then(function (result) {
		    	res.send(result);
		    }).catch(function (error) {
		    	res.send(error);
		    });
		});

		app.post('/*', function (req, res) {

		    var urlTokens = req.originalUrl.trim().split('/');
		    var moduleName = urlTokens[1];
		    var action = req.body.action;
		    var language = 'en';

		    //set user language
		    if (req.session && req.session.lang) {
		    	language = req.session.lang;
		    }
		    
		    langObj.setLocale(language);
		    var module = require('../modules/' + moduleName);
		    var func = module[action];
		    var data = req.body.data;
		    var actionMeta = meta[moduleName]['ACTION ' + req.body.action];

		    var filteredInputData = baseModule.filter(actionMeta, data);

		    func(filteredInputData, langObj).then(function (result) {
		    	res.send(result);
		    }).catch(function (error) {
		    	res.send(error);
		    });
		});

		app.put('/*', function (req, res) {

		    var urlTokens = req.originalUrl.trim().split('/');
		    var moduleName = urlTokens[1];
		    var action = urlTokens[2];
		    var language = 'en';

		    //set user language
		    if (req.session && req.session.lang) {
		    	language = req.session.lang;
		    }
		    
		    langObj.setLocale(language);
		    var module = require('../modules/' + moduleName);
		    var func = module[action];
		    var data = req.body.data;
		    var actionMeta = meta[moduleName]['ACTION ' + req.body.action];

		    var filteredInputData = baseModule.filter(actionMeta, data);

		    func(filteredInputData, langObj).then(function (result) {
		    	res.send(result);
		    }).catch(function (error) {
		    	res.send(error);
		    });
		});

		app.delete('/*', function (req, res) {

		    var urlTokens = req.originalUrl.trim().split('/');
		    var moduleName = urlTokens[1];
		    var action = urlTokens[2];
		    var language = 'en';

		    //set user language
		    if (req.session && req.session.lang) {
		    	language = req.session.lang;
		    }
		    
		    langObj.setLocale(language);
		    var module = require('../modules/' + moduleName);
		    var func = module[action];
		    var data = req.body.data;
		    var actionMeta = meta[moduleName]['ACTION ' + req.body.action];

		    var filteredInputData = baseModule.filter(actionMeta, data);

		    func(filteredInputData, langObj).then(function (result) {
		    	res.send(result);
		    }).catch(function (error) {
		    	res.send(error);
		    });
		});
	}
}