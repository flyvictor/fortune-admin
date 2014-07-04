(function(angular){
  angular.module('fortuneAdmin.Uml.Controllers', [])
    .controller('UmlCtrl', ['$scope', '$http', UmlController]);

  function UmlController($scope, $http){
    $scope.resources = [];
    $scope.render = false;
    var conf = {
      params: {
        userAuthToken: CONFIG.fortuneAdmin.authToken
      }
    };
    $http.get(CONFIG.fortuneAdmin.baseEndpoint + '/resources', conf).success(function(data){
      $scope.resources = data.resources;
      $scope.render = true;
    });
  }
})(angular);
