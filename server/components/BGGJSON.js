'use strict';

const express = require('express');
const service = express();
const request = require('superagent');
const parser = require('xml2json');
const _ = require("lodash");

function bggJSON(id){
  const gameID = id;
  // console.log("Search BGG via XML for :", gameTitle);
  return new Promise(
    function (resolve,reject){

    request.get('https://bgg-json.azurewebsites.net/thing/' + gameID,
        (err, response) => {
            if (err) {
                console.log(err);
                //return res.sendStatus(404);
                reject ( res.sendStatus(404));
            }
            if (response.text != '' ){
              // console.log("FOUND ID :", BGS[0].objectid);
              resolve( JSON.parse(response.text));
            } else {
              reject('Not Found');
            }
        });
      }
    )
}

module.exports = bggJSON;
