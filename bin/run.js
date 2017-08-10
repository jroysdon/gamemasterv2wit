'use strict';

require ('../server/config/config');

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const witToken = process.env.WITTOKEN;
const witClient = require('../server/witClient')(witToken);

const slackToken = process.env.SLACKTOKEN;
const slackLogLevel = process.env.SLACKLOGLEVEL;

const serviceRegistry = service.get('serviceRegistry');


// portNumber = process.env.PORT;

const rtm = slackClient.init(slackToken, slackLogLevel, witClient, serviceRegistry);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
    console.log(`GameMaster is listening on ${server.address().port} in ${service.get('env')} mode.`);
});
