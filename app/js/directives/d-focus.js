app.directive('dFocus', function ($timeout) {
	return function (scope, element, attrs) {
		$timeout(function(){
			element[0].focus();
		},0)
	}
});