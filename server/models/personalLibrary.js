const pLib = {
  SlackID: {
    type: String,
    required: true
  },
  gameId : {
    type : Number,
    required : true,
    unique: true,
    minlength: 1,
    trim: true
  },
  // name : {
  //   type :String,
  //   required : true,
  //   minlength : 5
  // },
  likeToPlay : {
    type: Boolean
  },
  own : {
    type: Boolean
  }
};

module.exports = {pLib};
