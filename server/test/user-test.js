var expect = require('chai').expect;
var user = require('../modules/user');

describe ('creating a user', function () {
	it ('should send a string', function () {
		var createUserResult = user.create();
		expect(createUserResult).to.equal('created user');
	 });
});