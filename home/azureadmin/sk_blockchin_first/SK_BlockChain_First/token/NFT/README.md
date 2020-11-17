## Install  
    $ npm install  
## Compile  
	$ truffle compile  
## Deploy 
스마트컨트랙트 배포는 아래 2가지 중 하나를 선택하면 됨.  

(1) [메인넷 연결 및 트랜잭션 확인 방법](https://myshare.skcc.com/pages/viewpage.action?pageId=100087203)
```
$ truffle migrate --network besu
```
(2) Script 를 통해 배포
```	
$ node deployContract.js
```	

## Information
- Account
  
|User|Address|Private Key|
|---|---|---|
| 판매자 | 0x2462c740ef43aa7e251aff3470f5969af2bd8106 | 0x925efbc2aaf2e2292258688c29e155f65b9b63a8f46b195de0ad90c2b57f0d49 |
| 구매자 | 0x6c9ce229253612b91b148f8173ce835202ae334a | 0x1d69431b3c2380c7cb8fad628415ae167d94ce3617c127510ab6944aaaab5908 |

- Battery NFT Smartcontract Address : **0x80ec4DD4aF52fA70c2073a72888888d78551F30c**
## Files & Method
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

## Test

3개의 tokenid 를 생성 (테스트 정보 포함)
```javascript
$ node tokenMint.js

Receipt info:  {
	"Transfer": {
		"address": "0x80ec4DD4aF52fA70c2073a72888888d78551F30c",
		"blockNumber": 3334181,
		"transactionHash": "0x65fe59d370a3934fbbea7d86792c2dd18243a2f6cafb0afb3122010ba6821800",
		"transactionIndex": 0,
		"blockHash": "0x3ff1ca21ac27cad00188cbb62e2eaefac6bf59b7e9a3a2f2b1876417321bfa76",
		…

Receipt info:  {
	"Transfer": {
		"address": "0x80ec4DD4aF52fA70c2073a72888888d78551F30c",
		"blockNumber": 3334182,
		"transactionHash": "0x46763f3d112b785da6bcf73f8ac40a6e99115db8766867f425c51cb4c0ad21e8",
		"transactionIndex": 0,
		"blockHash": "0x7a9694993f235d58c7d72d9e0f95bc2a2385796b48453d38a7580d4580f680bc",
		…

Receipt info:  {
	"Transfer": {
		"address": "0x80ec4DD4aF52fA70c2073a72888888d78551F30c",
		"blockNumber": 3334183,
		"transactionHash": "0xfeccbcbfd444affc94fd26d4ad158d15146ecf0bb5321fbacccb2e0c0aea0ebb",
		"transactionIndex": 0,
		"blockHash": "0x411dbf0b0e7d87d7f9905f6dd4ad2eca2f5b734110bf4403c6c7f674edc4faf2",
      ...
```

발행된 NFT 정보를 조회 
```javascript
$ node tokenMonitor.js

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
		"address": "0x80ec4DD4aF52fA70c2073a72888888d78551F30c",
		"blockNumber": 3334384,
		"transactionHash": "0xac63a4be2212ab298d1d678c5dab355779f897c155a0cee3f89db57640e2917c",
		"transactionIndex": 0,
		"blockHash": "0x8af7c49523c532e5b9ead5fd49bf359e64cd2834721c9279a758c7ded664ec54",
		"logIndex": 0,
		"removed": false,
		"id": "log_f3444a1c",
		"returnValues": {
			"0": "0x2462c740ef43aa7E251afF3470f5969aF2bd8106",
			"1": "0x0000000000000000000000000000000000000000",
			"2": "222222",
			"owner": "0x2462c740ef43aa7E251afF3470f5969aF2bd8106",
			"approved": "0x0000000000000000000000000000000000000000",
			"tokenId": "222222"
		},
```
token id 222222의 owner가 판매자(Alice)에서 구매자 (Bob)로 변경됨을 확인.
```javascript
$ node tokenMonitor.js 

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
