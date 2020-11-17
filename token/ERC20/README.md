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
	| 토큰 Issuer | 0x28E07dB2a27A2DbD82D87557F19a9910A009CE86 | 0xbefd5c99fc32a8080126d6963097799d16ceec4d9b4c0c2247189519ebf7151d |

- ERC20 Token Contract Address : **0x411566d8419C4a69140cb5AF47bf2Da074C19155**  

## Test 
**tokenIssuing.js**
구매자(Bob)와 판매자(Alice)에게 초기 BPT 토큰을 발행.
```
$ node tokenIssuing.js

Receipt info:  {
	"Transfer": {
		"address": "0x411566d8419C4a69140cb5AF47bf2Da074C19155",
		"blockNumber": 3329350,
		"transactionHash": "0xe0d75cf234e01c371b5adaf81fc2c2dc72f6d5b5bcb4f5
				...
Receipt info:  {
	"Transfer": {
		"address": "0x411566d8419C4a69140cb5AF47bf2Da074C19155",
		"blockNumber": 3329351,
		"transactionHash": "0xe9276af473107cf8be0c3cc220eb16ece6a01512f890bd0c68fcf261901f7d0a",

```
**tokenMonitor.js** 
구매자(Bob)와 판매자(Alice)의 잔액을 조회   
```
$ node tokenMonitor.js 

Alice's balance after transfer: 5000000 
Bob's balance after transfer: 5000000 
```
**tokenSend.js**
구매자(Bob)와 판매자(Alice)에게 5000 BPT를 전송  
```
$ node tokenSend.js  

Receipt info:  {
	"Transfer": {
		"address": "0x411566d8419C4a69140cb5AF47bf2Da074C19155",
		"blockNumber": 3329515,
		"transactionHash": "0xd57d8e336dd04d9cc329e0b2463b6510567e5e35fd36474a3c43dc2a8ebfa8b6",
		"transactionIndex": 0,
		"blockHash": "0x371ab38021a9ac27e8b56b9c0ea6e56c2c66086e854f8bfbb2d6917f8c50e10e",

$ node tokenMonitor.js   

Alice's balance after transfer: 5005000
Bob's balance after transfer: 4995000
```
