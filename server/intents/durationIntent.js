'use strict';

//const request = require('superagent');
const _ = require('lodash');
const he = require('he');

var findDuration= require('../primaries/findDuration');


module.exports.process = function process(intentData, registry, cb) {

    console.log("intentData : ");
    console.log(intentData);

    if (intentData.primary[0].value !== 'duration')
      return cb(new Error(`Expected duration intent, got ${intentData.primary[0].value}`));

    console.log("---- Range : ");
    console.log(intentData.range[0].value);

    if (!intentData.range[0].value) return cb(new Error('Missing rangeValue in Duration intent'));

    const range = intentData.range[0].value;
    findDuration(range).then(
        function(games, reject) {
          console.log("REJECT :", reject);
          if (reject) {
            return cb(false, `Err: ${reject}`);
          }

          console.log("-=- Found Games: ", games.length);
          var g = 'games';
          var p = 'play';
          if (games.length == 1) {
            g = 'game'
            p = 'plays'
          };
          var h = 'minutes';
          if (_.split(range, '-', 1) < 9) {
            h = 'hours';
          }
          var body = `I found *${games.length}* ${g} which ${p} in *${range} ${h}*.\n`;
          body = body + `They are:\n`;
          games.forEach(function(game) {
            body = body + `• *${game.name}* (${game.yearPublished}) - ${game.playingTime} Minutes\n`;
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
          return cb(false, `:white_frowning_face: I had a problem finding the game that plays in *${range}* minutes`);
        }
      );
    }
