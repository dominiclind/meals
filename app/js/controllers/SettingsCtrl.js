app.controller('SettingsCtrl', function($scope, Header) {
	Header.back(false);
	Header.buttons([]);
	
	// public
	$scope.back = function(state) {
		Header.back(state)
	}


});