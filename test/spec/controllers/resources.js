describe('Controller: ResourcesCtrl', function(){
  //module('fortuneAdmin.Controllers');
  beforeEach(angular.mock.module('fortuneAdmin.Controllers'));
  var resources = [{
    name: 'user',
    schema: {
      title : String,
      email : String,
      addresses: [{ref: "address", inverse: "user"}]
    },
    modelOptions: {
      pk: "email"
    },
    route: "users"
  },{
    name: 'address',
    schema: {
      type: String,
      addressLine1: String,
      user: {ref: "user", inverse: "addresses", pkType: String}
    },
    route: "addresses"
  }];

  var defaultPlainParams = {
    name: 'user'
  };

  var mockUsers = {
    users: [{
      email: 'user@one.com',
      links: {
        addresses: [
          "mockAddress"
        ]
      }
    }],
    "links": {
      "users.addresses": {
        "type": "addresses"
      }
    }
  };

  var defaultNestedParams = {
    name: 'address',
    id: 'userId',
    inverse: 'user',
    parent: 'addresses'
  };

  var mockAddresses = {
    addresses: [{
      id: "mockAddress",
      links: {
      "user": "user@one.com"
    }
    }],
    "links": {
      "addresses.user": {
        "type": "users"
      }
    }
  };

  var $httpBackend, $rootScope, createCtrl;
  beforeEach(function(){
    module(function($provide){
      $provide.service('Inflect', function(){
        this.pluralize = function(str){
          return /s$/.test(str) ? str + 'es' : str + 's';
        };
        return this;
      });
    });
  });
  beforeEach(inject(function($injector){
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope').$new();
    var $controller = $injector.get('$controller');
    createCtrl = function(params, data){
      return $controller('ResourcesCtrl', {
        $scope: $rootScope,
        $routeParams: params,
        resources: resources,
        data: data
      });
    };
  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  it('should identify current resource and select data', function(){
    var ctrl = createCtrl(defaultPlainParams, mockUsers);

    expect($rootScope.currentResource.name).toEqual('user');
    expect($rootScope.data[0].email).toEqual('user@one.com');
    expect($rootScope.links["users.addresses"].type).toEqual('addresses');
    expect($rootScope.PK).toEqual('email');
  });

  it('should set reference when doc created from nested view', function(){
    var ctrl = createCtrl(defaultNestedParams, mockAddresses);
    $httpBackend.expectPOST('/api/v1/addresses').respond(function(method, url, data){
      data = JSON.parse(data);
      var newAddress = {addresses:[{
        id: 'created',
        links: {
          user: data.addresses[0].user
        }
      }]};
      return [200, JSON.stringify(newAddress)];
    });

    ctrl.addRow();
    $httpBackend.flush();
    expect($rootScope.data[1].links.user).toEqual('userId');
  });
});
