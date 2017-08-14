'use strict';

//const request = require('superagent');
const _ = require('lodash');
var findTitle = require('../primaries/findTitle');


module.exports.process = function process(intentData, registry, cb) {

   console.log("intentData : ");
   console.log(intentData);

    if(intentData.primary[0].value !== 'find')
        return cb(new Error(`Expected FIND intent, got ${intentData.intent[0].value}`));

        // console.log("---- search_query : ");
        // console.log(intentData.search_query[0].value);

    if(!intentData.search_query) return cb(new Error('Sorry, I am not sure what game you are wanting me to find.'));
    //
    // // const gameTitle = intentData.location[0].value.replace(/,.?gamemaster/i, '');
     const gameTitle = intentData.search_query[0].value
    //
    // console.log("-=-=-=-=-=-gameTitle : " + gameTitle);

    findTitle(gameTitle).then(
        function (game,  reject) {
          console.log("REJECT :", reject);
         if (reject){
           return cb(false, `Err: ${reject}`);
         }
         console.log("-=-=-=-=-=- Found Game: ", game);
         var playerRange = "";
         if (game.minPlayers != game.maxPlayers){
            playerRange = `between ${game.minPlayers} and ${game.maxPlayers} players`;
         } else {
           playerRange = ` ${game.minPlayers} players`;
         };
        var body = `${game.name} was published in ${game.yearPublished} and plays ${playerRange} and has a playing time of about ${game.playingTime} minutes.`
        return cb( body);
       })
       .catch(
       // Log the rejection reason
      (reason) => {

           console.log(`REASON: ${reason}....${gameTitle} not found`);
           return cb(false, `I had a problem finding the game title: ${gameTitle}`);
       });

}
