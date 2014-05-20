'use strict';
var directives = angular.module('fortuneAdmin.Directives', [
  'fortuneAdmin.umlDiagram'
]);

directives.directive('myNavbar', [ '$http', '$rootScope', function($http, $rootScope) {
  return {
    restrict: 'E',

    templateUrl: 'templates/views/mynavbar.html',

    replace: true,

    transclude: true,

    scope: {},

    link: function (scope, element, attrs) {
      scope.r = $rootScope.r;
      scope.resources = [];
      $http.get(CONFIG.baseEndpoint + '/resources').success(function(data){
        scope.resources = data.resources;
      });
    }

  }
}]);

directives.directive('faEditable', ['$http', function($http){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      value: '=ngModel',
      path: '=',
      schemaType: '=',
      resourceName: '@',
      resourceId: '@'
    },
    templateUrl: '/templates/directives/faEditable.html',
    link: function(scope){

      scope.apply = function(value){
        //Pass new value from x-editable to ngModel
        scope.value = value;
        //And send PATCH to the server
        var cmd = [];
        cmd.push({
          op: 'replace',
          path: '/' + scope.resourceName + '/0/' + scope.path,
          value: value
        });
        $http({
          method: 'PATCH',
          url: CONFIG.getApiNamespace() + '/' + scope.resourceName + '/' + scope.resourceId,
          data: cmd
        }).success(function(data, status){
          console.log(data, status);
        });
      };
    }
  }
}]);