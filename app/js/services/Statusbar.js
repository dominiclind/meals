app.factory('Statusbar', function (Cordova) {
	return {
		hide: function () {
			Cordova.ready().then(function(){
				console.log(StatusBar);
				StatusBar.hide();
			});
		}
	};
})