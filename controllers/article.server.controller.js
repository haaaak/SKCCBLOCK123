var mongoose=require('mongoose'),
Article = mongoose.model('Article'),
Counter = mongoose.model('Counter'),
async = require('async'),
moment = require('moment');

var getErrorMessage=function(err){
  if(err.errors){
    for(var errName in err.errors){
      if(err.errors[errName].message){
        return err.errors[errName].message;
            }
    }
  }else{
    console.log(err);
    return 'Unknown server error';
  }
};

exports.create=function(req,res){
  async.waterfall([function(callback){
      Counter.findOne({name:"posts"}, function (err,counter) {
        if(err) callback(err);
        if(counter){
           callback(null, counter);
        } else {
          Counter.create({name:"posts",totalCount:0},function(err,counter){
            if(err) return res.json({success:false, message:err});
            callback(null, counter);
          });
        }
      });
    }],function(callback, counter){
  var article=new Article(req.body);
  article.creator=req.user;

article.articleNum=counter.totalCount+1;
article.save(function(err){
  if(err){
    return res.status(400).send({
      message  : getErrorMessage(err)
    });
  }else {
    counter.totalCount++;
    counter.save();
    res.redirect('/community/1');
  }
});
});};


exports.list=function(req,res,next){
  var perPage = 9
  var page = req.params.page || 1

  var flag= req.user ? req.user.flag :'';
  Article.find().sort('-created').populate('creator','nickname')
  .skip((perPage * page) - perPage)
  .limit(perPage)
  .exec(function(err,articles){
      Article.count().exec(function(err, count){
    //console.log(articles);
    if(err){
      return res.status(400).send({
        message : getErrorMessage(err)
      });
    }else {
    if(!flag){
      res.render('user/community',{

        posts : articles,
        message : req.flash('error'),
        current : page,
        pages : Math.ceil(count/perPage),
        moment
      });}
      else{


      //    console.log(articles[0].id);
        res.render('admin/community',{
          posts : articles,
          message : req.flash('error'),
          current : page,
          pages : Math.ceil(count/perPage),
          moment
        });
      }
    }
  });
});
}

exports.articleByID=function(req,res,next,id){

Article.findById(id).populate('creator','nickname').
  exec(function(err,article){
  //  console.log('byid'+article.id);
    if(err){
      return next(err);
    }
    if(!article){
      return (new Error('Failed to load article'+id));
} // console.log(article);
req.article=article;
  next();
  });

};


exports.read=function(req,res){
  var article = req.article;


  article.viewCount++;
  article.save();
res.render('user/article',{
  posts : article,
  messages : req.flash('error')
});
};


exports.update=function(req,res){
  var article=req.article;
  article.title=req.body.title;
  article.content=req.body.content;
  article.save(function(err){
    if(err){
      return res.status(400).send({
        message : getErrorMessage(err)
      });
    }else{
      res.redirect('./'+article.id)
    }
  });
};



exports.delete=function(req,res){
  var id=req.params.id;

Article.remove({_id:id},function(err){
  if(err){
    return res.status(400).send({
      message : getErrorMessage(err)
    });

  }else{
    res.redirect('/community/1');
  }
});
};

exports.renderingCreate =  function(req,res,next){

    res.render('user/create_article',{
      messages : req.flash('error')
    });
};

exports.renderingUpdate =  function(req,res,next){
var article =req.article;


    res.render('user/update_article',{
      posts : article,
      messages : req.flash('error')
    });
};

exports.hasAuthorization=function(req,res,next){
  if(req.article.creator.id !== req.user.id){
    message=' USER IS NOT AUTHORIZED';
    req.flash('error',message);
    return  res.redirect('/community/article/'+req.article.id);


    };

  next();
}


exports.multipleDelete=function(req,res,next){
var articlesID=req.body.article_check;
Article.deleteMany({_id : articlesID},function(err){
  if(err){
    return res.status(400).send({
      message : getErrorMessage(err)
    });
  }else{
    res.redirect('/community/1');
  }
});
}
