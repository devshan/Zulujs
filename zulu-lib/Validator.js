var moment = require('moment');
module.exports = {

	validate: function(action, meta, data) {

		var result = { error: false };

		if (!action) {
			result = { error: true, msg: 'Action not defined.' };
			return result;
		}

		if (!meta) {
			result = { error: true, msg: 'Meta data not set.' };
			return result;
		}

		if (!data) {
			result = { error: true, msg: 'Data not set.' };
			return result;
		}

		var fieldDefinitions = meta.fields;
		var validationErrors = [];

		switch(action) {
		    case 'create':

		    		for (var key in fieldDefinitions) {
		    			if (key == meta.primaryKey) {
		    				continue;
		    			}

		    			var fieldDefinition = fieldDefinitions[key];
		    			if (fieldDefinition.required && (!data[key])) {
		    				validationErrors[key] = 'Required field ' + key + ' not set.';
		    			}

		    			var validation = this._validateField(fieldDefinition, data[key], key);

		    			if (validation.error) {
		    				validationErrors[key] = validation.msg;
		    			}
		    		}
		        break;

		    case 'update':

		    		if (!data[meta.primaryKey]) {
		    			validationErrors[meta.primaryKey] = 'Required field ' + meta.primaryKey + ' not set.';
		    		}

		    		for (var key in data) {

		    			var fieldDefinition = fieldDefinitions[key];
		    			var validation = this._validateField(fieldDefinition, data[key], key);

		    			if (validation.error) {
		    				validationErrors[key] = validation.msg;
		    			}
		    		}
		        break;

		    case 'delete':
		    		if (!data[meta.primaryKey]) {
		    			validationErrors[meta.primaryKey] = 'Required field ' + meta.primaryKey + ' not set.';
		    		}
		    		
		    	break;
		    default:
		    	return { error: true, msg: 'Action not supported' };
		}

		if (Object.keys(validationErrors).length > 0) {
			return { error: true, msg: 'Validation failed.', 'validations': validationErrors};
		}

		return { error: false, msg: 'Ok' };
	},

	_validateField: function (fieldMeta, value, fieldName) {

		var  validationMessage = '';
		var isValid = false;

		if (!value) {
			return { error: false, msg: 'Ok' };
		}

		switch (fieldMeta.type) {

		  case 'integer':
		    	isValid = (value % 1 === 0) ? true : false;
		    	validationMessage = isValid ? 'OK' : 'value for ' + fieldName +  ' not valid.';
		    break;

		  case 'enum':
		  		var valuesMetaObj = fieldMeta.values;

				for(var key in valuesMetaObj) {
				    if (valuesMetaObj[key] == value) {
				    	isValid = true;
				    }
				}
		    	validationMessage = isValid ? 'OK' : 'value for ' + fieldName +  ' not valid.';
		    break;

		  case 'email':
		   		var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    	isValid = regex.test(value);
		    	validationMessage = isValid ? 'OK' : 'value for ' + fieldName +  ' not valid.';
		    break;

		  case 'date':
		   		isValid = moment(value, fieldMeta.format, true).isValid();
		    	validationMessage = isValid ? 'OK' : 'value for ' + fieldName +  ' not valid.';
		    break;

		  case 'time':
		   		var regex = /^([1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)?$/i;
		    	isValid = regex.test(value);
		    	validationMessage = isValid ? 'OK' : 'value for ' + fieldName +  ' not valid.';
		    break;

		  case 'datetime':
		   		isValid = moment(value, fieldMeta.format, true).isValid();
		    	validationMessage = isValid ? 'OK' : 'value for ' + fieldName +  ' not valid.';
		    break;

		 /* case 'decimal':
		   		var regex = /^\d+\.\d{0,2}$/;
		    	isValid = regex.test(value);
		    	validationMessage = isValid ? 'OK' : 'value for ' + fieldName +  ' not valid.';
		    break;*/

		  case 'double':
		   		var reg = /^[0-9]{0,3}(\.[0-9]{0,2})?$/;
                if(reg.test(value) && value > 0){
                    isValid = true;
                }
		    	validationMessage = isValid ? 'OK' : 'value for ' + fieldName +  ' not valid.';
		    break;

		  case 'string':
		    	if (typeof value === 'string') {
		    		isValid = true;
		    	}
		    	validationMessage = isValid ? 'OK' : 'value for ' + fieldName +  ' not valid.';
		    break;

		  case 'many':
		    	isValid = Array.isArray(value) ? true : false;
		    	validationMessage = isValid ? 'OK' : 'value for ' + fieldName +  ' not valid.';
		    break;

		  default:
			    isValid = true;
			    validationMessage = 'Type not supported.';
		    break;
		}

		if (!isValid) {
			return {error: true, msg: validationMessage};
		}

		return { error: false, msg: 'Ok' };

	},

	_validateLength: function (fieldMeta, value, fieldName) {

		return { error: false, msg: 'Ok' };
	}
}