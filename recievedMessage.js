// This file contains the following functions: recievedMessage(event) and sendHelpMessage(recipientID)


// Modules
var request = require('request');

// requests.js
var Estimates = require('./requests.js').Estimates;
var Options = require('./requests.js').Options;


// sendMessage.js
var sendLocationOption = require('./sendMessage.js').sendLocationOption;
var sendTypingIndicator = require('./sendMessage.js').sendTypingIndicator;
var sendTextMessage = require('./sendMessage.js').sendTextMessage;


// sendReuslts.js
var getBusResults = require('./sendResults.js').getBusResults;
var getLocationResults = require('./sendResults.js').getLocationResults;



// RecievedMessage


var recievedMessage = function(event) {

    console.log(event);
    var senderID = event.sender.id;
    console.log(senderID);
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
          case 'hello!':
            case 'hello':
            case 'hey':
            case 'hi':
          case 'good morning':
          case 'morning':
          case 'how goes it':
          case 'heyo':
          case 'heya':
          case 'yo':
                sendTextMessage(senderID, "Hello, thanks for getting in touch. How can I help you?");
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
          sendLocationOption(senderID);            
            sendTypingIndicator(senderID, "typing_off");
                break;
            
          case 'on':
            sendTypingIndicator(senderID, "typing_on");
          //  sendTextMessage(senderID, "hello");
            break;
          case 'fuck you':
            
            sendTextMessage(senderID, "Fuck you too");
            sendTypingIndicator(senderID, "typing_off");
            break;
            
          case 'lmao':
          case 'lol':
            sendTextMessage(senderID, "Wow, I bet you're some sterotypical teen saying these 'lol' or 'lmao' hipster things. What a weirdo you are.");
            break;
            
          case 'kkk':
            sendTextMessage(senderID, "Please don't.");
            break;
            
          case 'thanks':
          case "thank you":
          case "yay":
          case "awesome":
          case "sweet":
          case "cool!":
          case "cool":
          case 'nice':
             sendTextMessage(senderID, "Glad you're happy :D");
            break;
            

            default:
            getBusResults(messageTexts, senderID);
            sendTypingIndicator(senderID, "typing_off");
           

        }


    } else if (messageAttachments) {
      
      if (messageAttachments[0].type == 'location') {
        var lat = messageAttachments[0].payload.coordinates.lat;
        var long = messageAttachments[0].payload.coordinates.long;
        
            getLocationResults(senderID, lat, long);
        
         
        
      } else {
        messageAttachments.forEach(function(messageAttachment) {
          
            var attachmentUrl = messageAttachment.payload.url;
            console.log("Received Attachment");
            sendTextMessage(senderID, attachmentUrl);
          
        })
      }
      
    } else {
      sendTextMessage(senderID, "Something on our side went wrong. Sorry about that. Send feedback here: http://jet-promotion.gomix.me/feedback");
    }
}






// sendHelpMessage - sends the generic help message


var sendHelpMessage = function (recipientId) {
    sendTextMessage(recipientId, "Here's what I can do: \n\n1. Help with the weather ('weather') \n\n2. Get bus stops for Vancouver BC. All I need is the bus stop number. ('51048')");
}






module.exports.sendHelpMessage = sendHelpMessage;
module.exports.recievedMessage = recievedMessage;