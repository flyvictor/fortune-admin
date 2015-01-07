describe("FortuneAdminModule", function() {
    describe('provider', function(){
        var module, $injector;
        
        beforeEach(module('fortuneAdmin'));
        beforeEach(inject(function(fortuneAdmin){
           module    = fortuneAdmin;
        }));
        describe("modifyProvider", function(){
            it("should exist", function(){
                expect(module.modifyProvider()).toBeDefined();
            });
            it("should inject correctly", function(){
                var customService = {
                    applyCfg : function() {}
                };
                inject(function(_$injector_){
                    $injector    = _$injector_;
                });  
                fortuneAdmin.modifyProvider('customService', {});
                expect(customService.applyCfg).toBeCalled();
            });
         });
    });
});