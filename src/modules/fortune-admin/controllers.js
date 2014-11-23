'use strict';
angular.module('fortuneAdmin.Controllers', [
    'fortuneAdmin.Services'
  ])
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

      this.resolveFieldName = function(linkName){
        //No need to dig deeper as there's no nested schemas
        var parts = linkName.split('.');
        return parts[parts.length - 1];
      };

      this.resolveInverse = function(linkName){
        var fieldName = this.resolveFieldName(linkName);
        var ref = currentResource.schema[fieldName];

        var inverse = '';
        if (angular.isArray(ref)){
          inverse = ref[0].inverse;
        }else if(angular.isObject(ref)){
          inverse = ref.inverse;
        }else {
          throw new Error('Malformed reference');
        }
        return inverse;
      };


      this.linkToMany = function(linkName){
        var fieldName = this.resolveFieldName(linkName);
        var ref = currentResource.schema[fieldName];
        return angular.isArray(ref);
      };

      // XXX TESTING!
      this.socket = io.connect("localhost:4000/" + $scope.currentResource.name);

      this.socket.on('add', function(data) {
        $scope.data.push(data.data);
        console.log(data.data);
        // XXX angular sucks ;_;
        $scope.$apply();
      });

      this.socket.on('delete', function(data) {
        // XXX at the moment this returns all of the
        // rows, we need to change this
        $scope.data = data.data;
        console.log(data.data);
        $scope.$apply();
      });

      this.socket.on('update', function(data) {
        var i, l, res, updated = data.data;
        console.log(updated);
        for (i = 0, l = $scope.data.length; i < l; i++) {
          res = $scope.data[i];
          if (res.id === updated.id) {
            $scope.data[i] = updated;
            return $scope.$apply();
          }
        }
      });


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
            // we don't need this, as websockets will have already added it.
          // $scope.data.push(data[plurResourceName][0]);
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

      this.getTypeaheadList = function(str, name){
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

      this.applyFilter = function(selected, fieldName, type){
        switch (type){
          case 'String':
            //Derived from typeahead
            $scope.filter['filter[' + fieldName + '][regex]'] = selected.model;
            $scope.filter['filter[' + fieldName + '][options]'] = 'i';
            break;
          case 'Number':
          case 'Date':
            $scope.filter['filter[' + fieldName + '][gte]'] = selected.start;
            $scope.filter['filter[' + fieldName + '][lte]'] = selected.end;
            break;
          case 'Boolean':
            $scope.filter['filter[' + fieldName + ']'] = selected;
            break;
        }
        runCurrentFilter();
      };

      this.dropFilter = function(fieldName){
        delete $scope.filter['filter[' + fieldName + '][regex]'];
        delete $scope.filter['filter[' + fieldName + '][options]'];
        delete $scope.filter['filter[' + fieldName + '][gte]'];
        delete $scope.filter['filter[' + fieldName + '][lte]'];
        delete $scope.filter['filter[' + fieldName + ']'];
        runCurrentFilter();
      };

      function runCurrentFilter(){
        $http.get(CONFIG.fortuneAdmin.getApiNamespace() + '/' + plurResourceName,{
          params: $scope.filter
        })
          .success(function(data){
            console.log(data);
            $scope.data = data[plurResourceName];
          });
      }
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
