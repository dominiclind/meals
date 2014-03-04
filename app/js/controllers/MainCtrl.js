app.controller('MainCtrl', function($scope, $state, Header) {

	Header.show();

	//
	// public
	//  

	$scope.goTo = function(state){
		$state.go(state);
	}
});