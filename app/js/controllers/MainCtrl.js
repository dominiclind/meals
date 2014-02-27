app.controller('MainCtrl', function($scope, $state) {


	//
	// public
	//  

	$scope.goTo = function(state){
		$state.go(state);
	}
});