'use strict';
angular.module('fortuneAdmin.Directives', [
  ])
  .directive('fortuneAdminNavbar', [ '$http', '$rootScope', 'Inflect', function($http, $rootScope, Inflect) {
    return {
      restrict: 'E',
      templateUrl: '/templates/views/mynavbar.html',
      replace: true,
      transclude: true,
      scope: {}
    }
  }])
  .directive('fortuneAdminNavbarCells', ['$http', '$rootScope', 'Inflect', function($http, $rootScope, Inflect){
    return {
      restrict: 'E',
      templateUrl: '/templates/views/navbarCells.html',
      replace: true,
      scope: true,
      link: function(scope){
        scope.r = $rootScope.fortuneAdminRoute;
        scope.resources = [];
        $http.get(CONFIG.fortuneAdmin.baseEndpoint + '/resources').success(function(data){
          scope.resources = data.resources;
          scope.services = {};
          angular.forEach(data.resources, function(r){
            r.service = (r.service || 'default-service').split('-').join(' ');
            scope.services[r.service] = scope.services[r.service] || {name: r.service, resources: [], collapse: true};
            scope.services[r.service].resources.push(r);
          });
        });

        scope.pluralize = function(name){
          return Inflect.pluralize(name);
        };
      }
    }
  }])
  .controller('faEditableCtrl', ['$scope', '$http',
    function($scope, $http){
      $scope.apply = function(value){
        //Send PATCH to the server
        var cmd = [];
        cmd.push({
          op: 'replace',
          path: '/' + $scope.resourceName + '/0/links/' + $scope.path,
          value: value
        });

        $http({
          method: 'PATCH',
          url: CONFIG.fortuneAdmin.getApiNamespace() + '/' + $scope.resourceName + '/' + $scope.resourceId,
          data: cmd,
          params: {
            userAuthToken: CONFIG.fortuneAdmin.authToken
          }
        }).catch(function(data, status){
            console.error(data, status);
          });
      };
    }])

  .directive('faEditable', [function(){
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
      controller: 'faEditableCtrl'
    }
  }])

  .directive('faRef', ['$http', '$compile', 'Inflect',
    function($http, $compile, Inflect){
      return {
        restrict: 'E',
        replace: false,
        scope: {
          value: '=ngModel',
          ref: '=',
          resourceName: '@',
          resourceId: '@'
        },
        controller: 'faEditableCtrl',
        link: function(scope, elt){
          var refTo = scope.path = scope.ref.ref;
          var resources, currentResource;

          var conf = {
            params: {
              userAuthToken: CONFIG.fortuneAdmin.authToken
            }
          };

          $http.get(CONFIG.fortuneAdmin.baseEndpoint + '/resources', conf).success(function(data){
            resources = data.resources;
            angular.forEach(resources, function(resource){
              if (resource.name === refTo){
                currentResource = resource;
              }
            });
            $http.get(CONFIG.fortuneAdmin.getApiNamespace() + '/' + Inflect.pluralize(refTo), conf)
              .success(function(data){
                var PK = currentResource.modelOptions ? currentResource.modelOptions.pk || 'id' : 'id';
                scope.list = data[Inflect.pluralize(refTo)];
                var tpl = ['<a href="#" editable-select="value" ',
                  'e-ng-options="item.', PK || 'id',
                  ' as item.', PK || 'id',
                  ' for item in list" ',
                  'onaftersave="apply(value)">',
                  '{{ value || "Not set." }}',
                  '</a>'
                ];
                var select = $compile(tpl.join(''))(scope);
                elt.append(select);
              });
          });
        }
      }
    }]);