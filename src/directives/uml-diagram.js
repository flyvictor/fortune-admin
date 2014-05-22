angular.module('fortuneAdmin.umlDiagram', [
    'fortuneAdmin.umlDiagram.services'
  ])
  .directive('umlCanvas', ['umlData',
    function umlCanvas(umlData){
      var paper;
      return{
        restrict: 'E',
        replace: true,
        scope: {
          id: '@',
          selectedResources: '='
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
          $scope.$on('fortuneAdmin:uml:relink', function(){
            angular.forEach(ctrl.graph.attributes.cells.models, function(item){
              if (item.attributes.type === 'link'){
                item.remove();
              }
            });
          });
        }],
        link: function postLink(scope){
        }
      }
    }])

  .directive('umlResource', ['umlData',
    function umlResource(umlData){
      return{
        restrict: 'E',
        require: '^umlCanvas',
        replace: true,
        scope: {
          umlData: '='
        },
        templateUrl: '/templates/directives/uml/resource.html',
        controller: function($scope){
          if ($scope.umlData.modelOptions && $scope.umlData.modelOptions.pk){
            //delete pk from list to not render it twice
            delete $scope.umlData.schema[$scope.umlData.modelOptions.pk];
          }
          var startPosition;
          $scope.$watch('umlData', function(){
            startPosition = {
              x: 0,
              y: umlData._config.resource.height - umlData._config.field.height
            };
          });
          this.embed = function(child){
            $scope.resource.embed(child);
          };

          this.intersects = function(elt){
            return $scope.resource.getBBox().intersect(elt.getBBox());
          };

          this.nextPostition = function(){
            startPosition.y += umlData._config.field.height;
            return startPosition;
          };

          $scope.$on('$destroy', function(){
            //remove resource from canvas
            //no need to remove individual fields as they are embedded to resource
            $scope.resource.remove();
          });
        },
        link: function postLink(scope, elt, attrs, canvasCtrl){
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
          //augment element to easily handle intersections
          scope.resource.intersects = function(elt){
            return scope.resource.getBBox().intersect(elt.getBBox());
          };

          canvasCtrl.graph.addCell(scope.resource);

          //update text once data is loaded
          scope.$watch('umlData', function(){
            scope.resource.attr({
              text: {text: scope.umlData.name}
            });
            umlData.registerResource(scope.umlData.name, scope.resource);
            scope.resource.set('inPorts', [scope.umlData.name]);
            var translateX = umlData._config.resource.width + umlData._config.resource.minMarginX;
            var translateY = 0;
            canvasCtrl.moveResourceToFreePosition(scope.resource, translateX, translateY);
          });
        }
      }
    }])

  .directive('umlField', ['umlData', 'umlLinks', '$timeout',
    function umlField(umlData, umlLinks, $timeout){
      return{
        restrict: 'E',
        require: ['^umlCanvas', '^umlResource'],
        scope: {
          resource: '=',
          fieldName: '=',
          fieldData: '='
        },
        link: function postLink(scope, elt, attrs, controllers){
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
                fill: attrs.isPk ? umlData._config.field.pkColor : umlData._config.field.bgColor
              },
              text: {
                text: 'undefined',
                fill: umlData._config.field.textColor
              }
            }
          });
          //augment element to handle intersections
          scope.field.intersects = function(elt){
            return scope.field.getBBox().intersect(elt.getBBox());
          };
          //push field to its resource container
          resourceCtrl.embed(scope.field);
          //and append it to the graph
          canvasCtrl.graph.addCell(scope.field);
          scope.$watch('fieldName', function(){
            scope.fieldType = null;
            if (angular.isObject(scope.fieldData) || angular.isArray(scope.fieldData)){
              scope.fieldType = 'ref';
            }else{
              switch (scope.fieldData){
                case 'String':
                  scope.fieldType = 'str';
                  break;
                case 'Number':
                  scope.fieldType = 'num';
                  break;
                case 'Date':
                  scope.fieldType = 'date';
                  break;
                case 'Boolean':
                  scope.fieldType = 'bool';
                  break;
                case 'Array':
                  scope.fieldType = 'array';
                  break;
                case 'Buffer':
                  scope.fieldType = 'buff';
                  break;
              }
            }
            scope.field.attr({
              text: {
                text: (attrs.isPk ? 'PK:' + scope.fieldName : scope.fieldName) +
                  (scope.fieldType ? ' [' + scope.fieldType +']' : '')
              }
            });
          });
          scope.$watch('fieldData', relink);
          scope.$on('fortuneAdmin:uml:relink', relink);
          function relink(){
            //wait until all other fields are rendered
            $timeout(function(){
              if (angular.isArray(scope.fieldData)){
                //many to many relationship
                if(!scope.fieldData[0]){
                  return console.error('empty array instead of reference');
                }
                markFk();
                umlLinks.link(scope.field, scope.fieldData[0].ref, true);
              }else if (angular.isObject(scope.fieldData)){
                markFk();
                umlLinks.link(scope.field, scope.fieldData.ref, false);
                //one to one relationship
              }
            });
          }
          function markFk(){
            scope.field.attr({
              rect: {
                fill: umlData._config.field.bgColor
              },
              text: {
                text: 'FK: ' + scope.fieldName +
                  (scope.fieldType ? ' [' + scope.fieldType + ']' : '')
              }
            });
          }
        }
      }
    }]);