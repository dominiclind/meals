var swiperNav = angular.module('dSwiperDirectives', ['SafeApply']);

swiperNav.directive('dSwiper', function($rootScope, $window, Storage){
  return {
	restrict : 'AE',
	transclude : true,
	replace : true,
	templateUrl : 'partials/swiper/swiper-template.html',
	scope : {
	  id : '=dSwiperId',
	  options : '=dSwiperOptions',
	  index : '=dSwiperIndex',
	  fullscreen : '=dSwiperFullscreen'
	},
	link : function(scope, element, attrs){


	console.log(scope.options);

	  // if swiper fullscreen
	  if(scope.fullscreen){
		var setSize = function() {
		  element.css({
			width : $window.innerWidth + 'px',
			height : $window.innerHeight + 'px'
		  })
		}
		angular.element($window).bind('resize', function(){
		  setSize(); 
		});
		setSize();
	  }
	  
	  // start swipernav
	  var defaultOptions = {
		//Your options here:
		mode:'horizontal',
		loop: false,
		initialSlide : scope.index || 0,
		watchActiveIndex : true,
		onSwiperCreated : function(swiper){
		  $rootScope.$safeApply(function(){
			$rootScope.$emit('swiper:onSwiperCreated', scope.id, swiper);
		  });

		},
		onSlideChangeStart: function(swiper) {

		  $rootScope.$safeApply(function(){
			$rootScope.$emit('swiper:onSlideChangeStart', scope.id, swiper);
		  });

		},
		onSlideChangeEnd : function(swiper) {
			
		  $rootScope.$safeApply(function(){
			$rootScope.$emit('swiper:onSlideChangeEnd', scope.id, swiper);
		  });

		},
		// smooth progress plugin
		onProgressChange: function(swiper) {
		  for (var i = 0; i < swiper.slides.length; i++){
			var slide = swiper.slides[i];
			var progress = slide.progress;
			var scale, translate, opacity;
			if (progress<=0) {
			  opacity = 1 - Math.min(Math.abs(progress),1);
			  scale = 1 - Math.min(Math.abs(progress/2),1);
			}
			else {
			  opacity = 1 - Math.min(Math.abs(progress/2),1);
			  scale=1;
			  translate=0;
			}
			slide.style.opacity = opacity;
		  }
		},
		onTouchStart:function(swiper){
		  for (var i = 0; i < swiper.slides.length; i++){
			swiper.setTransition(swiper.slides[i], 0);
		  }
		},
		onSetWrapperTransition: function(swiper) {
		  for (var i = 0; i < swiper.slides.length; i++){
			swiper.setTransition(swiper.slides[i], swiper.params.speed);
		  }
		}
	  }
	  var options = angular.extend(defaultOptions, scope.options);

	  $window.setTimeout(function(){
		$rootScope.swipers = $rootScope.swipers || {};
		$rootScope.swipers[scope.id] = new Swiper(element[0], options);    
	  },0);
	}
  }    
});

swiperNav.directive('dSwiperSlide', function($rootScope){
  return {
	restrict : 'EA',
	templateUrl : 'partials/swiper/swiper-slide.html',
	replace : true,
	transclude : true,
	link : function(scope,element,attrs){
	  console.log(scope.templateUrl);
	}
  }
});