var request = require('request');

var Options = require('./requests.js').Options;
var Estimates = require('./requests.js').Estimates;
var sendTextMessage = require('./sendMessage.js').sendTextMessage;
var sendTypingIndicator = require('./sendMessage.js').sendTypingIndicator


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
                            sendTextMessage(senderID, messageTexts + " is at " + info.Name + " in " + info.City + ". Buses include " + info.Routes + ".");


                            request(Estimates(messageTexts), function(error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    var info = JSON.parse(body);



                                    var leave1 = info[0].Schedules[0].ExpectedLeaveTime;
                                    var leave2 = info[0].Schedules[1].ExpectedLeaveTime;

                                    sendTextMessage(senderID, "The next bus for " + messageTexts + " leaves at " + leave1 + " then at, " + leave2);
                                }
                            });

                        } else {
                            sendTextMessage(senderID, "Please provide a valid bus stop. Say 'help' for assistance. ")
                        }
                      sendTypingIndicator(senderID, "typing_off");
                    });
}


module.exports.getBusResults = getBusResults;