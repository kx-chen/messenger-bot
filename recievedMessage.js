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

                request(options, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var info = JSON.parse(body);

                        console.log(info.Name);
                        console.log(typeof(body));
                      
                        sendTextMessage(senderID, messageText + " is at " + info.Name + " in " + info.City + ". Buses include " + info.Routes);

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