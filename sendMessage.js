// contains functions to call facebook api. also contains json to send back to user for structured replies

// Contains sendTextMessage, callSendAPI, sendTypingIndicator, and sendText
var request = require('request');
// sends back text message
var sendTextMessage = function (recipientId, messageText) {
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

// Calls the Facebook send API with the proper data
function callSendAPI (messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: "EAAFT3pkXjN0BAJv0B10wSwANrRqmZAh9fGhwyVBLEkq6yhyMhsZCldC3VyQ6Q7IbyJcq0udhfuUTn9DJ3TBHiG7N9hcKYrYTZCZCvxC2JNxt1V5tJBN1ex5rTID5S5a8bOdA4glR8L2gZACJmc6wiSxdEldp4omSkCwn7cpsvjgZDZD"},
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

// used for telling the messenger app that the app is working on a request...
var sendTypingIndicator = function(recipientID, typing) {
  var typingData = {
    "recipient":{
          "id":recipientID
    },
    
    "sender_action": typing 
  }
  callSendAPI(typingData);
}

// Constructs location json data to be sent
var sendLocationOption = function(recipientID) {
 var LocationData = {
    "recipient":{
          "id":recipientID
    },
    
     "message":{
    "text":"Please share your location:",
    "quick_replies":[
      {
        "content_type":"location",
      }
    ]
  }
   
  }
 callSendAPI(LocationData)
}

var sendStucturedCards = function(recipientID) {
  var data = {
    "recipient": {
      "id": recipientID
    },
    "message" : {
      
    }
  }
}

// https://developers.facebook.com/docs/messenger-platform/send-api-reference/list-template
module.exports.sendLocationOption = sendLocationOption;
module.exports.sendTextMessage = sendTextMessage;
module.exports.sendTypingIndicator = sendTypingIndicator;
