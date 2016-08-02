var ymljs = require('yamljs');

module.exports = {
	/**
	 * Sample input:
	 * filePath = '/user-module.yml'
	 */
	load: function (filePath) {
		var filePath = '../meta' + filePath;
		var jsonObj = ymljs.load(filePath);
		return jsonObj;
	}
}