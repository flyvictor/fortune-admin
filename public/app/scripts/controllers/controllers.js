'use strict';

var controllers = angular.module('fortuneAdmin.Controllers', []);

controllers.controller('UsersCtrl',[ '$scope', '$filter', '$http', function($scope, $filter, $http) {

  $scope.users = [
    {id: 1, title:'Mr.', firstName: 'Foo', lastName: 'Bar', role: 'Viewer', email: 'foo@bar.com', nationality: 'UK', languageCode: 'en' },
    {id: 2, title:'Mr.', firstName: 'John', lastName: 'Doe', role: 'Viewer', email: 'foo@bar.com', nationality: 'Spain', languageCode: 'es' },
    {id: 3, title:'Mr.', firstName: 'Foo', lastName: 'Bar', role: 'Viewer', email: 'foo@bar.com', nationality: 'UK', languageCode: 'po' }
  ];

  $scope.titles = [
    {value: 1, text: 'Mr.'},
    {value: 2, text: 'Mrs.'}
  ];

  $scope.roles = [
    {value: 1, text: 'viewer'},
    {value: 2, text: 'admin'},
    {value: 3, text: 'programmer'},
    {value: 4, text: 'sysadmin'}
  ];

  $scope.countries = [
    {value: 1, text: 'UK'},
    {value: 2, text: 'Irland'},
    {value: 3, text: 'Spain'},
    {value: 4, text: 'France'}
  ];

  $scope.groups = [];

  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showRoles = function(user) {
    if(user.role && $scope.roles.length) {
      var selected = $filter('filter')($scope.roles, {id: user.role});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.role || 'Not set';
    }
  };

  $scope.showTitle = function(user) {
    var selected = [];
    if(user.status) {
      selected = $filter('filter')($scope.titles, {value: user.title});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  $scope.showNacionality = function(user) {
    var selected = [];
    if(user.nacionality) {
      selected = $filter('filter')($scope.countries, {value: user.nacionality});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  $scope.saveUser = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {_id: id});
    return $http.post('/api/v1/users', { users: [ data ], linked: {} });
  };

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };

  // add user
  $scope.addUser = function() {
    $scope.inserted = {
      id: $scope.users.length+1,
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
}]);



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
