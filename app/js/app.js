var app = angular.module('plunker', ['ui.router','dContentDirectives','dSwiperDirectives','SafeApply', 'ngStorage', 'ngTouch','ngAnimate','swipe', 'dSwipeToReveal']);

app.run(function($rootScope, Storage, Notification, Statusbar){
	console.log("application run");

    Statusbar.hide(); 

    $rootScope.state = Storage.getState();


    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

        $rootScope.allowMenuScroll = true;
        $rootScope.menuShowing = false;

        $rootScope.state.previousState = fromState;
        $rootScope.state.previousStateParams = fromParams;
        
        $rootScope.state.currentState = toState;
        $rootScope.state.currentStateParams = toParams;
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
        .state('history', {
            url: '/history',
            controller: 'HistoryCtrl',
            templateUrl: 'views/history.html',
        })
        .state('settings', {
            url: '/settings',
            controller: 'SettingsCtrl',
            templateUrl: 'views/settings.html',
        })
            .state('notifications', {
                url: '/notifications',
                controller: 'NotificationsCtrl',
                templateUrl: 'views/notifications.html',
            })
            .state('meals', {
                url: '/meals',
                controller: 'MealsCtrl',
                templateUrl: 'views/meals.html',
            })


        .state('new', {
            url: '/new',
            controller: 'NewCtrl',
            templateUrl: 'views/new.html',
        })
});