app.controller('HistoryCtrl', function($scope, Storage, Date, Header) {

	$scope.history = Storage.getHistory();


	console.log($scope.history);
	// public

});