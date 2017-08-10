'use strict';
const _ = require("lodash");

const {Game} = require("../components/game");

// -----------------------------------------------------------------------------
// ----------- Replace Mechanics with Parameters
// -----------------------------------------------------------------------------
var publisher = "Steve Jackson Games";

// -----------------------------------------------------------------------------
// ----------- Lookup range in Mongo Database via custom GAME function
// -----------------------------------------------------------------------------

var gameLU = new Game();
gameLU.findByPublisher(publisher).then(
  function(LU){
    if (_.isEmpty(LU)){
      console.log(`I ain't found sh!t that ${publisher} produces.`);
    } else {
      var s = '';
      if (LU.length > 1){s = 's'};
      console.log(`I found ${LU.length} game${s} which ${publisher} produces.` );
    }
  }
);
