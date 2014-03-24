app.directive('dResizeToWindow', function($window, $rootScope, $timeout){
		
	var MINUS_OFFSET = 0;

	return {
		restrict : 'A',
		link     : function(scope, el, attrs){

			console.log("initial height" + $window.innerHeight);

			var setSize = function() {
				el.css('width', $window.innerWidth + 'px');
				el.css('height', ($window.innerHeight - MINUS_OFFSET) + 'px');			
			};

			$timeout(function(){
				setSize();
			},0);

			//setSize();

			console.log('asdasdasd');

			
			angular.element($window).bind('resize', function(){
				console.log("hej");
				if(this.resizeTO) clearTimeout(this.resizeTO);
		        this.resizeTO = setTimeout(function() {
		           setSize();
		        }, 500);

			})

		}

	}


});