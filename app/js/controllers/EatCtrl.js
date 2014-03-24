app.controller('EatCtrl', function($scope, $stateParams, $state, Storage, Header) {
	
	$scope.meal = Storage.getMeal($stateParams.id);

	// public
	
	$scope.eat = function() {
		$scope.meal.eat_date = new Date().getTime();
		Storage.eatMeal($scope.meal);

		$state.go('start');
		delete $scope.meal;
	}
	

});