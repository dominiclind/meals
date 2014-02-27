app.factory('Storage', function($localStorage) {

	var DEFAULT = {
		meals : [],
		history : {}
	};

	return {
		getAllMeals : function() {
			return $localStorage.$default(DEFAULT).meals;
		},
		getMeal : function(id) {
			var meals = $localStorage.$default(DEFAULT).meals,
			found     = false,
			m;

			for (var i = 0; i < meals.length; i++) {
				var meal = meals[i];

				if(meal.id == id){
					found = true;
					m     = meal; 
				}
	
			}

			if(found){
				return m
			}else{
				return false
			}
		},
		getHistory : function() {
			return $localStorage.$default(DEFAULT).history;
		},
		getTodaysMeals : function(){
			var today = new Date();
			var dd = today.getDate(); 
			var mm = today.getMonth()+1; 
			var yyyy = today.getFullYear();

			var date = '' + yyyy + mm + dd;
			
			var history = this.getHistory();

			return history[date] || [];
		},
		eatMeal : function(meal) {
			var history = this.getHistory();

			var today = new Date();
			var dd = today.getDate(); 
			var mm = today.getMonth()+1; 
			var yyyy = today.getFullYear();

			var date = '' + yyyy + mm + dd;

			if(history[date] == undefined){
				history[date] = [];
			}
			
			history[date].push(meal);

		},
		getStats : function(){

			var stats = {
				meals : 0,
				healthy : 0,
				nonHealthy : 0,
				proteinShakes : 0
			}

			var mealsToday = this.getTodaysMeals();

			for(var i = 0; i < mealsToday.length; i++){
				var meal = mealsToday[i];

				if(meal.healthy){
					stats.healthy++;
				}else{
					stats.nonHealthy++;
				}

				if(meal.name == 'protein' || meal.name == 'protein shake'){
					stats.proteinShakes++;
				}

				stats.meals++;
			}

			return stats
		}
	}
});