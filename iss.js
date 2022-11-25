/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 * endpoint to return IPv4 IP address in JSON format 'https://api.ipify.org?format=json'
 - returns {"ip":"216.232.190.69"}
 * retrieve current IP: https://www.whatismyip.com/
 * retrieve long/lat coordinates: http://ipwho.is/${YOUR IP}
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
    // parse and extract the IP address and pass that through to                                                                                the callback
    const ip = JSON.parse(body);
    callback(null, ip);
  });
};

// FUNCTION TO FETCH COORDINATES BY IP
// In the function, make the request to the API, and have it pass back the relevant (lat/lng) data as an object via callback.
const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip.ip}`, (error, response, body) => {
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

// FUNCTION TO FETCH THE NEXT ISS FLYOVERS FOR OUR GEO COORDINATES
// Input: latitude/longitude pair, altitude (optional), how many results to return (optional)
// Output: same inputs, time stamp when the API ran, success/failure msg, list of passes
/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // if we get here, we sucessfully got the data
    // parse the returned body so we can check its information
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

// Implement one primary function that index.js can call
/**
 * This function orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coordinates, (error, nextPass) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPass);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };  //don't need to export other function since we are not testing it right now
