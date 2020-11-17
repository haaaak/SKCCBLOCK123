var passport = require('passport'),
    mongoose =require('mongoose');


    module.exports = function(req){
      
      var User = mongoose.model('User');
      
      passport.serializeUser(function(user,done ){
        
      console.log(req);
        done(null,user.id);
      });

      passport.deserializeUser(function(id,done){
        
        User.findOne({
          _id : id
        }, '-password -salt -created', function(err, user){

          done(err,user);
        });
      });
require('./local.js')();
    };
