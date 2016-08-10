var base = require('../../zulu-lib/BaseModule');
var Store = require('../../zulu-lib/Store');
var Promise = require("bluebird");
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

// AppDispatcher.dispatch({
// 	data: data,
// 	action: 'CREATE_INVOICE',
// 	langObj: langObj
// });
module.exports = _.extend({}, EventEmitter.prototype, {

	CREATE_GROUP: function (data, langObj) {

		var store = new Store(meta.user.DATABASE);
		return new Promise(function (resolve, reject) {
			store.create(meta.user['ENTITY GROUP'], data).then(function (result) {
				logger.info(result);
				resolve(base.success(langObj.translate('Group created successfully !!!'), result));
			}).catch(function (error) {
				reject(base.error(langObj.translate('Failed to create group !!!'), error));
			});
		});
	}
});