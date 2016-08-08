var BaseModule = function () {

	/**
	 * 
	 */
	this.filter = function (action, data) {
	
		var expectedInputs = action.input;
		var filteredData = {};

	 	for (var key in expectedInputs){
			if (typeof data[key] == 'undefined')
				continue;
			filteredData[key] = data[key];
		}
		return filteredData;
	}

	/**
	 * Sample input:
	 * {
	 * 		msg: 'Group created successfully',
	 * 		data: {
	 * 			groupID: 3,
	 * 			name: 'devs'
	 * 		}
	 * }
	 */
	this.success = function (msg, data) {
		return { error: false, msg: msg, data: data };
	}

	/**
	 * Sample input:
	 * {
	 * 		msg: 'Failed to create group.',
	 * 		data: null
	 * }
	 */
	this.error = function (msg, data) {
		return { error: true, msg: msg, data: data};
	}
}

module.exports = new BaseModule();