'use strict';
angular.module('fortuneAdmin.Directives', ['ui.grid', 'ui.grid.edit', 'ui.grid.resizeColumns', 'fortuneAdmin.Filters'])
  .directive('faActions', [function(){
    return {
      restrict: 'E',
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/faActions'),
      controller: 'faActionsCtrl',
      scope: {
        model: "=ngModel",
        data: "=",
        collectionName: "="
      }
    }
  }])
  .directive('faBulkActions', [function(){
    return {
      restrict: 'E',
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/faBulkActions'),
      controller: 'faActionsCtrl',
      scope: {
        data: '=',
        collectionName: '='
      }
    }
  }])
  .directive('faGrid', [function(){
    return {
      restrict: 'E',
      scope: {
        data: '=',
        links: '=',
        resources: '=',
        fields: '@',
        currentResource: '=',
        filter: '=',
        filterChangedCb: '&',
        getTypeaheadList: '&',
        strictFilters: '='
      },
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/faGrid'),
      link: function(scope, attr){

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

        scope.getSubresourceRoute = function(url, params){
          return CONFIG.fortuneAdmin.route(url, params);
        };

        scope.applyFilter = function(selected, fieldName, type){
          console.log("scope.fields", scope.fields);
          var isStrict = !!scope.strictFilters[scope.currentResource.route];
          switch (type){
            case 'String':
              //Derived from typeahead
              if (isStrict){
                scope.filter['filter[' + fieldName + ']'] = selected.model;
              }else{
                scope.filter['filter[' + fieldName + '][regex]'] = selected.model;
                scope.filter['filter[' + fieldName + '][options]'] = 'i';
              }
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
  .directive('faUiGrid', [function(){
    return {
      restrict: 'E',
      scope: {
        data: '=',
        currentResource: '=',
        columns: '='
      },
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/faUiGrid'),
      controller: function($scope){
        $scope.gridOptions = {
          //TODO: this be achieved requiring this controller from nested directives?
          _fortuneAdminData: { //Quite ugly hack to pass custom data through ui-grid
            currentResource: $scope.currentResource
          }
        };
        $scope.gridOptions.data = $scope.data;
        $scope.gridOptions.enableCellEdit = true;
        $scope.gridOptions.enableColumnResizing = true;

        if ($scope.columns) {
          //Creating shallow copy to avoind propagating local changes to parent $scope
          $scope.gridOptions.columnDefs = angular.copy($scope.columns);

          // ID and Actions are required
          $scope.gridOptions.columnDefs.unshift({ name: 'id', enableCellEdit: false });
          $scope.gridOptions.columnDefs.push({
            name: 'actions',
            enableCellEdit: false,
            width: 65,
            cellTemplate: "<fa-actions ng-model='row.entity' data='row.grid.options.data' collection-name='row.grid.options._fortuneAdminData.currentResource.route'></fa-actions>"
          });
        }
      },
      link: function(scope){
        console.log('linking faUiGrid');
     }
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


          $http.get(CONFIG.fortuneAdmin.baseEndpoint + '/resources', {cache: true}).success(function(data){
            resources = data.resources;
            angular.forEach(resources, function(resource){
              if (resource.name === scope.ref.ref){
                refRoute = resource.route;
                currentResource = resource;
              }
            });
            $http.get(CONFIG.fortuneAdmin.getApiNamespace() + '/' + refRoute, {cache: true})
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
