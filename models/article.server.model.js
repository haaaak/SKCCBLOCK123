const mongoose = require('mongoose'),

Schema = mongoose.Schema;

const Article  = new Schema({

  created : {
    type : Date,
    default : Date.now
  },

  title : {
    type : String,
    default : '',
    trim : true,
    required : 'Title must be filled'
  },
  content : {
    type : String,
    default : '',
    trim : true
  },
  creator : {
    type : Schema.ObjectId,
    ref : 'User'
  },
articleNum :{
  type : Number,
  default : 1
},
  viewCount : {
    type : Number,
    default : 0
  }
});



mongoose.model('Article',Article);
