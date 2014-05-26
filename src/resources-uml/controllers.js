(function(angular){
  angular.module('fortuneAdmin.Uml.Controllers', [])
    .controller('UmlCtrl', ['$scope', '$http', UmlController]);

  function UmlController($scope, $http){
    $scope.resources = [];
    $scope.render = false;
    $http.get('/resources').success(function(data){
      $scope.resources = data.resources;
      $scope.render = true;
    });
  }
})(angular);
