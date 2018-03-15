Welcome to Translink Bot
=========================

[About Translink Bot](https://jet-promotion.gomix.me/)


What does it do?
----------------

Facebook messenger bot for getting [Translink's](http://translink.ca) Next Bus data info. 

How does it work?
-----------------
1. `server.js` responds to a POST request from Facebook's API
2. `recievedMessage.js` or `recievedPostback.js` functions are called
3. Translink API is called from `recievedMessage.js` or `recievedPostback.js`, depending on the situation. The API call is stored in `sendResults.js`
4. `sendResults.js` gives the parsed JSON data back to `sendMessage.js` which sends it to the user.


\ ゜o゜)ノ !
