app.directive('dSwipeMenu', function ($rootScope, $timeout, $document, swipe) {

var THRESHOLD = 65,
	RESTRAINT = 40,
	SWIPE_TIME = 200,
	MENU_ANIMATE_TIME = 100,
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


	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			console.log(element);

			$rootScope.$watch('menuShowing', function(menu){
				if(menu == false){
					element.css({
						'-webkit-transition' : 'all 200ms ease',
						'-webkit-transform' : 'translate3d(0,0,0)'
					});
				}
			});
			
			/*
			* functions
			*/
			var end = function() {
				element.removeClass('no-transition');
				endTime = new Date().getTime();

				if((endTime - startTime) < SWIPE_TIME || Math.abs(distX) > THRESHOLD){

					if(distX > 0){

						// SHOW MENU
						requestAnimationFrame(function(){
							element.css({
								'-webkit-transition' : 'all '+ MENU_ANIMATE_TIME +'ms ease-out',
								'-webkit-transform' : 'translate3d('+ THRESHOLD +'px,0,0)'
							});
						})

						$timeout(function(){
							$rootScope.menuShowing = true;
						},MENU_ANIMATE_TIME);

						return false;
					}

				}

				requestAnimationFrame(function(){
					element.css({
						'-webkit-transition' : 'all 80ms ease-out',
						'-webkit-transform' : 'translate3d(0,0,0)'
					});
				})

				$timeout(function(){
					$rootScope.menuShowing = false;
				},80);

				startX = 0,
				startY = 0,
				distX = 0;
				distY = 0;
			}


			/*
			*
			*events
			*/

			swipe.bind(element, {
				start : function(coords,e) {
					startX = coords.x;
					startY = coords.y;
					distX = 0;
					distY = 0;
					startTime = new Date().getTime();
					element.addClass('no-transition');

					($rootScope.allowMenuScroll == true) ? allow = true : allow = false;
					($rootScope.foregroundMoving == true) ? foregroundMoving = true : foregroundMoving = false;

					console.log("ALLO :: " + allow);


					console.log("touched swipe menu");

				},
				move : function(coords,event) {
					var _this = this;
					distX = coords.x - startX;
					distY = coords.y - startY;
					var swipedir = validSwipe();
					
					console.log("allow menu scroll :" + allow);

					if(allow && !foregroundMoving){
						if(swipedir == 'right'){

							// REVEAL menu
							if(distX > 0){
							
								if(distX > THRESHOLD){
									dist = distX - ( 0.5 * (distX - THRESHOLD) );
								}else{
									dist = distX;
								}
								requestAnimationFrame(function(){
									element.css('-webkit-transform', 'translate3d('+dist+'px,0,0)');
								})
								//element.css('-webkit-transform', 'translate3d('+distX+'px,0,0)');

							}

						}else if(swipedir == 'left'){
							// close menu
							/*
							var dist = THRESHOLD - Math.abs(distX);
							if(dist > 0){
								// animate foreground
								event.preventDefault();
								event.stopPropagation();

								requestAnimationFrame(function(){
									element.css('-webkit-transform', 'translate3d('+dist+'px,0,0)');
								})
							}
							*/
						}
					}
					
			
				},
				end : function(coords) {
					if(allow) end();
				},
				cancel : function(coords) {
					if(allow) end();
				}
			});

		}
	};
});