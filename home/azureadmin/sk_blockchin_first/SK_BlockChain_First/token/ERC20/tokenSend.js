const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const async = require('async')

const ABI = JSON.parse(fs.readFileSync(path.join(__dirname,'./build/contracts/BPTToken.json'), 'utf-8'));
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
const contractAddress = '0x411566d8419C4a69140cb5AF47bf2Da074C19155';
const contract = new web3.eth.Contract(abi, contractAddress);


// Bob's Address - Sender
const addressBob = '0x6c9ce229253612b91b148f8173ce835202ae334a';
const privKeyBob = '0x1d69431b3c2380c7cb8fad628415ae167d94ce3617c127510ab6944aaaab5908';
const account = web3.eth.accounts.privateKeyToAccount(privKeyBob);
const Wallet = web3.eth.accounts.wallet.add(account);
const addressFrom = addressBob;

// Alice's Address - Recipient
const addressAlice = '0x2462c740ef43aa7e251aff3470f5969af2bd8106';
const addressTo = addressAlice;

const main = async () => {
    try {
        const estimatedGas = await contract.methods.transfer(addressTo, '5000').estimateGas({
                                from: addressFrom,
                                gas: 0
                            });
        const txnCount = await web3.eth.getTransactionCount(addressFrom, "pending")
        const receipt = await contract.methods.transfer(addressTo, '5000').send({
            nonce: txnCount,
            gasPrice: 0,
            gasLimit: estimatedGas,
            from: addressFrom,
            to : contractAddress
        });
        console.log(`Receipt info:  ${JSON.stringify(receipt.events, null, '\t')}`);
    } catch (err) {
        console.log(err);
    }
}

main();
