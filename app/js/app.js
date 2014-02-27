var app = angular.module('plunker', ['ui.router','dContentDirectives','dSwiperDirectives','SafeApply', 'ngStorage', 'ngTouch','ngAnimate','swipe']);

app.run(function($rootScope, Notification, Statusbar){
	console.log("application run");

    Notification.add();

    Statusbar.hide();


    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $rootScope.showMenu = false;
        console.log(event);
        console.log(toState);
        $rootScope.currentState = toState.name;

    })
});


app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/start');

    $stateProvider
        .state('start', {
            url: '/start',
            controller: 'StartCtrl',
            templateUrl: 'views/start.html',
        })
        .state('meals', {
            url: '/meals',
            controller: 'MealsCtrl',
            templateUrl: 'views/meals.html',
        })
        .state('eat', {
            url: '/eat/:id',
            controller: 'EatCtrl',
            templateUrl: 'views/eat.html',
        })
        .state('new', {
            url: '/new/:name',
            controller: 'NewCtrl',
            templateUrl: 'views/new.html',
        })
        .state('history', {
            url: '/history',
            controller: 'HistoryCtrl',
            templateUrl: 'views/history.html',
        })
});