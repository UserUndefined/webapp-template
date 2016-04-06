describe('MainController', function() {
    beforeEach(module('app'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.myProperty', function() {
        it('sets the proprty to "A Value"', function() {
            var $scope = {};
            var controller = $controller('MainController', { $scope: $scope });
            expect($scope.myProperty).toEqual('A Value');
        });
    });
});