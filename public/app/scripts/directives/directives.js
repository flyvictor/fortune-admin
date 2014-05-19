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

directives.directive('faEditable', [function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      value: '=ngModel',
      path: '=',
      schemaType: '='
    },
    templateUrl: '/templates/directives/faEditable.html',
    link: function(scope){
      scope.isRef = false;
      if (angular.isObject(scope.schemaType)){
        scope.isRef = true;
        if (angular.isArray(scope.schemaType)){
          scope.multi = true;
        }
      }

    }
  }
}]);

directives.directive('faRef', ['$q', '$http', '$modal', function($q, $http, $modal){
  return {
    restrict: 'E',
    replace: false,
    scope: {
      value: '=',
      ref: '='
    },
    templateUrl: '/templates/directives/faRef.html',
    link: function(scope, elt){
      var refTo = angular.isArray(scope.ref) ? scope.ref[0].ref : scope.ref.ref;
      var resources, currentResource;
      $http.get(CONFIG.baseEndpoint + '/resources').success(function(data){
        resources = data.resources;
        currentResource = resources.find(function(resource){
          return resource.name === refTo;
        });
      });

      function pluralize(str){
        return /s$/.test(str) ? str + 'es' : str + 's';
      }

      scope.$watch('value', function(){
        console.log('value changed');
      });

      elt.bind('click', function(){
        //This will work only for resources with business PK.
        //refs by _id need some alias or something to be at least readable
        var modalTemplate = [
          '<div> ',
          '<p>Please, select ', currentResource.modelOptions.pk || 'ObjectId', '</p>',
          '<select class="form-control"',
          'ng-model="selected" ',
          'ng-options="item.', currentResource.modelOptions.pk || 'ObjectId',
          ' as item.', currentResource.modelOptions.pk || 'ObjectId',
          ' for item in list" ',
          'ng-change="onSelect(selected)"',
          '></select> ',
          '<pre>{{ list | json }}</pre>',
          '</div>'
        ];
        $modal.open({
          resolve: {
            list: function(){
              var d = $q.defer();
              $http.get(CONFIG.getApiNamespace() + '/' + pluralize(refTo))
                .success(function(data){
                  d.resolve(data[pluralize(refTo)]);
                });
              return d.promise;
            }
          },
          template: modalTemplate.join(''),
          controller: ['$scope', '$modalInstance', 'list', function($scope, $modalInstance, list){
            $scope.list = list;
            $scope.onSelect = function(item){
              scope.value = item;
              console.log(item);
              $modalInstance.close();
            }
          }]
        });
      });
    }
  }
}]);
