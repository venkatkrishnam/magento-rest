var oauth = require('oauth-client');

var internals = {};

internals.getSigner = function (config) {
	var consumer = oauth.createConsumer(config.consumerKey, config.consumerSecret);
	var token = oauth.createToken(config.token, config.tokenSecret);
	this.signer = oauth.createHmac(consumer, token);
	return this.signer;
};

internals.create = function (config, options) {
	if (this.headers) {
		return this.headers;
	}

	if (!options.host) {
		throw new Error('options.host required (example: www.mymagentosite.com)');
	}

	var signer = this.getSigner(config);

	this.headers = {
    port: options.port || 80,
    host: options.host,
    https: options.https || false,
    oauth_signature: this.signer,
    method: options.method || 'GET'
  };
  return this;
};

internals.request = function (options, callback) {
	if (!this.headers) {
		return callback('You must create a request client first.', null);
	}
	if (!options.path) {
		throw new Error('path is required (example: /api/rest/products)');
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
};

module.exports = internals;

