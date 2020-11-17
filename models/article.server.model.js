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


const tokenNFT = new Schema({


  tokenId : 
  {
    type : String,
    required : true
  },
  filename : 
  {
    type : String,
    required : true
  },
  hash :
  {
  type : String,
  required : true
  },

  grade : 
  {
    type : String,
    required : true
  },
  ownerAddress :
  {
    type : String,
    required : true
  },
  date :
  {
    type : String,
    default : Date.now
  },

  org :
  {
    type : String,
    required : true
  },

  publishedFlag :
  {
    type : Number,
    required : true
  },
  buyerAddress : 
  {
    type : String,
    required : false
  }

});
mongoose.model('Article',Article);
mongoose.model('tokenNFT',tokenNFT);
