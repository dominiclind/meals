app.controller('HeaderCtrl', function($scope, Header) {
	
	// public
	$scope.back = function(state) {
		Header.back(state)
	}


});