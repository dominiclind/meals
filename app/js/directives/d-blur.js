app.directive('dBlur', function ($timeout) {
	return function (scope, element, attrs) {
		element.bind('blur', function () {
			scope.$apply(attrs.ngBlur);
		});
	}
});