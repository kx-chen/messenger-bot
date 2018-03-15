// Postback is the event that happens when a user clicks on a menu option
// This file responds to a postback event
var sendLocationOption = require('./sendMessage.js');
var sendHelpMessage = require('./recievedMessage.js');
var sendResults = require('./sendResults.js');

var recievedPostback = function(event) {
  // event is the data from facebook's api
    console.log(event);
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
  
  // message text from postback is stored in the payload key
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
        
      case 'Get Started':
        sendLocationOption.sendTextMessage(senderID, "Welcome to Next Bus! \n \nTo get info on a bus stop, simply say its 5-digit ID. (eg: 51048)");
        break;                   
    }
}
module.exports.recievedPostback = recievedPostback;
