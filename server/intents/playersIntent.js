'use strict';

const request = require('superagent');

var findPlayers = require('../primaries/findPlayers');

module.exports.process = function process(intentData, registry, cb) {

  //  console.log("intentData : ");
  //  console.log(intentData);

    if(intentData.primary[0].value !== 'players')
        return cb(new Error(`Expected Players intent, got ${intentData.primary[0].value}`));

        // console.log("---- Range : ");
        // console.log(intentData.range[0].value);

        if (!intentData.range[0].value) return cb(new Error('Missing rangeValue in Duration intent'));

        const range = intentData.range[0].value;
        findPlayers(range).then(
            function(games, reject) {
              console.log("REJECT :", reject);
              if (reject) {
                return cb(false, `Err: ${reject}`);
              }

              console.log("-=- Found Games: ", games.length);
              var g = 'games';
              if (games.length == 1) {
                g = 'game'
              };
              var body = `I found *${games.length}* ${g} which can play between  in *${range} players*.\n`;
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

              console.log(`REASON: ${reason}.... not found`);
              return cb(false, `:white_frowning_face: I had a problem finding the game that plays in *${range}* players`);
            }
          );
}
