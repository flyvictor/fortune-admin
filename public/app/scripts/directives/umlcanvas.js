(function(angular){
  angular.module('fortuneAdmin.umlDiagram', [])
    .service('umlData', ['$http', '$q', umlData])
    .directive('umlCanvas', ['umlData', umlCanvas])
    .directive('umlResource', [umlResource])
    .directive('umlField', [umlField])
    .directive('umlLink', [umlLink]);

  function umlData($http, $q){
    var metadata = {};

    this.load = function(){
      //if (metadata) return metadata;
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
          width: 1200,
          height: 700,
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

  function umlResource(){
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
            y: 100
          };
        });
        this.embed = function(child){
          $scope.resource.embed(child);
          console.log('field embedded to: ', $scope.resource);
        };

        this.nextPosition = function(){
          var nextX = startPosition.x;
          var nextY = startPosition.y += 20;
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
            size: {width: 200, height: 100},
            attrs: {
              rect: {
                fill: 'blue'
              },
              text: {
                text: 'resource placeholder',
                fill: 'white'
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

  function umlField(){
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
            size: {width: 200, height: 20},
            attrs: {
              rect: {
                fill: 'white'
              },
              text: {
                text: 'none',
                fill: 'black'
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

  function umlLink(){
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
