module.exports = {
	cast: function (value, type) {
		switch(type) {
		    case 'integer':
		    		return parseInt(value);
		    	break;

		    case 'string':
		    		return value.toString();
		    	break;

		    case 'double':
		    		return parseFloat(value);
		    	break;

		    case 'boolean':

		    		if (typeof value == 'string') {
		    			var isTrueSet = (value.toLowerCase() === 'true');
		    			var isFalseSet = (value.toLowerCase() === 'false');
		    			if (isTrueSet) {
		    				return true;
		    			}
		    			if (isFalseSet) {
		    				return false;
		    			}
		    		}
		    		if (typeof value == 'boolean') {
		    			return value;
		    		}
					return NaN;		   
		    	break;
		    default:
                	return value;
                break;
		}
	}
}