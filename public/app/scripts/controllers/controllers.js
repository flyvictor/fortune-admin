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



controllers.controller('AddressesCtrl',[ '$scope', '$filter', '$http', function($scope, $filter, $http) {

  $scope.users = [
    {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
    {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
    {id: 3, name: 'awesome user3', status: 2, group: null}
  ];

  $scope.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ];

  $scope.groups = [];

  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function(user) {
    if(user.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: user.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.groupName || 'Not set';
    }
  };

  $scope.showStatus = function(user) {
    var selected = [];
    if(user.status) {
      selected = $filter('filter')($scope.statuses, {value: user.status});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  $scope.checkName = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return "Username 2 should be `awesome`";
    }
  };

  $scope.saveUser = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {id: id});
    return $http.post('/saveUser', data);
  };

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };

  // add user
  $scope.addUser = function() {
    $scope.inserted = {
      id: $scope.users.length+1,
      name: '',
      status: null,
      group: null
    };
    $scope.users.push($scope.inserted);
  };
}]);
