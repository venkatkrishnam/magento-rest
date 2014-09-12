var assert = require('assert');
var magentoRest = require('../lib');

var config = require('./data/clientConfig.json');
var options = require('./data/clientOptions.json');

describe('Products', function() {
	var magentoClient;
  
	before(function () {
		magentoClient = magentoRest.createClient(config, options);
	});

  describe('get', function() {
    it('should get a list of products', function (done) {
      magentoClient.products.get({}, function (error, results) {
        //console.log('results', error, results);
        done();
      });
    })
  });

});