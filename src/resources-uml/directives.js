(function(angular){
  var config = {
    headerHeight: 50,
    fieldHeight: 25,
    fieldWidth: 200,
    columnWidth: 300,
    vgap: 50
  };

  angular.module('fortuneAdmin.Uml.Directives', [
      'fortuneAdmin.Uml.D3',
      'fortuneAdmin.Uml.Services'
    ])
    .directive('resourcesCanvas', ['$compile', 'UmlElementsRegistry', resourcesCanvas])
    .directive('resourceClass', ['$compile', 'UmlElementsRegistry', resourceClass])
    .directive('resourceProperty', ['$compile', 'UmlElementsRegistry', resourceProperty])
    .directive('resourceLink', ['UmlElementsRegistry', resourceLink]);

  function resourcesCanvas($compile, UmlElementsRegistry){
    return {
      restrict: 'A',
      templateUrl: '/templates/directives/uml/canvas.html',
      scope: {
        resources: '='
      },
      link: function(scope, elt){
        UmlElementsRegistry.clear();
        scope.canvas = {};
        var schema = [];
        var resources = [];

        var height = 0;
        var elementsInARow = Math.floor(elt[0].clientWidth / config.columnWidth);

        //Convert to D3 data structure
        angular.forEach(scope.resources, function(resource, index){
          schema[index] = [];
          resources[index] = {
            name: resource.name
          };
          if (resource.modelOptions && resource.modelOptions.pk){
            resources[index].pk = resource.modelOptions.pk || 'id';
          }
          angular.forEach(resource.schema, function(fieldParams, fieldName){
            schema[index].push({
              name: fieldName,
              params: fieldParams,
              pk: resources[index].pk === fieldName
            });
          });
          schema[index].sort(function(a,b){
            return a.name > b.name ? 1: -1;
          });
        });
        scope.resources = schema;

        function getBottom(){
          var bottom = UmlElementsRegistry.bottomLine[0];
          var col = 0;
          for (var i = 0; i < UmlElementsRegistry.bottomLine.length; i++){
            if (UmlElementsRegistry.bottomLine[i] < bottom) {
              bottom = UmlElementsRegistry.bottomLine[i];
              col = i;
            }
          }
          return [col, bottom];
        }

        (function setupLayout(){
          for (var i = 0; i < elementsInARow; i++){
            UmlElementsRegistry.bottomLine.push(10);
          }

          angular.forEach(schema, function(resource, index){
            var elementHeight = resource.length * config.fieldHeight + config.headerHeight;

            var coords = getBottom();

            var eltPosition = {
              x: coords[0] * config.columnWidth,
              y: coords[1],
              height: elementHeight,
              column: coords[0]
            };

            //Update bottom line
            UmlElementsRegistry.bottomLine[coords[0]] += elementHeight + config.vgap;

            UmlElementsRegistry.positions[index] = eltPosition;

          });
        })();

        function nextPosition(d, index){
          return UmlElementsRegistry.positions[index];
        }

        for (var i = 0; i < UmlElementsRegistry.bottomLine.length; i++){
          if (UmlElementsRegistry.bottomLine[i] > height) height = UmlElementsRegistry.bottomLine[i] + 100;
        }

        //create canvas for rendering resources containers
        var svg = d3.select(elt[0])
          .append('svg')
          .attr('id', 'mainCanvas')
          .attr('height', height)
          .style('width', '100%');

        var svgOffset = svg[0][0].offsetTop;
        UmlElementsRegistry.setBase(svgOffset);


        var foo = svg.selectAll('g')
          .data(schema)
          .enter().append('g')
          .attr('height', function(d){
            return d.length * config.fieldHeight;
          })
          .attr('width', config.fieldWidth)
          .attr('x', 0)
          .attr('y', 0)
          .attr('fill', '#ffffff')
          .append('foreignObject')
          .attr('x', function(d, i){
            return nextPosition(d,i).x + config.vgap;
          })
          .attr('y', function(d,i){
            return nextPosition(d,i).y;
          })
          .attr('height', function(d){
            return d.length * config.fieldHeight + config.headerHeight;
          })
          .attr('width', config.fieldWidth)
          .append('xhtml:div')
          .attr('class', 'resource');

        //Create resource name
        var headers = foo.append('xhtml:div')
          .attr('class', 'header')
          .append('xhtml:h4')
          .attr('class', 'text-center')
          .text(function(d, i){
            return resources[i].name;
          });

        //create resource containers
        foo.append('xhtml:div')
          .attr('style', 'width: 100%')
          .append('xhtml:div')
          .attr('resource-class', '')
          .attr('resource', function(d, i){
            return 'resources[' + i + ']';
          });

        angular.forEach(foo[0], function(element){
          UmlElementsRegistry.add('resources', element, element.innerText);
        });

        elt.removeAttr('resources-canvas');
        $compile(elt)(scope);

      }
    }
  }

  function resourceClass($compile, UmlElementsRegistry){
    return {
      restrict: 'A',
      scope: {
        resource: '='
      },
      link: function(scope, elt){
        var elementHeight = scope.resource.length * config.fieldHeight;

        //create canvas for rendering fields rectangles
        var svg = d3.select(elt[0])
          .append('svg')
          .attr('width', config.fieldWidth)
          .attr('height', elementHeight);

        var x = 0;
        var y = -20;

        //create fields containers
        var fields = svg.selectAll('g')
          .data(scope.resource)
          .enter().append('g')
          .attr('height', config.fieldHeight)
          .attr('width', config.fieldWidth)
          .attr('fill', '#cccccc')
          .append('foreignObject')
          .attr('x', x)
          .attr('y', function(){
            return y += config.fieldHeight;
          })
          .attr('height', config.fieldHeight)
          .attr('width', config.fieldWidth)
          .append('xhtml:div')
          .attr('resource-property', '')
          .attr('field', function(d, i){
            return 'resource[' + i + ']';
          })
          .attr('class', 'text-center field')
          .attr('style', 'width: 100%');

        elt.removeAttr('resource-class');
        $compile(elt)(scope);
      }
    }
  }

  function resourceProperty($compile, UmlElementsRegistry){
    return {
      restrict: 'A',
      scope: {
        field: '=',
        isPk: '='
      },
      link: function(scope, elt){
        //Decide what kind of field we have
        var linked = false;
        if (angular.isArray(scope.field.params)){
          if (scope.field.params[0]){
            if (scope.field.params[0].ref){
              linked = true;
            }
          }
        }else if (angular.isObject(scope.field.params)){
          if (scope.field.params.ref){
            linked = true;
          }
        }

        var portConfig = {
          width: 10,
          height: config.fieldHeight
        };

        if (linked){
          //Render connector port if there should be a link
          var svg = d3.select(elt[0])
            .append('svg')
            .attr('width', config.fieldWidth)
            .attr('height', portConfig.height);

          //Create field name
          svg.append('foreignObject')
            .attr('width', config.fieldWidth)
            .attr('height', config.fieldHeight)
            .append('xhtml:div')
            .attr('class', 'field ref')
            .text(scope.field.name + ' [ref]');

          //Create link itself
          svg.append('foreignObject')
            .attr('width', 1)
            .attr('height', config.fieldHeight)
            .append('xhtml:div')
            .attr('port-x', function(){
              return svg[0][0].offsetLeft;
            })
            .attr('port-y', function(){
              return svg[0][0].offsetTop;
            })
            .attr('resource-link', '')
            .attr('link-to-many', function(){
              return angular.isArray(scope.field.params);
            })
            .attr('link-to', function(){
              if (angular.isArray(scope.field.params)){
                return 'field.params[0]';
              }else{
                return 'field.params';
              }
            });
        }else{
          if (scope.field.pk){
            elt.addClass('pk');
            elt.text('PK: ' + scope.field.name);
          }else{
            if (angular.isArray(scope.field.params)){
              //TODO: fix this when you can set field: [String] in fortune
              elt.text(scope.field.name + ' [Arr]');
            }else if(angular.isObject(scope.field.params)){
              //TODO: fix this when fortune supports nested schemas
              elt.text(scope.field.name + ' [Nested]');
            }else{
              elt.text(scope.field.name + ' [' + scope.field.params.substr(0, 3) + ']');
            }
          }
        }

        elt.removeAttr('resource-property');
        $compile(elt)(scope);
      }
    }
  }

  function resourceLink(UmlElementsRegistry){
    return {
      restrict: 'A',
      scope: {
        linkToMany: '=',
        linkTo: '=',
        portX: '@',
        portY: '@'
      },
      link: function(scope, elt){
        var target = UmlElementsRegistry.find('resources', scope.linkTo.ref);
        if (!target) return;
        var baseOffset = UmlElementsRegistry.getBaseOffset();

        var portX = parseInt(scope.portX);
        var portY = parseInt(scope.portY) + 10;

        //Decide where target element is placed
        var onTheRight = false;
        var sameCol = (portX - target.right < 100); //(target.column - Math.floor(portX / 300) === 0);
        if (portX <= target.left){
          onTheRight = true;
        }

        var lineData = [];
          if (onTheRight){
            //Start from right edge
            lineData.push({x: portX + config.fieldWidth, y: portY - baseOffset});
            lineData.push({x: portX + config.fieldWidth + 50, y: portY - baseOffset});
          }else{
            if (sameCol){
              //Start form right edge
              lineData.push({x: portX + config.fieldWidth, y: portY - baseOffset});
              lineData.push({x: portX + config.fieldWidth + 50, y: portY - baseOffset});
            }else{
              //Start from left edge
              lineData.push({x: portX, y: portY - baseOffset});
              lineData.push({x: portX - 50, y: portY - baseOffset});
            }
          }


        //How many columns will be overflown?
        var overflow = Math.floor((target.right - portX) / config.columnWidth);
        var absOverflow = Math.abs(overflow);
        if (absOverflow > 1){
          var currentColumn = Math.floor(portX / config.columnWidth);
          //Select direction
          var targetCol = currentColumn + overflow;
          var nextCol = onTheRight ? currentColumn + 1 : currentColumn - 1;

          while(nextCol !== targetCol){
            //Select elements from current column
            var columnSelection = [];
            angular.forEach(UmlElementsRegistry.positions, function(e){
              if (e.column == nextCol) {
                columnSelection.push(e);
              }
            });

            var nearestElement = columnSelection[0];

            //Starts from top
            var minDy = Math.abs(portY - nearestElement.y);
            angular.forEach(columnSelection, function(element){
              var dy = Math.abs(portY - element.y);
              if (dy < minDy){
                nearestElement = element;
                minDy = portY - element.y;
              }
            });
            var gapY = nearestElement.y + nearestElement.height + (Math.random() * 50);
            var gapX = nearestElement.x;
            var center = 0;

            if (onTheRight){
              lineData.push({x: gapX + center, y: gapY});
              lineData.push({x: gapX + config.columnWidth - 50 - center, y: gapY});
            }else{
              lineData.push({x: gapX + config.columnWidth - 50 + center, y: gapY});
              lineData.push({x: gapX - center, y: gapY});
            }

            onTheRight ? nextCol++ : nextCol--;
          }
        }

        if (onTheRight){
          //Target to left edge
          lineData.push({x: target.left - 50, y: target.top + 10});
          lineData.push({x: target.left, y: target.top + 10});
        }else{
          //Target to right edge
          lineData.push({x: target.right + 50, y: target.top + 10});
          lineData.push({x: target.right, y: target.top + 10});
        }

        var line = d3.svg.line()
          .x(function(d){
            return d.x;
          })
          .y(function(d){
            return d.y;
          })
          .tension(0.95)
          .interpolate('basis');

        var color = selectColor();
        //push link to canvas
        var path = d3.select('#mainCanvas')
          .append('path')
          .attr('d', line(lineData))
          .attr('stroke', color)
          .attr('stroke-width', 2)
          .attr('fill', 'none')
          .on('mouseover', function(d, i){
            d3.select(this)
              .attr('stroke', '#F00')
              .attr('stroke-width', 10);
          })
          .on('mouseleave', function(d, i){
            d3.select(this)
              .attr('stroke', color)
              .attr('stroke-width', 2);
          });

        var field = elt.parent().parent().parent();
        field.bind('mouseover', function(){
          path
            .attr('stroke', '#F00')
            .attr('stroke-width', 10);
        });
        field.bind('mouseleave', function(){
          path
            .attr('stroke', color)
            .attr('stroke-width', 2);
        });

        function selectColor(){
          var map = [
            '#FF0020',
            '#FF00CC',
            '#0000FF',
            '#00F9FF',
            '#00FF20',
            '#FFE000'
          ];
          var rnd = Math.floor(Math.random() * 6);
          return map[rnd];
        }
      }
    }
  }
})(angular);
