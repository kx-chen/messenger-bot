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
    qs: { access_token: "EAAFT3pkXjN0BAF9M2G09eZB1ZBZCzjFa8yzU2RUEIgffQlCQoKT5gAijrS5pAHgMZCjxzYw8YL6SkeymZCoiLRZCvg0YEPWBZCjLzbCGb5ryIZBLaXaS6pARafybRzCAQdjpBN6gQx2VZA9KeFmDGqVosAxAjhFetmJFHBnQVqt1tBQZDZD"},
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
