'use strict';
(function(angular){
var controllers = angular.module('fortuneAdmin.Controllers', [
  'fortuneAdmin.Services',
  'fortuneAdmin.Controllers.umlDiagram'
]);

controllers.filter('filterLinks', [function(){
  return function(input){
    var nonLinks = {};
    angular.forEach(input, function(field, name){
      if (!angular.isObject(field)){
        nonLinks[name] = field;
      }
    });
    return nonLinks;
  }
}]);

controllers.controller('ResourcesCtrl', [
  '$scope',
  '$http',
  'Inflect',
  '$routeParams',
  'resources',
  'data',
  ResourcesCtrl
]);

function ResourcesCtrl($scope, $http, Inflect, $routeParams, resources, data){
  var currentResource = {};
  angular.forEach(resources, function(res){
    if(res.name === $routeParams.name || Inflect.pluralize(res.name) === $routeParams.name){
      currentResource = res;
    }
  });
  var plurResourceName = Inflect.pluralize(currentResource.name);

  $scope.plurResourceName = plurResourceName;
  $scope.currentResource = currentResource;

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
    $http.post(CONFIG.fortuneAdmin.getApiNamespace() + '/' + plurResourceName, cmd).success(function(data) {
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

  }
}
})(angular);