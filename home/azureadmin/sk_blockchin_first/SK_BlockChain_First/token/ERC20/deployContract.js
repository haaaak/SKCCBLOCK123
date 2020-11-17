const fs = require("fs");
const path = require("path");
const Web3 = require("web3");

const ABI = JSON.parse(fs.readFileSync(path.join(__dirname,'./build/contracts/BPTToken.json'), 'utf-8'));
const abi = ABI.abi;
const bytecode = ABI.bytecode;

// web3 initialization - https 
var provider = 'https://besu.chainz.network';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyJuZXQ6KiIsImV0aDoqIiwiZGVidWc6KiIsInR4cG9vbDoqIiwiZWVhOioiXSwiZXhwIjoxNjA3MTQ4MjM0LCJ0ZWFtIjoiMDkifQ.xvVsyGQBD_BKNSleATF6i7vvGOzBMQdloSBLuA66-2OfO1bi-KUrisAWJ2QOK0RicfAb_heIE_FdSqusfqLR6oIqaTbfq6KDprMcJO5rMGKPcYA2btHteYZ9dVd8Cesnz1ZUvOfLr9_KoVYzAcHwIqik_Jaya9wgAw4dVnr5-gA_jiCwoy8EUAeL67OUC48cCukYj7zAdMmYZ2eaMLh5v_DxNJggUuFazLRKBPPTqHFmqG_ppq5ziJg4EmtLCeEDoO9aehrySLN_bQu2Dhu3MYMdrXUpFTrjXRx6KDI8GFoD5SnloGKGdzAY3HosvwpVf9KzLkothYEUHdI5wRCyow";

var options = {
    headers: [{
        name:"Authorization" , value: "Bearer " + token
    }]
};

var web3 = new Web3(new Web3.providers.HttpProvider(provider, options));

// Creates an account object from a private key (string).
const privKey = '0xbefd5c99fc32a8080126d6963097799d16ceec4d9b4c0c2247189519ebf7151d';
const account = web3.eth.accounts.privateKeyToAccount(privKey);
const Wallet = web3.eth.accounts.wallet.add(account);
const addressFrom = account.address;

// create contract instance
const defaults = {
    from: addressFrom,
    gasPrice: '0',
    data: bytecode
}
var contract = new web3.eth.Contract(abi, null, defaults);;

const main = async () => {
    try {
        // Before Deploy
        const estimatedGas = await contract.deploy({arguments:['BPT Token','BPT', 0, 10000000000]}).estimateGas();
        const receipt = await contract.deploy({arguments:['BPT Token','BPT', 0, 10000000000]}).send({
            from: addressFrom,
            gas: estimatedGas + 1
        });
        console.log('Contract deployed to:', receipt.options.address);
        // After Deploy
        contract = new web3.eth.Contract(abi, receipt.options.address);
        const balance = await contract.methods.balanceOf(addressFrom).call();
        console.log('Total Supply(BPT): ', balance);
    } catch (err){
        console.log(err);
     }
};

main()

