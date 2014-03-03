app.factory('Storage', function($localStorage, Date) {

	var DEFAULT = {
		meals : [],
		history : {},
		state : {}
	};

	return {
		getState : function(){
			return $localStorage.$default(DEFAULT).state;
		},

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
			var history = this.getHistory();
			var today = [];

			for(var i = 0; i < history[Date.today()].length; i++){	
				var m = history[Date.today()][i];

				if(this.getMeal(m.id)){
					today.push(this.getMeal(m.id));
				}
			}

			return today;
		},
		eatMeal : function(meal) {
			var history = this.getHistory();

			if(history[Date.today()] == undefined){
				history[Date.today()] = [];
			}
			
			history[Date.today()].push({ id : meal.id, eat_date : meal.eat_date });

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

				if(meal.name.indexOf('protein') > -1){
					stats.proteinShakes++;
				}

				stats.meals++;
			}

			return stats
		}
	}
});