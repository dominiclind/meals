var swipeToReveal = angular.module('dSwipeToReveal', ['swipe']);

var THRESHOLD = 120,
	RESTRAINT = 80,
	REACHED = false,
	SHOWING = 'foreground',
	startX,
	startY,
	distX,
	distY;


var validSwipe = function(){
	var swipeStartThreshold = 5;

    if (Math.abs(distX) >= swipeStartThreshold && Math.abs(distY) <= RESTRAINT){ // 2nd condition for horizontal swipe met
        var swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
        return swipedir;
    }
    else if (Math.abs(distY) >= swipeStartThreshold && Math.abs(distX) <= RESTRAINT){ // 2nd condition for vertical swipe met
        var swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
        return swipedir;
    }
}

swipeToReveal.directive('dSwipeToReveal', function($window, $rootScope, $timeout, $document, swipe){
	return {
		restrict : 'E',
		link : function(scope, element, attrs){
			
			var foreground = angular.element(element.children()[0]);
			var background = angular.element(element.children()[1]);

			/*
			* functions
			*/

			var end = function(swipedir){
				foreground.removeClass('no-transition');
				endTime = new Date().getTime();
				
				var time = (endTime - startTime);
				(time > 300) ? time = 300 : time = time;

				switch(swipedir){
					case 'left':
						// show background
						if(distX < 0 && Math.abs(distX) > THRESHOLD && !$rootScope.menuShowing){

							requestAnimationFrame(function(){
								foreground.css({
									'-webkit-transition' : 'all ' + time + 'ms ease-out',
									'-webkit-transform' : 'translate3d(-100%,0,0)'
								});
							});

							$timeout(function(){
								$rootScope.allowMenuScroll = false;
							},time);

						}else{
							requestAnimationFrame(function(){
								foreground.css('-webkit-transform', 'translate3d(0,0,0)');
							});
						}
					break;

					case 'right':
						// show foreground
						if(distX > 0 && Math.abs(distX) > THRESHOLD && allowSwipe){

							requestAnimationFrame(function(){
								foreground.css({
									'-webkit-transition' : 'all ' + time + 'ms ease-out',
									'-webkit-transform' : 'translate3d(0,0,0)'
								});
							});

							$timeout(function(){
								$rootScope.allowMenuScroll = true;
							},time);

						}else{
							requestAnimationFrame(function(){
								foreground.css('-webkit-transform', 'translate3d(-100%,0,0)');
							});
						}
					break;
				}

				startX = 0,
				startY = 0,
				distX  = 0,
				distY  = 0;
				scope.$apply(function(){
					$rootScope.foregroundMoving = false;
				})

			}


			/*
			*
			*events
			*/

			// foreground
			swipe.bind(foreground, {
				start : function(coords,e) {
					startX = coords.x;
					startY = coords.y;
					startTime = new Date().getTime();

					foreground.addClass('no-transition');

				},
				move : function(coords,e) {
					distX = coords.x - startX;
					distY = coords.y - startY;
					swipedir = validSwipe();


					// set foreground as moving
					if(swipedir == 'left' || !$rootScope.menuShowing){

						if(angular.isUndefined($rootScope.foregroundMoving) || $rootScope.foregroundMoving == false){
							
							scope.$apply(function(){
								$rootScope.foregroundMoving = true;
							})
						}
					}	
					
					if(swipedir == 'left' && !$rootScope.menuShowing && !$rootScope.menuMoving){
						// animate foreground
						requestAnimationFrame(function(){
							foreground.css('-webkit-transform', 'translate3d('+distX+'px,0,0)');
						})
					}
			
				},
				end : function(coords,e) {
					end('left');
				},
				cancel : function(coords,e) {
					end('left');
				}
			});

			// background
			swipe.bind(background, {
				start : function(coords,e) {
					startX = coords.x;
					startY = coords.y;
					startTime = new Date().getTime();
					foreground.addClass('no-transition');
					

					($rootScope.swipers['meals'].activeIndex == 0) ? allowSwipe = true : allowSwipe = false;
				},
				move : function(coords,e) {
					distX = coords.x - startX;
					distY = coords.y - startY;
					swipedir = validSwipe();

					var dist = $window.innerWidth - distX;

					if(swipedir == 'right' && !$rootScope.menuShowing && allowSwipe){
						// animate foreground
						requestAnimationFrame(function(){
							foreground.css('-webkit-transform', 'translate3d(-'+dist+'px,0,0)');
						})
					}
				},
				end : function(coords,e) {
					end('right');
				},
				cancel : function(coords,e) {
					end('right');
				}
			});

		}
	}    
});


swipeToReveal.directive('foreground', function(){
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		template : '<div class="view foreground" ng-transclude></div>',
		link : function(scope,element,attrs){
		}
	}
});

swipeToReveal.directive('background', function(){
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		template : '<div class="view background" ng-transclude></div>',
		link : function(scope,element,attrs){
		}
	}
});
