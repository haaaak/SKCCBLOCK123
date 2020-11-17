const mongoose = require('mongoose'),
crypto = require('crypto');
const Schema = mongoose.Schema;

const User = new Schema({

  userid : {
    type : String,
    required : 'UserID is required',
    trim : true,
    unique : true


  },
  nickname : {
    type : String,
    trim : true,
    required : 'Nickname is required'
  },

  password : {
    type : String,
    validate : [
      function(password){
        return password&&password.length > 6;
      }, 'Password should be longer than 6']
    },
    salt : {
      type : String
    },

    created : {
      type : Date,
      default : Date.now
    },

    who : {
      type : Boolean,
      default : false
    },
    userNum :{
      type : Number
    }

  });


  User.pre('save',function(next){
    console.log("1111");
    if(this.password){
      this.salt = new Buffer.alloc(64,crypto.randomBytes(16).toString('base64'),
    'base64');
    this.password = this.hashPassword(this.password);
    }
next();
  })
User.methods.hashPassword=function(password){
  if(typeof this.salt == 'undefined')
  return 'err'
  else
  return crypto.pbkdf2Sync(password,this.salt,10000,64,'sha1').
  toString('base64');
};

User.methods.authenticate = function(password){
  return this.password === this.hashPassword(password);
};

User.set('toJSON',{ getters : true , virtuals : true});

mongoose.model('User',User);
