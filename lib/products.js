var querystring = require('querystring');

var internals = {
	path: '/api/rest/products'
};

internals.get = function (options, callback) {
	options = options || {};
	options.path = options.path || this.path;
	options.path = options.path + '?' + querystring.stringify(options.qs);

	internals.client.request(options, function (error, response) {
		return callback(error, response);
	});
};

module.exports = function (client) {
  internals.client = client;
  return {
    get: function (options, callback) {
      return internals.get(options, callback);
    }
  };
};