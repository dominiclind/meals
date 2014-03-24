app.directive('dTap', function ($parse) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs){

			console.log(element);
			var clickHandler = $parse(attrs.dTap),
	        tapping = false,
	        tapElement,  // Used to blur the element after a tap.
	        startTime,   // Used to check if the tap was held too long.
	        touchStartX,
	        touchStartY,
	        ACTIVE_CLASS_NAME = 'ng-click-active',
	        MOVE_TOLERANCE = 25,
	        TAP_DURATION = 700;

			function resetState() {
				tapping = false;
				element.removeClass(ACTIVE_CLASS_NAME);
			}

			element.on('touchstart', function(event) {
				tapping = true;
				
				element.addClass(ACTIVE_CLASS_NAME);

				startTime = Date.now();

				var touches = event.touches && event.touches.length ? event.touches : [event];
				var e = touches[0].originalEvent || touches[0];
				touchStartX = e.clientX;
				touchStartY = e.clientY;
			});

			element.on('touchmove', function(event) {
				resetState();
			});

			element.on('touchcancel', function(event) {
				resetState();
			});

			element.on('touchend', function(event) {
				var diff = Date.now() - startTime;

				var touches = (event.changedTouches && event.changedTouches.length) ? event.changedTouches :
				((event.touches && event.touches.length) ? event.touches : [event]);
				var e = touches[0].originalEvent || touches[0];
				var x = e.clientX;
				var y = e.clientY;
				var dist = Math.sqrt( Math.pow(x - touchStartX, 2) + Math.pow(y - touchStartY, 2) );

				console.log(tapping);
				if (tapping) {
					
					console.log(" DOLI TAP FIRED ");

					if (!angular.isDefined(attrs.disabled) || attrs.disabled === false) {
						scope.$apply(function() {
							clickHandler(scope);
						});
					}
				}

				resetState();
			});
		}
	}
});