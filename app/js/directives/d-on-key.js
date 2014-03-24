app.directive('dOnKey', function ($timeout) {
	return function (scope, element, attrs) {
		element.bind('keydown', function (e) {
			console.log("key down");
			console.log(e.keyCode);
			//scope.$apply(attrs.dOnKeyEvent);
		});
	}
});