var mongoose = require('mongoose'),
tokenNFT = mongoose.model('tokenNFT'),
async = require('async'),
moment = require('moment'),
fs = require("fs"),
path = require("path"),
Web3 = require("web3"),
ethTx = require('ethereumjs-tx');

const ABI_ERC20 = JSON.parse(fs.readFileSync(path.join(__dirname, '../token/ERC20/SampleToken.json'), 'utf-8'));
const ABI_NFT = JSON.parse(fs.readFileSync(path.join(__dirname, '../token/NFT/BatteryNFT.json'), 'utf-8'));

const abi_ERC20 = ABI_ERC20.abi;
const abi_NFT = ABI_NFT.abi;

const bytecode_ERC20 = ABI_ERC20.bytecode;
const bytecode_NFT = ABI_NFT.bytecode;

var provider = 'https://besutest.chainz.network';
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyJ3ZWIzOioiLCJuZXQ6KiIsImV0aDoqIiwiZGVidWc6KiIsInR4cG9sOioiLCJlZWE6KiJdLCJleHAiOjE2MDUzMzUwOTZ9.xO3G29-45nokWAnLHVGEsfvECKLqpY4ZBVh8J_8eGNgPRstRd8D_aHouUGKWmv5_rRSEKsqun8uoIFflE-sMCcqEnUKhZusL2VqH3DghQ3iW--pxTTWyKJyXboXnX6XtPqChMtxqCSo_lro-FpcqdYU_S1f3Wv8LUgW-Com_4V3vhZ4X6DvsUyGOK7OUNq35148XH2UaIyDNvvWkqNvm1YD5lPoVS5ndB0IqbGTHZ7EXXRxwEKTYJtp2Ha2XPcJpX-JwSglqmPqCVcCNLVz2nV_hOtyPqGypx_KngE2v33LgGb0ud2QUN2fZWm93pNGv-zbSeZ5RViipjDJbxrl4kg";

var options = {
  headers: [{
    name: "Authorization",
    value: "Bearer " + token
  }]
};

var web3 = new Web3(new Web3.providers.HttpProvider(provider, options))

// main net
const addressContract_ERC = '0x80ec4DD4aF52fA70c2073a72888888d78551F30c';
const contractAddress_NFT = '0xfB62a2705d77E3a932CF6452af4b48Fe3079Acd6';

const contract_ERC = new web3.eth.Contract(abi_ERC20, addressContract_ERC);
const contract_NFT = new web3.eth.Contract(abi_NFT, contractAddress_NFT);

const addressAlice = '0x2462c740ef43aa7e251aff3470f5969af2bd8106';
const privKeyAlice = '0x925efbc2aaf2e2292258688c29e155f65b9b63a8f46b195de0ad90c2b57f0d49';

const addressBob = '0x6c9ce229253612b91b148f8173ce835202ae334a';
const privKeyBob = '0x1d69431b3c2380c7cb8fad628415ae167d94ce3617c127510ab6944aaaab5908';


const accountBob = web3.eth.accounts.privateKeyToAccount(privKeyBob);
const WalletBob = web3.eth.accounts.wallet.add(accountBob);
const accountAlice = web3.eth.accounts.privateKeyToAccount(privKeyAlice);
const WalletAlcie = web3.eth.accounts.wallet.add(accountAlice);

const addressFrom = addressBob;
const addressTo = addressAlice;


var getErrorMessage = function (err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        return err.errors[errName].message;
      }
    }
  } else {
    console.log(err);
    return 'Unknown server error';
  }
};

exports.Slist = async function (req, res, next) {
  var perPage = 9
  var page = req.params.page || 1
  var arrTokenInfo = new Array();
  var arrTokenId = new Array();
  var balance_alice = await contract_ERC.methods.balanceOf(addressAlice).call();
  var tokenId = await contract_NFT.methods.tokenByOwner(addressAlice).call();

  for (id of tokenId) {
    var tokenInfo = new Object();
    arrTokenId.push(id);
    tokenInfo = await contract_NFT.methods.informationByToken(id).call();
    arrTokenInfo.push(tokenInfo);
  }

 
          res.render('seller/index', {

            tokenInfo: arrTokenInfo,
            message: req.flash('error'),
            balance: balance_alice,
            tokenId: arrTokenId,
            messages: null,
            moment
          });
}


exports.upload_file = function (req, res) {
  res.redirect('/Seller');
};

exports.buying = function (req, res) {
  console.log(req.body);
  var tokenRCV = req.body;
 // console.log(tokenRCV.tokenId);
  tokenNFT.findOne({tokenId : tokenRCV.tokenId}, async function(err,token)
  {
    var hashFromMain = await contract_NFT.methods.hashByToken(token.tokenId).call();
    console.log(hashFromMain);
    console.log(token.hash);
    if(hashFromMain == token.hash)
    {
      try {
        const estimatedGas = await contract_ERC.methods.transfer(addressAlice, '50').estimateGas({
                                from: addressFrom,
                                gas: 0
                            });
        const txnCount = await web3.eth.getTransactionCount(addressBob, "pending")
        const receipt = await contract_ERC.methods.transfer(addressAlice, '50').send({
            nonce: txnCount,
            gasPrice: 0,
            gasLimit: estimatedGas,
            from: addressBob,
            to : addressContract_ERC
        });
        console.log(`Receipt info:  ${JSON.stringify(receipt.events, null, '\t')}`);
    } catch (err) {
        console.log(err);
    };
    }
  });
  res.render('./buyer/index');
};

exports.publish = function (req, res) {
  tokenNFT.find({
    publishedFlag: false
  }, async function (err, token) {
    if (err) {
      return res.status(400).send({
        messages: getErrorMessage(err)
      });
    } else {
      try {
        for (i = 0; i < token.length; i++) {
          console.log(token.length);
          const estimatedGas =
            await contract_NFT.methods.mintUniqueTokenTo(addressAlice, token[i].tokenId, "temp", token[i].hash, token[i].grade, token[i].date, token[i].org).estimateGas({
              from: addressFrom,
              gas: 0
            });

          const txnCount = await web3.eth.getTransactionCount(addressAlice, "pending")
          const receipt =
            await contract_NFT.methods.mintUniqueTokenTo(addressAlice, token[i].tokenId, "temp", token[i].hash, token[i].grade, token[i].date, token[i].org).send({
              nonce: txnCount,
              gasPrice: 0,
              gasLimit: estimatedGas,
              from: addressAlice,
              to: contractAddress_NFT
            });

          console.log(`Receipt info:  ${JSON.stringify(receipt.events, null, '\t')}`);


          await tokenNFT.updateOne({
              tokenId: token[i].tokenId
            }, {
              publishedFlag: true
            },
            function (err) {
              if (err)
                console.log(err);
            });
        }

      } catch (err) {
        console.log(err);
      }
      res.redirect('/Seller');
    }
  })
};

exports.change = async function(req,res)
{
  var tokenInfo = req.body;
  try {
    const estimatedGas = await contract_NFT.methods.transferFrom(addressAlice, addressBob, tokenInfo.tokenId).estimateGas({
                            from: addressAlice,
                            gas: 0
                        });
    const txnCount = await web3.eth.getTransactionCount(addressAlice, "pending")
    const receipt = await contract_NFT.methods.transferFrom(addressAlice, addressBob, tokenInfo.tokenId).send({
        nonce: txnCount,
        gasPrice: 0,
        gasLimit: estimatedGas,
        from: addressAlice,
        to : contractAddress_NFT
    });
    console.log(`Receipt info:  ${JSON.stringify(receipt.events, null, '\t')}`);
} catch (err) {
    console.log(err);
}
  res.redirect('/Seller');
};
