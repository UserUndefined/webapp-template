'use strict';

angular.module('app')
    .directive('expInLineDirective',function(){
        return {
            template: 'Customer Name: {{customer.name}}'
        };
    })