'use strict';

angular.module('app')
    .controller('MainController', ['$scope', function ($scope) {

        function initialise(){
            $scope.myProperty = 'A Value';
        }

        initialise();
    }]);
