var assert = require('assert');
var client = require('../lib/client');

var config = require('./data/clientConfig.json');
var options = require('./data/clientOptions.json');

describe('Client', function() {
	var magentoClient;
	before(function () {
		magentoClient = client.create(config, options);
		
	});

  describe('create', function() {
    it('should create a client with a valid signer', function(){
      console.log('CLIENT::::', magentoClient.headers);
      assert.equal(magentoClient.headers.port, options.port);
    })
  });

  describe('request', function() {
    it('should create a request with a callback', function(done) {
    	magentoClient.request({path: '/api/rest/products'}, function (error, response) {
    		console.log(error, response);
    		//assert.equal(magentoClient.port, options.port);
    		done();
    	});
      
    })
  });
});