// A standalone app. Don't include it in plugin build.
(function(angular){
  angular.module('fortuneAdmin.Standalone', [
    'ngRoute',
    'fortuneAdmin',
    'docs'
  ])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', 'fortuneAdminProvider', 'docsProvider',
      function($routeProvider, $locationProvider, $httpProvider, fortuneAdminProvider, docsProvider){
        fortuneAdminProvider.enableNavbar();
        fortuneAdminProvider.mountTo($routeProvider, '/admin');

        docsProvider.enableNavbar();
        docsProvider.mountTo($routeProvider, '/docs');

        $routeProvider.when('/', {
          templateUrl: 'init.html',
          controller: 'initCtrl'
        });
        $routeProvider.when('/fagrid', {
          templateUrl: 'views/fagrid.html',
          controller: 'fagridCtrl',
          resolve: {
            resources: ['$http', function($http){
              return $http.get('/resources').then(function(res){
                return res.data.resources;
              });
            }],
            users: ['$http', function($http){
              return $http.get('/api/v1/users').then(function(res){
                return res.data.users;
              });
            }]
          }
        });
        $routeProvider.otherwise({
          redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
    }])
    .run(['faActionsService', function(faActionsService){
      faActionsService.registerActions([{
        name: 'global',
        title: 'Default for every resource',
        method: function(model){
          alert('This action is set on every resource');
        }
      }]);
    }])
    .controller('initCtrl', ['$scope', '$rootScope', '$location', 'fortuneAdmin', 'docs', 'faActionsService', function($scope, $rootScope, $location, fortuneAdmin, docs, faActionsService){
      $scope.params = {
        host: 'http://localhost:1337',
        namespace: '/api/v1'
      };

      faActionsService.registerActions([
        {
          name: 'injected',
          resources: ['users'],
          title: "Injected action",
          method: function(model) {
            alert('Say hello to my little friend!');
          }
        }
      ]);
      
      $scope.startDocs = function(){
        docs.setApiHost($scope.params.host);
        docs.setApiNamespace($scope.params.namespace);

        $location.url('/docs/docs');
      };

      $scope.startFA = function(){
        fortuneAdmin.setApiHost($scope.params.host);
        fortuneAdmin.setApiNamespace($scope.params.namespace);
        
        $location.url('/admin/uml');
      };
    }])
    .controller('fagridCtrl', ['$scope', 'resources', 'users', function($scope, resources, users){
      console.log('resolved resources', resources);
      $scope.resources = resources;
      $scope.users = users;
      angular.forEach(resources, function(r){
        if (r.name === "user"){
          $scope.usersMetadata = r;
        }
      });
    }]);
})(angular);