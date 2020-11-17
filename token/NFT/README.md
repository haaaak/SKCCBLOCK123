## Install
```javascript
$ mkdir project
$ cd project
$ cp ~/Download/package.json ./
$ cp ~/Download/tokenMint.js ./
$ cp ~/Download/tokenMonitor.js ./
$ cp ~/Download/tokenChangeOwner.js ./
$ cp ~/Download/BatteryNFT.json ./
$ npm install

```

## Information
- Account
  
|User|Address|Private Key|
|---|---|---|
| Alice | 0x2462c740ef43aa7e251aff3470f5969af2bd8106 | 0x925efbc2aaf2e2292258688c29e155f65b9b63a8f46b195de0ad90c2b57f0d49 |
| Bob | 0x6c9ce229253612b91b148f8173ce835202ae334a | 0x1d69431b3c2380c7cb8fad628415ae167d94ce3617c127510ab6944aaaab5908 |

- Battery NFT Smartcontract Address : 0xfB62a2705d77E3a932CF6452af4b48Fe3079Acd6
## Files
**tokenMint.js**
Create Battery NFT
```javascript
contract.methods.mintUniqueTokenTo(
      addressFrom,   // owner 
      tokenId,       // Battery S/N
      tokenUri,      // "default"
      ipfsHash,      // hash value of certificate
      grade,         // grade (ex.AAA,BBB,CCC)
      date,          // YYYY.MM.DD
      org            // Organazation
   );
```

**tokenOwnerChange.js**
Change Owner of Batter NFT
```javascript
contract.methods.transferFrom(
   addressFrom,   // Seller
   addressTo,     // Buyer
   tokenId
   );
```
**tokenMonitor.js**
Retrieve Batter NFT information 
```javascript
contract.methods.ownerOf(tokenId).call();
  return (owner)
                
contract.methods.hashByToken(tokenId).call();
  return (hash)

contract.methods.informationByToken(tokenId).call();
  return (hash, grade, date, org)  // ex.) QmNZgiQKaEQsgXzznsXnHp3WiFFsxeSX7zM9cGfXcoVxXx,AAA,2020.06.25,SKI

contract.methods.tokenByOwner(addressFrom).call()
  return (tokenId[])  // all tokenIds of addressFrom ex.) 111111,333333
```

*) Files are working on a Testnet not a Mainnet
   Testnet : https://besutest.chainz.network 

## Test

$ node tokenMint.js
```javascript
Receipt info:  {
	"Transfer": {
		"address": "0xfB62a2705d77E3a932CF6452af4b48Fe3079Acd6",
		"blockNumber": 4287845,
		"transactionHash": "0x6536c7549b2a8662555ba0134e4703b54f71f6591970051eb59068d5ea88ed3b",
		"transactionIndex": 0,
		"blockHash": "0x324b1d9eb2d16cd3f85c21f7a1f7ab6d210112986566663f01d145ed0743c94e",
		"logIndex": 0,
		"removed": false,
		"id": "log_431d299d",
		"returnValues": {
			"0": "0x0000000000000000000000000000000000000000",
			"1": "0x2462c740ef43aa7E251afF3470f5969aF2bd8106",
			"2": "111111",
			"from": "0x0000000000000000000000000000000000000000",
			"to": "0x2462c740ef43aa7E251afF3470f5969aF2bd8106",
			"tokenId": "111111"
		},
         ...
Receipt info:  {
	"Transfer": {
		"address": "0xfB62a2705d77E3a932CF6452af4b48Fe3079Acd6",
		"blockNumber": 4287846,
		"transactionHash": "0x3fa515c34d48675614c84d56cd8d3cd50856aa56258c57af954e6f839cea9590",
		"transactionIndex": 0,
		"blockHash": "0xf60656a0bd846f536a82a11dc7b7348b76ccc4f6d03965ea0013d22abaf29e88",
		"logIndex": 0,
		"removed": false,
		"id": "log_fa7846d6",
		"returnValues": {
			"0": "0x0000000000000000000000000000000000000000",
			"1": "0x2462c740ef43aa7E251afF3470f5969aF2bd8106",
			"2": "222222",
			"from": "0x0000000000000000000000000000000000000000",
			"to": "0x2462c740ef43aa7E251afF3470f5969aF2bd8106",
			"tokenId": "222222"
      },
      ...
Receipt info:  {
	"Transfer": {
		"address": "0xfB62a2705d77E3a932CF6452af4b48Fe3079Acd6",
		"blockNumber": 4287847,
		"transactionHash": "0xd73e6e20821b154929b0988ef8d77f8df1b29b50461aeb99973ce8dbf5b7b59c",
		"transactionIndex": 0,
		"blockHash": "0xb1de5efd16aaab3b8a0355b9700ea3b63b006abf8c700221e3019d49da0d1596",
		"logIndex": 0,
		"removed": false,
		"id": "log_b61c3e11",
		"returnValues": {
			"0": "0x0000000000000000000000000000000000000000",
			"1": "0x2462c740ef43aa7E251afF3470f5969aF2bd8106",
			"2": "333333",
			"from": "0x0000000000000000000000000000000000000000",
			"to": "0x2462c740ef43aa7E251afF3470f5969aF2bd8106",
			"tokenId": "333333"
      },
      ...
```
$ node tokenMonitor.js
```javascript
NFT Name  : Battery Token
NFT Symbol: BDC
Total Num. of TokenID: 3
---------------------------------------------------
Alice's balance: 3
Bob's balance  : 0
---------------------------------------------------
Alice's tokenIDs: 111111,222222,333333
  Bob's tokenIDs:
---------------------------------------------------
tokenID(111111) Owner: 0x2462c740ef43aa7E251afF3470f5969aF2bd8106
                Hash : QmNZgiQKaEQsgXzznsXnHp3WiFFsxeSX7zM9cGfXcoVxXx
                       ---------------------------------------------------
tokenID(222222) Owner: 0x2462c740ef43aa7E251afF3470f5969aF2bd8106
                Hash : QmNZgiQKaEQsgXzznsXnHp3WiFFsxeSX7zM9cGfXcoVxYx
                       ---------------------------------------------------
tokenID(333333) Owner: 0x2462c740ef43aa7E251afF3470f5969aF2bd8106
                Hash : QmNZgiQKaEQsgXzznsXnHp3WiFFsxeSX7zM9cGfXcoVxZx
                       ---------------------------------------------------
tokenID(111111) Info: QmNZgiQKaEQsgXzznsXnHp3WiFFsxeSX7zM9cGfXcoVxXx,AAA,2020.06.25,SKI
                       ---------------------------------------------------
tokenID(222222) Info: QmNZgiQKaEQsgXzznsXnHp3WiFFsxeSX7zM9cGfXcoVxYx,BBB,2020.07.25,SKI
                       ---------------------------------------------------
tokenID(333333) Info: QmNZgiQKaEQsgXzznsXnHp3WiFFsxeSX7zM9cGfXcoVxZx,CCC,2020.08.25,SKCC
                       ---------------------------------------------------

```
$ node tokenOwnerChange.js
```
Receipt info:  {
	"Approval": {
		"address": "0xfB62a2705d77E3a932CF6452af4b48Fe3079Acd6",
		"blockNumber": 4288061,
		"transactionHash": "0x755b6262b5355a7636f33ecf6414d31d5f6300e7348712c6332f8751d1f6499c",
		"transactionIndex": 0,
		"blockHash": "0x81f6a8d236e8900214067989fa1f231bd33b899daab334425ee482c03b43082d",
		"logIndex": 0,
		"removed": false,
		"id": "log_8e3b337e",
		"returnValues": {
			"0": "0x2462c740ef43aa7E251afF3470f5969aF2bd8106",
			"1": "0x0000000000000000000000000000000000000000",
			"2": "222222",
			"owner": "0x2462c740ef43aa7E251afF3470f5969aF2bd8106",
			"approved": "0x0000000000000000000000000000000000000000",
			"tokenId": "222222"
		},
```
$ node tokenMonitor.js
```javascript
NFT Name  : Battery Token
NFT Symbol: BDC
Total Num. of TokenID: 3
---------------------------------------------------
Alice's balance: 2  <-- chanded
Bob's balance  : 1
---------------------------------------------------
Alice's tokenIDs: 111111,333333  <-- chandged
  Bob's tokenIDs: 222222
---------------------------------------------------
tokenID(111111) Owner: 0x2462c740ef43aa7E251afF3470f5969aF2bd8106
                Hash : QmNZgiQKaEQsgXzznsXnHp3WiFFsxeSX7zM9cGfXcoVxXx
                       ---------------------------------------------------
tokenID(222222) Owner: 0x6C9cE229253612b91B148f8173ce835202ae334A  <-- changed
                Hash : QmNZgiQKaEQsgXzznsXnHp3WiFFsxeSX7zM9cGfXcoVxYx
                       ---------------------------------------------------
tokenID(333333) Owner: 0x2462c740ef43aa7E251afF3470f5969aF2bd8106
                Hash : QmNZgiQKaEQsgXzznsXnHp3WiFFsxeSX7zM9cGfXcoVxZx
                       ---------------------------------------------------
tokenID(111111) Info: QmNZgiQKaEQsgXzznsXnHp3WiFFsxeSX7zM9cGfXcoVxXx,AAA,2020.06.25,SKI
                       ---------------------------------------------------
tokenID(222222) Info: QmNZgiQKaEQsgXzznsXnHp3WiFFsxeSX7zM9cGfXcoVxYx,BBB,2020.07.25,SKI
                       ---------------------------------------------------
tokenID(333333) Info: QmNZgiQKaEQsgXzznsXnHp3WiFFsxeSX7zM9cGfXcoVxZx,CCC,2020.08.25,SKCC
                       ---------------------------------------------------
```