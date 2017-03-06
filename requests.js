// Contains the JSON request data to be sent



// JSON data for info about the stop
var Options = function(messageTexts) {

    var theObject = {
        url: ('http://api.translink.ca/rttiapi/v1/stops/' + messageTexts + '?apikey=nK9aHp8kThROoJjNpcO3'),
        headers: {
            'accept': 'application/JSON'
        }
    };
    return theObject;
}



// JSON data for estimates of arrival times
var Estimates = function(stopNumber, routeNo) {

    var Object = {
        url: ('http://api.translink.ca/rttiapi/v1/stops/' + stopNumber + '/estimates?apikey=nK9aHp8kThROoJjNpcO3&count=3&routeNo=' + routeNo),
        headers: {
            'accept': 'application/JSON'
        }
    };
    return Object;
}


// JSON data for bus stops based off of location
var LocationData = function(lat, long) {

    return {
        // Coordinates of lat and long cannot exceed 5 decimal places
        url: ('http://api.translink.ca/RTTIAPI/V1/stops?apiKey=nK9aHp8kThROoJjNpcO3&lat=' + lat + '&long=' + long),
        headers: {
            'accept': 'application/JSON'
        }
    }


}


// Export the functions as modules
module.exports.LocationData = LocationData;
module.exports.Estimates = Estimates;
module.exports.Options = Options;