angular.module('fortuneAdmin.Controllers.umlDiagram', [
    'fortuneAdmin.umlDiagram.services'
  ])
  .controller('umlDiagramCtrl', ['$scope', 'umlData',

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

        //Flip selection and clear list
        $scope.allSelected = !$scope.allSelected;
        $scope.selected = [];

        if ($scope.allSelected){
          //push clones
          angular.forEach($scope.resources, function(r){
            $scope.selected.push(r);
          });
        }

        //mark each resource
        angular.forEach($scope.resources, function(res){
          res.$selected = $scope.allSelected;
        });
      }
    }
  ]);
