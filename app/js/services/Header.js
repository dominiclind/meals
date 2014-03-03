app.factory('Header', function ($rootScope) {
	return {
		hide: function () {
			$rootScope.showHeader = false;
		},
		show: function() {
			$rootScope.showHeader = true;
		},
		buttons: function(buttons){
			$rootScope.buttons = buttons;
		},
		back : function(show, backFunction){
			$rootScope.showBackBtn = show;
			if(show){
				$rootScope.backFunction = backFunction;
			}else{
				delete $rootScope.backFunction;
			}
		}
	};
})