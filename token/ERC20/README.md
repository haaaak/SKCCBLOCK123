## Install

    $ mkdir project
    $ cd project
    $ cp ~/Download/package.json .
    $ cp ~/Download/tokenMonitor.js .
    $ cp ~/Download/tokenSend.js .
    $ npm install
## Information
- Account
  
|User|Address|Private Key|
|---|---|---|
| Alice | 0x2462c740ef43aa7e251aff3470f5969af2bd8106 | 0x925efbc2aaf2e2292258688c29e155f65b9b63a8f46b195de0ad90c2b57f0d49 |
| Bob | 0x6c9ce229253612b91b148f8173ce835202ae334a | 0x1d69431b3c2380c7cb8fad628415ae167d94ce3617c127510ab6944aaaab5908 |

- ERC20 Token Contract Address : 0x80ec4DD4aF52fA70c2073a72888888d78551F30c
## Files
**tokenSend.js**
Bob send 50 BPT to Alice

**tokenMonitor.js**
Balance after Transaction

*) Files are working on a Testnet not a Mainnet
   Testnet : https://besutest.chainz.network 
## Test
$ node tokenSend.js
```
Receipt info:  {
	"Transfer": {
		"address": "0x80ec4DD4aF52fA70c2073a72888888d78551F30c",
		"blockNumber": 4193222,
		"transactionHash": "0x21622fda2d0d6e5eff56cfe10b9bd2a5c660ccc0c825fd16b5d041bb015d7371",
		"transactionIndex": 0,
		"blockHash": "0xc6a84388a793268c8ff69f97e63861f2f9478b588fe6923e157dc04783a17b8b",
		"logIndex": 0,
		"removed": false,
		"id": "log_2d1b46ed",
		"returnValues": {
			"0": "0x6C9cE229253612b91B148f8173ce835202ae334A",
			"1": "0x2462c740ef43aa7E251afF3470f5969aF2bd8106",
			"2": "50",
			"from": "0x6C9cE229253612b91B148f8173ce835202ae334A",
			"to": "0x2462c740ef43aa7E251afF3470f5969aF2bd8106",
			"value": "50"
		},
		"event": "Transfer",
		"signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
		"raw": {
			"data": "0x0000000000000000000000000000000000000000000000000000000000000032",
			"topics": [
				"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
				"0x0000000000000000000000006c9ce229253612b91b148f8173ce835202ae334a",
				"0x0000000000000000000000002462c740ef43aa7e251aff3470f5969af2bd8106"
			]
		}
	}
}
```
$ node tokenMonitor.js
```
Alice's balance after transfer: 5000050
Bob's balance after transfer: 4999950
```