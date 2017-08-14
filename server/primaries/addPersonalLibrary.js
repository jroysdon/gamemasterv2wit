'use strict';
const _ = require("lodash");

const {PersonalLibrary} = require("../components/personalLibrary");

// -----------------------------------------------------------------------------
// ----------- Replace Channel and User with Parameters
// -----------------------------------------------------------------------------
var channel = 'C4KKDTP51';  // from SLACK
var user =  'U4KMEKTC2';    // from SLACK

var gameId = 157354;

// -----------------------------------------------------------------------------
// ----------- Lookup range in Mongo Database via custom GAME function
// -----------------------------------------------------------------------------

var pLib = new PersonalLibrary();
pLib.like(user, gameId, function(LU){

  }
);
