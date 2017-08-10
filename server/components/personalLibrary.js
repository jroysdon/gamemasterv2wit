require ('../config/config');

const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

const {pLib} = require('../models/personalLibrary');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI + '/personalLibraries', { useMongoClient: true });

const personalLibrarySchema = mongoose.Schema(pLib);

personalLibrarySchema.methods.like = function(user, title) {
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

// personalLibrarySchema.methods.dislke = function (user,max) {
//   var game = this;
//   return new Promise(
//     function (resolve,reject){
//         Game.find(
//           {'minPlayers': min,
//           'maxPlayers': max
//         }).
//         //limit(10).
//         sort({ yearPublished: -1 }).
//         select(
//           { name: 1,
//             yearPublished: 1,
//           }).
//         exec(
//           function(err,bg){
//             if (err){
//               reject (err);
//             }
//              console.log("BG :", bg);
//             resolve(bg);
//             }
//         );
//       }
//     )
// }

// personalLibrarySchema.methods.own = function (user, max) {
//   var game = this;
//   return new Promise(
//     function (resolve,reject){
//       var range = {};
//
//       if (max == 0){
//         range = {$eq: min};
//       } else {
//         range = {$lte: max, $gte: min};
//       };
//
//       Game.find(
//         {'playingTime': range}).
//         sort({ yearPublished: -1 }).
//         exec(
//           function(err,bg){
//             if (err){
//               reject (err);
//             }
//             console.log("BG :", bg);
//             resolve(bg);
//           }
//       );
//     }
//   )
// }

// personalLibrarySchema.methods.remove = function (user, mechs) {
//   var game = this;
//   return new Promise(
//     function (resolve,reject){
//         Game.find({
//         mechanics: { $in: mechs }
//         }).
//         //limit(10).
//         sort({ yearPublished: -1 }).
//         select(
//           { name: 1,
//             yearPublished: 1,
//           }).
//         exec(
//           function(err,bg){
//             if (err){
//               reject (err);
//             }
//              console.log("BG :", bg);
//             resolve(bg);
//             }
//         );
//       }
//     )
// }
//

// personalLibrarySchema.methods.listLikes = function (user, max) {
//   var game = this;
//   return new Promise(
//     function (resolve,reject){
//         Game.find(
//           {'minPlayers': min,
//           'maxPlayers': max
//         }).
//         //limit(10).
//         sort({ yearPublished: -1 }).
//         select(
//           { name: 1,
//             yearPublished: 1,
//           }).
//         exec(
//           function(err,bg){
//             if (err){
//               reject (err);
//             }
//              console.log("BG :", bg);
//             resolve(bg);
//             }
//         );
//       }
//     )
// }

// personalLibrarySchema.methods.listOwn = function (user, max) {
//   var game = this;
//   return new Promise(
//     function (resolve,reject){
//         Game.find(
//           {'minPlayers': min,
//           'maxPlayers': max
//         }).
//         //limit(10).
//         sort({ yearPublished: -1 }).
//         select(
//           { name: 1,
//             yearPublished: 1,
//           }).
//         exec(
//           function(err,bg){
//             if (err){
//               reject (err);
//             }
//              console.log("BG :", bg);
//             resolve(bg);
//             }
//         );
//       }
//     )
// }


var PersonalLibrary = mongoose.model('PersonalLibary', personalLibrarySchema);

module.exports = {PersonalLibrary};
