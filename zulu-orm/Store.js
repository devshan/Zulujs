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

	this.create = function (meta, data) {
		this.setAdapter();
		//TODO: validate data
		return this.adapter.create(dbConnectionMeta, meta, data);
	}

	this.delete = function(meta, data) {
		this.setAdapter();
		//TODO: validate data
		return this.adapter.delete(dbConnectionMeta, meta, data);
	}

	this.update = function(meta, data) {
		this.setAdapter();
		//TODO: validate data
		return this.adapter.update(dbConnectionMeta, meta, data);
	}

	this.query = function(meta, data) {
		this.setAdapter();
		//TODO: validate data
		return this.adapter.query(dbConnectionMeta, meta, data);
	}

}

module.exports = store;