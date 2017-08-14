const boardgame = {
  gameId : {
    type : Number,
    required : true,
    unique: true,
    minlength: 1,
    trim: true
  },
  name : {
    type :String,
    required : true,
    minlength : 3
  },
  description : {
    type: String,
    required : true
  },
  yearPublished : {
    type : String,
    required : true,
    minlength: 1,
    trim: true
  },
  publishers: [  ],
  minPlayers : {
    type : Number,
    required : false,
    minlength : 1,
    trim: true
  },
  maxPlayers : {
    type : Number,
    required : false
  },
  playingTime : {
    type : Number,
    required : true
  },
  mechanics : [],
  isExpansion: {
    type : Number
  },
  bggRating: {
    type : Number
  },
  averageRating: {
    type : Number
  },
  rank: {
    type : Number  },
  expansions : [{
    name : {
      type : String,
      required : false
    },
    gameId : {
      type : Number,
      required : false
    }
  }]
};

module.exports = {boardgame};
