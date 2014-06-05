angular.module('sampleApp', [
  'ngRoute',
  'fortuneAdmin'
])
  .config(['$routeProvider', '$locationProvider', 'fortuneAdminProvider',
    function($routeProvider, $locationProvider, fortuneAdminProvider){
      $routeProvider.when('/example', {
        template: ['<div class="text-center">',
          '<h1>{{ hello }}</h1>',
          '<h2>I have awesome fortune-admin dependency!</h2>',

          // Note ng-href there. fortune-admin has no otherwise rule
          // so you should append /uml to the mount point.
          '<h3><a ng-href="/admin/uml">Navigate to admin interface</a></h3>',
          '</div>'].join(' '),
        controller: 'sampleCtrl'
      });
      $routeProvider.otherwise({
        redirectTo: '/example'
      });

    //1. Point plugin to your running fortune service
    fortuneAdminProvider.setApiHost('');
    //2. Provide api namespace as configured in fortune
    fortuneAdminProvider.setApiNamespace('/api/v1');
    //3. Mount plugin to any route of your choice
    fortuneAdminProvider.mountTo($routeProvider, '/admin');

    //Your app should be in html5Mode at the moment
    $locationProvider.html5Mode(true);
  }])
  .controller('sampleCtrl', ['$scope', function($scope){
    $scope.hello = 'Hello world!';
  }]);