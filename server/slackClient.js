'use strict';

const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const _ = require('lodash');

let rtm = null;
let nlp = null;
let registry = null;

function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function handleOnMessage(message) {
console.log("MESSAGE : ", message);
    if (message.text && message.text.toLowerCase().includes('gamemaster')) {
        const msg = _.replace(message.text, 'gamemaster','');
        console.log('MSG : ',msg);
        nlp.ask(msg, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
// console.log("RESPONSE :" , res);
            try {
                if(!res.primary || !res.primary[0] || !res.primary[0].value) {
                    throw new Error("Could not extract intent.")
                }
                console.log("RESPONSE :" , res);
                console.log("INTENT : ",res.primary[0].value);
                // res.primary = _.orderBy(res.primary, ['confidence', 'value', 'type'], ['desc']);
                // console.log("SORTED INTENT : ",res.primary);

                const intent = require('./intents/' + res.primary[0].value + 'Intent');

                intent.process(res, registry, function(error, response) {
                    if(error) {
                        console.log("ERROR : ",error.message);
                        return rtm.sendMessage("<@" + message.user + ">, "  + error.message, message.channel);
                        //return new Error(error.message);
                    }
                    return rtm.sendMessage("<@" + message.user + ">, "  + response, message.channel);
                })

            } catch(err) {
                 console.log("ERROR : ",err);
                 console.log("RESPONSE : ",res);
                rtm.sendMessage("Sorry, I don't know what you are talking about!", message.channel);
            }

        });
    }

}

function addAuthenticatedHandler(rtm, handler) {
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}


module.exports.init = function slackClient(token, logLevel, nlpClient, serviceRegistry) {
    rtm = new RtmClient(token, { logLevel: logLevel });
    nlp = nlpClient;
    registry = serviceRegistry;
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;
