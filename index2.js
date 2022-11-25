// index2.js

const { nextISSTimesForMyLocation } = require('./iss_promised');

// see index.js for printPassTimes
// copy it from there, or better yet, moduralize and require it in both files
const printPassTimes = function(passTimes) {
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

nextISSTimesForMyLocation()  // call the function
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log(`It didn't work: `, error.message);
  });

