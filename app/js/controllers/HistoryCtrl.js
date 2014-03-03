app.controller('HistoryCtrl', function($scope, Storage, Date, Header) {
	
	Header.back(false);


	$scope.history = Storage.getHistory();

	$scope.viewHistory = {};
	for(var key in $scope.history){
		if(key !== Date.today){
			$scope.viewHistory[key] = $scope.history[key];
		};
	}

	$scope.swiperOptions = {
		initialSlide :  Object.keys($scope.viewHistory).length-1
	}

	// public

});