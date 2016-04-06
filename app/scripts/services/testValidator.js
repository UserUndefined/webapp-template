'use strict';

angular.module('app')
    .service('testValidator', ['ExampleApi', function(ExampleApi) {
        return {

            checkTestValue1: function (value1) {
                return value1 === 'value1';
            },

            checkTestValue2: function (value2) {
                return value2 === 'value2';
            }

        };
    }]);