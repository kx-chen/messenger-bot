var sendTextMessage = require('./sendMessage.js');

var sendHelpMessage = function(senderID) {
  sendTextMessage.sendTextMessage(senderID,"Here's what I can do: \n\n1. Help with the weather ('weather') \n\n2. Get bus stops for Vancouver BC. All I need is the bus stop number. ('51048')");
  
}

module.exports.sendHelpMessage = sendHelpMessage;