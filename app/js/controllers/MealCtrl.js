app.controller('MealCtrl', function($scope, $stateParams, $state, Storage, Header) {
	
	Header.back(true, function(){
		$state.go('meals');
	});

	Header.buttons([
		{
			class : 'entypo pencil b-right',
			action : function(){
				$state.go('meal/edit', {id : $stateParams.id })
			}	
		}
	]);

	$scope.meal = Storage.getMeal($stateParams.id);

	// public
	
	$scope.eat = function() {
		$scope.meal.eat_date = new Date().getTime();
		Storage.eatMeal($scope.meal);

		$state.go('start');
		delete $scope.meal;
	}
	

});