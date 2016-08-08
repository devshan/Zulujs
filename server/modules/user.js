var base = require('../../zulu-lib/BaseModule');
var Store = require('../../zulu-lib/Store');

module.exports = {
	
	createGroup: function (data) {
		var store = new Store(meta.user.DATABASE);
		store.create(meta.user['ENTITY GROUP'], data).then(function (result) {
			console.log(result);
		}).catch(function (error) {
			console.log(error);
		});

		return base.success('aaa', data);
	}
}