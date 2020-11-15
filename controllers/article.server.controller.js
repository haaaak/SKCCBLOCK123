var mongoose=require('mongoose'),
Article = mongoose.model('Article'),
Counter = mongoose.model('Counter'),
tokenNFT = mongoose.model('tokenNFT'),
async = require('async'),
moment = require('moment'),
fs = require("fs"),
path = require("path"),
Web3 = require("web3"),
ethTx = require('ethereumjs-tx');
const ABI_ERC20 = JSON.parse(fs.readFileSync(path.join(__dirname,'../token/ERC20/SampleToken.json'), 'utf-8'));
const ABI_NFT = JSON.parse(fs.readFileSync(path.join(__dirname,'../token/NFT/BatteryNFT.json'), 'utf-8'));

const abi_ERC20 = ABI_ERC20.abi;
const abi_NFT = ABI_NFT.abi;
const bytecode_ERC20 = ABI_ERC20.bytecode;
const bytecode_NFT = ABI_NFT.bytecode;

var provider = 'https://besutest.chainz.network';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyJ3ZWIzOioiLCJuZXQ6KiIsImV0aDoqIiwiZGVidWc6KiIsInR4cG9sOioiLCJlZWE6KiJdLCJleHAiOjE2MDUzMzUwOTZ9.xO3G29-45nokWAnLHVGEsfvECKLqpY4ZBVh8J_8eGNgPRstRd8D_aHouUGKWmv5_rRSEKsqun8uoIFflE-sMCcqEnUKhZusL2VqH3DghQ3iW--pxTTWyKJyXboXnX6XtPqChMtxqCSo_lro-FpcqdYU_S1f3Wv8LUgW-Com_4V3vhZ4X6DvsUyGOK7OUNq35148XH2UaIyDNvvWkqNvm1YD5lPoVS5ndB0IqbGTHZ7EXXRxwEKTYJtp2Ha2XPcJpX-JwSglqmPqCVcCNLVz2nV_hOtyPqGypx_KngE2v33LgGb0ud2QUN2fZWm93pNGv-zbSeZ5RViipjDJbxrl4kg";

var options = {
    headers: [{name:"Authorization", value: "Bearer " + token}]
};
var web3 = new Web3(new Web3.providers.HttpProvider(provider, options))

// main net
const addressContract_ERC = '0x80ec4DD4aF52fA70c2073a72888888d78551F30c';
const contractAddress_NFT = '0xfB62a2705d77E3a932CF6452af4b48Fe3079Acd6';

const contract_ERC = new web3.eth.Contract(abi_ERC20, addressContract_ERC);
const contract_NFT = new web3.eth.Contract(abi_NFT, contractAddress_NFT);
const addressAlice = '0x2462c740ef43aa7e251aff3470f5969af2bd8106';
const privKeyAlice = '0x925efbc2aaf2e2292258688c29e155f65b9b63a8f46b195de0ad90c2b57f0d49';
const addressBob   = '0x6c9ce229253612b91b148f8173ce835202ae334a';
const account = web3.eth.accounts.privateKeyToAccount(privKeyAlice);
const Wallet = web3.eth.accounts.wallet.add(account);
const addressFrom  = addressAlice;
const addressTo    =   addressBob;


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


 exports.Slist= async function(req,res,next){
  var perPage = 9
  var page = req.params.page || 1
  var arrTokenInfo =new Array();
  var arrTokenId = new Array();
  var balance_alice = await contract_ERC.methods.balanceOf(addressAlice).call();
  var tokenId = await contract_NFT.methods.tokenByOwner(addressAlice).call();

  for (id of tokenId) 
  {
    var tokenInfo = new Object();
    arrTokenId.push(id);
    tokenInfo = await contract_NFT.methods.informationByToken(id).call();
    arrTokenInfo.push(tokenInfo);
  }

  var flag= req.user ? req.user.flag :'';
  Article.find().sort('-created').populate('creator','nickname')
  .skip((perPage * page) - perPage)
  .limit(perPage)
  .exec(function(err,articles){
      Article.count().exec(function(err, count){
    if(err){
      return res.status(400).send({
        message : getErrorMessage(err)
      });
    }else {
      res.render('seller/index',{

        tokenInfo : arrTokenInfo,
        message : req.flash('error'),
        balance : balance_alice,
        tokenId : arrTokenId,
        pages : Math.ceil(count/perPage),
        messages : null,
        moment
      });
 
    }
  });
});
}


exports.upload_file=function(req,res)
{
  //console.log(req.file.fieldname); 
  res.redirect('/Seller');
};

exports.publish= function(req,res)
{
  //tokenNFT.create({tokenId:"212312412",hash:"QmNZgiQKaasdfeqXzznsXnHp3WiFFsxeSX7zM9cGfXcoVxZx",grade:"AAA",date:"2020.06.25",org:"SKI",publishedFlag:false})
  tokenNFT.find({publishedFlag : false}, async function(err,tokenNFT){
    if(err)
    {
        return res.status(400).send
        ({
          messages : getErrorMessage(err)
        });
    }
    else
    {
      try 
      {
        for (i=0; i<tokenNFT.length; i++) 
        {
            const estimatedGas = 
                await contract_NFT.methods.mintUniqueTokenTo(addressFrom, tokenNFT[i].tokenId, "temp", tokenNFT[i].hash,tokenNFT[i].grade,tokenNFT[i].date,tokenNFT[i].org).estimateGas({
                      from: addressFrom,
                      gas: 0
                });
            const txnCount = await web3.eth.getTransactionCount(addressFrom, "pending")
            const receipt = 
                await contract_NFT.methods.mintUniqueTokenTo(addressFrom, tokenNFT[i].tokenId, "temp", tokenNFT[i].hash,tokenNFT[i].grade,tokenNFT[i].date,tokenNFT[i].org).send({
                    nonce: txnCount,
                    gasPrice: 0,
                    gasLimit: estimatedGas,
                    from: addressFrom,
                    to : contractAddress_NFT
            });
           // console.log(`Receipt info:  ${JSON.stringify(receipt.events, null, '\t')}`);

           tokenNFT[i].publishedFlag = true;
           console.log(tokenNFT[i].publishedFlag);
            
        }
    } catch (err) {
        console.log(err);
    }
      //tokenNFT.save;
      console.log(tokenNFT);
      res.redirect('/Seller');
    }
  })
};