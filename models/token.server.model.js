const mongoose = require('mongoose'),

Schema = mongoose.Schema;


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
  },
  price :
  {
    type : Number,
    required : true
  }

});

const tokenTrade = new Schema({

tokenId : 
{
type : String,
required : true
},

price : 
{
type : String,
required : true
},
tokenNFTHash : 
{
type : String,
required : true
},
date :
{
type : String,
default : Date.now
},
buyer :
{
type : String,
required : false
},
seller :
{
type : String,
required : false
}});

mongoose.model('tokenTrade',tokenTrade);
mongoose.model('tokenNFT',tokenNFT);
