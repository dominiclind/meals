var app = angular.module('plunker', ['ui.router','dContentDirectives','dSwiperDirectives','SafeApply', 'ngStorage', 'ngTouch','ngAnimate','swipe']);

app.run(function($rootScope, Notification){
	console.log("application run");

    Notification.add();
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