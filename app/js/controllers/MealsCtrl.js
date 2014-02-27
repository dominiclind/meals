app.controller('MealsCtrl', function($scope, $state, Storage) {
	
	$scope.meals = Storage.getAllMeals();


	//public

	$scope.eat = function (meal) {
		$state.go('eat', {id : meal.id})
	}

	$scope.new = function(mealName){
		$state.go('new', {name : mealName});
	}

});