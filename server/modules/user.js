var base = require('../../zulu-lib/BaseModule');
var Store = require('../../zulu-lib/Store');
var Dispatcher = require('../settings/Dispatcher');
var Promise = require("bluebird");

module.exports = {

	CREATE_GROUP: function (data, langObj) {

		var store = new Store(meta.user.DATABASE);
		return new Promise(function (resolve, reject) {
			store.create(meta.user['ENTITY GROUP'], data).then(function (result) {
				//logger.info(result);
				resolve(base.success(langObj.translate('Group created successfully !!!'), result));
			}).catch(function (error) {
				reject(base.error(langObj.translate('Failed to create group !!!'), error));
			});
		});
	},

	CREATE_GROUPS: function (data, langObj) {
		return new Promise(function (resolve, reject) {
			logger.info('hi');
			resolve('hello');
		});
	}

};