var sendTextMesage = require('./sendMessage.js').sendTextMessage;



var recievedMessage = function (event) {
  
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  var raw_message = message.text;
  
  var messageText = raw_message.toLowerCase();
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

      default:
        sendTextMesage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMesage(senderID, "Message with attachment received");
  }
}


function sendGenericMessage(recipientId, messageText) {
  sendTextMessage(recipientId, "What did you just call me?")
}

function sendHelpMessage(recipientId) {
  sendTextMessage(recipientId, "Seems like you need help! Say 'help' for assistance!");
}

module.exports.recievedMessage = recievedMessage;