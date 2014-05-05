/**
 * Created by aldo on 5/5/14.
 */

'use strict';

var services = angular.module('fortuneAdmin.Services', []);

services.config(function(RestangularProvider) {
// Now let's configure the response extractor for each request
  RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
    // This is a get for a list
    var newResponse;
    if (operation === "getList") {
      // Here we're returning an Array which has one special property metadata with our extra information
      newResponse = response.data;
//      newResponse.metadata = response.data.meta;
    } else {
      // This is an element
      newResponse = response;
    }
    return newResponse;
  });
//  RestangularProvider.setResponseExtractor(function(response, operation) {
//    return response.data;
//  });
  RestangularProvider.setRestangularFields({
    id: "_id"
  });
});

services.factory('AdminRestangular', [ 'Restangular', function(Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer, RestangularProvider) {
    RestangularConfigurer.setBaseUrl('/api/v1');
  });
}]);