'use strict';
angular.module('fortuneAdmin.Directives', [])
  .directive('faActions', [function(){
    return {
      restrict: 'E',
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/faActions'),
      controller: 'faActionsCtrl'
    }
  }])
  .directive('faGrid', [function(){
    return {
      restrict: 'E',
      scope: {
        data: '=',
        links: '=',
        resources: '=',
        currentResource: '=',
        filter: '=',
        filterChangedCb: '&',
        getTypeaheadList: '&'
      },
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/faGrid'),
      link: function(scope){
        scope.typeaheadList = function(str, name, type){
          console.log('calling getTypeaheadList ', str, name, type);
          return scope.getTypeaheadList({str: str, name: name, type: type})
        };
        scope.dropFilter = function(fieldName, taQuery){
          delete scope.filter['filter[' + fieldName + '][regex]'];
          delete scope.filter['filter[' + fieldName + '][options]'];
          delete scope.filter['filter[' + fieldName + '][gte]'];
          delete scope.filter['filter[' + fieldName + '][lte]'];
          delete scope.filter['filter[' + fieldName + ']'];
          scope.filterChangedCb()
        };

        scope.applyFilter = function(selected, fieldName, type){
          switch (type){
            case 'String':
              //Derived from typeahead
              scope.filter['filter[' + fieldName + '][regex]'] = selected.model;
              scope.filter['filter[' + fieldName + '][options]'] = 'i';
              break;
            case 'Number':
            case 'Date':
              scope.filter['filter[' + fieldName + '][gte]'] = selected.start;
              scope.filter['filter[' + fieldName + '][lte]'] = selected.end;
              break;
            case 'Boolean':
              scope.filter['filter[' + fieldName + ']'] = selected;
              break;
          }
          scope.filterChangedCb();
        };

        scope.resolveFieldName = function(linkName){
          //No need to dig deeper as there's no nested schemas
          var parts = linkName.split('.');
          return parts[parts.length - 1];
        };

        scope.resolveInverse = function(linkName){
          var fieldName = this.resolveFieldName(linkName);
          var ref = scope.currentResource.schema[fieldName];

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

        scope.linkToMany = function(linkName){
          var fieldName = this.resolveFieldName(linkName);
          var ref = scope.currentResource.schema[fieldName];
          return angular.isArray(ref);
        };
      }
    }
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
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/faEditable'),
      controller: 'faEditableCtrl'
    }
  }])

  .directive('faRef', ['$http', '$compile',
    function($http, $compile){
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
          var resources = scope.resources,
            currentResource,
            refRoute;


          $http.get(CONFIG.fortuneAdmin.baseEndpoint + '/resources').success(function(data){
            resources = data.resources;
            angular.forEach(resources, function(resource){
              if (resource.name === scope.ref.ref){
                refRoute = resource.route;
                currentResource = resource;
              }
            });
            $http.get(CONFIG.fortuneAdmin.getApiNamespace() + '/' + refRoute)
              .success(function(data){
                var PK = currentResource.modelOptions ? currentResource.modelOptions.pk || 'id' : 'id';
                scope.list = data[refRoute];
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
