module.exports = {
	getSessionConfigs: function () {
		var sessionConfigs = {
			secret: 'app secret',
			resave: true,
			saveUninitialized: true,
			cookie: {
				maxAge: 60000
			}
		};

		return sessionConfigs;
	}
}