// A standalone app. Don't include it in plugin build.
(function(angular){
  angular.module('fortuneAdmin.Standalone', [
    'ngRoute',
    'fortuneAdmin'
  ])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', 'fortuneAdminProvider',
      function($routeProvider, $locationProvider, $httpProvider, fortuneAdminProvider){
        fortuneAdminProvider.mountTo($routeProvider, '');
        $routeProvider.when('/', {
          templateUrl: 'init.html',
          controller: 'initCtrl'
        });
        $routeProvider.otherwise({
          redirectTo: '/uml'
        });
        $locationProvider.html5Mode(true);

        /*$httpProvider.interceptors.push(function(){
          return {
            request: function(config){
              config.params = config.params || {};
              config.params.iCanDoEnythingWithThisRequest = true;
              return config;
            }
          }
        });*/
    }])
    .controller('initCtrl', ['$scope', '$location', 'fortuneAdmin', function($scope, $location, fortuneAdmin){
      $scope.params = {
        host: 'http://localhost:1337',
        namespace: '/api/v1'
      };

      $scope.start = function(){
        fortuneAdmin.setApiHost($scope.params.host);
        fortuneAdmin.setApiNamespace($scope.params.namespace);
        $location.url('/uml');
      };
    }]);
})(angular);

