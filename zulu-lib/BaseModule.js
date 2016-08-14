var BaseModule = function () {

	/**
	 * Sample input:
	 * {
	 * 	var actionMeta = {
         			     input: {   
                      	 name: 'string',
                      	 shortname: 'string'
                  		 },
          				 output: {
          
          				 }
       					}
 			var data = {
          				shortname: 'ppwoeirp'
      					}
		 };
	 */
	this.filter = function (actionMeta, data) {
	
		var expectedInputs = actionMeta.input;
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