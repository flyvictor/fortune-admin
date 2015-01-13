'use strict';
angular.module('fortuneAdmin.Controllers', [
    'fortuneAdmin.Services'
  ])
  .controller('faActionsCtrl', [
    '$scope', 
    'faActionsService',
    '$sce',
    '$modal',
    function ($scope, faActionsService, $sce, $modal) {
      $scope.actions = faActionsService.getActions('users');
      $scope.selected = $scope.actions[1];
      $scope.isModalVisible = false;
  
      $scope.selectAction = function (action) {
        $scope.isModalVisible = action.type === 'modal';
        console.log($scope.entity);
        if($scope.isModalVisible && action.createTpl) {
           $modal.open({
             template : $sce.trustAsHtml(action.createTpl($scope.entity)),
            // templateUrl: 'myModalContent.html',
            // controller: 'ModalInstanceCtrl',
            size: 200,
            // resolve: {
            //   items: function () {
            //     return $scope.items;
            //   }
            // }
          });
          // $scope.actionTpl = 
        } 
      }
  }])
  .controller('ResourcesCtrl', [
    '$scope',
    '$http',
    '$routeParams',
    'resources',
    'data',
    function ($scope, $http, $routeParams, resources, data){

      var currentResource = {};
      angular.forEach(resources, function(res){
        if(res.name === $routeParams.name || res.route === $routeParams.name){
          currentResource = res;
        }
      });

      //Flatten nested objects to get rid of index configuration
      /*angular.forEach(currentResource.schema, function(res, key){
        if (angular.isObject(res) && !angular.isArray(res)){
          if (res.type){
            currentResource.schema[key] = res.type;
          }else{
            delete currentResource.schema[key];
          }
        }
      });*/
      var plurResourceName = currentResource.route;

      $scope.plurResourceName = plurResourceName;
      $scope.currentResource = currentResource;

      $scope.resources = resources;

      $scope.data = data[plurResourceName];
      $scope.links = data.links;
      $scope.PK = $scope.currentResource.modelOptions ? $scope.currentResource.modelOptions.pk || 'id' : 'id';

      $scope.parentResourceName = $routeParams.parent;
      $scope.parentId = $routeParams.id;

      this.addRow = function(Primary){
        var newRow = {};
        if ($scope.PK !== 'id'){
          newRow[$scope.PK] = Primary;
        }

        if ($routeParams.id) {
          // $scope.currentResource - what is going to be created
          // $routeParams.inverse - field that references parent resource
          var refFieldName = $routeParams.inverse;

          //Create reference to new doc
          if (angular.isArray($scope.currentResource.schema[refFieldName])){
            newRow[refFieldName] = [$routeParams.id];
          }else{
            newRow[refFieldName] = $routeParams.id;
          }
        }
        var cmd = {};
        cmd[plurResourceName] = [newRow];
        $http.post(CONFIG.fortuneAdmin.getApiNamespace() + '/' + plurResourceName, cmd)
          .success(function(data) {
          $scope.data.push(data[plurResourceName][0]);
        });
      };

      this.deleteRow = function(index, id){
        $http.delete(CONFIG.fortuneAdmin.getApiNamespace() + '/' + plurResourceName + '/' + id)
          .success(function (data, status) {
            $scope.data.splice(index, 1);
          })
          .error(function(data, status) {
            console.error(data, status);
          });

      };

      $scope.filter = {};
      $scope.getTypeaheadList = function(str, name, type){
        var query = {};
        query['filter[' + name + '][regex]'] = str;
        query['filter[' + name + '][options'] = 'i';
        return $http.get(CONFIG.fortuneAdmin.getApiNamespace() + '/' + plurResourceName, {
          params: query
        })
          .then(function(res){
            console.log(res.data[plurResourceName]);
            var cleanList = [];
            var stored = [];
            angular.forEach(res.data[plurResourceName], function(item){
              if (stored.indexOf(item[name]) === -1){
                stored.push(item[name]);
                cleanList.push(item);
              }
            });
            return cleanList;
          });
      };

      this.filterChangedCb = function() {
        $http.get(CONFIG.fortuneAdmin.getApiNamespace() + '/' + plurResourceName,{
          params: $scope.filter
        }).success(function(data){
          $scope.data = data[plurResourceName];
        });
      };
    }])
    .controller('faEditableCtrl', ['$scope', '$http',
        function($scope, $http){
            $scope.apply = function(value){
                //Send PATCH to the server
                var cmd = [];
                cmd.push({
                    op: 'replace',
                    path: '/' + $scope.resourceName + '/0/links/' + $scope.path,
                    value: value
                });

                $http({
                    method: 'PATCH',
                    url: CONFIG.fortuneAdmin.getApiNamespace() + '/' + $scope.resourceName + '/' + $scope.resourceId,
                    data: cmd
                }).catch(function(data, status){
                    console.error(data, status);
                });
            };
        }]);
