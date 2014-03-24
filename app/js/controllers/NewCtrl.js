app.controller('NewCtrl', function($scope, Storage, Date, Header) {

	$scope.meals = Storage.getAllMeals();


	console.log($scope.meals);
	// public

	$scope.logModel = function() {
		alert($scope.meal.name);
	}

});