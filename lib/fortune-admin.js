angular.module('templates-main', ['/templates/directives/faEditable.html', '/templates/directives/uml/canvas.html', '/templates/directives/uml/resource.html', '/templates/views/mynavbar.html', '/templates/views/resources.html', '/templates/views/uml.html']);

angular.module("/templates/directives/faEditable.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/templates/directives/faEditable.html",
    "<section>\n" +
    "  <div ng-switch=\"schemaType\">\n" +
    "    <div ng-switch-when=\"String\">\n" +
    "      <a href=\"#\" onaftersave=\"apply(value)\" editable-text=\"value\">{{value || 'Not set.'}}</a>\n" +
    "    </div>\n" +
    "    <div ng-switch-when=\"Number\">\n" +
    "      <a href=\"#\" onaftersave=\"apply(value)\" editable-number=\"value\">{{value || 'Not set.'}}</a>\n" +
    "    </div>\n" +
    "    <div ng-switch-when=\"Date\">\n" +
    "      <a href=\"#\" onaftersave=\"apply(value)\" editable-date=\"value\">{{value || 'Not set.'}}</a>\n" +
    "    </div>\n" +
    "    <div ng-switch-when=\"Boolean\">\n" +
    "      <a href=\"#\" onaftersave=\"apply(value)\" editable-checkbox=\"value\">{{value ? 'Yep' : 'Nope'}}</a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</section>");
}]);

angular.module("/templates/directives/uml/canvas.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/templates/directives/uml/canvas.html",
    "<div id=\"umlcanvas\">\n" +
    "  <div ng-repeat=\"(id, value) in selectedResources\">\n" +
    "    <uml-resource id=\"{{ id }}\" uml-data=\"value\"></uml-resource>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("/templates/directives/uml/resource.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/templates/directives/uml/resource.html",
    "<div>\n" +
    "  <div ng-if=\"!umlData.modelOptions.pk\">\n" +
    "    <div ng-init=\"pkParams = 'ObjectId'; pkName = '_id'\"></div>\n" +
    "    <uml-field field-name=\"pkName\" field-data=\"pkParams\" resource=\"umlData.name\" is-pk=\"true\"></uml-field>\n" +
    "  </div>\n" +
    "  <div ng-if=\"umlData.modelOptions.pk\">\n" +
    "    <div ng-init=\"pkName = umlData.modelOptions.pk\"></div>\n" +
    "    <uml-field field-name=\"pkName\" field-data=\"umlData.schema[pkName]\" is-pk=\"true\"></uml-field>\n" +
    "  </div>\n" +
    "  <div ng-repeat=\"(name, params) in umlData.schema\">\n" +
    "    <uml-field field-name=\"name\" field-data=\"params\" resource=\"umlData.name\"></uml-field>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("/templates/views/mynavbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/templates/views/mynavbar.html",
    "<nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\" bs-navbar>\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <a class=\"navbar-brand\" href=\"#\"><b>Fortune Admin</b></a>\n" +
    "        </div>\n" +
    "        <div class=\"collapse navbar-collapse\">\n" +
    "            <ul class=\"nav navbar-nav\">\n" +
    "                <li class=\"dropdown\">\n" +
    "                    <a href=\"#\" class=\"dropdown-toggle\">Resources <b class=\"caret\"></b></a>\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                        <li ng-repeat=\"resource in resources\"><a data-ng-href=\"{{ r('resource', {name: resource.name }) }}\">{{ resource.name }}</a></li>\n" +
    "                    </ul>\n" +
    "                </li>\n" +
    "                <li><a data-ng-href=\"{{ r('uml_diagram') }}\">UML</a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</nav>\n" +
    "\n" +
    "");
}]);

angular.module("/templates/views/resources.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/templates/views/resources.html",
    "<fortune-admin-navbar></fortune-admin-navbar>\n" +
    "<h4 class=\"text-center\">{{ parentResourceName | uppercase }} {{ parentId ? parentId + ' /' : null}} {{plurResourceName | uppercase}}</h4>\n" +
    "<table class=\"table table-bordered\">\n" +
    "  <tr>\n" +
    "    <th ng-repeat=\"(name, type) in currentResource.schema | filterLinks\">{{name}}</th>\n" +
    "    <th ng-repeat=\"link in links\">{{link.type}}</th>\n" +
    "    <th>Actions</th>\n" +
    "  </tr>\n" +
    "  <tr ng-repeat=\"entity in data\">\n" +
    "    <td ng-repeat=\"(path, type) in currentResource.schema | filterLinks\">\n" +
    "      <fa-editable ng-model=\"entity[path]\" path=\"path\" resource-name=\"{{plurResourceName}}\" resource-id=\"{{entity.id}}\" schema-type=\"type\"></fa-editable>\n" +
    "    </td>\n" +
    "    <td ng-repeat=\"(linkName, link) in links\">\n" +
    "      <div ng-if=\"ResourcesCtrl.linkToMany(linkName)\">\n" +
    "        <a ng-href=\"{{ fortuneAdminRoute('subresource', {parent: currentResource.name, id: entity.id, name: link.type, inverse: ResourcesCtrl.resolveInverse(linkName)}) }}\">Navigate to {{link.type}}</a>\n" +
    "      </div>\n" +
    "      <div ng-if=\"!ResourcesCtrl.linkToMany(linkName)\">\n" +
    "        <div ng-init=\"fname = ResourcesCtrl.resolveFieldName(linkName)\"></div>\n" +
    "        <!--Initialize links if they do not come from server-->\n" +
    "        <div ng-init=\"entity.links = entity.links || {}\"></div>\n" +
    "        <fa-ref ng-model=\"entity.links[fname]\" ref=\"currentResource.schema[fname]\" resource-name=\"{{ plurResourceName }}\" resource-id=\"{{ entity.id }}\"></fa-ref>\n" +
    "      </div>\n" +
    "    </td>\n" +
    "    <td>\n" +
    "      <button type=\"button\" ng-click=\"ResourcesCtrl.deleteRow($index, entity.id)\" class=\"btn btn-xs btn-danger\">Delete</button>\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "</table>\n" +
    "<div class=\"col-md-3\">\n" +
    "  <div ng-hide=\"PK === 'id'\">\n" +
    "    <label>Enter {{ PK }} for new {{ currentResource.name }}</label>\n" +
    "    <input type=\"text\" ng-model=\"PrimaryKey\" ng-required=\"true\" class=\"form-control\"/>\n" +
    "  </div>\n" +
    "  <button type=\"button\" ng-click=\"ResourcesCtrl.addRow(PrimaryKey)\" class=\"btn btn-default btn-sm\" ng-disabled=\"PK !== 'id' && !PrimaryKey\">Create new row</button>\n" +
    "</div>");
}]);

angular.module("/templates/views/uml.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/templates/views/uml.html",
    "<fortune-admin-navbar></fortune-admin-navbar>\n" +
    "<section class=\"container\" ng-controller=\"umlDiagramCtrl as umlDiagramCtrl\">\n" +
    "  <h1 class=\"text-center\">Resources map</h1>\n" +
    "  <ul class=\"list-group\">\n" +
    "    <li class=\"list-group-item\">\n" +
    "      <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"umlDiagramCtrl.toggleSelectAll()\">{{ allSelected ? \"Remove\" : \"Render\" }} all</button>\n" +
    "      <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"showList = !showList\">{{ showList ? \"Collapse\" : \"Show\" }} resources list</button>\n" +
    "    </li>\n" +
    "    <li class=\"list-group-item\" ng-repeat=\"resource in resources\" ng-show=\"showList\">\n" +
    "      <input type=\"checkbox\" ng-model=\"resource.$selected\" ng-change=\"umlDiagramCtrl.toggleSelect(resource)\"/>\n" +
    "      <span>Name: <strong>{{ resource.name }}</strong> </span>\n" +
    "      <span>Fields count: <strong>{{ resource.$schemaLength }}</strong> </span>\n" +
    "      <span>PK: <strong>{{ resource.modelOptions.pk ? resource.modelOptions.pk : \"_id\" }}</strong> </span>\n" +
    "      <a ng-click=\"showJson=!showJson\"> {{ showJson ? \"Hide\" : \"Show\" }} raw JSON</a>\n" +
    "      <pre ng-show=\"showJson\">{{ resource | json }}</pre>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "  <section>\n" +
    "    <svg xmlns=\"http://www.w3.org/2000/svg\" xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"v-2\" width=\"1170\" height=\"100\">\n" +
    "      <g stroke=\"none\" fill=\"#FFF\" width=\"40\" height=\"20\" transform=\"translate(5,20)\">\n" +
    "        <text font-size=\"16\" fill=\"black\" font-family=\"Arial, helvetica, sans-serif\">Legend:</text>\n" +
    "      </g>\n" +
    "      <g stroke=none\" fill=\"#FFF\" width=\"80\" height=\"10\" transform=\"translate(120, 20)\">\n" +
    "        <line x1=\"-20\" y1=\"-5\" x2=\"-10\" y2=\"-5\" stroke=\"green\" stroke-width=\"2\"></line>\n" +
    "        <text font-size=\"14\" fill=\"black\" font-family=\"Arial, helvetica, sans-serif\">Many to many</text>\n" +
    "      </g>\n" +
    "      <g stroke=\"none\" fill=\"#FFF\" width=\"80\" height=\"10\" transform=\"translate(120, 40)\">\n" +
    "        <line x1=\"-20\" y1=\"-5\" x2=\"-10\" y2=\"-5\" stroke=\"blue\" stroke-width=\"2\"></line>\n" +
    "        <text font-size=\"14\" fill=\"black\" font-family=\"Arial, helvetica, sans-serif\">One to one</text>\n" +
    "      </g>\n" +
    "      <g stroke=\"none\" fill=\"#FFF\" width=\"80\" height=\"10\" transform=\"translate(300, 20)\">\n" +
    "        <rect x=\"-30\" y=\"-10\" width=\"20\" height=\"10\" fill=\"green\"></rect>\n" +
    "        <text font-size=\"14\" fill=\"black\" font-family=\"Arial, helvetica, sans-serif\">Primary key</text>\n" +
    "      </g>\n" +
    "      <g stroke=\"none\" fill=\"#FFF\" width=\"80\" height=\"10\" transform=\"translate(300, 40)\">\n" +
    "        <rect x=\"-30\" y=\"-10\" width=\"20\" height=\"10\" fill=\"yellow\"></rect>\n" +
    "        <text font-size=\"14\" fill=\"black\" font-family=\"Arial, helvetica, sans-serif\">FK referencing hidden resource</text>\n" +
    "      </g>\n" +
    "    </svg>\n" +
    "  </section>\n" +
    "  <uml-canvas selected-resources=\"selected\" ng-if=\"selected.length\"></uml-canvas>\n" +
    "</section>\n" +
    "");
}]);


  //Fix grunt addtemplates task if you change this line
  angular.module('fortuneAdmin', [ 'templates-main', 

      ,  'ui.bootstrap'
      , 'xeditable'
      , 'fortuneAdmin.Controllers'
      , 'fortuneAdmin.Directives'
      , 'fortuneAdmin.Services'
    ])
    .provider('fortuneAdmin', [function(){

      var lookup = {};
      var otherwiseLookup = null;

      var ROUTER = {
        when: function(key, url, params) {
          lookup[key] = {
            url : url,
            params : params
          };
        },

        install: function($routeProvider) {
          for(var key in lookup) {
            var route = lookup[key];
            var url = route['url'];
            var params = route['params'];
            $routeProvider.when(url, params);
          }
          if(otherwiseLookup) {
            $routeProvider.otherwise(otherwiseLookup);
          }
        }
      };

      var config = window.CONFIG.fortuneAdmin;
      return {
        setApiHost: function(host){
          CONFIG.fortuneAdmin.baseEndpoint = host;
        },
        setApiNamespace: function(namespace){
          CONFIG.fortuneAdmin.apiNamespace = namespace;
        },
        mountTo: function($routeProvider, mountPoint){

          ROUTER.when('uml_diagram', mountPoint + '/uml', {
            templateUrl : config.prepareViewTemplateUrl('uml')
          });

          //Resolve necessary data here to simplify controller
          ROUTER.when('resource', mountPoint + '/:name', {
            templateUrl: config.prepareViewTemplateUrl('resources'),
            controller: 'ResourcesCtrl as ResourcesCtrl',
            resolve: {
              resources: ['$q', '$http', function($q, $http){
                var d = $q.defer();
                $http.get(config.baseEndpoint + '/resources').success(function(data){
                  d.resolve(data.resources);
                });
                return d.promise;
              }],
              data: ['$q', '$http', '$route', 'Inflect', function($q, $http, $route, Inflect){
                var resourceName = $route.current.params.name;
                var d = $q.defer();
                $http.get(config.getApiNamespace() + '/' + Inflect.pluralize(resourceName))
                  .success(function (data) {
                    d.resolve(data);
                  });
                return d.promise;
              }]
            }
          });

          ROUTER.when('subresource', mountPoint + '/:parent/:id/:name/refby/:inverse', {
            templateUrl: config.prepareViewTemplateUrl('resources'),
            controller: 'ResourcesCtrl as ResourcesCtrl',
            resolve: {
              resources: ['$q', '$http', function($q, $http){
                var d = $q.defer();
                $http.get(config.baseEndpoint + '/resources').success(function(data){
                  d.resolve(data.resources);
                });
                return d.promise;
              }],
              data: ['$q', '$http', '$route', function($q, $http, $route){
                var d = $q.defer();
                var inverse = $route.current.params.inverse;
                var parentId = $route.current.params.id;
                var childResource = $route.current.params.name;
                $http.get(config.getApiNamespace() + '/' + childResource +
                    '?filter[' + inverse + ']=' + parentId)
                  .success(function (data) {
                    d.resolve(data);
                  });
                return d.promise;
              }]
            }
          });

          ROUTER.install($routeProvider);
        },

        $get: function(){
          return {

            getRoute: function(key) {
              return lookup[key];
            },

            replaceUrlParams: function(url, params) {
              for(var k in params) {
                var v = params[k];
                url = url.replace(':'+k,v);
              }
              return url;
            },

            routeDefined: function(key) {
              return !! this.getRoute(key);
            },

            routePath: function(key, args) {
              var url = this.getRoute(key);
              url = url ? url.url : null;
              if(url && args) {
                url = this.replaceUrlParams(url, args);
              }
              return url;
            },

            setApiHost: function(host){
              CONFIG.fortuneAdmin.baseEndpoint = host;
            },
            setApiNamespace: function(namespace){
              CONFIG.fortuneAdmin.apiNamespace = namespace;
            },
          }
        }
      }
    }])

    .run(['$rootScope', '$location', 'fortuneAdmin', 'editableOptions',
      function($rootScope, $location, fortuneAdmin, editableOptions) {
      var prefix = '';

      $rootScope.fortuneAdminRoute = function(url, args) {
        return prefix + fortuneAdmin.routePath(url, args);
      };

      // bootstrap3 theme. Can be also 'bs2', 'default'
      editableOptions.theme = 'bs3';
    }]);
(function(){
  if (!window.CONFIG) window.CONFIG = {};

   window.CONFIG.fortuneAdmin =  {
    templateDirectory: '/templates/',
    baseEndpoint: '',
    apiNamespace: '/api/v1',
    getApiNamespace: function(){
      return this.baseEndpoint + this.apiNamespace;
    },
    mountPoint: '',
    appVersion: 1,
    viewUrlPrefix: '/templates/views/',
    templateFileSuffix: '.html',
    prepareViewTemplateUrl: function(url){
      return this.viewUrlPrefix + url + this.templateFileSuffix;
    },
    routing: {
      html5Mode : true,
      prefix: ''
    }
  };
})();

'use strict';
angular.module('fortuneAdmin.Controllers', [
    'fortuneAdmin.Services',
    'fortuneAdmin.Controllers.umlDiagram'
  ])

  .filter('filterLinks', [function(){
    return function(input){
      var nonLinks = {};
      angular.forEach(input, function(field, name){
        if (!angular.isObject(field)){
          nonLinks[name] = field;
        }
      });
      return nonLinks;
    }
  }])

  .controller('ResourcesCtrl', [
    '$scope',
    '$http',
    'Inflect',
    '$routeParams',
    'resources',
    'data',
    function ($scope, $http, Inflect, $routeParams, resources, data){

      var currentResource = {};
      angular.forEach(resources, function(res){
        if(res.name === $routeParams.name || Inflect.pluralize(res.name) === $routeParams.name){
          currentResource = res;
        }
      });
      var plurResourceName = Inflect.pluralize(currentResource.name);

      $scope.plurResourceName = plurResourceName;
      $scope.currentResource = currentResource;

      $scope.data = data[plurResourceName];
      $scope.links = data.links;
      $scope.PK = $scope.currentResource.modelOptions ? $scope.currentResource.modelOptions.pk || 'id' : 'id';

      $scope.parentResourceName = $routeParams.parent;
      $scope.parentId = $routeParams.id;

      this.resolveFieldName = function(linkName){
        //No need to dig deeper as there's no nested schemas
        var parts = linkName.split('.');
        return parts[parts.length - 1];
      };

      this.resolveInverse = function(linkName){
        var fieldName = this.resolveFieldName(linkName);
        var ref = currentResource.schema[fieldName];

        var inverse = '';
        if (angular.isArray(ref)){
          inverse = ref[0].inverse;
        }else if(angular.isObject(ref)){
          inverse = ref.inverse;
        }else {
          throw new Error('Malformed reference');
        }
        return inverse;
      };


      this.linkToMany = function(linkName){
        var fieldName = this.resolveFieldName(linkName);
        var ref = currentResource.schema[fieldName];
        return angular.isArray(ref);
      };


      this.addRow = function(Primary){
        var newRow = {};
        if ($scope.PK !== 'id'){
          newRow[$scope.PK] = Primary;
        }

        if ($routeParams.id) {
          // $scope.currentResource - what is going to be created
          // $routeParams.inverse - field that references parent resource
          var refFieldName = $routeParams.inverse;

          //Create reference to new doc
          if (angular.isArray($scope.currentResource.schema[refFieldName])){
            newRow[refFieldName] = [$routeParams.id];
          }else{
            newRow[refFieldName] = $routeParams.id;
          }
        }
        var cmd = {};
        cmd[plurResourceName] = [newRow];
        $http.post(CONFIG.fortuneAdmin.getApiNamespace() + '/' + plurResourceName, cmd).success(function(data) {
          $scope.data.push(data[plurResourceName][0]);
        });
      };

      this.deleteRow = function(index, id){
        $http.delete(CONFIG.fortuneAdmin.getApiNamespace() + '/' + plurResourceName + '/' + id)
          .success(function (data, status) {
            $scope.data.splice(index, 1);
          })
          .error(function(data, status) {
            console.error(data, status);
          });

      };
    }]);

angular.module('fortuneAdmin.Controllers.umlDiagram', [
    'fortuneAdmin.umlDiagram.services'
  ])
  .controller('umlDiagramCtrl', ['$scope', 'umlData',

    function umlDiagramCtrl($scope, umlData){
      $scope.resources = [];
      $scope.selected = [];
      $scope.allSelected = false;
      umlData.load().then(function(resources){
        angular.forEach(resources, function(res){
          res.$schemaLength = Object.keys(res.schema).length;
        });
        $scope.resources = resources;
      }, function(err){
        $scope.error = err;
      });

      this.toggleSelect = function(item){
        var index = $scope.selected.indexOf(item);
        if (index === -1){
          $scope.selected.push(item);
        }else{
          $scope.selected.splice(index, 1);
        }
        $scope.$broadcast('fortuneAdmin:uml:relink');
      };

      this.toggleSelectAll = function(){
        if ($scope.allSelected){
          $scope.selected = [];
          $scope.allSelected = false;
        }else{
          $scope.allSelected = true;
          $scope.selected = $scope.resources;
        }
        angular.forEach($scope.resources, function(res){
          res.$selected = $scope.selected;
        });
      }
    }
  ]);

'use strict';
angular.module('fortuneAdmin.Directives', [
    'fortuneAdmin.umlDiagram'
  ])
  .directive('fortuneAdminNavbar', [ '$http', '$rootScope', function($http, $rootScope) {
    return {
      restrict: 'E',

      templateUrl: '/templates/views/mynavbar.html',

      replace: true,

      transclude: true,

      scope: {},

      link: function (scope, element, attrs) {
        scope.r = $rootScope.fortuneAdminRoute;
        scope.resources = [];
        $http.get(CONFIG.fortuneAdmin.baseEndpoint + '/resources').success(function(data){
          scope.resources = data.resources;
        });
      }

    }
  }])
  .controller('faEditableCtrl', ['$scope', '$http',
    function($scope, $http){
      $scope.apply = function(value){
        //Send PATCH to the server
        var cmd = [];
        cmd.push({
          op: 'replace',
          path: '/' + $scope.resourceName + '/0/links/' + $scope.path,
          value: value
        });

        $http({
          method: 'PATCH',
          url: CONFIG.fortuneAdmin.getApiNamespace() + '/' + $scope.resourceName + '/' + $scope.resourceId,
          data: cmd
        }).catch(function(data, status){
            console.error(data, status);
          });
      };
    }])

  .directive('faEditable', [function(){
    return {
      restrict: 'E',
      replace: true,
      scope: {
        value: '=ngModel',
        path: '=',
        schemaType: '=',
        resourceName: '@',
        resourceId: '@'
      },
      templateUrl: '/templates/directives/faEditable.html',
      controller: 'faEditableCtrl'
    }
  }])

  .directive('faRef', ['$http', '$compile', 'Inflect',
    function($http, $compile, Inflect){
      return {
        restrict: 'E',
        replace: false,
        scope: {
          value: '=ngModel',
          ref: '=',
          resourceName: '@',
          resourceId: '@'
        },
        controller: 'faEditableCtrl',
        link: function(scope, elt){
          var refTo = scope.path = scope.ref.ref;
          var resources, currentResource;

          $http.get(CONFIG.fortuneAdmin.baseEndpoint + '/resources').success(function(data){
            resources = data.resources;
            angular.forEach(resources, function(resource){
              if (resource.name === refTo){
                currentResource = resource;
              }
            });
            $http.get(CONFIG.fortuneAdmin.getApiNamespace() + '/' + Inflect.pluralize(refTo))
              .success(function(data){
                var PK = currentResource.modelOptions ? currentResource.modelOptions.pk || 'id' : 'id';
                scope.list = data[Inflect.pluralize(refTo)];
                var tpl = ['<a href="#" editable-select="value" ',
                  'e-ng-options="item.', PK || 'id',
                  ' as item.', PK || 'id',
                  ' for item in list" ',
                  'onaftersave="apply(value)">',
                  '{{ value || "Not set." }}',
                  '</a>'
                ];
                var select = $compile(tpl.join(''))(scope);
                elt.append(select);
              });
          });
        }
      }
    }]);
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
angular.module('fortuneAdmin.Services.inflectPort', [])
  .service('Inflect', [
  function Inflect(){
    var inflect = {};

    // i/lib/util
    // Some utility functions in js
    var u;
    var util = u = {
      array: {
        // Returns a copy of the array with the value removed once
        //
        //     [1, 2, 3, 1].del 1 #=> [2, 3, 1]
        //     [1, 2, 3].del 4    #=> [1, 2, 3]
        del: function (arr, val) {
          var index = arr.indexOf(val);
          if (index != -1) {
            if (index == 0) {
              return arr.slice(1)
            } else {
              return arr.slice(0, index).concat(arr.slice(index+1));
            }
          } else {
            return arr;
          }
        },

        // Returns the first element of the array
        //
        //     [1, 2, 3].first() #=> 1
        first: function(arr) {
          return arr[0];
        },

        // Returns the last element of the array
        //
        //     [1, 2, 3].last()  #=> 3
        last: function(arr) {
          return arr[arr.length-1];
        }
      },
      string: {
        // Returns a copy of str with all occurrences of pattern replaced with either replacement or the return value of a function.
        // The pattern will typically be a Regexp; if it is a String then no regular expression metacharacters will be interpreted
        // (that is /\d/ will match a digit, but ‘\d’ will match a backslash followed by a ‘d’).
        //
        // In the function form, the current match object is passed in as a parameter to the function, and variables such as
        // $[1], $[2], $[3] (where $ is the match object) will be set appropriately. The value returned by the function will be
        // substituted for the match on each call.
        //
        // The result inherits any tainting in the original string or any supplied replacement string.
        //
        //     "hello".gsub /[aeiou]/, '*'      #=> "h*ll*"
        //     "hello".gsub /[aeiou]/, '<$1>'   #=> "h<e>ll<o>"
        //     "hello".gsub /[aeiou]/, ($) {
        //       "<#{$[1]}>"                    #=> "h<e>ll<o>"
        //
        gsub: function (str, pattern, replacement) {
          var i, match, matchCmpr, matchCmprPrev, replacementStr, result, self;
          if (!((pattern != null) && (replacement != null))) return u.string.value(str);
          result = '';
          self = str;
          while (self.length > 0) {
            if ((match = self.match(pattern))) {
              result += self.slice(0, match.index);
              if (typeof replacement === 'function') {
                match[1] = match[1] || match[0];
                result += replacement(match);
              } else if (replacement.match(/\$[1-9]/)) {
                matchCmprPrev = match;
                matchCmpr = u.array.del(match, void 0);
                while (matchCmpr !== matchCmprPrev) {
                  matchCmprPrev = matchCmpr;
                  matchCmpr = u.array.del(matchCmpr, void 0);
                }
                match[1] = match[1] || match[0];
                replacementStr = replacement;
                for (i = 1; i <= 9; i++) {
                  if (matchCmpr[i]) {
                    replacementStr = u.string.gsub(replacementStr, new RegExp("\\\$" + i), matchCmpr[i]);
                  }
                }
                result += replacementStr;
              } else {
                result += replacement;
              }
              self = self.slice(match.index + match[0].length);
            } else {
              result += self;
              self = '';
            }
          }
          return result;
        },

        // Returns a copy of the String with the first letter being upper case
        //
        //     "hello".upcase #=> "Hello"
        upcase: function(str) {
          var self = u.string.gsub(str, /_([a-z])/, function ($) {
            return "_" + $[1].toUpperCase();
          });
          self = u.string.gsub(self, /\/([a-z])/, function ($) {
            return "/" + $[1].toUpperCase();
          });
          return self[0].toUpperCase() + self.substr(1);
        },

        // Returns a copy of capitalized string
        //
        //     "employee salary" #=> "Employee Salary"
        capitalize: function (str, spaces) {
          var self = str.toLowerCase();
          if(!spaces) {
            self = u.string.gsub(self, /\s([a-z])/, function ($) {
              return " " + $[1].toUpperCase();
            });
          }
          return self[0].toUpperCase() + self.substr(1);
        },

        // Returns a copy of the String with the first letter being lower case
        //
        //     "HELLO".downcase #=> "hELLO"
        downcase: function(str) {
          var self = u.string.gsub(str, /_([A-Z])/, function ($) {
            return "_" + $[1].toLowerCase();
          });
          self = u.string.gsub(self, /\/([A-Z])/, function ($) {
            return "/" + $[1].toLowerCase();
          });
          return self[0].toLowerCase() + self.substr(1);
        },

        // Returns a string value for the String object
        //
        //     "hello".value() #=> "hello"
        value: function (str) {
          return str.substr(0);
        }
      }
    };

    // i/lib/defaults

    var defaults = function (inflect) {

      inflect.plural(/$/, 's');
      inflect.plural(/s$/i, 's');
      inflect.plural(/(ax|test)is$/i, '$1es');
      inflect.plural(/(octop|vir)us$/i, '$1i');
      inflect.plural(/(octop|vir)i$/i, '$1i');
      inflect.plural(/(alias|status)$/i, '$1es');
      inflect.plural(/(bu)s$/i, '$1ses');
      inflect.plural(/(buffal|tomat)o$/i, '$1oes');
      inflect.plural(/([ti])um$/i, '$1a');
      inflect.plural(/([ti])a$/i, '$1a');
      inflect.plural(/sis$/i, 'ses');
      inflect.plural(/(?:([^f])fe|([lr])f)$/i, '$1ves');
      inflect.plural(/(hive)$/i, '$1s');
      inflect.plural(/([^aeiouy]|qu)y$/i, '$1ies');
      inflect.plural(/(x|ch|ss|sh)$/i, '$1es');
      inflect.plural(/(matr|vert|ind)(?:ix|ex)$/i, '$1ices');
      inflect.plural(/([m|l])ouse$/i, '$1ice');
      inflect.plural(/([m|l])ice$/i, '$1ice');
      inflect.plural(/^(ox)$/i, '$1en');
      inflect.plural(/^(oxen)$/i, '$1');
      inflect.plural(/(quiz)$/i, '$1zes');


      inflect.singular(/s$/i, '');
      inflect.singular(/(n)ews$/i, '$1ews');
      inflect.singular(/([ti])a$/i, '$1um');
      inflect.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis');
      inflect.singular(/(^analy)ses$/i, '$1sis');
      inflect.singular(/([^f])ves$/i, '$1fe');
      inflect.singular(/(hive)s$/i, '$1');
      inflect.singular(/(tive)s$/i, '$1');
      inflect.singular(/([lr])ves$/i, '$1f');
      inflect.singular(/([^aeiouy]|qu)ies$/i, '$1y');
      inflect.singular(/(s)eries$/i, '$1eries');
      inflect.singular(/(m)ovies$/i, '$1ovie');
      inflect.singular(/(x|ch|ss|sh)es$/i, '$1');
      inflect.singular(/([m|l])ice$/i, '$1ouse');
      inflect.singular(/(bus)es$/i, '$1');
      inflect.singular(/(o)es$/i, '$1');
      inflect.singular(/(shoe)s$/i, '$1');
      inflect.singular(/(cris|ax|test)es$/i, '$1is');
      inflect.singular(/(octop|vir)i$/i, '$1us');
      inflect.singular(/(alias|status)es$/i, '$1');
      inflect.singular(/^(ox)en/i, '$1');
      inflect.singular(/(vert|ind)ices$/i, '$1ex');
      inflect.singular(/(matr)ices$/i, '$1ix');
      inflect.singular(/(quiz)zes$/i, '$1');
      inflect.singular(/(database)s$/i, '$1');

      inflect.irregular('child', 'children');
      inflect.irregular('person', 'people');
      inflect.irregular('man', 'men');
      inflect.irregular('child', 'children');
      inflect.irregular('sex', 'sexes');
      inflect.irregular('move', 'moves');
      inflect.irregular('cow', 'kine');
      inflect.irregular('zombie', 'zombies');

      inflect.uncountable(['equipment', 'information', 'rice', 'money', 'species', 'series', 'fish', 'sheep', 'jeans']);
    }



    // i/lib/inflections
    // A singleton instance of this class is yielded by Inflector.inflections, which can then be used to specify additional
    // inflection rules. Examples:
    //
    //     BulletSupport.Inflector.inflect ($) ->
    //       $.plural /^(ox)$/i, '$1en'
    //       $.singular /^(ox)en/i, '$1'
    //
    //       $.irregular 'octopus', 'octopi'
    //
    //       $.uncountable "equipment"
    //
    // New rules are added at the top. So in the example above, the irregular rule for octopus will now be the first of the
    // pluralization and singularization rules that is runs. This guarantees that your rules run before any of the rules that may
    // already have been loaded.

    var Inflections = function () {
      this.plurals = [];
      this.singulars = [];
      this.uncountables = [];
      this.humans = [];
      defaults(this);
      return this;
    };

    // Specifies a new pluralization rule and its replacement. The rule can either be a string or a regular expression.
    // The replacement should always be a string that may include references to the matched data from the rule.
    Inflections.prototype.plural = function (rule, replacement) {
      if (typeof rule == 'string') {
        this.uncountables = util.array.del(this.uncountables, rule);
      }
      this.uncountables = util.array.del(this.uncountables, replacement);
      this.plurals.unshift([rule, replacement]);
    };

    // Specifies a new singularization rule and its replacement. The rule can either be a string or a regular expression.
    // The replacement should always be a string that may include references to the matched data from the rule.
    Inflections.prototype.singular = function (rule, replacement) {
      if (typeof rule == 'string') {
        this.uncountables = util.array.del(this.uncountables, rule);
      }
      this.uncountables = util.array.del(this.uncountables, replacement);
      this.singulars.unshift([rule, replacement]);
    };

    // Specifies a new irregular that applies to both pluralization and singularization at the same time. This can only be used
    // for strings, not regular expressions. You simply pass the irregular in singular and plural form.
    //
    //     irregular 'octopus', 'octopi'
    //     irregular 'person', 'people'
    Inflections.prototype.irregular =  function (singular, plural) {
      this.uncountables = util.array.del(this.uncountables, singular);
      this.uncountables = util.array.del(this.uncountables, plural);
      if (singular[0].toUpperCase() == plural[0].toUpperCase()) {
        this.plural(new RegExp("(" + singular[0] + ")" + singular.slice(1) + "$", "i"), '$1' + plural.slice(1));
        this.plural(new RegExp("(" + plural[0] + ")" + plural.slice(1) + "$", "i"), '$1' + plural.slice(1));
        this.singular(new RegExp("(" + plural[0] + ")" + plural.slice(1) + "$", "i"), '$1' + singular.slice(1));
      } else {
        this.plural(new RegExp("" + (singular[0].toUpperCase()) + singular.slice(1) + "$"), plural[0].toUpperCase() + plural.slice(1));
        this.plural(new RegExp("" + (singular[0].toLowerCase()) + singular.slice(1) + "$"), plural[0].toLowerCase() + plural.slice(1));
        this.plural(new RegExp("" + (plural[0].toUpperCase()) + plural.slice(1) + "$"), plural[0].toUpperCase() + plural.slice(1));
        this.plural(new RegExp("" + (plural[0].toLowerCase()) + plural.slice(1) + "$"), plural[0].toLowerCase() + plural.slice(1));
        this.singular(new RegExp("" + (plural[0].toUpperCase()) + plural.slice(1) + "$"), singular[0].toUpperCase() + singular.slice(1));
        this.singular(new RegExp("" + (plural[0].toLowerCase()) + plural.slice(1) + "$"), singular[0].toLowerCase() + singular.slice(1));
      }
    };

    // Specifies a humanized form of a string by a regular expression rule or by a string mapping.
    // When using a regular expression based replacement, the normal humanize formatting is called after the replacement.
    // When a string is used, the human form should be specified as desired (example: 'The name', not 'the_name')
    //
    //     human /(.*)_cnt$/i, '$1_count'
    //     human "legacy_col_person_name", "Name"
    Inflections.prototype.human = function (rule, replacement) {
      this.humans.unshift([rule, replacement]);
    }

    // Add uncountable words that shouldn't be attempted inflected.
    //
    //     uncountable "money"
    //     uncountable ["money", "information"]
    Inflections.prototype.uncountable = function (words) {
      this.uncountables = this.uncountables.concat(words);
    }

    // Clears the loaded inflections within a given scope (default is _'all'_).
    // Give the scope as a symbol of the inflection type, the options are: _'plurals'_,
    // _'singulars'_, _'uncountables'_, _'humans'_.
    //
    //     clear 'all'
    //     clear 'plurals'
    Inflections.prototype.clear = function (scope) {
      if (scope == null) scope = 'all';
      switch (scope) {
        case 'all':
          this.plurals = [];
          this.singulars = [];
          this.uncountables = [];
          this.humans = [];
        default:
          this[scope] = [];
      }
    }

    // Clears the loaded inflections and initializes them to [default](../inflections.html)
    Inflections.prototype.default = function () {
      this.plurals = [];
      this.singulars = [];
      this.uncountables = [];
      this.humans = [];
      defaults(this);
      return this;
    };

    inflect.inflections = new Inflections();


    // i/lib/methods
    // Gives easy access to add inflections to this class
    inflect.inflect = function (inflections_function) {
      inflections_function(inflect.inflections);
    };

    // By default, _camelize_ converts strings to UpperCamelCase. If the argument to _camelize_
    // is set to _false_ then _camelize_ produces lowerCamelCase.
    //
    // _camelize_ will also convert '/' to '.' which is useful for converting paths to namespaces.
    //
    //     "bullet_record".camelize()             // => "BulletRecord"
    //     "bullet_record".camelize(false)        // => "bulletRecord"
    //     "bullet_record/errors".camelize()      // => "BulletRecord.Errors"
    //     "bullet_record/errors".camelize(false) // => "bulletRecord.Errors"
    //
    // As a rule of thumb you can think of _camelize_ as the inverse of _underscore_,
    // though there are cases where that does not hold:
    //
    //     "SSLError".underscore.camelize // => "SslError"
    inflect.camelize = function(lower_case_and_underscored_word, first_letter_in_uppercase) {
      var result;
      if (first_letter_in_uppercase == null) first_letter_in_uppercase = true;
      result = util.string.gsub(lower_case_and_underscored_word, /\/(.?)/, function($) {
        return "." + (util.string.upcase($[1]));
      });
      result = util.string.gsub(result, /(?:_)(.)/, function($) {
        return util.string.upcase($[1]);
      });
      if (first_letter_in_uppercase) {
        return util.string.upcase(result);
      } else {
        return util.string.downcase(result);
      }
    };

    // Makes an underscored, lowercase form from the expression in the string.
    //
    // Changes '.' to '/' to convert namespaces to paths.
    //
    //     "BulletRecord".underscore()         // => "bullet_record"
    //     "BulletRecord.Errors".underscore()  // => "bullet_record/errors"
    //
    // As a rule of thumb you can think of +underscore+ as the inverse of +camelize+,
    // though there are cases where that does not hold:
    //
    //     "SSLError".underscore().camelize() // => "SslError"
    inflect.underscore = function (camel_cased_word) {
      var self;
      self = util.string.gsub(camel_cased_word, /\./, '/');
      self = util.string.gsub(self, /([A-Z]+)([A-Z][a-z])/, "$1_$2");
      self = util.string.gsub(self, /([a-z\d])([A-Z])/, "$1_$2");
      self = util.string.gsub(self, /-/, '_');
      return self.toLowerCase();
    };

    // Replaces underscores with dashes in the string.
    //
    //     "puni_puni".dasherize()   // => "puni-puni"
    inflect.dasherize = function (underscored_word) {
      return util.string.gsub(underscored_word, /_/, '-');
    };

    // Removes the module part from the expression in the string.
    //
    //     "BulletRecord.String.Inflections".demodulize() // => "Inflections"
    //     "Inflections".demodulize()                     // => "Inflections"
    inflect.demodulize = function (class_name_in_module) {
      return util.string.gsub(class_name_in_module, /^.*\./, '');
    };

    // Creates a foreign key name from a class name.
    // _separate_class_name_and_id_with_underscore_ sets whether
    // the method should put '_' between the name and 'id'.
    //
    //     "Message".foreign_key()      // => "message_id"
    //     "Message".foreign_key(false) // => "messageid"
    //     "Admin::Post".foreign_key()  // => "post_id"
    inflect.foreign_key = function (class_name, separate_class_name_and_id_with_underscore) {
      if (separate_class_name_and_id_with_underscore == null) {
        separate_class_name_and_id_with_underscore = true;
      }
      return inflect.underscore(inflect.demodulize(class_name)) + (separate_class_name_and_id_with_underscore ? "_id" : "id");
    };

    // Turns a number into an ordinal string used to denote the position in an
    // ordered sequence such as 1st, 2nd, 3rd, 4th.
    //
    //     ordinalize(1)     // => "1st"
    //     ordinalize(2)     // => "2nd"
    //     ordinalize(1002)  // => "1002nd"
    //     ordinalize(1003)  // => "1003rd"
    //     ordinalize(-11)   // => "-11th"
    //     ordinalize(-1021) // => "-1021st"
    inflect.ordinalize = function (number) {
      var _ref;
      number = parseInt(number);
      if ((_ref = Math.abs(number) % 100) === 11 || _ref === 12 || _ref === 13) {
        return "" + number + "th";
      } else {
        switch (Math.abs(number) % 10) {
          case 1:
            return "" + number + "st";
          case 2:
            return "" + number + "nd";
          case 3:
            return "" + number + "rd";
          default:
            return "" + number + "th";
        }
      }
    };

    // Checks a given word for uncountability
    //
    //     "money".uncountability()     // => true
    //     "my money".uncountability()  // => true
    inflect.uncountability = function (word) {
      return inflect.inflections.uncountables.some(function(ele, ind, arr) {
        return word.match(new RegExp("(\\b|_)" + ele + "$", 'i')) != null;
      });
    };

    // Returns the plural form of the word in the string.
    //
    //     "post".pluralize()             // => "posts"
    //     "octopus".pluralize()          // => "octopi"
    //     "sheep".pluralize()            // => "sheep"
    //     "words".pluralize()            // => "words"
    //     "CamelOctopus".pluralize()     // => "CamelOctopi"
    inflect.pluralize = function (word) {
      var plural, result;
      result = word;
      if (word === '' || inflect.uncountability(word)) {
        return result;
      } else {
        for (var i = 0; i < inflect.inflections.plurals.length; i++) {
          plural = inflect.inflections.plurals[i];
          result = util.string.gsub(result, plural[0], plural[1]);
          if (word.match(plural[0]) != null) break;
        }
        return result;
      }
    };

    // The reverse of _pluralize_, returns the singular form of a word in a string.
    //
    //     "posts".singularize()            // => "post"
    //     "octopi".singularize()           // => "octopus"
    //     "sheep".singularize()            // => "sheep"
    //     "word".singularize()             // => "word"
    //     "CamelOctopi".singularize()      // => "CamelOctopus"
    inflect.singularize = function (word) {
      var result, singular;
      result = word;
      if (word === '' || inflect.uncountability(word)) {
        return result;
      } else {
        for (var i = 0; i < inflect.inflections.singulars.length; i++) {
          singular = inflect.inflections.singulars[i];
          result = util.string.gsub(result, singular[0], singular[1]);
          if (word.match(singular[0])) break;
        }
        return result;
      }
    };

    // Capitalizes the first word and turns underscores into spaces and strips a
    // trailing "_id", if any. Like _titleize_, this is meant for creating pretty output.
    //
    //     "employee_salary".humanize()   // => "Employee salary"
    //     "author_id".humanize()         // => "Author"
    inflect.humanize = function (lower_case_and_underscored_word) {
      var human, result;
      result = lower_case_and_underscored_word;
      for (var i = 0; i < inflect.inflections.humans.length; i++) {
        human = inflect.inflections.humans[i];
        result = util.string.gsub(result, human[0], human[1]);
      }
      result = util.string.gsub(result, /_id$/, "");
      result = util.string.gsub(result, /_/, " ");
      return util.string.capitalize(result, true);
    };

    // Capitalizes all the words and replaces some characters in the string to create
    // a nicer looking title. _titleize_ is meant for creating pretty output. It is not
    // used in the Bullet internals.
    //
    //
    //     "man from the boondocks".titleize()   // => "Man From The Boondocks"
    //     "x-men: the last stand".titleize()    // => "X Men: The Last Stand"
    inflect.titleize = function (word) {
      var self;
      self = inflect.humanize(inflect.underscore(word));
      self = util.string.gsub(self, /[^a-zA-Z:']/, ' ');
      return util.string.capitalize(self);
    };

    // Create the name of a table like Bullet does for models to table names. This method
    // uses the _pluralize_ method on the last word in the string.
    //
    //     "RawScaledScorer".tableize()   // => "raw_scaled_scorers"
    //     "egg_and_ham".tableize()       // => "egg_and_hams"
    //     "fancyCategory".tableize()     // => "fancy_categories"
    inflect.tableize = function (class_name) {
      return inflect.pluralize(inflect.underscore(class_name));
    };

    // Create a class name from a plural table name like Bullet does for table names to models.
    // Note that this returns a string and not a Class.
    //
    //     "egg_and_hams".classify()   // => "EggAndHam"
    //     "posts".classify()          // => "Post"
    //
    // Singular names are not handled correctly:
    //
    //     "business".classify()       // => "Busines"
    inflect.classify = function (table_name) {
      return inflect.camelize(inflect.singularize(util.string.gsub(table_name, /.*\./, '')));
    }



    return inflect
  }]);
/**
 * Created by aldo on 5/5/14.
 */
'use strict';
angular.module('fortuneAdmin.Services', [
  'fortuneAdmin.Services.inflectPort'
]);

angular.module('fortuneAdmin.umlDiagram.services', [])
  .service('umlData', ['$http', '$q',
    function umlData($http, $q){
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
        $http.get(CONFIG.fortuneAdmin.baseEndpoint + '/resources').success(function(data){
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
    }])

  .service('umlCanvasController', ['umlData',
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
    }])

  .service('umlLinks', ['umlData', 'umlCanvasController',
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
    }]);

// A standalone app. Don't include it in plugin build.
(function(angular){
  angular.module('fortuneAdmin.Standalone', [
    'ngRoute',
    'fortuneAdmin'
  ])
    .config(['$routeProvider', '$locationProvider', 'fortuneAdminProvider',
      function($routeProvider, $locationProvider, fortuneAdminProvider){
        fortuneAdminProvider.mountTo($routeProvider, '');
        $routeProvider.when('/', {
          templateUrl: 'init.html',
          controller: 'initCtrl'
        });
        $routeProvider.otherwise({
          redirectTo: '/uml'
        });
        $locationProvider.html5Mode(true);
    }])
    .controller('initCtrl', ['$scope', '$location', 'fortuneAdmin', function($scope, $location, fortuneAdmin){
      $scope.params = {
        host: '',
        namespace: '/api/v1'
      };

      $scope.start = function(){
        fortuneAdmin.setApiHost($scope.params.host);
        fortuneAdmin.setApiNamespace($scope.params.namespace);
        $location.url('/uml');
      };
    }]);
})(angular);

