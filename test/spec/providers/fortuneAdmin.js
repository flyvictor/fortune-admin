xdescribe("FortuneAdminModule", function() {
    xdescribe('provider', function(){
        var fortune, $injector, cs = {
            applyCfg : function() {}
        };
        
        beforeEach(module('fortuneAdmin', function($provide){
          $provide.value('customService', cs);
        }));
        beforeEach(module('fortuneAdmin'));
        beforeEach(inject(function(fortuneAdmin){
          fortune    = fortuneAdmin;
        }));
        xdescribe("modifyProvider", function(){
            it("should exist", function(){
                expect(fortune.modifyProvider).toBeDefined();
            });
            it("should inject correctly", function(){
                spyOn(cs, 'applyCfg');
                fortune.modifyProvider('customService', {});
                expect(cs.applyCfg).toHaveBeenCalled();
            });
         });
    });
});