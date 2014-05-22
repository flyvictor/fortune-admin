// fake app for development.
// it's only purpose is to initiate and mount fortuneAdmin
// it's not included to build
(function(angular){
  angular.module('fortuneAdmin.Standalone', [
    'ngRoute',
    'fortuneAdmin'
  ])
    .config(['$routeProvider', '$locationProvider', 'fortuneAdminProvider',
      function($routeProvider, $locationProvider, fortuneAdminProvider){
        fortuneAdminProvider.mountTo($routeProvider, '');
        $routeProvider.when('/', {
          templateUrl: 'init.html',
          controller: 'initCtrl'
        });
        $routeProvider.otherwise({
          redirectTo: '/uml'
        });
        $locationProvider.html5Mode(true);
    }])
    .controller('initCtrl', ['$scope', '$location', 'fortuneAdmin', function($scope, $location, fortuneAdmin){
      $scope.params = {
        host: '',
        namespace: '/api/v1'
      };

      $scope.start = function(){
        fortuneAdmin.setApiHost($scope.params.host);
        fortuneAdmin.setApiNamespace($scope.params.namespace);
        $location.url('/uml');
      };
    }]);
})(angular);

