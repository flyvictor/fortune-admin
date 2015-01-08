xdescribe("fortuneAdmin.Services", function() {
    xdescribe('actionsService', function(){
        var serv, state,
            customState = {
                actionsMap : {
                    'some_action' : {
                        a : 'b'
                    }
                },
                resNamesMap : {
                    'some_resource' : ['some_action']
                }
            };
        beforeEach(module('fortuneAdmin.Services'));
        beforeEach(module('fortuneAdmin.Services', function($provide){
            $provide.value('faActionsServiceState', customState);
        }));
        beforeEach(inject(function(faActionsService, faActionsServiceState){
          serv  = faActionsService;
          state = faActionsServiceState;
        }));
        xdescribe('applyCfg', function() {
            it("should exist", function(){
                expect(serv.applyCfg).toBeDefined();
            });
            it("should modify the states of the faActionsServiceState", function() {
                var sample_action = { a : 'b'},
                    sample_action_names_arr =  ['sample_action'];
                
                serv.applyCfg({
                    actionsMap  : {
                        'sample_action' : sample_action
                    },
                    resNamesMap : {
                        'sample_resource' : sample_action_names_arr
                    }
                });
                expect(state.actionsMap.sample_action).toEqual(sample_action);
                expect(state.resNamesMap.sample_resource).toEqual(sample_action_names_arr);
            });
        });
        xdescribe('getActions', function() {
            it("should exist", function(){
                expect(serv.getActions).toBeDefined();
            });
            it("should fetch all actions for a resource", function() {
                expect(serv.getActions('some_resource')).toEqual([{name : 'some_action', a : 'b'}]);
            });
        });
        xdescribe('setResourceActions', function() {
            it("should exist", function(){
                expect(serv.setResourceActions).toBeDefined();
            });
            it("should set the resource - actions map", function() {
                serv.setResourceActions({ 'some_resource' : ['some_other_res']});
                expect(state.resNamesMap.some_resource).toEqual(['some_other_res']);
            });                                                                                                              
        });
    });
});