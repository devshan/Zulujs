//set this variable to enable or disable cors
var enableCors = false;

/**
 * Sample:
 * allowedOrigins = 'abc.com, def.com, ghi.com';
 *
 * NOTE: TO ENABLE FOR ALL ORIGIINS => allowedOrigins = '*';
 */
var allowedOrigins = '*';

/**
 * set this variabl to enable headers for cors
 * 
 * Sample:
 * headers = {
 * 	'Access-Control-Allow-Methods' : 'GET, POST, PUT, OPTIONS',
 * 	'Access-Control-Allow-Headers' : 'Content-Type, Authorization',
 * 	'Access-Control-Allow-Credentials': true
 * }
 */
var headers = {};

module.exports = {
	
	/*
	  Initialization of Cross Origin Resourse Sharing
	 */
	setup: function (app) {
		//if cors not enabled, return
		if (!enableCors) {
			return;
		}

		app.use(function(req, res, next) {
			var origin = req.headers.origin;

			//set allow origin header
			if (allowedOrigins == '*') {
				res.setHeader('Access-Control-Allow-Origin', '*');
			} else if (allowedOrigins.indexOf(origin) > -1) {
				res.setHeader('Access-Control-Allow-Origin', origin);
			}

			//set other headers
			for (var key in headers) {
				res.header(key, headers[key]);
			}
			return next();
		});

	}
}