'use strict';

var controllers = angular.module('fortuneAdmin.Controllers', [
  'fortuneAdmin.Constants',
  'fortuneAdmin.Services',
  'fortuneAdmin.Controllers.umlDiagram'
]);

controllers.controller('ResourcesCtrl', ['$scope', '$http', 'Inflect', '$routeParams', 'resources', 'data', ResourcesCtrl]);

function ResourcesCtrl($scope, $http, Inflect, $routeParams, resources, data){
  $scope.allResources = resources;
  $scope.currentResource  = resources.find(function(res){
    return res.name === $routeParams.name || Inflect.pluralize(res.name) === $routeParams.name;
  });
  $scope.data = data[Inflect.pluralize($scope.currentResource.name)];
  $scope.links = data.links;

  this.resolveInverse = function(linkName){
    var parts = linkName.split('.');
    var fieldName = parts[parts.length - 1];

    // Dig down through nested schemas
    var iterator = $scope.currentResource.schema;
    for (var i = 1; i < parts.length - 1; i++){
      iterator = iterator[parts[i]];
    }
    var ref = iterator[fieldName];

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
