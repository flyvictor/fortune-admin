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

                  $scope.response = {};
                  $scope.sendRequest = function (method, route, request) {
                      docsHTTPService.sendRequest(method, route, request)
                          .success(function (data, status, headers, config) {
                              $scope.response[method] = {
                                  status: status,
                                  body: data
                              }
                          })
                          .error(function (data, status, headers, config) {
                              $scope.response[method] = {
                                  status: status,
                                  body: data
                              }
                          });
                  };
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
                  globalRequest: '=',
                  views: '='
              },
              link: function ($scope) {
                  $scope.request.params = $scope.request.params || {};
                  $scope.request.params.ids = $scope.request.params.ids || [];
                  $scope.request.headers = $scope.globalRequest.headers || {};
                  $scope.PK = $scope.resource.modelOptions ? $scope.resource.modelOptions.pk || 'id' : 'id';
                  $scope.selectedRequestView = $scope.selectedRequestView || $scope.views[0];

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
                  globalRequest: '=',
                  views: '='
              },
              link: function ($scope) {
                  $scope.request.headers = $scope.globalRequest.headers || {};
                  $scope.selectedRequestView = $scope.selectedRequestView || $scope.views[0];

                  var dataDefault = {};
                  dataDefault[$scope.resource.route] = [];
                  dataDefault[$scope.resource.route][0] = {};

                  $scope.request.data = $scope.request.data || dataDefault;
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
                  globalRequest: '=',
                  views: '='
              },
              link: function ($scope) {
                  $scope.request.headers = $scope.globalRequest.headers || {};
                  $scope.selectedRequestView = $scope.selectedRequestView || $scope.views[0];

                  var dataDefault = {};
                  dataDefault[$scope.resource.route] = [];
                  dataDefault[$scope.resource.route][0] = {};

                  $scope.request.data = $scope.request.data || dataDefault;
                  $scope.PK = $scope.resource.modelOptions ? $scope.resource.modelOptions.pk || 'id' : 'id';
              }
          }
      }])
      .directive('patchRequest', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/patch'),
              scope: {
                  resource: '=',
                  request: '=',
                  globalRequest: '=',
                  views: '='
              },
              link: function ($scope) {
                  $scope.request.headers = $scope.globalRequest.headers || {};
                  $scope.selectedRequestView = $scope.selectedRequestView || $scope.views[0];
                  $scope.field = {};

                  var dataDefault = [{
                      op: '',
                      path: '',
                      value: ''
                  }];
                  $scope.request.data = $scope.request.data || dataDefault;

                  $scope.methods = ['add', 'replace', 'remove'];
                  $scope.selectMethod = function (method) {
                      var data = $scope.request.data[0];
                      data.op = method;
                      $scope.onChange();
                  };

                  $scope.attributes = $scope.resource.schema;
                  $scope.selectAttribute = function (attribute) {
                      $scope.field.name = attribute;
                      $scope.onChange();
                  };

                  $scope.onChange = function() {
                      var data = $scope.request.data[0];
                      data.path = '/' + $scope.resource.route + '/0/' + $scope.field.name;
                      if (data.op == 'add') {
                          data.path += '/-';
                          if ($scope.field.name) {
                              data.value = {};
                              data.value[$scope.field.name] = $scope.field.value || "";
                          }
                      }
                      else if(data.op == 'replace') {
                          data.value = $scope.field.value;
                      }
                      else if(data.op == 'remove') {
                          delete data.value;
                      }
                  }
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
                  globalRequest: '=',
                  views: '='
              },
              link: function ($scope) {
                  $scope.PK = $scope.resource.modelOptions ? $scope.resource.modelOptions.pk || 'id' : 'id';
                  $scope.request.headers = $scope.globalRequest.headers || {};
                  $scope.selectedRequestView = $scope.selectedRequestView || $scope.views[0];
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
      .directive('resourceArrayAttribute', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/arrayAttribute'),
              scope: {
                  data: '='
              },
              link: function ($scope) {
                  $scope.addItem = function (item) {
                      $scope.data = $scope.data || [];

                      if (item && $scope.data.indexOf(item) == -1)
                        $scope.data.push(item);
                  };

                  $scope.removeItem = function (item) {
                      var index = $scope.data.indexOf(item);
                      $scope.data.splice(index, 1);
                  };
              }
          }
      }])
      .directive('resourceAttributeDescription', ['docsConfigConstant', 'RecursionHelper', '$location', '$anchorScroll', function(config, RecursionHelper, $location, $anchorScroll){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/attributeDescription'),
              scope: {
                  attrValue: '='
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
      .directive('toggleRequestView', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/toggleRequestView'),
              scope: false,
              link: function($scope) {
                  $scope.selectRequestView = function (view) {
                      $scope.selectedRequestView = view;
                  };
              }
          }
      }])
      .directive('jsonRequest', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/jsonRequest'),
              scope: {
                  object: '='
              },
              link: function($scope) {
                  $scope.textAreaModel = angular.toJson($scope.object, true);

                  $scope.$watch('textAreaModel', function () {
                      try {
                          $scope.object = JSON.parse($scope.textAreaModel);
                      } catch(exp) {
                          //Exception handler
                          console.log('Error while parsing object: '+$scope.textAreaModel);
                      };
                  });
              }
          }
      }])
})(angular);
