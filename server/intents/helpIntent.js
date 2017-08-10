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
        return cb(false, `Right now I can help find games (by players or by time),\n I can help schedule games, look for players, or \n tell you about games, add them to your play list, or the general library. `);
//    });
}
