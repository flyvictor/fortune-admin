'use strict';
angular.module('fortuneAdmin.Controllers', [
    'fortuneAdmin.Services',
    'ui.bootstrap'
  ])
  .controller('faActionsCtrl', [
    '$scope', 
    '$modal',
    '$http',
    'faActionsService',
    function ($scope, $modal, $http, faActionsService) {
      //$scope.collectionName; injected from directive

      $scope.isSelected = function(model){
        return faActionsService.isSelected(model);
      };
      $scope.toggleSelection = function(model){
        faActionsService.toggleSelection(model);
      };

      $scope.actions = {
        'delete': {
          name: 'delete',
          single: true,
          bulk: true,
          title: 'Delete',
          method: function(models, isBulk, data) {
            var dialog = $modal.open({
               templateUrl: CONFIG.shared.prepareViewTemplateUrl('directives/faDeleteConfirm'),
               controller: 'DeleteConfirmCtrl'
            }).result.then(function(confirmed) {
              if(confirmed) {
                // Delete confirmed
                var ids = [];
                angular.forEach(models, function(model){
                  ids.push(model.id);
                });
                $http.delete([CONFIG.fortuneAdmin.getApiNamespace(), $scope.collectionName, ids.join(',') ].join('/'))
                  .then(function(resp) {
                    var map = _.indexBy( models, "id" ),
                        i = j = 0;

                    while( i < data.length ){
                      if( map[ data[i].id ] ) {
                        data.splice( i, 1 );
                        j++;

                        if( j === models.length ) {
                          break;
                        }
                      } else {
                        i++;
                      }
                    }
                    // Show successfull dialog
                    var green = $modal.open({
                      templateUrl: CONFIG.shared.prepareViewTemplateUrl('directives/faAlert'),
                      controller: 'AlertCtrl',
                      resolve: {
                        message: function() {
                          return {
                            type: 'success',
                            text: 'The record removed successfully!'
                          }
                        }
                      }
                    })
                  }).catch(function(err) {
                    // Dispaly error here
                    var red = $modal.open({
                      templateUrl: CONFIG.shared.prepareViewTemplateUrl('directives/faAlert'),
                      controller: 'AlertCtrl',
                      resolve: {
                        message: function() {
                          return {
                            type: 'error',
                            text: 'Something wrong happened. Please try again later'
                          }
                        }
                      }
                    })
                  });
              }
            });
          }
        },
        "details": {
          name: "details",
          single: true,
          bulk: false,
          title: "Show Details",
          method: function(models, isBulk) {
            angular.forEach(models, function(model) {
              var dialog = $modal.open({
                size : "lg",
                templateUrl: CONFIG.shared.prepareViewTemplateUrl('directives/faDetails'),
                controller: 'DetailsCtrl',
                resolve: {
                  model: function () {
                    return model;
                  }
                }
              });
            });
          }
        }
      };
      $scope.options = $scope.options || {};

      for( var opt in $scope.options ) {
        if( $scope.actions[ opt ] && $scope.options[ opt ] === false ) {
          delete $scope.actions[ opt ];
        }
      }

      $scope.applySingleAction = function(iAction, model, data){
        iAction.method([model], false, data);
      };
      $scope.applyBulkAction = function(iAction, data){
        var selected = $scope.getSelected();
        iAction.method(selected, true, data);
      };

      var additionalResourceActions = faActionsService.getActions($scope.collectionName);
      angular.forEach(additionalResourceActions, function(action){
        $scope.actions[action.name] = action;
      });
      $scope.getSelected = function() {
        var selected = faActionsService.getSelectedItems($scope.data);
        return selected;
      }
  }])
  .controller('faActionColumnHeaderCtrl', ['$scope', function($scope) {
    var ctrl = this;
    ctrl.isCheckedItemsExists = isCheckedItemsExists;

    $scope.enabled = false;

    function isCheckedItemsExists() {
      return _.some($scope.$parent.grid.options.data, function(item){ return item.action_checked; });
    }

    $scope.$watch('$parent.grid.options.data', function (newValue, oldValue, scope) {
      $scope.enabled = ctrl.isCheckedItemsExists();
    }, true);

  }])
  .controller('faActionCellCtrl', ['$scope', function($scope) {
    var ctrl = this;
    ctrl.getItem = getItem;

    $scope.item = ctrl.getItem($scope.id);

    function getItem(id) {
      return _.find($scope.$parent.grid.options.data, function(item){ return id === item.id; });
    }
  }])
  .controller('DetailsCtrl', ['$scope', '$modalInstance', 'model', function($scope, $modalInstance, model) {
    $scope.model = model;
    $scope.close = function() {
      $modalInstance.close(true);
    };
  }])
  .controller('AlertCtrl', ['$scope', '$modalInstance', 'message', function($scope, $modalInstance, message) {
    $scope.message = message;
    $scope.close = function() {
      $modalInstance.close(true);
    };
  }])
  .controller('DeleteConfirmCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
    $scope.close = function() {
      $modalInstance.close(false);
    };
    $scope.confirm = function() {
      $modalInstance.close(true);
    };
  }])
  .controller('ResourcesCtrl', [
    '$scope',
    '$http',
    '$routeParams',
    'fortuneAdmin',
    'resources',
    'data',
    function ($scope, $http, $routeParams, fortuneAdmin, resources, data){
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
      $scope.strictFilters = fortuneAdmin.getStrictFilters();
      var defaultTypeahead = function(str, name, type){
        var strict  = fortuneAdmin.getStrictFilters();
        var query = {};
        if (!strict[plurResourceName]){
          query['filter[' + name + '][regex]'] = str;
          query['filter[' + name + '][options'] = 'i';
        }else{
          query['filter[' + name + ']'] = str;
        }
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
      $scope.getTypeaheadList = defaultTypeahead;
      //fortuneAdmin.typeaheadList({route: plurResourceName}, defaultTypeahead);

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
