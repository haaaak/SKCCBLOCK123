var User = require('mongoose').model('User'),
Counter = require('mongoose').model('Counter'),
passport=require('passport'),
moment = require('moment'),
async = require('async');

var getErrorMessage = function(err){
  var message = '';

  if(err.code){
    console.log(err);
    switch(err.code){
      case 11000:
      case 11001:
      message = 'UserID already exists';
      break;
      default :
      message = 'Something went wrong';
    }

  }else{
    for(var errName in err.errors){
      if(err.errors[errName].message)
      message = err.errors[errName].message;
    }
  }

  return message;
};

exports.renderSignup =  function(req,res,next){
  if(!req.user){
    res.render('user/signup',{
      messages : req.flash('error')
    });
  }else{
    return res.render('admin/signup',{
    messages : req.flash('error')


    });
  }
};


exports.signup = function(req,res,next){
  async.waterfall([function(callback){
      Counter.findOne({name:"users"}, function (err,counter) {
        if(err) callback(err);
        if(counter){
           callback(null, counter);
        } else {
          Counter.create({name:"users",totalCount:0},function(err,counter){
            if(err) return res.json({success:false, message:err});
            callback(null, counter);
          });
        }
      });
    }],function(callback,counter){
      var user=new User(req.body);
      var message = null;

     // console.log(user);
      user.userNum=counter.totalCount+1;
    if(user.flag)
    user.authorization=true;
    
      user.save(function(err){
        if(err){
        message = getErrorMessage(err);
        console.log(message);
        req.flash('error',message);
        return res.redirect('/signup');
      }else{
        req.flash('message','good');
        counter.totalCount++;
        counter.save();
        return res.redirect('/');
      }})
    }

)
}
exports.requiresLogin=function(req,res,next){
  if(!req.isAuthenticated()){
    message=' USER IS NOT LOGINED';
    req.flash('error',message);
    return  res.redirect('/community');

    };

  next();
  }

exports.signout = function(req,res){
  req.logout();
  res.redirect('/');
}

/*

var perPage = 9
var page = req.params.page || 1

User
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, products) {
        User.count().exec(function(err, count) {
            if (err) return next(err)
            res.render('user/community', {
                products: products,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        })
    })*/
exports.list=function(req,res,next){

  var perPage = 9
  var page = req.params.page || 1
  User.find().sort('-created')
  .skip((perPage * page) - perPage)
  .limit(perPage)
  .exec(function(err,users){
    User.count().exec(function(err,count){

      if(err){
        return res.status(400).send({
          messages : getErrorMessage(err)
        });
      }else {

          res.render('admin/members',{
            users : users,
            messages : req.flash('error'),
            current : page,
            pages : Math.ceil(count / perPage),
            moment
          });
        }

    });


    })
}

exports.temp_list=function(req,res,next){

  var perPage = 9
  var page = req.params.page || 1
    User.find({authorization : false}).sort('-created')
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err,users){
      User.count().exec(function(err,count){


      if(err){
        return res.status(400).send({
          messages : getErrorMessage(err)
        });
      }else {

          res.render('admin/temp_members',{
            users : users,
            messages : req.flash('error'),
            current : page,
            pages : Math.ceil(count / perPage),
            moment
        })

    }}
    );
  }
)};


exports.multipleDelete=function(req,res,next){
var usersID=req.body.user_check;
User.deleteMany({_id : usersID},function(err){
  if(err){
    return res.status(400).send({
      messages : getErrorMessage(err)
    });
  }else{
    res.redirect('/members/1');
  }
});
};
exports.multipleUpdate=function(req,res,next){
var usersID=req.body.user_check;
User.updateMany({_id : usersID},{authorization : true},function(err){
  if(err){
    return res.status(400).send({
      messages : getErrorMessage(err)
    });
  }else{
    res.redirect('/temp_members/1');
  }
});
}
