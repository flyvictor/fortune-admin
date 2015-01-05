/**
 * Created by aldo on 5/5/14.
 */
'use strict';
angular.module('fortuneAdmin.Services', [
  'fortuneAdmin.Services.inflectPort'
]).service('faActionsService', [function() {
    var actionsMap = {
            'delete' : {
                cls  : 'DELE',
                style: 'font-style: italic',
                type : 'ajax'
            }
        },
        resNamesMap = {
            'users' : ['delete','Show details']
        };
        
    return {
        addAction  : function(actions) {
            var action;
            
            for (action in actions) {
                actionsMap[action] = actions[action];
            }
        },
        getActions : function(resName) {
            var res_actions = [],
                actions = resNamesMap[resName], 
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
}])
// .provider('faActionsService', function() {
//     return {
//         $get : function () {
//           return {
//               applyCfg : function(cfg) {
//                   //TODO: Bind the service's state and modify it in this function
//               }
//           };
//         }
//     };
// });
