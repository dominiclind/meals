(function (angular, window) {
    'use strict';

    angular.module('SafeApply', [])

        .factory('$safeApply', ['$rootScope', function ($rootScope) {
            $rootScope.$safeApply = function () {
                var $scope, fn, arg, force = false, args = arguments;

                if (args.length === 1) {
                    arg = args[0];
                    if (typeof arg === 'function') {
                        fn = arg;
                    } else {
                        $scope = arg;
                    }
                } else if (args.length > 0) {
                    $scope = args[0];
                    fn = args[1];
                    if (args.length === 3) {
                        force = !!args[2];
                    }
                }

                $scope = $scope || this || $rootScope;
                // Weird v8 bug where sometimes this === window
                // Doesn't happen if you set breakpoints either
                // used a try / catch with a debugger statement
                // before I could inspect an exception instance
                if ($scope === window) { $scope = $rootScope; }
                
                fn = fn || function () {};

                if (force || !($scope.$$phase || $scope.$root.$$phase)) {
                    $scope.$apply ? $scope.$apply(fn) : $scope.apply(fn);
                } else {
                    fn();
                }
            };

            return $rootScope.$safeApply;
        }])

        // Mix it into the root scope
        .run(['$safeApply', function () {}]);

}(this.angular, this));