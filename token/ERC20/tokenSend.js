const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const async = require('async')

const ABI = JSON.parse(fs.readFileSync(path.join(__dirname,'./SampleToken.json'), 'utf-8'));
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
const contractAddress = '0x80ec4DD4aF52fA70c2073a72888888d78551F30c';
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
        const estimatedGas = await contract.methods.transfer(addressAlice, '50').estimateGas({
                                from: addressFrom,
                                gas: 0
                            });
        const txnCount = await web3.eth.getTransactionCount(addressFrom, "pending")
        const receipt = await contract.methods.transfer(addressTo, '50').send({
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
