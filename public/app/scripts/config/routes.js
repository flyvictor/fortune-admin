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

  ROUTER.when('users_path', '/users', {
    templateUrl : CONFIG.prepareViewTemplateUrl('users')
  });

  ROUTER.when('addresses_path', '/addresses', {
    templateUrl : CONFIG.prepareViewTemplateUrl('addresses')
  });

  ROUTER.when('addresses_by_user_path', '/users/:user_id/addresses', {
    templateUrl : CONFIG.prepareViewTemplateUrl('addresses')
  });

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
      data: ['$q', '$http', '$route', function($q, $http, $route){
        var resourceName = $route.current.params.name;
         var d = $q.defer();
         $http.get(CONFIG.getApiNamespace() + '/' + pluralize(resourceName))
          .success(function (data) {
             d.resolve(data[pluralize(resourceName)]);
          });
        return d.promise;
      }]
    }
  });

  ROUTER.when('subresource', '/:name/:id/:sub', {
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
      data: ['$q', '$http', '$route', function($q, $http, $route){
        var d = $q.defer();
        var parentResource = $route.current.params.name;
        var parentId = $route.current.params.id;
        var childResource = $route.current.params.sub;
        $http.get(CONFIG.getApiNamespace() + '/' + pluralize(parentResource) +
            '/' + parentId + '/' + pluralize(childResource))
          .success(function (data, status, headers, config) {
            d.resolve(data[pluralize(childResource)]);
          });
        return d.promise;
      }]
    }
  });

  ROUTER.otherwise({
    redirectTo : '/user'
  });

  ROUTER.install($routeProvider);

  function pluralize(str){
    return /s$/.test(str) ? str + 'es' : str + 's';
  }

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