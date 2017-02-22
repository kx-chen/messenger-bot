var Options = function(messageTexts) {

var theObject = {
                    url: ('http://api.translink.ca/rttiapi/v1/stops/' + messageTexts + '?apikey=nK9aHp8kThROoJjNpcO3'),
                    headers: {
                        'accept': 'application/JSON'
                    }
                };
  return theObject;
}





var Estimates = function(messageTexts) {
  
var Object = {
                    url: ('http://api.translink.ca/rttiapi/v1/stops/' + messageTexts + '/estimates?apikey=nK9aHp8kThROoJjNpcO3&count=3&timeframe=120'),
                    headers: {
                        'accept': 'application/JSON'
                    }
                };
  return Object;
}

module.exports.Estimates = Estimates;
module.exports.Options = Options;