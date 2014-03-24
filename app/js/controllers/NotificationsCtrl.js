app.controller('NotificationsCtrl', function($scope, $state, Storage, Header, Notification) {
	
	Header.back(true, function() {
		$state.go('settings');
	});

	$scope.meals = Storage.getAllMeals();


	// public
	$scope.testNotification = function() {
		console.log("FIRE NOTIFICATION");

		Notification.add({
			message: 'Great app!'
		});
	}

	$scope.cancelAll = function() {
		console.log("cancel all");
		
		Notification.cancelAll();
	}

});