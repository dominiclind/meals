app.controller('HistoryCtrl', function($scope, Storage) {

	$scope.history = Storage.getHistory();

	console.log($scope.history);

	// public

	$scope.isToday = function(hdate){
		var today = new Date();
		var dd = today.getDate(); 
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();

		var date = '' + yyyy + mm + dd;

		if(hdate == date){
			return true
		}else{
			return false;
		}
	}

});