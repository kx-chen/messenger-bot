var request = require('request');

var sendText = function (recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
};


function callSendAPI (messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: "EAAFT3pkXjN0BAMqbN0Mpw9wo90E5dsMY6g8184AqtUL6keUnUi0ZBm8yIYlWWN3m8RZAx2Pij3ufLzHR47gFEvX4OU2PB1CqrLSDN4xBbcFVlcZBVLUhz5SC0zyVpzqTdt2W9CEuCLgMvPYKToQ9IGv4BsAeGQ4ZCtY5x1BVPAZDZD"},
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
};


module.exports.sendTextMessage = sendText;
