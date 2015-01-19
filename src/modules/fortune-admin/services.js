/**
 * Created by aldo on 5/5/14.
 */
'use strict';
angular.module('fortuneAdmin.Services', [
  'fortuneAdmin.Services.inflectPort'
])
.factory('faActionsService', [function() {
    var actionsMap  = {};
    return {
        registerActions: function(actions){
          angular.forEach(actions, function(action){
              if (angular.isDefined(actionsMap[action.name])) console.warn('Overwriting existing action ', action.name);
              actionsMap[action.name] = action;
          });
        },
        getActions : function(resName) {
            var res_actions = [];
            angular.forEach(actionsMap, function(action){
                if (angular.isUndefined(action.resources)) {
                    res_actions.push(action);
                }else if (action.resources.indexOf(resName) !== -1) {
                    res_actions.push(action);
                }
            });
            return res_actions;
        }
    };
}]);