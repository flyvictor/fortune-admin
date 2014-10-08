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

                  $scope.request = {};
                  angular.forEach($scope.httpMethods, function (method) {
                      $scope.request[method] = {};
                  });

                  $scope.requestViews = ['gui', 'json' ];
                  $scope.selectedRequestView = $scope.requestViews[0];
                  $scope.selectRequestView = function (view) {
                      $scope.selectedRequestView = view;
                  };

                  $scope.PK = $scope.resource.modelOptions ? $scope.resource.modelOptions.pk || 'id' : 'id';
              }
          }
      }])
      /*.directive('requestResponseContainer', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/requestResponse'),
              scope: false,
              link: function ($scope) {
                  $scope.request = {};
                  $scope.request[$scope.selectedMethod] = {};
                  $scope.resource = $scope.$parent.resource;

                  $scope.requestViews = ['gui', 'json' ];
                  $scope.selectedRequestView = $scope.requestViews[0];
                  $scope.selectRequestView = function (view) {
                      $scope.selectedRequestView = view;
                  };

                  $scope.PK = $scope.resource.modelOptions ? $scope.resource.modelOptions.pk || 'id' : 'id';

                  $scope.sendGETRequest = function (resource, ids, relatedResource) {
                      var requestConfig = {
                          method: $scope.method,
                          url: config.getApiNamespace() + '/' + resource.route
                      };

                      var data = requestData;
                      data.method = $scope.method;
                      data.url = config.getApiNamespace() + '/' + resource.route;
                      data.params = data.params || {};

                      if (params.ids && params.ids.length) {
                          if (data.params.ids.length == 1) data.url += '/' + data.params.ids[0];
                          else data.params.ids = data.params.ids.join(',');
                      }
                      if (relatedResource) data.url += '/' + relatedResource;

                      $http(data)
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
      }])*/
      .directive('getRequest', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/get'),
              scope: {
                  request: '=',
                  view: '=',
                  headers: '='
              },
              link: function ($scope) {
                  $scope.PK = $scope.PK || $scope.$parent.PK;

                  $scope.addRequestParameter = function (id) {
                      if (!id) return;

                      $scope.request.params = $scope.request.params || {};
                      $scope.request.params.ids = $scope.request.params.ids || [];
                      if ($scope.request.params.ids.indexOf(id) == -1)
                          $scope.request.params.ids.push(id);
                  };

                  $scope.removeRequestParameter = function (id) {
                      var index = $scope.request.params.ids.indexOf(id);
                      $scope.request.params.ids.splice(index, 1);
                  };
              }
          }
      }])
      .directive('postRequest', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/post'),
              scope: {
                request: '=',
                view: '=',
                headers: '='
              },
              link: function ($scope) {
                  $scope.PK = $scope.PK || $scope.$parent.PK;
                  $scope.resource = $scope.$parent.resource;
                  $scope.request.data = $scope.request.data || {};
              }
          }
      }])
      .directive('resourceAttribute', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/attribute'),
              scope: false
          }
      }])
      .directive('deleteRequest', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/delete'),
              scope: {
                  request: '=',
                  view: '=',
                  headers: '='
              },
              link: function ($scope) {
                  $scope.PK = $scope.PK || $scope.$parent.PK;
              }
          }
      }])
      .directive('customHeaders', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/customHeaders'),
              scope: {
                  headers: '='
              },
              link: function ($scope) {
                  $scope.show = false;

                  $scope.addHeader = function(name, value) {
                      if (!name) return;
                      if (!$scope.headers[name]) $scope.headers[name] = value;
                  };

                  $scope.removeHeader = function(name) {
                      delete $scope.headers[name];
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
})(angular);
