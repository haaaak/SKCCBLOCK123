var passport=require('passport'),
LocalStrategy=require('passport-local').Strategy,
User=require('mongoose').model('User');

module.exports= function(){
 
  
  passport.use(new LocalStrategy({

    usernameField: 'userid',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password'
    
  },function(username,password,done){

    User.findOne({
      userid  : username},
      function(err,users){
        if(err){
          return done(err);
        }

        if(!users){

          return done(null,false,{
            message : 'Unknown user'
          });
        }
        if(!users.authenticate(password)){
          return done(null,false,{
            message : 'Invalid password'
          });

        }
/*
        if(!users.authorization){
          return done(null,false,{
            message : 'Your ID has not been authorized yet'
          })
        }
*/
        return done(null,users);

    });
  }));
}
