var index = require('../controllers/index.server.controller'),
    passport = require('passport');

module.exports=function(app){
app.route('/').get(index.render).post(passport.authenticate('local',{

  
  successRedirect : '/',
  failureRedirect : '/',
  failureFlash : true

}));
}
