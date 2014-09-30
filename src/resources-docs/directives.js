(function(angular){
  angular.module('fortuneAdmin.Docs.Directives', [])
      .directive('methodDescription', function(){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: '/templates/directives/docs/description.html',
              scope: {
                  resource: '='
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
              }
          }
      })
})(angular);
