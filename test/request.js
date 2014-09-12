var assert = require('assert');
var magentoRest = require('../lib');

var config = require('./data/clientConfig.json');
var options = require('./data/clientOptions.json');

describe('Request', function() {
	var magentoClient;
	before(function () {
		magentoClient = magentoRest.createClient(config, options);
	});

  describe('request', function () {
    it('should make a request and receive a callback', function (done) {
      
      assert(magentoClient._request, !undefined);
      assert(typeof magentoClient._request, 'function');
      magentoClient._request({path: '/api/rest/products'}, function (error, result) {
        assert.equal(error, null);
        assert.equal(result, undefined);
        done();
      });
    });

    it('should make a request with no path and fail with error', function (done) {
      magentoClient._request({}, function (error, result) {
        assert.notEqual(error, null);
        assert.notEqual(error.indexOf('ERROR'), -1);
        done();
      });
    });
  });
});