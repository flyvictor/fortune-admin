(function(angular){
  angular.module('fortuneAdmin.umlDiagram.services', [])
    .service('umlData', ['$http', '$q', 'fortuneAdmin', umlData])
    .service('umlCanvasController', ['umlData', umlCanvasController])
    .service('umlLinks', ['umlData', 'umlCanvasController', umlLinks]);

  function umlData($http, $q, fortuneAdmin){
    var CONFIG = fortuneAdmin.getConfig();
    this._config = {
      canvas: {
        width: 1140,
        height: 7000
      },
      resource: {
        minMarginX: 100,
        minMarginY: 50,
        width: 200,
        height: 50,
        bgColor: 'black',
        textColor: 'white'
      },
      field: {
        width: 200,
        height: 20,
        bgColor: 'white',
        textColor: 'black',
        pkColor: 'green'
      }
    };

    this._resources = {};

    this.load = function(){
      var deferred = $q.defer();
      $http.get(CONFIG.baseEndpoint + '/resources').success(function(data){
        console.debug(data);
        deferred.resolve(data.resources);
      });
      return deferred.promise;
    };

    this.registerResource = function(name, resource){
      this._resources[name] = resource;
    };
    this.getResource = function(name){
      return this._resources[name];
    };
  }


  function umlCanvasController(umlData){
    var graph = this.graph = new joint.dia.Graph();

    /**
     *
     * @param elt - element which is suspected in overflowing
     * @param moveX
     * @param moveY
     * @param mockGraph - dirty hack for testing
     */
    this.moveResourceToFreePosition = function(elt, moveX, moveY, mockGraph){
      var models = mockGraph || graph.attributes.cells.models;
      var cumulativeX = 0;
      var that = this;
      removeIntersections(elt);

      /**
       * @param elt - element that is suspected to overflow something
       */
      function removeIntersections(elt){
        var intersecting = null;
        //iterate through children
        angular.forEach(models, function(existingElement){
          // ignore itself and links
          if (existingElement.cid !== elt.cid && existingElement.attributes.type !== 'link'){
            while (existingElement.intersects(elt)){
              intersecting = elt;
              cumulativeX += moveX;
              if (cumulativeX > umlData._config.canvas.width) {
                //recoil to the left and move one row down
                elt.translate(-cumulativeX + moveX, that.getMaxResourceHeight(models));
                cumulativeX = 0;
              }else{
                elt.translate(moveX, moveY);
              }
            }
          }
        });
        if (intersecting) removeIntersections(intersecting);
      }
    };

    /**
     * @param models - hack for tests
     * @returns {number} - tallest resource height + margin
     */
    this.getMaxResourceHeight = function(models){
      var max = 0;
      var headHeight = umlData._config.resource.height;
      var fieldHeight = umlData._config.field.height;
      angular.forEach(models, function(item){
        if (item.attributes.attrs.rect){
          if (item.attributes.embeds){
            var eltHeight = headHeight + fieldHeight * item.attributes.embeds.length;
            if (max < eltHeight){
              max = eltHeight;
            }
          }
        }
      });
      return max + 10;
    };
  }

  function umlLinks(umlData, canvasCtrl){
    this.link = function(from, toResource, many){
      //find resource element
      var referencedResource = umlData.getResource(toResource);
      if (!referencedResource){
        return from.attr({
          rect: {
            fill: 'yellow'
          }
        });
      }
      var newLink = new joint.dia.Link({
        source: {
          id: from.id
        },
        target: {
          id: referencedResource.id
        },
        router: {
          name: 'manhattan'
        },
        connector: {
          name: 'rounded'
        }
      });
      newLink.attr({
        '.connection': {
          stroke: many ? 'green' : 'blue'
        },
        '.marker-target': {
          fill: 'white',
          d: 'M 10 0 L 0 5 L 10 10 z'
        }
      });
      //Append to canvas
      canvasCtrl.graph.addCell(newLink);
    };
  }

})(angular);
