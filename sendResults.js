// This file calls the API using the constructed data that was made in requests.js

// Contains getBusResults, and getLocationResults functions

var request = require('request');

var Options = require('./requests.js').Options;
var Estimates = require('./requests.js').Estimates;
var LocationData = require('./requests.js').LocationData;
var sendTextMessage = require('./sendMessage.js').sendTextMessage;
var sendTypingIndicator = require('./sendMessage.js').sendTypingIndicator



//     var str = "51048 16";
//     var res = str.split(" ");
    
//     document.getElementById("demo").innerHTML = res[0];
//     document.getElementById("demo2").innerHTML = res[1];





var getBusResults = function(messageTexts, senderID) {

    request(Options(messageTexts), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);

            var date = new Date();
            var utcDate = new Date(date.toUTCString());
            utcDate.setHours(utcDate.getHours() - 8);
            var usDate = new Date(utcDate);

            var hours = usDate.getHours();
            var minutes = usDate.getMinutes();

            
            sendTextMessage(senderID, "The current time is " + hours + ":" + minutes);
          
            setTimeout(function() {
                          sendTextMessage(senderID, messageTexts + " is at " + info.Name + " in " + info.City + ". Buses include " + info.Routes + ".");

            }), 500;


            request(Estimates(messageTexts), function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);



                    var leave1 = info[0].Schedules[0].ExpectedLeaveTime;
                    var leave2 = info[0].Schedules[1].ExpectedLeaveTime;
               setTimeout(function() {
                                    sendTextMessage(senderID, "The next bus for " + messageTexts + " leaves at " + leave1 + " then at, " + leave2);

            }), 1500

                }
            });

        } else {
          
          var errorMessages = ["k", "Oops, I didn't catch that. For things I can help you with, type 'help' ", "I’m sorry; I’m not sure I understand. Try typing 'help' or typing a 5-digit Bus Stop number. ", "So, I’m good at giving you transit info. Other stuff, not so good. If you need help just enter “help.”"]
          
            sendTextMessage(senderID, errorMessages[ Math.floor((Math.random() * 3) + 1) ] )
        }
        sendTypingIndicator(senderID, "typing_off");
    });
}














var getLocationResults = function(senderID, lat, long) {

    request(LocationData(lat, long), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            sendTextMessage(senderID, "Nearby Stops Include: ");
            // loop thru the results, and return three of them.

            for (var i = 0; i < 5; i++) {
                sendTextMessage(senderID, info[i].StopNo + " at " + info[i].Name + " it is " + info[i].Distance + " metres away.");
            }
            console.log(info[1].StopNo);


        } else {
            sendTextMessage(senderID, "Thanks for the location, however, it is too specific for us. Try sending it from your phone instead. We can only accept coordinates with a max of 5 decimals.")
        }

        sendTypingIndicator(senderID, "typing_off");
    });
}



module.exports.getLocationResults = getLocationResults;
module.exports.getBusResults = getBusResults;