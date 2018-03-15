// This file responds to a standard text, attachment and location messages
// request module - used to make http requests to translink's and facebook's apis
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
  // event is the json data passed from Facebook to us
    console.log(event);
  // collect the users's id, timestamp, and message text
    var senderID = event.sender.id;
    console.log(senderID);
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
  
  // save into db...
    var message = event.message;
    console.log("Received message for user %d and page %d at %d with message:",senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));
    var messageId = message.mid;
  
// Gets the message's text
    var messageText = message.text;

// Gets the attachments in the messages (images, locations, stickers, etc)
    var messageAttachments = message.attachments;

  // Switch statement to respond to text message
    if (messageText) {
        var messageTexts = messageText.toLowerCase();
    
      // send back typing on indicator to user
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
         
                break;
            
           case 'get started':
              sendTextMessage(senderID, "Welcome to Next Bus! \n \nTo get info on a bus stop, simply say its 5-digit ID. (eg: 51048)");
            
                break;
            
            case 'help':
            case 'sos':


                sendHelpMessage(senderID);
           
                break;

            case 'weather':
                sendTextMessage(senderID, "Here's the weather: http://www.forecast.io");
            
                break;
            case 'nearby':
          sendLocationOption(senderID);            
        
                break;
            
          case 'on':
            sendTypingIndicator(senderID, "typing_on");
          //  sendTextMessage(senderID, "hello");
            break;
            // :(
          case 'fuck you':
            
            sendTextMessage(senderID, "Fuck you too");
        
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
            
          // get bus results
            default:
            getBusResults(messageTexts, senderID);
        }

    } else if (messageAttachments) {
      
    // if attachment is location - then send back nearby stops  
      if (messageAttachments[0].type == 'location') {
        var lat = messageAttachments[0].payload.coordinates.lat;
        var long = messageAttachments[0].payload.coordinates.long;
        getLocationResults(senderID, lat, long);
        // if it isn't a location, it HAS to be an image/sticker
      } else {
        // send back the attachment's url 
        messageAttachments.forEach(function(messageAttachment) {
        var attachmentUrl = messageAttachment.payload.url;
        console.log("Received Attachment");
        sendTextMessage(senderID, attachmentUrl);
          
        })
      }
      
    } 
  // set typing indicator off
  sendTypingIndicator(senderID, "typing_off");
}

// sendHelpMessage - sends the generic help message
var sendHelpMessage = function (recipientId) {
    sendTextMessage(recipientId, "Here's what I can do: \n\n1. Help with the weather ('weather') \n\n2. Get bus stops for Vancouver BC. All I need is the bus stop number. ('51048')");
}

module.exports.sendHelpMessage = sendHelpMessage;
module.exports.recievedMessage = recievedMessage;
