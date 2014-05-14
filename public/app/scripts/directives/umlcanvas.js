(function(angular){
  angular.module('fortuneAdmin.umlDiagram', [])
    .service('umlData', ['$http', '$q', umlData])
    .directive('umlCanvas', ['umlData', umlCanvas])
    .directive('umlResource', ['umlData', umlResource])
    .directive('umlField', ['umlData', umlField])
    .directive('umlLink', ['umlData', umlLink]);

  function umlData($http, $q){
    this._config = {
      canvas: {
        width: 1200,
        height: 700
      },
      resource: {
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

    this.load = function(){
      var deferred = $q.defer();
      $http.get('/metadata').success(function(data){
        console.log('data loaded');
        deferred.resolve(data.metadata);
      });
      return deferred.promise;
    };

  }

  function umlCanvas(umlData){
    var graph, paper;
    return{
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: '/templates/directives/uml/canvas.html',
      controller: function($scope, $element){
        this.graph = {
          addCell: function(item){
            graph.addCell(item);
          }
        }
      },
      compile: function(tElt, tAttrs){
        console.log('compiling canvas');
        graph = new joint.dia.Graph();
        paper = new joint.dia.Paper({
          el: $('#' + tAttrs.id),
          width: umlData._config.canvas.width,
          height: umlData._config.canvas.height,
          model: graph
        });
        return function postLink(scope, elt, attrs){
          umlData.load().then(function(data){
            scope.data = data;
            console.log(data);
          }, function(){
              console.error('Add alert');
          });
        }
      }
    }
  }

  function umlResource(umlData){
    //var resource;
    return{
      restrict: 'E',
      require: '^umlCanvas',
      replace: true,
      scope: {
        umlData: '='
      },
      templateUrl: '/templates/directives/uml/resource.html',
      controller: function($scope){
        var startPosition;
        $scope.$watch('umlData', function(){
          startPosition = {
            x: 10,
            y: umlData._config.resource.height - umlData._config.field.height
          };
        });
        this.embed = function(child){
          $scope.resource.embed(child);
          console.log('field embedded to: ', $scope.resource);
        };

        this.nextPosition = function(){
          var nextX = startPosition.x;
          var nextY = startPosition.y += umlData._config.field.height;
          return {
            x: nextX,
            y: nextY
          }
        }
      },
      compile: function(tElt, tAttrs){
        console.debug('compiling resource');
        return function postLink(scope, elt, attrs, canvasCtrl){
          scope.resource = new joint.shapes.basic.Rect({
            position: {x: 10, y: 10},
            size: {
              width: umlData._config.resource.width,
              height: umlData._config.resource.height
            },
            attrs: {
              rect: {
                fill: umlData._config.resource.bgColor
              },
              text: {
                text: 'resource placeholder',
                fill: umlData._config.resource.textColor
              }
            }
          });
          canvasCtrl.graph.addCell(scope.resource);

          //update text once data is loaded
          scope.$watch('umlData', function(){
            scope.resource.attr({
              text: {text: scope.umlData.name}
            });

          });
          console.log(scope.umlData);
        }
      }
    }
  }

  function umlField(umlData){
    return{
      restrict: 'E',
      require: ['^umlCanvas', '^umlResource'],
      scope: {
        fieldName: '=',
        fieldData: '='
      },
      //templateUrl: '/templates/directives/uml/field.html',
      compile: function(tElt, tAttrs){
        return function postLink(scope, elt, attrs, controllers){
          var resourceCtrl = controllers[1];
          var canvasCtrl = controllers[0];
          scope.field = new joint.shapes.basic.Rect({
            position: resourceCtrl.nextPosition(),
            size: {
              width: umlData._config.field.width,
              height: umlData._config.field.height
            },
            attrs: {
              rect: {
                fill: umlData._config.field.bgColor
              },
              text: {
                text: 'none',
                fill: umlData._config.field.textColor
              }
            }
          });
          resourceCtrl.embed(scope.field);
          canvasCtrl.graph.addCell(scope.field);
          scope.$watch('fieldName', function(){
            scope.field.attr({
              text: {
                text: scope.fieldName
              }
            });
          });
          // get field metadata
          // decide if it should create a link
        }
      }
    }
  }

  function umlLink(umlData){
    var link;
    return{
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: '/templates/directives/uml/link.html',
      compile: function(tElt, tAttrs){
        link = joint.dia.link({
          source: {id: tAttrs.from},
          target: {id: tAttrs.to}
        });
        return function postLink(scope, elt, attrs){
          scope.graph.addCell(link);
        }
      }
    }
  }
})(angular);
