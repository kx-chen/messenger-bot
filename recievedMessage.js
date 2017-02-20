var sendTextMessage = require('./sendMessage.js').sendTextMessage;



var recievedMessage = function (event) {
  
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
      case 'generic':
        sendGenericMessage(senderID);
        break;
        
      case 'fuck you':
        sendGenericMessage(senderID);
        break;
      
      case 'help':
        sendHelpMessage(senderID);
        break;
      
      case 'weather':
        sendTextMessage(senderID, "Here's the weather: http://www.forecast.io")
        break;

      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    
    messageAttachments.forEach( function (messageAttachment)  {
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
  sendTextMessage(recipientId, "Here's what I can do: 1. Help with the weather ('weather') ");
}

module.exports.recievedMessage = recievedMessage;