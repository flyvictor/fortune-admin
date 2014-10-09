(function(angular){
  angular.module('docs.Directives', [
      'docs.Config',
      'docs.Services'
  ])
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
      .directive('resourceGui', ['docsConfigConstant', 'docsHTTP', function(config, docsHTTPService){
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
                  $scope.request.headers = $scope.request.headers || {};
                  angular.forEach($scope.httpMethods, function (method) {
                      $scope.request[method] = {};
                  });

                  $scope.requestViews = ['gui', 'json' ];
                  $scope.selectedRequestView = $scope.requestViews[0];
                  $scope.selectRequestView = function (view) {
                      $scope.selectedRequestView = view;
                  };

                  $scope.response = {};
                  $scope.sendRequest = function (method, route, request) {
                      docsHTTPService.sendRequest(method, route, request, function (data, status, headers, config) {
                          $scope.response[method] = {
                              status: status,
                              body: data
                          }
                      });
                  }
              }
          }
      }])
      .directive('getRequest', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/get'),
              scope: {
                  resource: '=',
                  request: '=',
                  headers: '=',
                  view: '@'
              },
              link: function ($scope) {
                  $scope.request.params = $scope.request.params || {};
                  $scope.request.params.ids = $scope.request.params.ids || [];
                  $scope.request.headers = $scope.headers || {};
                  $scope.PK = $scope.resource.modelOptions ? $scope.resource.modelOptions.pk || 'id' : 'id';

                  $scope.addRequestParameter = function (id) {
                      if (!id) return;

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
                  resource: '=',
                  request: '=',
                  headers: '=',
                  view: '@'
              },
              link: function ($scope) {
                  $scope.request.headers = $scope.headers || {};
                  $scope.request.data = $scope.request.data || {};
                  $scope.PK = $scope.resource.modelOptions ? $scope.resource.modelOptions.pk || 'id' : 'id';
              }
          }
      }])
      .directive('putRequest', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/put'),
              scope: {
                  resource: '=',
                  request: '=',
                  headers: '=',
                  view: '@'
              },
              link: function ($scope) {
                  $scope.request.headers = $scope.headers || {};
                  $scope.request.data = $scope.request.data || {};
                  $scope.PK = $scope.resource.modelOptions ? $scope.resource.modelOptions.pk || 'id' : 'id';
              }
          }
      }])
      .directive('deleteRequest', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/delete'),
              scope: {
                  resource: '=',
                  request: '=',
                  headers: '=',
                  view: '@'
              },
              link: function ($scope) {
                  $scope.PK = $scope.resource.modelOptions ? $scope.resource.modelOptions.pk || 'id' : 'id';
              }
          }
      }])
      .directive('resourceAttribute', ['docsConfigConstant', 'RecursionHelper', function(config, RecursionHelper){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/attribute'),
              scope: {
                  attrValue: '=',
                  attrName: '=',
                  data: '='
              },
              compile: function(element) {
                  return RecursionHelper.compile(element);
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
