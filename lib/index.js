var client = require('./client');

exports.version = require('../package.json').version;
exports.products = require('./products');

exports.createClient = function () {
	return new client.create(arguments[0], arguments[1]);
};