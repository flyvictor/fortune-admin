'use strict';

var controllers = angular.module('fortuneAdmin.Controllers', [
  'fortuneAdmin.Constants',
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

controllers.controller('ResourcesCtrl', ['$scope', '$http', 'Inflect', '$routeParams', 'resources', 'data', ResourcesCtrl]);

function ResourcesCtrl($scope, $http, Inflect, $routeParams, resources, data){
  var currentResource  = resources.find(function(res){
    return res.name === $routeParams.name || Inflect.pluralize(res.name) === $routeParams.name;
  });
  var plurResourceName = Inflect.pluralize(currentResource.name);
  $scope.plurResourceName = plurResourceName;
  $scope.currentResource = currentResource;
  $scope.data = data[plurResourceName];
  $scope.links = data.links;
  $scope.PK = $scope.currentResource.modelOptions ? $scope.currentResource.modelOptions.pk || 'id' : 'id';

  this.resolveInverse = function(linkName){
    var parts = linkName.split('.');
    //No need to dig deeper as there's no nested schemas
    var fieldName = parts[parts.length - 1];

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
    $http.post(CONFIG.getApiNamespace() + '/' + plurResourceName, cmd).success(function(data) {
      $scope.data.push(data[plurResourceName][0]);
    });
  };

  this.deleteRow = function(index, id){
    $http.delete(CONFIG.getApiNamespace() + '/' + plurResourceName + '/' + id)
      .success(function (data, status) {
        console.log(status);
        $scope.data.splice(index, 1);
      })
      .error(function(data, status) {
        console.log(status);
      });

  }
}

controllers.controller('UsersCtrl',[ '$scope', '$filter', '$http', '$routeParams',
  'ConstUserTitles', 'ConstUserRoles', 'ConstCountries',
  function($scope, $filter, $http, $routeParams, cTitles, cRoles, cCountries) {

    $http.get(CONFIG.getApiNamespace() + '/users')
      .success(function (data, status, headers, config) {
        $scope.users = data.users;
      })
      .error(function(data, status, headers, config) {
        console.log(status);
      });

    $scope.titles = cTitles;
    $scope.roles = cRoles;
    $scope.countries = cCountries;

    $scope.saveUser = function(user, id) {

      if (id === undefined) {
        $http.post(CONFIG.getApiNamespace() + '/users',{ users: [ user ] })
          .success(function (data, status, headers, config) {
            $http.get(CONFIG.getApiNamespace() + '/users')
              .success(function (data, status, headers, config) {
                $scope.users = data.users;
              })
              .error(function(data, status, headers, config) {
                console.log(status);
              });
          })
          .error(function(data, status, headers, config) {
            console.log(status);
          });
      } else {
        $http.put(CONFIG.getApiNamespace() + '/users/' + id,{ users: [ user ]})
          .success(function (data, status, headers, config) {
            console.log(status);
          })
          .error(function(data, status, headers, config) {
            console.log(status);
          });
      }
    };
    // remove user
    $scope.removeUser = function(index, id) {

      $http.delete(CONFIG.getApiNamespace() + '/users/' + id)
        .success(function (data, status, headers, config) {
          console.log(status);
          $scope.users.splice(index, 1);
        })
        .error(function(data, status, headers, config) {
          console.log(status);
        });

    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        title : null,
        firstName : null,
        lastName : null,
        role : null,
        email : null,
        nationality: null,
        languageCode: null
      };
      $scope.users.push($scope.inserted);
    };
  }
]);



controllers.controller('AddressesCtrl',[ '$scope', '$filter', '$http', '$routeParams',
  'ConstAddressTypes', 'ConstCountries',
  function($scope, $filter, $http, $routeParams, cTypes, cCountries) {

    var url =  $routeParams.user_id ? CONFIG.getApiNamespace() + '/users/' + $routeParams.user_id + '/addresses' : CONFIG.getApiNamespace() + '/addresses';
    $http.get(CONFIG.getApiNamespace() + '/users')
      .success(function (data, status, headers, config) {
        $scope.users = data.users;
        $http.get(url)
          .success(function (data, status, headers, config) {
            $scope.addresses = data.addresses;
          })
          .error(function(data, status, headers, config) {
            console.log(status);
          });
      })
      .error(function(data, status, headers, config) {
        console.log(status);
      });

    $scope.types = cTypes;
    $scope.countries = cCountries;

    $scope.saveAddress = function(address, id) {

      if (id === undefined) {
        $http.post(CONFIG.getApiNamespace() + '/addresses',{ addresses: [ address ] })
          .success(function (data, status, headers, config) {
            $http.get(CONFIG.getApiNamespace() + '/addresses')
              .success(function (data, status, headers, config) {
                $scope.users = data.users;
              })
              .error(function(data, status, headers, config) {
                console.log(status);
              });
          })
          .error(function(data, status, headers, config) {
            console.log(status);
          });
      } else {
        $http.put(CONFIG.getApiNamespace() + '/addresses/' + id,{ addresses: [ address ]})
          .success(function (data, status, headers, config) {
            console.log(status);
          })
          .error(function(data, status, headers, config) {
            console.log(status);
          });
      }
    };
    // remove user
    $scope.removeAddress = function(index, id) {

      $http.delete(CONFIG.getApiNamespace() + '/addresses/' + id)
        .success(function (data, status, headers, config) {
          console.log(status);
          $scope.addresses.splice(index, 1);
        })
        .error(function(data, status, headers, config) {
          console.log(status);
        });
    };

    // add user
    $scope.addAddress = function() {
      $scope.inserted = {
        type : null,
        addressLine1 : null,
        addressLine2 : null,
        city : null,
        region : null,
        postCode: null,
        country: null
      };
      $scope.addresses.push($scope.inserted);
    };

  }
]);
