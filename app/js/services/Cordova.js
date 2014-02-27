app.factory('Cordova', function ($q, $rootScope, $document) {
	var deferred = $q.defer();

	$document.bind('deviceready', function () {
		$rootScope.$apply(deferred.resolve);
	});

	return {
		ready: function () {
			return deferred.promise;
		}
	};
})