app.controller('NewCtrl', function($scope, $stateParams, $state, Storage, Header) {

	Header.back(true, function() {
		$state.go('meals');
	});
	
	Header.buttons([
		{
			class : 'entypo save b-right',
			action : function(){
				$scope.meal.id = new Date().getTime();

				$scope.meals.push($scope.meal);
				$state.go('meal/edit', {id : $scope.meal.id});
				delete $scope.meal;
			}
		}
	]);

	$scope.meals = Storage.getAllMeals();

	$scope.meal = {
		name : $scope.mealName,
		healthy : true,
		macro : {
			carbs   : false,
			protein : false,
			fat     : false
		}
	};

});