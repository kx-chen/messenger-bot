var request = require('request');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var helpers = require('ejs-helper');



var sendMessage = require('./sendMessage.js');
var sendTextMessage = require('./sendMessage.js').sendTextMessage;
var recievedMessage = require('./recievedMessage.js').recievedMessage;



bodyParser.urlencoded();
app.use(bodyParser.json()); 
app.set('view engine', 'ejs');
app.use(express.static('public'));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.render('index', {title: "Home"});
  
});






app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === "dogs_are_cools") {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});






app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          recievedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });
    res.sendStatus(200);
  }
});
  


app.get('/privacy-policy', function(req, res) {
  res.render('privacy-policy', {title: "Privacy Policy"});
});





app.get('/send', function(req, res) {
  
  var message = "GOOD MORNING! RISE AND SHINE FOR A BEAUTIFUL DAY 1/2!!! \nKAI CHEN REQUESTS THAT YOU GET OUT OF BED!!!";
//   // Steven's ID
//   sendTextMessage("1211307408984374", message);
//   sendTextMessage("1211307408984374", message);
//   // Below is my ID
//   sendTextMessage("1219226384779598", message);
//   sendTextMessage("1219226384779598", message);
  
  res.render("send", {title: "Daily Message Sender"});
});






// listen for requests 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
