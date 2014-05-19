(function(angular){
  angular.module('fortuneAdmin.Controllers.umlDiagram', [
      'fortuneAdmin.umlDiagram.services'
    ])
    .controller('umlDiagramCtrl', ['$scope', 'umlData', umlDiagramCtrl]);

  function umlDiagramCtrl($scope, umlData){
    $scope.resources = [];
    $scope.selected = [];
    $scope.allSelected = false;
    umlData.load().then(function(resources){
      angular.forEach(resources, function(res){
        res.$schemaLength = Object.keys(res.schema).length;
      });
      $scope.resources = resources;
    }, function(err){
      $scope.error = err;
    });

    this.toggleSelect = function(item){
      var index = $scope.selected.indexOf(item);
      if (index === -1){
        $scope.selected.push(item);
      }else{
        $scope.selected.splice(index, 1);
      }
      $scope.$broadcast('fortuneAdmin:uml:relink');
    };

    this.toggleSelectAll = function(){
      if ($scope.allSelected){
        $scope.selected = [];
        $scope.allSelected = false;
      }else{
        $scope.allSelected = true;
        $scope.selected = $scope.resources;
      }
      angular.forEach($scope.resources, function(res){
        res.$selected = $scope.selected;
      });
    }
  }
})(angular);