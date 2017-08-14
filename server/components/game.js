require ('../config/config');

const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

const {boardgame} = require('../models/boardgame');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI + '/gameLists', { useMongoClient: true });

const gameSchema = mongoose.Schema(boardgame);

gameSchema.methods.findByName = function(title) {
  //console.log("TITLE: ",title);
  var game = this;
  return new Promise(
    function(resolve, reject) {
      Game.find({
        'name': title
      }).
      exec(function(err, bg) {
        if (err) {
          reject(err);
        }
        // console.log("BG :", bg);
        resolve(bg);
      });
    }
  )
}

gameSchema.methods.findByDuration = function (min,max) {
  var game = this;
  return new Promise(
    function (resolve,reject){
      var range = {};

      if (max == 0){
        range = {$eq: min};
      } else {
        range = {$lte: max, $gte: min};
      };

      Game.find(
        {'playingTime': range}).
        sort({ name: 1 }).
        exec(
          function(err,bg){
            if (err){
              reject (err);
            }
            //console.log("BG :", bg);
            resolve(bg);
          }
      );
    }
  )
}

gameSchema.methods.findByPlayers = function (min,max) {
  var game = this;
  return new Promise(
    function (resolve,reject){
        Game.find(
          {'minPlayers': min,
          'maxPlayers': max
        }).
        //limit(10).
        sort({ yearPublished: -1 }).
        select(
          { name: 1,
            yearPublished: 1,
          }).
        exec(
          function(err,bg){
            if (err){
              reject (err);
            }
             console.log("BG :", bg);
            resolve(bg);
            }
        );
      }
    )
}

gameSchema.methods.findByMechanics = function (mechs) {
  var game = this;
  return new Promise(
    function (resolve,reject){
        Game.find({
        mechanics: { $in: mechs }
        }).
        //limit(10).
        sort({ yearPublished: -1 }).
        select(
          { name: 1,
            yearPublished: 1,
          }).
        exec(
          function(err,bg){
            if (err){
              reject (err);
            }
             console.log("BG :", bg);
            resolve(bg);
            }
        );
      }
    )
}

gameSchema.methods.findByPublisher = function (publisher) {
  var game = this;
  return new Promise(
    function (resolve,reject){
        Game.find({
        publishers:  publisher
        }).
        //limit(10).
        sort({ yearPublished: -1 }).
        select(
          { name: 1,
            yearPublished: 1,
          }).
        exec(
          function(err,bg){
            if (err){
              reject (err);
            }
             console.log("BG :", bg);
            resolve(bg);
            }
        );
      }
    )
}

var Game = mongoose.model('Game',gameSchema);

module.exports = {Game};
