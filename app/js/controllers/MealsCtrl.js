app.controller('MealsCtrl', function($scope, $state, Storage, Header) {
		
	Header.back(true, function(){
		$state.go('start');
	});

	Header.buttons([
		{
			class : 'entypo plus b-right',
			action : function(){
				$state.go('new');
			}	
		}
	]);
	

	$scope.meals = Storage.getAllMeals();
	//public

	$scope.eat = function (meal) {
		$state.go('meal', {id : meal.id})
	}

});