/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 * endpoint to return IPv4 IP address in JSON format 'https://api.ipify.org?format=json'
 - returns {"ip":"216.232.190.69"}
 */

// FUNCTION TO FETCH OUR IP ADDRESS
const request = require('request');
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // response.statusCode indicates the HTTPresponse code and we shoudl check it for a 200
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // if we get here, all's well and we got the data
    // parse and extract the IP address and pass that through to the callback
    const ip = JSON.parse(body);
    callback(null, ip);
  });
};

// FUNCTION TO FETCH COORDINATES BY IP
// In the function, make the request to the API, and have it pass back the relevant (lat/lng) data as an object via callback.
const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // parse the returned body so we can check its information
    const parsedBody = JSON.parse(body);
    // check if "success" is true or not
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    // if we get here, all's well and we got the data
    const {latitude, longitude} = parsedBody;

    callback(null, {latitude, longitude});
  });
};

module.exports = { fetchCoordsByIP };  //don't need to export other function since we are not testing it right now
