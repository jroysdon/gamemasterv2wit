'use strict';
const _ = require("lodash");

const { Game} = require("../components/game");
const bgg = require("../components/bgg");
const bggJSON = require("../components/BGGJSON")

// -----------------------------------------------------------------------------
// ----------- Lookup Title in Mongo Database first
// -----------------------------------------------------------------------------
module.exports = function findTitle(titleLU) {
    return new Promise((resolve, reject) => {
        var gameLU = new Game();
        gameLU.findByName(titleLU).then(
          function(LU) {
            // -----------------------------------------------------------------------------
            // ------ This is working currently utilizing the BGG and BGGJSON libraries
            // -----------------------------------------------------------------------------

            //Not found in Mongo, Look up on BGG
            if (_.isEmpty(LU)) {
              console.log(`Did not Find ${titleLU} in MongoDB`);
              bgg(titleLU).then(
                function(ID) {
                  console.log("BBGID : ", ID);
                  bggJSON(ID).then(
                    function(bggGame) {
                      console.log("bggGame Object: ", bggGame);
                      // INSERT via Schema HERE
                      var game = new Game(bggGame);
                      game.save();
                      resolve (game);
                    },
                    function(err) {
                      console.log("This is all screwed up");
                      reject (err);
                    }
                  )
                },
                function(err) {
                  console.error('Error (XML): ' + err)
                  reject (err);
                }
              )
            } else {
              // it is in Mongo, present the game Data
              //console.log("FOUND :", LU)
              resolve (LU);
            }
          }
        );
      })
    };
