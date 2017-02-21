var sendTextMessage = require('./sendMessage.js').sendTextMessage;
var request = require('request');


var recievedMessage = function(event) {

    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:",
        senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));

    var messageId = message.mid;

    var messageText = message.text;


    var messageAttachments = message.attachments;

    if (messageText) {

        switch (messageText) {

            case 'fuck you':
                sendGenericMessage(senderID);
                break;

            case 'help':
                sendHelpMessage(senderID);
                break;

            case 'weather':
                sendTextMessage(senderID, "Here's the weather: http://www.forecast.io");
                break;
            case 'nearby':
                sendTextMessage(senderID, "Sorry, I can't find nearby busses yet.");

            default:
                console.log(messageText);

                var options = {
                    url: ('http://api.translink.ca/rttiapi/v1/stops/' + messageText + '?apikey=nK9aHp8kThROoJjNpcO3'),
                    headers: {
                        'accept': 'application/JSON'
                    }
                };

                var Estimates = {
                    url: ('http://api.translink.ca/rttiapi/v1/stops/' + messageText + '/estimates?apikey=nK9aHp8kThROoJjNpcO3&count=3&timeframe=120'),
                    headers: {
                        'accept': 'application/JSON'
                    }
                };

                request(options, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var info = JSON.parse(body);
                        
                        var date = new Date();
                        var utcDate = new Date(date.toUTCString());
                        utcDate.setHours(utcDate.getHours()-8);
                        var usDate = new Date(utcDate);
                      
                        var hours = usDate.getHours();
                        var minutes = usDate.getMinutes();

                      
                        sendTextMessage(senderID, "The current time is " + hours + ":" + minutes);
                        sendTextMessage(senderID, messageText + " is at " + info.Name + " in " + info.City + ". Buses include " + info.Routes + ".");

                      
                        request(Estimates, function(error, response, body) {
                            if (!error && response.statusCode == 200) {
                                var info = JSON.parse(body);
                                
                                
                    
                                var leave1 = info[0].Schedules[0].ExpectedLeaveTime;
                                var leave2 = info[0].Schedules[1].ExpectedLeaveTime;
                              
                                sendTextMessage(senderID, "The next bus for " + messageText + " leaves at " + leave1 + " then at, " + leave2);
                            }
                        });

                    } else {
                        sendTextMessage(senderID, "Please provide a valid bus stop. Say 'help' for assistance. ")
                      }
                });
        }


    } else if (messageAttachments) {

        messageAttachments.forEach(function(messageAttachment) {
            var attachmentUrl = messageAttachment.payload.url;
            console.log("Received Attachment");
            sendTextMessage(senderID, attachmentUrl);
        })
    }
}




function sendGenericMessage(recipientId, messageText) {
    sendTextMessage(recipientId, "What did you just call me?")
}

function sendHelpMessage(recipientId) {
    sendTextMessage(recipientId, "Here's what I can do: 1. Help with the weather ('weather') 2. Get bus stops for Vancouver BC. All I need is the bus stop number. ('51048') ");
}




module.exports.recievedMessage = recievedMessage;