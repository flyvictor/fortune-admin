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
              return $http.get('/api/v1/users?include=addresses').then(function(res){
                // Building the returned object into something simpler to work with
                // So linked resources appear on the documents to which they relate

                // This should likely be somewhere else.
                /**
                 * UnFlatterns the res to attach linked resources to their parents.
                 * @param  {Object} res       HTTP get request result
                 * @param  {String} singular  Name of the parent resource, singular
                 * @param  {String} plural    Name of the parent resource, plural
                 * @return {Object}           Formatted parent object
                 */
                var attachLinkedToRes = function (res, singular, plural) {
                  var primaryResource = res.data[plural];

                  // Build a resource indexed version of the linked resources
                  var linkedIndexed = {};

                  Object.keys(res.data.linked).forEach(function(linkedKey) {

                    res.data.linked[linkedKey].forEach(function(linkedObject) {

                      if (!linkedIndexed[linkedObject.links[singular]]) {
                        linkedIndexed[linkedObject.links[singular]] = {};
                      }

                      if (!linkedIndexed[linkedObject.links[singular]][linkedKey]) {
                        linkedIndexed[linkedObject.links[singular]][linkedKey] = [];
                      }

                      linkedIndexed[linkedObject.links[singular]][linkedKey].push(linkedObject);
                    });
                  });

                  // Attach the linked resources to the primary resource
                  primaryResource.forEach(function(primaryResourceDoc) {
                    primaryResourceDoc.linked = linkedIndexed[primaryResourceDoc.id];
                  });

                  return primaryResource;
                };

                var data = attachLinkedToRes(res, 'user', 'users');

                return data;
              });
            }],
            addresses: ['$http', function($http){
              return $http.get('/api/v1/addresses').then(function(res){
                return res.data.addresses;
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
    .controller('fagridCtrl', ['$scope', 'resources', 'users', 'addresses', function($scope, resources, users, addresses){
      console.log('resolved resources', resources);
      $scope.resources = resources;
      $scope.users = users;
      $scope.addresses = addresses;
      angular.forEach(resources, function(r){
        $scope[r.route + "Metadata"] = r;
        // if (r.name === "user"){
        //   $scope.usersMetadata = r;
        // }
      });
    }]);
})(angular);