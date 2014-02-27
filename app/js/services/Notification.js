app.factory('Notification', function($rootScope, $state, Cordova) {

    /*
    window.plugin.notification.local.add({
        id:         String,  // A unique id of the notifiction
        date:       Date,    // This expects a date object
        message:    String,  // The message that is displayed
        title:      String,  // The title of the message
        repeat:     String,  // Has the options of 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly', 'yearly'
        badge:      Number,  // Displays number badge to notification
        sound:      String,  // A sound to be played
        json:       String,  // Data to be passed through the notification
        autoCancel: Boolean, // Setting this flag and the notification is automatically canceled when the user clicks it
        ongoing:    Boolean, // Prevent clearing of notification (Android only)
    });
    */

    //callbacks

    return {

        add : function(){
            Cordova.ready().then(function(){
                var now      = new Date(),
                    midnight = new Date(now.setHours(0,0,0,0)),
                    eightam  = new Date(midnight.setHours(8));


                window.plugin.notification.local.add({
                    id:      1, // is converted to a string
                    message: "What did you eat yesterday? Check it out!",
                    json: JSON.stringify({ goto : 'history'}),
                    repeat:  'daily',
                    date:    eightam
                });


                // callbacks
                window.plugin.notification.local.onclick = function (id, state, json) {
                    console.log("on local notification click");

                    switch(JSON.parse(json).goto){

                        case 'history':
                            console.log("goto history");

                            $state.go('history'); 



                        break;
                    }
                }



            });
        }
      
    }
});