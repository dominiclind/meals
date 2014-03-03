var app = angular.module('plunker', ['ui.router','dContentDirectives','dSwiperDirectives','SafeApply', 'ngStorage','ngTouch','ngAnimate','swipe']);

app.run(function($rootScope, Storage, Notification, Statusbar){
	console.log("application run");

    Notification.add();

    Statusbar.hide(); 

    $rootScope.state = Storage.getState();


    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $rootScope.showMenu = false;
        $rootScope.state.previousState = fromState;
        $rootScope.state.previousStateParams = fromParams;
        
        $rootScope.state.currentState = toState;
        $rootScope.state.currentStateParams = toParams;

        console.log($rootScope.state);

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
        .state('meal', {
            url: '/meal/:id',
            controller: 'MealCtrl',
            templateUrl: 'views/meal.html',
        })
        .state('meal/edit', {
            url: '/meal/:id/edit',
            controller: 'EditCtrl',
            templateUrl: 'views/edit.html',
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