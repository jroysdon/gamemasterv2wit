'use strict';
const _ = require("lodash");

const {Game} = require("../components/game");

// -----------------------------------------------------------------------------
// ----------- Replace Range with Parameters
// -----------------------------------------------------------------------------
//var range = '9-10';

module.exports = function findDuration(range) {
  return new Promise((resolve, reject) => {

    var min = 0;
    var max = 0;
    var rangeExtended = _.split(range, '-', 2);
    console.log("RE: ", rangeExtended);
    if (rangeExtended.length == 1) {
      min = rangeExtended[0];
      if (min < 11) {
        min = min * 60;
      }
    } else {
      min = rangeExtended[0];
      if (min < 11) {
        min = min * 60;
      }
      max = rangeExtended[1];
      if (max < 12) {
        max = max * 60;
      }
    }
    // -----------------------------------------------------------------------------
    // ----------- Lookup range in Mongo Database via custom GAME function
    // -----------------------------------------------------------------------------

    var gameLU = new Game();
    gameLU.findByDuration(min, max).then(
      function(LU) {
        if (_.isEmpty(LU)) {
          console.log(`I ain't found sh!t that runs ${min} to ${max} minutes.`);
          reject(`I ain't found sh!t that runs ${min} to ${max} minutes.`);
        } else {
          console.log(`I found ${LU.length} games which run ${min} to ${max} minutes.`);
          resolve(LU);
        }
      }
    );
  })
};
