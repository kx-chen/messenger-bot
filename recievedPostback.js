var sendLocationOption = require('./sendMessage.js');
var sendHelpMessage = require('./recievedMessage.js');

var recievedPostback = function(event) {
  
    
  
    console.log(event);
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
  
    var message = event.postback.payload;
  
  
    console.log("Received message for user %d and page %d at %d with message:",
        senderID, recipientID, timeOfMessage);
  
    console.log(JSON.stringify(message));
  
  
  
  
    switch (message) {
      
      case ('nearby'):
        sendLocationOption.sendLocationOption(senderID);
        break;
        
      case ('help'): 
        sendHelpMessage.sendHelpMessage(senderID);
        break;
        
      case 'acronyms':
        sendLocationOption.sendTextMessage(senderID, "FS = Far Side \nNS = Near Side \nNB = North Bound \nSB = South Bound");
        break;
                   
    
                   
    }
    
  
}

module.exports.recievedPostback = recievedPostback;
