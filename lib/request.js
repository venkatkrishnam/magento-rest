var oauth = require('oauth-client');
var internals = function (client) {
	return function (options, callback) {
		if (!client.headers) {
			return callback('You must create a request client first.', null);
		}
		if (!options.path) {
			return callback('ERROR: path is required (example: /api/rest/products)');
			//throw new Error('path is required (example: /api/rest/products)');
		}
		var data = '';
		var result;
		var headers = this.headers;
		
		Object.keys(options).forEach(function (key) {
			headers[key] = options[key];
		});

		var request = oauth.request(headers, function (response) { 
			response.on('data', function (chunk) {
	      data += chunk;
	    });
	    response.on('end', function () {
	    	if (data) {
	    		result = JSON.parse(data);
	    	}
	      callback(null, result);
	    });
	    response.on('error', function (error) {
	      callback(error, null);
	    });
		});
		request.end();
	}
};

module.exports = internals;