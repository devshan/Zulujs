var mysql = require('mysql');
var Promise = require("bluebird");
var validator = require("./Validator");

module.exports = {

	create: function(connectConfigs, meta, data) {

		var connection = mysql.createConnection(connectConfigs);
		var tableName = meta.name.plural;
		var primarykeyField = meta.primaryKey;

		return new Promise(function (resolve, reject) {

			var result = validator.validate('create', meta, data);
			if (result.error) {
				reject(result);
				return;
			}

			connection.query('INSERT INTO ' + tableName + ' SET ?', data, function (err, result) {
				if (err) {
					reject(err);
				} else {
					//fetch the created object and return
					connection.query('SELECT * FROM ' + tableName + ' WHERE ' + primarykeyField + '=' + result.insertId, function (error, createdObjs) {
						connection.end();
						if (error) {
							reject(error);
						} else {
							resolve(createdObjs[0]);
						}
					});
				}
			});
		});
	},

	delete: function(connectConfigs, meta, data) {

		var connection = mysql.createConnection(connectConfigs);
		var tableName = meta.name.plural;
		var primarykeyField = meta.primaryKey;
		var primarykeyValue = data[primarykeyField];

		return new Promise(function(resolve, reject) {

			var result = validator.validate('delete', meta, data);
			if (result.error) {
				reject(result);
				return;
			}

			connection.query('DELETE FROM ' + tableName + ' WHERE ' + primarykeyField + '=' + primarykeyValue, function (err, result) {
				connection.end();
				if (err) {
					reject(err);
				} else {
					resolve(result.affectedRows);
				}
			});
		});
	},

	update: function(connectConfigs, meta, data) {

		var connection = mysql.createConnection(connectConfigs);
		var tableName = meta.name.plural;
		var primarykeyField = meta.primaryKey;
		var fields = '';
		var paramValues = [];

		for (var key in data) { 
			if (key == primarykeyField) {
				continue;
			} 
			paramValues.push(data[key])
		    fields = fields + key + '=?,' ;
		}

		fields = fields.substring(0, fields.length - 1);
		var queryString = 'UPDATE ' + tableName + ' SET ' + fields + ' WHERE ' + primarykeyField + '=?';
		paramValues.push(data[primarykeyField]);

		return new Promise(function(resolve, reject) {

			var result = validator.validate('update', meta, data);
			if (result.error) {
				reject(result);
				return;
			}

			connection.query(queryString, paramValues, function (err, result) {
				connection.end();
				if (err) {
					reject(err);
				} else {
					//fetch the created object and return
					connection.query('SELECT * FROM ' + tableName + ' WHERE ' + primarykeyField + '=' + data[primarykeyField], function (error, createdObjs) {
						connection.end();
						if (error) {
							reject(error);
						} else {
							resolve(createdObjs[0]);
						}
					});
				}
			});
		});
	}
}