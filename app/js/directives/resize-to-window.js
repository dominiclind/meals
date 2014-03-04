app.directive('dResizeToWindow', function($window, $rootScope){
		
	var MINUS_OFFSET = 0;

	return {
		restrict : 'A',
		link     : function(scope, el, attrs){

			var setSize = function() {
				el.css('width', $window.innerWidth + 'px');
				el.css('height', ($window.innerHeight - MINUS_OFFSET) + 'px');			
			};

			setSize();

			console.log('asdasdasd');

			/*
			angular.element($window).bind('resize', function(){
				console.log("hej");
				if(this.resizeTO) clearTimeout(this.resizeTO);
		        this.resizeTO = setTimeout(function() {
		           setSize();
		        }, 500);

			})
			*/


		}

	}


});