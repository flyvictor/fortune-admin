describe("fortuneAdmin.Services", function() {
    describe('actionsService', function(){
        var service, state,
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
        beforeEach(module('faActionsService', function($provide){
            $provide.value('faActionsServiceState', customState);
        }));
        beforeEach(inject(function(faActionsService, faActionsServiceState){
           service = faActionsService;
           state   = faActionsServiceState;
        }));

        beforeEach(module('faActionsService'));
        describe('applyCfg', function() {
            it("should exist", function(){
                expect(service.applyCfg()).toBeDefined();
            });
            it("should modify the states of the faActionsServiceState", function() {
                var sample_action = { a : 'b'},
                    sample_action_names_arr =  ['sample_action'];
                
                faActionsService.applyCfg({
                    actionsMap  : {
                        'sample_action' : sample_action
                    },
                    resNamesMap : {
                        'sample_resource' : sample_action_names_arr
                    }
                });
                expect(faActionsServiceState.actionsMap.sample_action).toEqual(sample_action);
                expect(faActionsServiceState.resNamesMap.sample_resource).toEqual(sample_action_names_arr);
            });
        });
        describe('getActions', function() {
            it("should exist", function(){
                expect(service.getActions()).toBeDefined();
            });
            it("should fetch all actions for a resource", function() {
                expect(faActionsService.getActions('some_resource')).toEqual(['some_action']);
            });
        });
        describe('setResourceActions', function() {
            it("should exist", function(){
                expect(service.setResourceActions()).toBeDefined();
            });
            it("should set the resource - actions map", function() {
                service.setResourceActions({ 'some_resource' : ['some_other_res']});
                expect(faActionsServiceState.resNamesMap.some_resource).toEqual(['some_other_res']);
            });
        });
    });
});