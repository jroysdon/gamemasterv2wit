'use strict';
const _ = require("lodash");

const {Game} = require("../components/game");

// -----------------------------------------------------------------------------
// ----------- Replace Range with Parameters
// -----------------------------------------------------------------------------
var range = '2-4';

module.exports = function findPlayers(range) {
  return new Promise((resolve, reject) => {

var min = 0;
var max = 0;
var rangeExtended = _.split(range, '-', 2);
// console.log("RE: ", rangeExtended);
if (rangeExtended.length == 1) {
  min = rangeExtended[0];
  max = rangeExtended[0];

} else {
  min = rangeExtended[0];
  max = rangeExtended[1];
}
// -----------------------------------------------------------------------------
// ----------- Lookup range in Mongo Database via custom GAME function
// -----------------------------------------------------------------------------

var gameLU = new Game();
gameLU.findByPlayers(min,max).then(
  function(LU){
    if (_.isEmpty(LU)){
      console.log(`I ain't found sh!t that plays ${min} to ${max} players.`);
      reject(`I ain't found sh!t that plays ${min} to ${max} players.`);
    } else {
      var s = '';
      if (LU.length > 1){s = 's'};
      console.log(`I found ${LU.length} game${s} which plays ${min} to ${max} players.` );
      resolve(LU);
    }
  }
);
})
};
