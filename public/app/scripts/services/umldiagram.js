(function(angular){
  angular.module('fortuneAdmin.umlDiagram.services', [])
    .service('umlData', ['$http', '$q', umlData])
    .service('umlCanvasController', [umlCanvasController])
    .service('umlLinks', ['umlData', umlLinks]);

  function umlData($http, $q){
    this._config = {
      canvas: {
        width: 1200,
        height: 700
      },
      resource: {
        minMarginX: 100,
        minMarginY: 50,
        width: 200,
        height: 100,
        bgColor: 'blue',
        textColor: 'white'
      },
      field: {
        width: 200,
        height: 20,
        bgColor: 'white',
        textColor: 'black'
      }
    };

    this._resources = {};

    this.load = function(){
      var deferred = $q.defer();
      $http.get('/metadata').success(function(data){
        console.log('data loaded');
        deferred.resolve(data.metadata);
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


  function umlCanvasController(){
    this.graph = {
      addCell: function(item){
        graph.addCell(item);
      }
    };

    this.moveResourceToFreePosition = function(elt, moveX, moveY){
      /*var translateBy = {
       x: moveX || (umlData._config.resource.width + umlData._config.resource.minMarginX),
       y: moveY || (umlData._config.resource.minMarginY)
       };*/
      removeIntersections(elt);
      function removeIntersections(elt){
        var intersecting = null;
        //iterate through children
        angular.forEach(graph.attributes.cells.models, function(existingElement){
          //run only for parents and ignore itself
          if (existingElement.cid !== elt.cid){
            while (existingElement.intersects(elt)){
              intersecting = elt;
              elt.translate(moveX, moveY);
            }
          }
        });
        if (intersecting) removeIntersections(intersecting);
      }
    };
  }

  function umlLinks(umlData){
    this.links = [];

    this.link = function(from, toResource){
      //find resource element
      var referencedResource = umlData.getResource(toResource);
      var newLink = new joint.dia.Link({
        source: {
          id: from.id
        },
        target: {
          id: referencedResource.id
        }
      });
      //Append to canvas

      this.links.push(newLink);
    };
  }

})(angular);
