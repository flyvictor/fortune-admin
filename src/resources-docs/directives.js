(function(angular){
  angular.module('fortuneAdmin.Docs.Directives', [])
      .directive('methodDescription', function(){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: '/templates/directives/docs/description.html',
              scope: {
                  resource: '='
              },
              link: function ($scope) {
                  // to prevent alphabetical sort in object keys
                  $scope.notSorted = function(obj){
                      if (!obj) {
                          return [];
                      }
                      return Object.keys(obj);
                  }
              }
          }
      })
      .directive('methodExample', function(){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: '/templates/directives/docs/example.html',
              scope: {
                  resource: '='
              },
              link: function ($scope) {
                  // to prevent alphabetical sort in object keys
                  $scope.notSorted = function(obj){
                      if (!obj) {
                          return [];
                      }
                      return Object.keys(obj);
                  }
              }
          }
      })
})(angular);
