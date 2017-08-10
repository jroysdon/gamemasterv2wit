'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, registry, cb) {

   console.log("intentData : ");
   console.log(intentData);

    if(intentData.intent[0].value !== 'like')
        return cb(new Error(`Expected like intent, got ${intentData.intent[0].value}`));

   return cb(false, `Wow, you like ${intentData.search_query[0].value}, so do I`);
}
