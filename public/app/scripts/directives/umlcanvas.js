(function(angular){
  angular.module('fortuneAdmin.umlDiagram', [
      'fortuneAdmin.umlDiagram.services'
    ])
    .directive('umlCanvas', ['umlData', umlCanvas])
    .directive('umlResource', ['umlData', umlResource])
    .directive('umlField', ['umlData', 'umlLinks', '$timeout', umlField]);

  function umlCanvas(umlData){
    var graph, paper;
    return{
      restrict: 'E',
      replace: true,
      scope: {
        id: '@'
      },
      templateUrl: '/templates/directives/uml/canvas.html',
      controller: ['$scope', 'umlCanvasController', function($scope, ctrl){
        angular.extend(this, ctrl);
        paper = new joint.dia.Paper({
          el: $('#' + $scope.id),
          width: umlData._config.canvas.width,
          height: umlData._config.canvas.height,
          model: ctrl.graph
        });
      }],
      compile: function(tElt, tAttrs){
        console.log('compiling canvas');
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
            x: 0,
            y: umlData._config.resource.height - umlData._config.field.height
          };
        });
        this.embed = function(child){
          $scope.resource.embed(child);
          console.log('field embedded to: ', $scope.resource);
        };

        this.intersects = function(elt){

          return $scope.resource.getBBox().intersect(elt.getBBox());
        };

        this.nextPostition = function(){
          startPosition.y += umlData._config.field.height;
          return startPosition;
        };
      },
      compile: function(tElt, tAttrs){
        console.debug('compiling resource');
        return function postLink(scope, elt, attrs, canvasCtrl){
          scope.resource = new joint.shapes.basic.Rect({
            position: {
              x: 0,
              y: 0
            },
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
          //augment element to handle intersections
          scope.resource.intersects = function(elt){
            return scope.resource.getBBox().intersect(elt.getBBox());
          };
          console.log('intersects: ', scope.resource.intersects);
          canvasCtrl.graph.addCell(scope.resource);

          //update text once data is loaded
          scope.$watch('umlData', function(){
            scope.resource.attr({
              text: {text: scope.umlData.name}
            });
            umlData.registerResource(scope.umlData.name, scope.resource);
            scope.resource.set('inPorts', [scope.umlData.name]);
            var translateX = umlData._config.resource.width + umlData._config.resource.minMarginX;
            var translateY = 0; //umlData._config.resource.height;
            canvasCtrl.moveResourceToFreePosition(scope.resource, translateX, translateY);
          });
          console.log(scope.umlData);
        }
      }
    }
  }

  function umlField(umlData, umlLinks, $timeout){
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
            position: resourceCtrl.nextPostition(),
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
          //augment element to handle intersections
          scope.field.intersects = function(elt){
            return scope.field.getBBox().intersect(elt.getBBox());
          };
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
          scope.$watch('fieldData', function(){
            // decide if it should create a link
            $timeout(function(){
              console.log(scope.fieldData);
              if (angular.isArray(scope.fieldData)){
                //many to many relationship
                umlLinks.link(scope.field, scope.fieldData[0].ref);
              }else if (angular.isObject(scope.fieldData)){
                umlLinks.link(scope.field, scope.fieldData.ref);
                //one to one relationship
              }
            });
          });
        }
      }
    }
  }
})(angular);
