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
        $routeProvider.otherwise({
          redirectTo: '/uml'
        });
        $locationProvider.html5Mode(true);
    }]);
})(angular);

