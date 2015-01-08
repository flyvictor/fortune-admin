/**
 * Created by aldo on 5/5/14.
 */
'use strict';
angular.module('fortuneAdmin.Services', [
  'fortuneAdmin.Services.inflectPort'
])
.value('faActionsServiceState', {
    actionsMap : {
        'delete' : {
            cls  : 'DELE',
            style: 'font-style: italic',
            type : 'ajax'
        }
    },
    resNamesMap : {}
})
.factory('faActionsService', ['faActionsServiceState', function(faActionsServiceState) {
    var actionsMap  = faActionsServiceState['actionsMap'],
        resNamesMap = faActionsServiceState['resNamesMap'];
    return {
        applyCfg   : function(cfg) {
            angular.extend(faActionsServiceState['actionsMap'] , cfg['actionsMap'] );
            angular.extend(faActionsServiceState['resNamesMap'], cfg['resNamesMap']);
        },
        addAction  : function(actions) {
            var action;
            
            for (action in actions) {
                actionsMap[action] = actions[action];
            }
        },
        getActions : function(resName) {
            var res_actions = [],
                actions = resNamesMap[resName] || [], 
                i = 0,
                len = actions.length;
            
            for (; i<len; i++) {
                res_actions.push(angular.extend(
                    { 
                        name : actions[i]
                    }, 
                    actionsMap[actions[i]]
                ));
            }
            return res_actions;
        },
        setResourceActions : function(resNamesMap) {
            var name;
            
            for (name in resNamesMap) {
                resNamesMap[name] = resNamesMap[name];
            } 
        }
    };
}]);