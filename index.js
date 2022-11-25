// index.js

const { nextISSTimesForMyLocation } = require('./iss');
/**
 * Input:
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns:
 *   undefined
 * Sideffect:
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */

const printPassTimes = function(passTimes) {
  // loop through array to retrieve data
  for (let pass of passTimes) {
    let dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    let duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});


// const exampleCoords = { latitude: '49.2488091', longitude: '-122.9805104' };

// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) {
//     console.log(`It didn't work!`, error);
//     return;
//   }
//   console.log(`It worked! Returned flyover times:`, passTimes);
// });


// TEST CODES

// fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
//   if (error) {
//     console.log(`It didn't work! Could not retrieve coords!`, error);
//     return;
//   }
//   console.log(`It worked! Returned coordinates:`, coordinates);
// });


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });
