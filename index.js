// index.js

const { fetchISSFlyOverTimes } = require('./iss');

const exampleCoords = { latitude: '49.2488091', longitude: '-122.9805104' };

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log(`It didn't work!`, error);
    return;
  }
  console.log(`It worked! Returned flyover times:`, passTimes);
});


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
