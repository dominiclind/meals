app.directive('dCustomToggle', function ($parse) {
	return {
		restrict : 'E',
		scope : {
			value : '=value',
			action : '=action'
		},
		replace : true,
		templateUrl : 'partials/custom-toggle/toggle.html',
		link : function(scope, element, attrs){

		    var action = $parse(attrs.toggleAction);
		    
            scope.$watch('value', function(v){
            	if(angular.isDefined(v)){
	            	if(v == true){
						action(scope);
	            	}
            	}
            });
		}
	}
});