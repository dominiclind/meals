app.controller('StartCtrl', function($scope, Storage, Header) {

	$scope.stats = Storage.getStats();

	Header.buttons([]);
	Header.back(false);

	console.log($scope.stats);
	// public


});