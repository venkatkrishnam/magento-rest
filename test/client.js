var assert = require('assert');
var magentoRest = require('../lib');

var config = require('./data/clientConfig.json');
var options = require('./data/clientOptions.json');

describe('Client', function() {
	var magentoClient;
	before(function () {
		magentoClient = magentoRest.createClient(config, options);
		
	});

  describe('create', function() {
    it('should create a client with a valid signer and return sent options', function (){
      //console.log('CLIENT::::', magentoClient);
      assert(magentoClient.signer, !undefined);
      assert(magentoClient.signer.name, !undefined);
      assert(magentoClient.headers, !undefined);
      assert(magentoClient.headers.oauth_signature, !undefined);
      assert.equal(magentoClient.headers.port, options.port, 'Port does not match');
      assert.equal(magentoClient.headers.host, options.host);

    })
  });

  describe('request', function() {
    it('should create a request with a callback', function (done) {
    	magentoClient._request({path: '/api/rest/products'}, function (error, response) {
    		assert.equal(error, null);
        assert.equal(response, undefined);
    		done();
    	});
      
    })
  });
});