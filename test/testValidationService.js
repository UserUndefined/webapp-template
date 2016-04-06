describe('TestValidator', function() {
    beforeEach(module('app'));

    var $injector;

    beforeEach(inject(function(_$injector_){
        $injector = _$injector_.get('testValidator');
    }));

    describe('checkTestValue1', function() {
        it('validates "value1 correctly"', function() {
            expect($injector.checkTestValue1('value1')).toEqual(true);
        });
        it('validates "value2 correctly"', function() {
            expect($injector.checkTestValue1('value2')).toEqual(false);
        });
    });
});