app.directive('dSwipeMenu', function ($compile, $document, $animate,swipe) {

	var menuTemplate = '<div class="menu" ng-controller="MenuCtrl">';
			menuTemplate += '<ul>';
				menuTemplate += '<li ng-repeat="item in menu">';
				menuTemplate += '<a ui-sref="item.state">{{item.name}}</a>';
				menuTemplate += '</li>';
			menuTemplate += '</ul>';
		menuTemplate += '</div>';



	var MENU_SHOW_THRESHOLD = 80,
		EDGE_MOVE_THRESHOLD = 10;

	menuShown = false;

	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			var menuElement = $compile(menuTemplate)(scope);

			var show = function(){
				menuShown = true;
				$document[0].body.appendChild(menuElement[0]);

				$animate.addClass(element, 'active');
				$animate.enter(menuElement, element, null, function() {});
			}

			var hide = function(){
				console.log("göm");
				menuShown = false;
				$animate.leave(menuElement);
			}
			
			swipe.bind(element, {
				start : function(coords) {
					console.log(coords);
					startX = coords.x;
				},
				move : function(coords, e) {
					if(startX < EDGE_MOVE_THRESHOLD){
						deltaX = (startX - coords.x) + EDGE_MOVE_THRESHOLD;
						console.log(deltaX);

						if(deltaX < 0){

							element.css('-webkit-transform', 'translate3d('+ -deltaX +'px,0,0)');
							if(Math.abs(deltaX) > MENU_SHOW_THRESHOLD){
								if(!menuShown){
									console.log("show");
									show();
								}
							}else{
								if(menuShown){
									console.log("göm");
									hide();
								}
							}
						}
					}
				},
				end : function() {
					delete startX;
				},
				cancel : function() {
					delete startX;
				}
			})

		}
	};
});