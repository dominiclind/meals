app.factory('Date', function () {

	return {
		today: function () {
			var today = new Date();
			var dd = today.getDate(); 
			var mm = today.getMonth()+1; 
			var yyyy = today.getFullYear();

			var date = '' + yyyy + mm + dd;

			return date
		}
	};
})