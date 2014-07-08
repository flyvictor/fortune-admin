(function(angular){
  //It's just a wrapper around d3 to make it easy to mock
  //Also this can be extended later to defer loading
  angular.module('fortuneAdmin.Uml.D3', [])
    .factory('d3', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope){
      var d3Loader = $q.defer();

      $timeout(function(){
        $rootScope.$apply(function(){
          d3Loader.resolve(window.d3);
        });
      });

      return{
        load: function(){
          return d3Loader.promise;
        }
      }
    }]);
})(angular);
