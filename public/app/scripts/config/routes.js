/**
 * Created by aldo on 5/4/14.
 */

var routes = angular.module('fortuneAdmin.Routes', []);

routes.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  if(CONFIG.routing.html5Mode) {
    $locationProvider.html5Mode(true);
  }
  else {
    var routingPrefix = CONFIG.routing.prefix;
    if(routingPrefix && routingPrefix.length > 0) {
      $locationProvider.hashPrefix(routingPrefix);
    }
  }

  ROUTER.when('uml_diagram', '/uml', {
    templateUrl : CONFIG.prepareViewTemplateUrl('uml')
  });

  //Resolve necessary data here to simplify controller
  ROUTER.when('resource', '/:name', {
    templateUrl: CONFIG.prepareViewTemplateUrl('resources'),
    controller: 'ResourcesCtrl as ResourcesCtrl',
    resolve: {
      resources: ['$q', '$http', function($q, $http){
        var d = $q.defer();
        $http.get(CONFIG.baseEndpoint + '/resources').success(function(data){
          d.resolve(data.resources);
        });
        return d.promise;
      }],
      data: ['$q', '$http', '$route', 'Inflect', function($q, $http, $route, Inflect){
        var resourceName = $route.current.params.name;
         var d = $q.defer();
         $http.get(CONFIG.getApiNamespace() + '/' + Inflect.pluralize(resourceName))
          .success(function (data) {
             d.resolve(data);
          });
        return d.promise;
      }]
    }
  });

  ROUTER.when('subresource', '/:parent/:id/:name/refby/:inverse', {
    templateUrl: CONFIG.prepareViewTemplateUrl('resources'),
    controller: 'ResourcesCtrl as ResourcesCtrl',
    resolve: {
      resources: ['$q', '$http', function($q, $http){
        var d = $q.defer();
        $http.get(CONFIG.baseEndpoint + '/resources').success(function(data){
          d.resolve(data.resources);
        });
        return d.promise;
      }],
      data: ['$q', '$http', '$route', 'Inflect', function($q, $http, $route, Inflect){
        var d = $q.defer();
        var parentResource = $route.current.params.parent;
        var inverse = $route.current.params.inverse;
        var parentId = $route.current.params.id;
        var childResource = $route.current.params.name;
        $http.get(CONFIG.getApiNamespace() + '/' + childResource +
          '?filter[' + inverse + ']=' + parentId)
          .success(function (data) {
            d.resolve(data);
          });
        return d.promise;
      }]
    }
  });

  ROUTER.otherwise({
    redirectTo : '/uml'
  });

  ROUTER.install($routeProvider);

}]);

routes.config(['$httpProvider',
  function ( $httpProvider ) {

    var interceptor = ['$rootScope', '$q', function(scope, $q) {

      function success( response ) {
        return response;
      };

      function error( response ) {
//        if ( !!response || response.status == 500) { // server is down
        if ( response === undefined ) { // server is down
          var deferred = $q.defer();
          scope.$broadcast('event:serverdown');
          return deferred.promise;
        };
        return $q.reject( response );
      };

      return function( promise ) {
        return promise.then( success, error );
      };

    }];

    $httpProvider.responseInterceptors.push( interceptor );

  }]);

routes.run(['$rootScope', '$location', '$log', function($rootScope, $location, $log) {

  $rootScope.$on('event:serverdown', function( event ) {
    $log('Server does not respond.');
  });

}]);

routes.run(['$rootScope', '$location', function($rootScope, $location) {
  var prefix = '';
  if(!CONFIG.routing.html5Mode) {
    prefix = '#' + CONFIG.routing.prefix;
  }
  $rootScope.route = function(url, args) {
    return prefix + ROUTER.routePath(url, args);
  };
  $rootScope.r = $rootScope.route;
  $rootScope.c = function(route, value) {
    var url = ROUTER.routePath(route);
    if(url == $location.path()) {
      return value;
    }
  };
}]);