var contentDirectives = angular.module('dContentDirectives', []);

contentDirectives.directive('dContent', function($window,$timeout, swipe){

	var GLOBAL_OPTIONS = {
		HWCompositing : true,
		useTransition : false,
		probeType : 3
	}

	return{
		restrict: 'E',
		transclude : true,
		replace: true,
		templateUrl : 'partials/content/content.html',
		scope    : {
			useiscroll : '=iscroll',
			overflow   : "=overflow"
		},
		controller : function($scope, $element, $attrs){
			var _this = this;

			_this.useiscroll = $scope.useiscroll;

			if($scope.useiscroll == true){
				_this.iscroll = new IScroll($element[0], GLOBAL_OPTIONS);
				$element.addClass('iscroll');


				$scope.$watchCollection(function(){
					if(angular.isDefined(_this.iscroll)){
						_this.iscroll.refresh();
					}
				});
			
			}else{
				if($scope.overflow == 'hidden'){
				}else{
					$element.addClass('overflow-native');	
				}
				_this.element = $element;
			}

		}
	}
});

contentDirectives.directive('inView', function($window){
		
		return {
			require : '^dContent',
			scope: {
				inViewClass : '=inViewClass',
				inViewDelay : '=inViewDelay',
				inViewOffset : '=inViewOffset',
				inViewPosition : '=inViewPosition'
			},
			link: function(scope, element, attrs, controller){
				element.addClass('in-view');
				
				var delay  = scope.inViewDelay  || 0;
				var offset = scope.inViewOffset || 0;

				var inView = function(element, scrollTop, wrapperHeight, i){
					var center     = ( Math.abs(scrollTop) ) + (wrapperHeight / 2);
					var elementTop = element[0].offsetTop;

					switch(scope.inViewPosition){
						case 'center':
							if(elementTop < center - offset){
								return true;
							}else{
								return false;
							}	
						break;

						case 'bottom':
							if(elementTop < (wrapperHeight + Math.abs(scrollTop)) - offset ){
								return true;
							}
						break;
					}
							
				}
				
				if(controller.useiscroll){
					$window.setTimeout(function(){

						if(inView(element, 0, controller.iscroll.wrapperHeight)){
							element.addClass(scope.inViewClass);
						}else{
							element.removeClass(scope.inViewClass);
						}

						controller.iscroll.refresh();

						controller.iscroll.on('scroll', function(){
							if(inView(element, this.y, this.wrapperHeight)){
								
								$window.setTimeout(function(){
									element.addClass(scope.inViewClass);
								},delay);

							}else{
								element.removeClass(scope.inViewClass);
							};
						})

					},0);
				}else{

					if(inView(element, 0, controller.element[0].getBoundingClientRect().height)){	
						$window.setTimeout(function(){
							element.addClass(scope.inViewClass);
						},delay);

					}else{
						element.removeClass(scope.inViewClass);
					};

					controller.element.bind('scroll touchmove', function(){
						if(inView(element, this.scrollTop, this.getBoundingClientRect().height)){
							
							$window.setTimeout(function(){
								element.addClass(scope.inViewClass);
							},delay);

						}else{
							element.removeClass(scope.inViewClass);
						};
					});
				}
			}
		}
	});