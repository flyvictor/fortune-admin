'use strict';

var controllers = angular.module('fortuneAdmin.Controllers', []);

controllers.controller('UsersCtrl',[ '$scope', '$filter', '$http',
  function($scope, $filter, $http) {

    $http.get('/api/v1/users')
      .success(function (data, status, headers, config) {
        $scope.users = data.users;
      })
      .error(function(data, status, headers, config) {
        console.log(status);
      });

    $scope.titles = [
      {value: 'Mr.', text: 'Mr.'},
      {value: 'Mrs.', text: 'Mrs.'}
    ];

    $scope.roles = [
      { value: 'viewer', text: 'viewer' },
      { value: 'admin', text: 'admin' },
      { value: 'programmer', text: 'programmer' },
      { value: 'sysadmin', text: 'sysadmin' }
    ];

    $scope.countries = [
      {value: 'UK', text: 'UK'},
      {value: 'Ireland', text: 'Ireland'},
      {value: 'Spain', text: 'Spain'},
      {value: 'France', text: 'France'}
    ];

    $scope.showRoles = function(user) {
      if(user.role && $scope.roles.length) {
        var selected = $filter('filter')($scope.roles, {value: user.role});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.role || 'Not set';
      }
    };

    $scope.showTitle = function(user) {
      var selected = [];
      if(user.title) {
        selected = $filter('filter')($scope.titles, {value: user.title});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.showNationality = function(user) {
      var selected = [];
      if(user.nationality) {
        selected = $filter('filter')($scope.countries, {value: user.nationality});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.saveUser = function(user, id) {

      if (id === undefined) {
        $http.post('/api/v1/users',{ users: [ user ] })
          .success(function (data, status, headers, config) {
            $http.get('/api/v1/users')
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
        $http.put('/api/v1/users/' + id,{ users: [ user ]})
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

      $http.delete('/api/v1/users/' + id)
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



controllers.controller('AddressesCtrl',[ '$scope', '$filter', '$http',
  function($scope, $filter, $http) {

    $http.get('/api/v1/addresses')
      .success(function (data, status, headers, config) {
        $scope.addresses = data.addresses;
      })
      .error(function(data, status, headers, config) {
        console.log(status);
      });

    $scope.titles = [
      {value: 'Mr.', text: 'Mr.'},
      {value: 'Mrs.', text: 'Mrs.'}
    ];

    $scope.roles = [
      { value: 'viewer', text: 'viewer' },
      { value: 'admin', text: 'admin' },
      { value: 'programmer', text: 'programmer' },
      { value: 'sysadmin', text: 'sysadmin' }
    ];

    $scope.countries = [
      {value: 'UK', text: 'UK'},
      {value: 'Ireland', text: 'Ireland'},
      {value: 'Spain', text: 'Spain'},
      {value: 'France', text: 'France'}
    ];

    $scope.showRoles = function(user) {
      if(user.role && $scope.roles.length) {
        var selected = $filter('filter')($scope.roles, {value: user.role});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.role || 'Not set';
      }
    };

    $scope.showTitle = function(user) {
      var selected = [];
      if(user.title) {
        selected = $filter('filter')($scope.titles, {value: user.title});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.showNationality = function(user) {
      var selected = [];
      if(user.nationality) {
        selected = $filter('filter')($scope.countries, {value: user.nationality});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.saveAddress = function(address, id) {

      if (id === undefined) {
        $http.post('/api/v1/addresses',{ address: [ address ] })
          .success(function (data, status, headers, config) {
            $http.get('/api/v1/users')
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
        $http.put('/api/v1/users/' + id,{ users: [ user ]})
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

      $http.delete('/api/v1/users/' + id)
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
