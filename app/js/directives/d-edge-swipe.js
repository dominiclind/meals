app.directive('dEdgeSwipe', ['$parse', 'swipe', function($parse, swipe) {

    var validSwipe = function(distX,distY){
        var d = (endDate-startDate); // difference in milliseconds
       
        console.log(d);
        console.log(swipeStartX);
        if(d < swipeMaxTime && startX  < swipeStartX){
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                var swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
                return swipedir;
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                var swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
                return swipedir;
            }
        }
    },
    startDate,
    endDate,
    startX,
    startY,
    distX,
    distY,
    threshold = 60,
    restraint = 100,
    swipeMaxTime = 200,
    swipeStartX = 40;

    return function(scope, element, attrs) {

        var leftSwipeFunction = $parse(attrs.leftSwipe),
            rightSwipeFunction = $parse(attrs.rightSwipe);

        swipe.bind(element,{
            start:function(coords,e){
                startDate = new Date();
                preventSwipe = e.target.classList.contains('no-swipe');
                startX = coords.x;
                startY = coords.y;
            },
            end: function(coords){
                distX = coords.x - startX;
                distY = coords.y - startY;
                endDate = new Date();

                if(!preventSwipe){
                    switch(validSwipe(distX, distY)){
                        case 'right':
                            scope.$apply(function () {
                                rightSwipeFunction(scope);
                            });
                        break;

                        case 'left':
                            scope.$apply(function () {
                                leftSwipeFunction(scope);
                            });
                        break; 
                    }
                }

            }
        });
    
    };

}]);