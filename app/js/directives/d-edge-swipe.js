app.directive('dEdgeSwipe', ['$parse', 'swipe', function($parse, swipe, $window) {

    var validSwipe = function(distX,distY){

        console.log("startX" + startX);


        console.log("swipe start left" + swipeStartLeft);
        console.log("swipe start right" + swipeStartRight);
        
        if(startX < swipeStartLeft || startX > swipeStartRight){
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
    swipeStartThreshold = 40,
    swiped = false;

    return function(scope, element, attrs) {

        var leftSwipeFunction = $parse(attrs.leftSwipe),
            rightSwipeFunction = $parse(attrs.rightSwipe);


        window.setTimeout(function(){
            swipeStartRight = 0,
            swipeStartLeft  = swipeStartThreshold;
        },0);

        swipe.bind(element,{
            start:function(coords,e){
                startDate = new Date();
                preventSwipe = e.target.classList.contains('no-swipe');
                startX = coords.x;
                startY = coords.y;
            },
            move : function(coords){
                distX = coords.x - startX;
                distY = coords.y - startY;

                if(!preventSwipe){
                    switch(validSwipe(distX, distY)){
                        case 'right':
                            if(!swiped){
                                scope.$apply(function () {
                                    rightSwipeFunction(scope);
                                });
                                swiped = true;
                            }
                        break;

                        case 'left':
                            if(!swiped){
                                scope.$apply(function () {
                                    leftSwipeFunction(scope);
                                });
                                swiped = true;
                            }
                        break; 
                    }
                }
            },
            end: function(coords){
                distX = coords.x - startX;
                distY = coords.y - startY;

                if(!preventSwipe){
                    switch(validSwipe(distX, distY)){
                        case 'right':
                            if(!swiped){
                                scope.$apply(function () {
                                    rightSwipeFunction(scope);
                                });
                                swiped = true;
                            }
                        break;

                        case 'left':
                            if(!swiped){
                                scope.$apply(function () {
                                    leftSwipeFunction(scope);
                                });
                                swiped = true;
                            }
                        break; 
                    }
                }

                swiped = false;

            }
        });
    
    };

}]);