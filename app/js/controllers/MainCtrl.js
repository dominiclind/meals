app.controller('MainCtrl', function($scope, $state, Header) {

	//
	// public
	//  

	$scope.goTo = function(state){
		$state.go(state);
	}
});