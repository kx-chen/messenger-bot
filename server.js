// Starting point file

var request = require('request');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var helpers = require('ejs-helper');

var recievedPostback = require('./recievedPostback.js');

var sendMessage = require('./sendMessage.js');
var sendTextMessage = require('./sendMessage.js').sendTextMessage;
var recievedMessage = require('./recievedMessage.js').recievedMessage;

bodyParser.urlencoded();
app.use(bodyParser.json({'extended': true})); 
app.set('view engine', 'ejs');
app.use(express.static('public'));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.render('index', {title: "Home"});
  
});

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === "kaichen") {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});

// Gets called when a message is sent to the /webhook url

app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple 
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        
        // Mark the message as seen on the user's side
        sendMessage.sendTypingIndicator(event.sender.id, "mark_seen");
        
        if (event.message) {
          // Sends over to the recievedMessage function
          recievedMessage(event);
          
        } else if (event.postback) {
          
          // Called when the user clicks on a menu button
            recievedPostback.recievedPostback(event);
          
        } else {
          console.log("Webhook received unknown event: ", event);
          
        }
      });
    });
    // Required to send 200 to indicate all went well
    res.sendStatus(200);
  }
});

app.get('/privacy-policy', function(req, res) {
  res.render('privacy-policy', {title: "Privacy Policy"});
});

// Good morning wakeup calls
app.get('/send/:password', function(req, res) {
  
  if (req.params.password == 'kaichen') {
  var message = "GOOD MORNING! RISE AND SHINE FOR A BEAUTIFUL DAY 1/2!!! \nKAI CHEN REQUESTS THAT YOU GET OUT OF BED!!!";
  
  // Steven's ID
  sendTextMessage("1211307408984374", message);
  sendTextMessage("1211307408984374", message);
    
  // Kai's ID
  // sendTextMessage("1219226384779598", message);
  // sendTextMessage("1219226384779598", message);
    
  var error = " No Error Occured.\n  password was correct. messages were sent. ";
    
    
  } else {
     var error = " AN ERROR OCCURED!!!!! \nPassword is incorrect.  Messages were not sent.";
    res.sendStatus(401);
  }
  
  res.render("send", {title: "Daily Message Sender", error: error});
});

app.get('/send', function(req, res) {
  var error = "AN ERROR OCCURED!!! Password is incorrect.  Messages were not sent. Error was logged. To attempt a password, entry it in the URL: http://jet-promotion.gomix.me/send/<yourpasswordguess>. No <>'s";
  res.render("send", {title: "Daily Message Sender", error: error});
});

app.get('/feedback', function(req, res) {
  
  res.render('feedback', {title: "Feedback"} );
  
});

app.get('/data', function(req, res) {
  res.sendFile(__dirname + '/views/files.json');
});

// listen for requests 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
