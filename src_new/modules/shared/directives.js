'use strict';
angular.module('sharedElements.Directives', [])
  .directive('fortuneAdminNavbar', [function() {
    return {
      restrict: 'E',
      templateUrl: 'views/mynavbar.html',
      replace: true,
      transclude: true,
      scope: {}
    }
  }])
  .directive('fortuneAdminResourcesCells', ['$http', '$rootScope', function($http, $rootScope){
    return {
      restrict: 'E',
      templateUrl: window.CONFIG.shared.prepareViewTemplateUrl('resourcesCells'),
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
      }
    }
  }])
  .directive('fortuneAdminUmlCells', ['$rootScope', function($rootScope){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: CONFIG.shared.prepareViewTemplateUrl('umlCells'),
      scope: true,
      link: function(scope){
        scope.r = $rootScope.fortuneAdminRoute;
      }
    }
  }])
    .directive('fortuneAdminDocsCells', ['$rootScope', function($rootScope){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: CONFIG.shared.prepareViewTemplateUrl('docsCells'),
            scope: true,
            link: function(scope){
                scope.r = $rootScope.fortuneAdminRoute;
            }
        }
    }]);