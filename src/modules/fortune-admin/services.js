/**
 * Created by aldo on 5/5/14.
 */
'use strict';
angular.module('fortuneAdmin.Services', [
  'fortuneAdmin.Services.inflectPort'
])
.service('faActionsService', ['$rootScope', function($rootScope) {
    var actionsMap  = {};
    var selected = [];
    var srv = this;

    this.isSelected = function(model){
       return selected.indexOf(model.id) !== -1;
    };

    this.toggleSelection = function(model){
      if (this.isSelected(model)){
        selected.splice(selected.indexOf(model.id), 1);
      }else{
        selected.push(model.id);
      }
    };

    this.getSelectedItems = function(data, model){
      var ret = [];
      angular.forEach(data, function(item){
        if (srv.isSelected(item) || item.id === model.id) ret.push(item);
      });
      return ret;
    };

    this.initialize = function(){
      selected = [];
    };

    $rootScope.$on('$locationChangeStart', function(){
      srv.initialize();
    });

   this.registerActions = function(actions){
      angular.forEach(actions, function(action){
          if (angular.isDefined(actionsMap[action.name])) console.warn('Overwriting existing action ', action.name);
          actionsMap[action.name] = action;
      });
   };
   this.getActions = function(resName) {
      var res_actions = [];
      angular.forEach(actionsMap, function(action){
          if (angular.isUndefined(action.resources)) {
              res_actions.push(action);
          }else if (action.resources.indexOf(resName) !== -1) {
              res_actions.push(action);
          }
      });
      return res_actions;
    };
}]);