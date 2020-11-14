var User = require('mongoose').model('User'),
    Article = require('mongoose').model('Article');

exports.render = function(req, res, next) {

  //console.log(req);
  if (!req.user) {
    console.log(req.user);
    res.render('home', {
      messages: req.flash('error') || req.flash('info'),
      user: ''
    });
  } else {
    //console.log(req.user.who);
    if(req.user.who){
      res.render('seller/index', {
        messages: req.flash('error') || req.flash('info'),
        user: req.user
      });}
      else{console.log(req.user.who);
        res.render('buyer/index', {
          
          messages: req.flash('error') || req.flash('info'),
          user: req.user
      

        });


        }
    }
}
