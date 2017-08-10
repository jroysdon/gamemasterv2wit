'use strict';

//const request = require('superagent');
const _ = require('lodash');


module.exports.process = function process(intentData, registry, cb) {

   console.log("intentData : ");
   console.log(intentData);

    if(intentData.primary[0].value !== 'find')
        return cb(new Error(`Expected FIND intent, got ${intentData.intent[0].value}`));

        console.log("---- search_query : ");
        console.log(intentData.search_query[0].value);

     if(!intentData.search_query) return cb(new Error('Missing game title in gametitle intent'));
    //
    // // const gameTitle = intentData.location[0].value.replace(/,.?gamemaster/i, '');
    // // const gameTitle = intentData.search_query[0].value
    //
    // console.log("gameTitle : " + gameTitle);
    //
    // const service = registry.get('gameTitle');
    // if(!service) return cb(false, 'No Game Title service available');
    //
    // request.get(`http://${service.ip}:${service.port}/service/${gameTitle}`, (err, res) => {
    //     if(err || res.statusCode != 200 || !res.body.result) {
    //         console.log(err);
    //         return cb(false, `I had a problem finding the game title: ${gameTitle}`);
    //     }


    // var secondIntent = intentData.intent[0];
    //
    //
    //
    //     var strRange = '1';
    //     var max = 0;
    //     if (intentData.number.length > 1){
    //       var min = intentData.number[0].value;
    //       if (intentData.number[1].value < 0){
    //         max = intentData.number[1].value * -1;
    //       } else {
    //          max = intentData.number[1].value;
    //       }
    //       strRange = min + '-' + max
    //     } else {
    //         strRange = intentData.number[0].value;
    //     }
    //
    //
    //
    //      return cb(false, `I will search for a game that plays ${strRange} player(s)`);
  //  });
}
