'use strict';

angular.module('app')
    .controller('directiveExamplesController', function(){

        function initialise(){
            $scope.customer = {name: 'A A Taxis', id: 12345, telephone: '0208 555 555', email: 'info@taxis.com'};
        }

        initialise();
    });