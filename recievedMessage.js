var sendTextMessage = require('./sendMessage.js').sendTextMessage;
var request = require('request');
var Estimates = require('./requests.js').Estimates;
var Options = require('./requests.js').Options;

var getBusResults = require('./sendResults.js').getBusResults;

var sendTypingIndicator = require('./sendMessage.js').sendTypingIndicator;



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
        var messageTexts = messageText.toLowerCase();
      
      sendTypingIndicator(senderID, "typing_on");
      
        switch (messageTexts) {

            case 'hello':
            case 'hey':
            case 'hi':
                sendTextMessage(senderID, "Hey there!");
            sendTypingIndicator(senderID, "typing_off");
                break;
            
            case 'get started':
                sendTextMessage(senderID, "Welcome to Next Bus! \n \nTo get info on a bus stop, simply say its 5-digit ID. (eg: 51048)");
            sendTypingIndicator(senderID, "typing_off");
                break;
            
            case 'help':
            case 'sos':


                sendHelpMessage(senderID);
            sendTypingIndicator(senderID, "typing_off");
                break;

            case 'weather':
                sendTextMessage(senderID, "Here's the weather: http://www.forecast.io");
            sendTypingIndicator(senderID, "typing_off");
                break;
            case 'nearby':
                sendTextMessage(senderID, "Sorry, I can't find nearby busses yet.");
            sendTypingIndicator(senderID, "typing_off");
                break;
            
          case 'on':
            sendTypingIndicator(senderID, "typing_on");
          //  sendTextMessage(senderID, "hello");
            break;

            default:
            getBusResults(messageTexts, senderID);
            sendTypingIndicator(senderID, "typing_off");
           

        }


    } else if (messageAttachments) {

        messageAttachments.forEach(function(messageAttachment) {
            var attachmentUrl = messageAttachment.payload.url;
            console.log("Received Attachment");
            sendTextMessage(senderID, attachmentUrl);
        })
    }
}




function sendHelpMessage(recipientId) {
    sendTextMessage(recipientId, "Here's what I can do: \n\n1. Help with the weather ('weather') \n\n2. Get bus stops for Vancouver BC. All I need is the bus stop number. ('51048')");
}




module.exports.recievedMessage = recievedMessage;