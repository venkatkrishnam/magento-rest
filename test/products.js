var assert = require('assert');
var client = require('../lib/client');

var config = require('./data/clientConfig.json');
var options = require('./data/clientOptions.json');

describe('Products', function() {
	var magentoClient;
  var productClient;
  
	before(function () {
		magentoClient = client.create(config, options);
    productClient = require('../lib/products')(magentoClient);
	});

  describe('get', function() {
    it('should get a list of products', function (done) {
      productClient.get({}, function (error, results) {
        console.log('results', error, results);
        done();
      });
    })
  });

});