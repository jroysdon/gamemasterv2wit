'use strict';

//const request = require('superagent');
const _ = require('lodash');
const he = require('he');

var findPublisher = require('../primaries/findPublisher');


module.exports.process = function process(intentData, registry, cb) {

   console.log("intentData : ");
   console.log(intentData);

    if(intentData.primary[0].value !== 'publish')
        return cb(new Error(`Expected publish intent, got ${intentData.primary[0].value}`));

        console.log("---- publisher : ");
        console.log(intentData.publisher[0].value);


    if(!intentData.publisher) return cb(new Error('Sorry, I am not sure what publisher you are wanting me to find.'));
     const publisher = intentData.publisher[0].value

    findPublisher(publisher).then(
        function (games,  reject) {
          console.log("REJECT :", reject);
         if (reject){
           return cb(false, `Err: ${reject}`);
         }
         console.log("-=- Found Games: ", games.length);
         var g = 'games';
         if (games.length == 1) {
           g = 'game'
         };
         var body = `I found *${games.length}* ${g} published by *${publisher}*.\n`;
         body = body + `They are:\n`;
         games.forEach(function(game) {
           body = body + `• *${game.name}* (${game.yearPublished}): Plays between ${game.minPlayers} and ${game.maxPlayers} layers in about ${game.playingTime} Minutes\n`;
         });
         if (games.length <= 5) {
           body = body + `*Note:* _There may be more. I am adding to my repetoire daily._`
         }
        return cb(false, body);
       })
       .catch(
       // Log the rejection reason
      (reason) => {

           console.log(`REASON: ${reason}....${gameTitle} not found`);
           return cb(false, `:white_frowning_face: I had a problem finding the game title: ${gameTitle}`);
       });

}
