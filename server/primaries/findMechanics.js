'use strict';
const _ = require("lodash");

const {Game} = require("../components/game");

// -----------------------------------------------------------------------------
// ----------- Replace Mechanics with Parameters
// -----------------------------------------------------------------------------
var mechs = ["Dice","Card Drafting"];

// -----------------------------------------------------------------------------
// ----------- Lookup range in Mongo Database via custom GAME function
// -----------------------------------------------------------------------------

var gameLU = new Game();
gameLU.findByMechanics(mechs).then(
  function(LU){
    if (_.isEmpty(LU)){
      console.log(`I ain't found sh!t that plays with ${mechs} mechanics.`);
    } else {
      var s = '';
      if (LU.length > 1){s = 's'};
      console.log(`I found ${LU.length} game${s} which plays with ${mechs} mechanics.` );
    }
  }
);
