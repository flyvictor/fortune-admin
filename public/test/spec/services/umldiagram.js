
describe("umlDiagram services", function(){
  beforeEach(function(){
    module('fortuneAdmin.umlDiagram.services');
  });
  describe("Service: umlData", function(){
    var umlData, $httpBackend;
    beforeEach(inject(function($injector){
      $httpBackend = $injector.get('$httpBackend');
      umlData = $injector.get('umlData');
    }));

    it('should provide method to fetch metadata', function(){
      $httpBackend.expectGET('/metadata').respond({metadata: [{name: 'aResource', schema: {}}]});
      umlData.load().then(function(data){
        expect(data).toBeDefined();
        expect(data[0].name).toEqual('aResource');
      });
      $httpBackend.flush();
    });
    it('should provide methods to keep track of resources', function(){
      umlData.registerResource('resourceName', {prop: 'value'});
      var cached = umlData.getResource('resourceName');
      expect(cached.prop).toEqual('value');
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
  describe('Service: umlCanvasController', function(){
    var canvasCtrl;
    beforeEach(function(){
      module(function($provide){
        $provide.service('umlData', function mockUmlData(){
          this._config = {
            canvas: {
              width: 1140
            },
            resource: {
              width: 200,
              height: 50
            },
            field: {
              width: 200,
              height: 20
            }
          }
        });
      });
    });
    beforeEach(inject(function($injector){
      canvasCtrl = $injector.get('umlCanvasController');
    }));
    it('should create and store a graph for later use', function(){
      expect(canvasCtrl.graph).toBeDefined();
    });
    it('should provide a method to resolve intersections', function(){
      //Mock graph
      function intersects(){
        var count = 0;
        //Each registered graph will get true twice
        return function(elt){
          count++;
          return count < 3;
        }
      }
      var mockGraph = [];
      for (var i = 0; i < 2; i++){
        mockGraph.push({
          cid: i,
          intersects: intersects(),
          attributes: {
            type: 'fake'
          }
        });
      }
      expect(mockGraph.length).toEqual(2);
      //mock element
      var movements = 0;
      var elt = {
        cid: 0,
        translate: function(moveX, moveY){
          movements++;
        }
      };
      canvasCtrl.moveResourceToFreePosition(elt, 0, 0, mockGraph);
      // graph#0 is ignored and 2 movements from graph#1
      expect(movements).toEqual(2);
    });
    it('should move element to the next row once canvas width is reached', function(){
      function intersects(){
        var count = 0;
        return function(elt){
          count++;
          return count < elt.cid;
        }
      }
      var mockGraph = [];
      for (var i = 0; i < 4; i++){
        mockGraph.push({
          cid: i,
          intersects: intersects(),
          attributes: {
            attrs: {
              rect: true
            },
            embeds: ['one','two','three'],
            type: 'fake'
          }
        });
      }
      //mock element
      var rowWrapped = 0;
      var elt = {
        //three elements will fit in a row. The fourth should move down
        cid: 3,
        translate: function(moveX, moveY){
          if (moveY != 0){
            rowWrapped++;
          }
        }
      };
      canvasCtrl.moveResourceToFreePosition(elt, 300, 0, mockGraph);
      expect(rowWrapped).toEqual(1);
    });
  });
  describe('Service: umlLinks', function(){
    var umlLinks;
    var mockJointInstance, cachedJoint, mockCellAdded = false;
    beforeEach(function(){
      module(function($provide){
        $provide.service('umlData', function mockUmlData(){
          this.getResource = function(linkTo){
            return {
              id: 1
            }
          };
        });
        $provide.service('umlCanvasController', function mockCanvasCtrl(){
          this.graph = {
            addCell: function(){
              mockCellAdded = true;
              return true;
            }
          }
        });
      });
    });
    beforeEach(inject(function($injector){
      function mockJoint(){
        mockJointInstance = this;
        var that = this;
        this.dia = {};
        this.attr = {};
        this.dia.Link = function(config){
          that.config = config;
          return {
            attr: function(options){
              that.attr = options;
            }
          }
        };
      }
      cachedJoint = window.joint;
      window.joint = null;
      window.joint = new mockJoint();

      umlLinks = $injector.get('umlLinks');
    }));
    it('should resolve and configure new link', function(){
      var from = {
        id: 0
      };
      umlLinks.link(from, null, true);
      expect(mockJointInstance.config.source.id).toEqual(from.id);
      expect(mockJointInstance.config.target.id).toEqual(1);
      expect(mockJointInstance.attr['.connection'].stroke).toEqual('green');
      expect(mockCellAdded).toEqual(true);
    });

    afterEach(function(){
      //Return cached joint on its right place
      window.joint = cachedJoint;
    });
  });
});
