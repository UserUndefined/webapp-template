angular.module('app', ['appTemplates', 'ui.router'])

    .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        //$rootScope.$on('$stateChangeError', function () {
        //    $state.transitionTo('login');
        //});
    }])

    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            var mainView = {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainController'
            };

            $stateProvider

                .state('main', mainView);

            $urlRouterProvider.otherwise('/');

        }]);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
    //$(".button-collapse").sideNav();
    //$('select').material_select();
});
