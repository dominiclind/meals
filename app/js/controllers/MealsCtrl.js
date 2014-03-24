app.controller('MealsCtrl', function($scope, Storage, Date, Header) {

	$scope.meals = Storage.getAllMeals();


	console.log($scope.meals);
	// public

});