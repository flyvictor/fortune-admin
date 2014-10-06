(function(angular){
  angular.module('docs.Directives', ['docs.Config'])
      .directive('resourceDescription', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/description'),
              scope: {
                  resource: '='
              }
          }
      }])
      .directive('resourceExample', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/example'),
              scope: {
                  resource: '='
              }
          }
      }])
      .directive('resourceGui', ['docsConfigConstant', '$http', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/gui'),
              scope: {
                  resource: '='
              },
              link: function ($scope) {
                  $scope.httpMethods = ['get', 'post', 'put', 'patch', 'delete'];
                  $scope.selectedMethod = $scope.httpMethods[0];

                  $scope.selectMethod = function (method) {
                      $scope.selectedMethod = method;
                  };
              }
          }
      }])
      .directive('requestResponseContainer', ['docsConfigConstant', '$http', function(config, $http){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/requestResponse'),
              scope: {
                  resource: '=',
                  method: '='
              },
              link: function ($scope) {
                  $scope.PK = $scope.resource.modelOptions ? $scope.resource.modelOptions.pk || 'id' : 'id';
                  $scope.ids = [];
                  $scope.relatedResource = {};
                  $scope.response = {};

                  $scope.addRequestParameter = function (id) {
                      if (id && $scope.ids.indexOf(id) == -1) $scope.ids.push(id);
                  };

                  $scope.removeRequestParameter = function (id) {
                      var index = $scope.ids.indexOf(id);
                      $scope.ids.splice(index, 1);
                  };

                  $scope.sendGETRequest = function (resource, ids, relatedResourceName) {
                      var requestConfig = {
                          method: $scope.method,
                          url: config.getApiNamespace() + '/' + resource.route
                      };

                      if (ids.length) {
                          if (ids.length == 1) requestConfig.url += '/' + ids[0];
                          if (ids.length > 1) requestConfig.params = { ids: ids.join(',') };
                          if (relatedResourceName) requestConfig.url += '/' + relatedResourceName;
                      }

                      $http(requestConfig)
                          .success(function (data, status, headers, config) {
                              $scope.response[resource.name] = $scope.response[resource.name] || {};
                              $scope.response[resource.name][$scope.method] = { body: data, status: status };
                          })
                          .error(function (data, status, headers, config) {
                              $scope.response[resource.name] = $scope.response[resource.name] || {};
                              $scope.response[resource.name][$scope.method] = { body: data || 'Request failed', status: status };
                          });
                  };

                  $scope.sendPOSTRequest = function (resource, data) {
                      var requestConfig = {
                          method: $scope.method,
                          url: config.getApiNamespace() + '/' + resource.route,
                          headers: {
                              "Content-Type": "application/json"
                          },
                          data: data
                      };

                      $http(requestConfig)
                          .success(function (data, status, headers, config) {
                              $scope.response[resource.name] = $scope.response[resource.name] || {};
                              $scope.response[resource.name][$scope.method] = { body: data, status: status };
                          })
                          .error(function (data, status, headers, config) {
                              $scope.response[resource.name] = $scope.response[resource.name] || {};
                              $scope.response[resource.name][$scope.method] = { body: data || 'Request failed', status: status };
                          });
                  };

                  $scope.sendDELETERequest = function (resource, id) {
                      var requestConfig = {
                          method: $scope.method,
                          url: config.getApiNamespace() + '/' + resource.route + '/' + id
                      };

                      $http(requestConfig)
                          .success(function (data, status, headers, config) {
                              $scope.response[resource.name] = $scope.response[resource.name] || {};
                              $scope.response[resource.name][$scope.method] = { body: data, status: status };
                          })
                          .error(function (data, status, headers, config) {
                              $scope.response[resource.name] = $scope.response[resource.name] || {};
                              $scope.response[resource.name][$scope.method] = { body: data || 'Request failed', status: status };
                          });
                  };
              }
          }
      }])
      .directive('response', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/response'),
              scope: {
                  response: '='
              }
          }
      }])
      .directive('resourceAttribute', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/attribute'),
              scope: {
                  name: '=',
                  value: '='
              },
              link: function ($scope) {
                  $scope.data = $scope.$parent.data;
              }
          }
      }])
})(angular);
