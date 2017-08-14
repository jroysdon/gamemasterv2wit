'use strict';

//const request = require('superagent');
const _ = require('lodash');
const he = require('he');

var findTitle = require('../primaries/findTitle');


module.exports.process = function process(intentData, registry, cb) {

   console.log("intentData : ");
   console.log(intentData);

    if(intentData.primary[0].value !== 'find')
        return cb(new Error(`Expected FIND intent, got ${intentData.intent[0].value}`));

        // console.log("---- search_query : ");
        // console.log(intentData.search_query[0].value);


    if(!intentData.search_query) return cb(new Error('Sorry, I am not sure what game you are wanting me to find.'));
     const gameTitle = intentData.search_query[0].value

    findTitle(gameTitle).then(
        function (game,  reject) {
          console.log("REJECT :", reject);
         if (reject){
           return cb(false, `Err: ${reject}`);
         }
         var playerRange = "";
         if (game.minPlayers != game.maxPlayers){
            playerRange = `between ${game.minPlayers} and ${game.maxPlayers} players`;
         } else {
           playerRange = ` ${game.minPlayers} players`;
         };
        var body = `:smile: *${game.name}* was published in ${game.yearPublished}. It plays *${playerRange}* and has a playing time of about *${game.playingTime} minutes*.\n`
        body = body + game.thumbnail + "\n";
        body = body + he.decode(game.description);
        return cb(false, body);
       })
       .catch(
       // Log the rejection reason
      (reason) => {

           console.log(`REASON: ${reason}....${gameTitle} not found`);
           return cb(false, `:white_frowning_face: I had a problem finding the game title: ${gameTitle}`);
       });

}
