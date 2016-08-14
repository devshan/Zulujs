var MySQLStore = require('./MySQLStore');

var store = function(dbConnectionMeta) {

	this.setAdapter = function() {
		//if already adapter is set then return
		if (this.adapter)
			return;

		switch (dbConnectionMeta.type) {
			case "mysql":
				this.adapter = MySQLStore;
			break;

			case "mongo":
				throw("Mongo database not supported yet.");
			break;

			default:
				throw("Unsupported database.");
		}

	}

	/*
		inserting a record
	 */
	this.create = function (meta, data) {
		this.setAdapter();
		//TODO: validate data
		return this.adapter.create(dbConnectionMeta, meta, data);
	}

	/*
		deleting a record
	 */
	this.delete = function(meta, data) {
		this.setAdapter();
		//TODO: validate data
		return this.adapter.delete(dbConnectionMeta, meta, data);
	}

	/*
		updating a record
	 */
	this.update = function(meta, data) {
		this.setAdapter();
		//TODO: validate data
		return this.adapter.update(dbConnectionMeta, meta, data);
	}

	/*
		find a record
	 */
	this.query = function(meta, data) {
		this.setAdapter();
		//TODO: validate data
		return this.adapter.query(dbConnectionMeta, meta, data);
	}

}

module.exports = store;