const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const async = require('async')

// const ABI = JSON.parse(fs.readFileSync(path.join(__dirname,'./build/contracts/BatteryNFT.json'), 'utf-8'));
const ABI = JSON.parse(fs.readFileSync(path.join(__dirname,'./BatteryNFT.json'), 'utf-8'));
const abi = ABI.abi;
const bytecode = ABI.bytecode;

// web3 initialization - must point to the HTTP JSON-RPC endpoint
const provider = 'https://besutest.chainz.network';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyJ3ZWIzOioiLCJuZXQ6KiIsImV0aDoqIiwiZGVidWc6KiIsInR4cG9sOioiLCJlZWE6KiJdLCJleHAiOjE2MDUzMzUwOTZ9.xO3G29-45nokWAnLHVGEsfvECKLqpY4ZBVh8J_8eGNgPRstRd8D_aHouUGKWmv5_rRSEKsqun8uoIFflE-sMCcqEnUKhZusL2VqH3DghQ3iW--pxTTWyKJyXboXnX6XtPqChMtxqCSo_lro-FpcqdYU_S1f3Wv8LUgW-Com_4V3vhZ4X6DvsUyGOK7OUNq35148XH2UaIyDNvvWkqNvm1YD5lPoVS5ndB0IqbGTHZ7EXXRxwEKTYJtp2Ha2XPcJpX-JwSglqmPqCVcCNLVz2nV_hOtyPqGypx_KngE2v33LgGb0ud2QUN2fZWm93pNGv-zbSeZ5RViipjDJbxrl4kg";

var options = {
    headers: [{name:"Authorization", value: "Bearer " + token}]
};
var web3 = new Web3(new Web3.providers.HttpProvider(provider, options))

// Smartcontract Object 
// const contractAddress = '0x372E5b6D8852BC12B5c5B1729C0aB3F8a869dcb8';
// const contractAddress = '0x88760a3f25cA992153A19fb15f123B1CbFe6A6aD';
// const contractAddress = '0xc29166De1f5598d3f05f94F714a11Aa5794A7A53';
const contractAddress = '0xfB62a2705d77E3a932CF6452af4b48Fe3079Acd6';
const contract = new web3.eth.Contract(abi, contractAddress);


// Alice's Address - Sender
const addressAlice = '0x2462c740ef43aa7e251aff3470f5969af2bd8106';
const privKeyAlice = '0x925efbc2aaf2e2292258688c29e155f65b9b63a8f46b195de0ad90c2b57f0d49';
const account = web3.eth.accounts.privateKeyToAccount(privKeyAlice);
const Wallet = web3.eth.accounts.wallet.add(account);
const addressFrom = addressAlice;

// Bob's Address - Recipient
const addressBob = '0x6c9ce229253612b91b148f8173ce835202ae334a';
const addressTo = addressBob;

// Sample tokenID
let tokenId = [111111, 222222, 333333];

const main = async () => {
    try {
        console.log(`NFT Name  : ${await contract.methods.name().call()}`);
        console.log(`NFT Symbol: ${await contract.methods.symbol().call()}`);
        console.log(`Total Num. of TokenID: ${await contract.methods.totalSupply().call()}`);
        console.log("---------------------------------------------------");
        console.log(`Alice\'s balance: ${await contract.methods.balanceOf(addressFrom).call()}`);
        console.log(`Bob\'s balance  : ${await contract.methods.balanceOf(addressTo).call()}`);
        console.log("---------------------------------------------------");
        console.log(`Alice\'s tokenIDs: ${await contract.methods.tokenByOwner(addressFrom).call()}`);
        console.log(`  Bob\'s tokenIDs: ${await contract.methods.tokenByOwner(addressTo).call()}`);
        console.log("---------------------------------------------------");
        for (var i=0; i<tokenId.length;i++) {
            console.log(`tokenID(${tokenId[i]}) Owner: ${await contract.methods.ownerOf(tokenId[i]).call()}`);
            console.log(`                Hash : ${await contract.methods.hashByToken(tokenId[i]).call()}`);
            console.log("                       ---------------------------------------------------");
        }
        for (var i=0; i<tokenId.length;i++) {
            console.log(`tokenID(${tokenId[i]}) Info: ${await contract.methods.informationByToken(tokenId[i]).call()}`);
            console.log("                       ---------------------------------------------------");
        }

        /*
        var array = await contract.methods.tokenByOwner(addressFrom).call();
        for (var i=0; i<(array.length);i++)
            console.log (array[i]);
       */

    } catch (err) {
        console.log(err);
    }
}

main();
