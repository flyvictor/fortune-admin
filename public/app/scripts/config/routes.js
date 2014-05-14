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

  ROUTER.when('visualise_path', '/visualise', {
    templateUrl : CONFIG.prepareViewTemplateUrl('visualisation')
  });
    
  ROUTER.otherwise({
    redirectTo : '/users'
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