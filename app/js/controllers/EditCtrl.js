app.controller('EditCtrl', function($scope, $rootScope, $stateParams, $state, Storage, Header) {
	
	Header.back(true, function(){
		$state.go('meal',{ id : $stateParams.id });
	});

	Header.buttons([]);

	$scope.meal = Storage.getMeal($stateParams.id);

	// public
	$scope.eat = function() {
		$scope.meal.eat_date = new Date().getTime();
		Storage.eatMeal($scope.meal);

		$state.go('start');
		delete $scope.meal;
	}

});