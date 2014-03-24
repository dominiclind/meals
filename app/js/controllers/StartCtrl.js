app.controller('StartCtrl', function($scope, Storage, Header) {

	$scope.stats = Storage.getStats();

	$scope.swiperOptions = {
		resistance : '100%'
	}

	$scope.mealsArr = [
		{
			name : 'breakfast'
		},
		{
			name : 'lunch'
		},
		{
			name : 'snack'
		},
		{
			name : 'dinner'
		},
		{
			name : 'protein'
		}
	]

	console.log($scope.stats);
	

	// public

	$scope.eat = function(meal) {

		console.log(meal);
	}




});