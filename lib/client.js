var oauth = require('oauth-client');

var internals = {};

internals.getSigner = function (config) {
	var consumer = oauth.createConsumer(config.consumerKey, config.consumerSecret);
	var token = oauth.createToken(config.token, config.tokenSecret);
	return oauth.createHmac(consumer, token);
};

internals.create = function (config, options) {
	if (!options.host) {
		throw new Error('options.host required (example: www.mymagentosite.com)');
	}

	this.signer = internals.getSigner(config);

	this.headers = {
    port: options.port || 80,
    host: options.host,
    https: options.https || false,
    oauth_signature: this.signer,
    method: options.method || 'GET'
  };
  
  this._request = require('./request')(this);
  this.products = require('./products')(this);
  return this;
};

module.exports = internals;

