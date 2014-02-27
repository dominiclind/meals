app.controller('StartCtrl', function($scope, Storage) {

	$scope.stats = Storage.getStats();

	// public

});