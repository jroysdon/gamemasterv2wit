'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, registry, cb) {

  console.log("intentData : ");
  console.log(intentData);

    if(intentData.primary[0].value !== 'help')
        return cb(new Error(`Expected Help intent, got ${intentData.primary[0].value}`));
    //
    //
    // const service = registry.get('help');
    // if(!service) return cb(false, 'No help service available');
    //
    // request.get(`http://${service.ip}:${service.port}/service/${service}`, (err, res) => {
    //     if(err || res.statusCode != 200 || !res.body.result) {
    //         console.log(err);
    //         return cb(false, `I had a problem finding the help file}`);
    //     }
    //
    var        helpBody = `I am still very young GameBot and am learning new things all the time. `
    helpBody = helpBody + `Right now I can help *find games* (_by players_, _by play time_, or _by publisher_),`;
    helpBody = helpBody + `or *tell you about games*.\n`;
    helpBody = helpBody + `Later, I will be able to help schedule games, look for players, or , add them to your play list,`;
    helpBody = helpBody + `or the general library, and tell you about FLGS and other places to play games at. `;
    helpBody = helpBody + `Here are just a few ways you can interact with me:\n`;
    helpBody = helpBody + `• Tell me about Splendor _(or some other title)_\n`;
    helpBody = helpBody + `• Find me a game the players in 2-3 hours _(play times are in minutes, but I am smart enough to convert)_\n`;
    helpBody = helpBody + `• Find me a game for 2-4 players _(I can look up solo player games too)_\n`;
    helpBody = helpBody + `• Find me a game published by Asmodee _(or some other publisher)_\n`;
    //helpBody = helpBody + `• \n`;
        return cb(false, helpBody);
//    });
}
