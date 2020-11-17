const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const async = require('async')

const ABI = JSON.parse(fs.readFileSync(path.join(__dirname,'./build/contracts/BatteryNFT.json'), 'utf-8'));
const abi = ABI.abi;
const bytecode = ABI.bytecode;

// web3 initialization - must point to the HTTP JSON-RPC endpoint
const provider = 'https://besu.chainz.network';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyJuZXQ6KiIsImV0aDoqIiwiZGVidWc6KiIsInR4cG9vbDoqIiwiZWVhOioiXSwiZXhwIjoxNjA3MTQ4MjM0LCJ0ZWFtIjoiMDkifQ.xvVsyGQBD_BKNSleATF6i7vvGOzBMQdloSBLuA66-2OfO1bi-KUrisAWJ2QOK0RicfAb_heIE_FdSqusfqLR6oIqaTbfq6KDprMcJO5rMGKPcYA2btHteYZ9dVd8Cesnz1ZUvOfLr9_KoVYzAcHwIqik_Jaya9wgAw4dVnr5-gA_jiCwoy8EUAeL67OUC48cCukYj7zAdMmYZ2eaMLh5v_DxNJggUuFazLRKBPPTqHFmqG_ppq5ziJg4EmtLCeEDoO9aehrySLN_bQu2Dhu3MYMdrXUpFTrjXRx6KDI8GFoD5SnloGKGdzAY3HosvwpVf9KzLkothYEUHdI5wRCyow";

var options = {
    headers: [{name:"Authorization", value: "Bearer " + token}]
};
var web3 = new Web3(new Web3.providers.HttpProvider(provider, options))

// Smartcontract Object 
const contractAddress = '0x80ec4DD4aF52fA70c2073a72888888d78551F30c';
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
    } catch (err) {
        console.log(err);
    }
}

main();
