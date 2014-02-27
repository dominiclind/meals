app.controller('NewCtrl', function($scope, $stateParams, $state, Storage) {

	$scope.meals = Storage.getAllMeals();

	$scope.meal = {
		name : $stateParams.name,
		id : new Date().getTime(),
		healthy : true,
		macro : {
			carbs   : false,
			protein : false,
			fat     : false
		}
	};



	// public

	$scope.save = function() {

		$scope.meals.push($scope.meal);
		$state.go('eat', {id : $scope.meal.id});
		delete $scope.meal;
	}


});