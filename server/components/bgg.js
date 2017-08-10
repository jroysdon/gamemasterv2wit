'use strict';

const express = require('express');
const service = express();
const request = require('superagent');
const parser = require('xml2json');
const _ = require("lodash");

function bgg(name){
  const gameTitle = name;
  // console.log("Search BGG via XML for :", gameTitle);
  return new Promise(
    function (resolve,reject){

    request.get('https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&exact=1&query=' + gameTitle,
        (err, response) => {
            if (err) {
                console.log(err);
                //return res.sendStatus(404);
                reject ( res.sendStatus(404));
            }
console.log("RES.TEXT : ", response.text);
            const SR = JSON.parse(parser.toJson(response.text));
console.log("SR :", SR);
//console.log(SR.items.item.id);
//             const BG = SR.boardgames;
// console.log("BG : ",BG);
//             const BGS = BG.boardgame;
// console.log("BGS :", BGS);
            // const BGSF = _.filter(BGS, { 'primary': true});
            // console.log("------------------------BGSF :\n", BGSF);
            //
            // res.json({
            //     result: `${BGS[0].objectid}`
            // });
            var ttl = Number(SR.items.total);
            console.log("TTL :", ttl);
            console.log("TYPEOF : ", typeof ttl);
            if (ttl == 1 && SR.items.item.id > 0 ){
               console.log("FOUND ID :", SR.items.item.id);
              resolve( `${SR.items.item.id}`);
            } else if(ttl > 1){
                console.log("SR > 1 : ",SR.items.item[0].id);
              resolve(SR.items.item[0].id);
            } else {
              reject('Not Found');
          }
        });
      }
    )
}

module.exports = bgg;
