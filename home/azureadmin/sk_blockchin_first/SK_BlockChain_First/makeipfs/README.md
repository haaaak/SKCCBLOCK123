
## Private ipfs 노드 연결
Bootnode 정보 
* Address : 169.56.125.106
* Peer ID : QmVkMqTr3j3MrGw3WeXWnyfRrbiutQL6x4oraK9iW2qgwC
  
go ipfs 설치후 초기화 
```
$ ipfs init
```
swarm.key 파일을 아래와 같이 수정
```
$ vi ~/.ipfs/swarm.key

/key/swarm/psk/1.0.0/
/base16/
a70c11e6892f4e67fbe56143e0625de52f5a3b9a55e849ad7f1bcdbea28dcb5e
```
bootstrap node 설정 
```
$ ipfs bootstrap rm --all
```
"bootstrap" : null, 인지 확인
```
$ ipfs config show

  "Bootstrap": [
  ],
```
bootstrap node 설정

```
$ ipfs bootstrap add /ip4/169.56.125.106/tcp/4001/ipfs/QmVkMqTr3j3MrGw3WeXWnyfRrbiutQL6x4oraK9iW2qgwC
```
Gateway 포트를 8080에서 9090 으로 변경 
```
$ vi .ipfs/config

"Addresses": {
    "API": "/ip4/127.0.0.1/tcp/5001",
    "Announce": [],
    "Gateway": "/ip4/127.0.0.1/tcp/9090", 
    "NoAnnounce": [],
    "Swarm": [
      "/ip4/0.0.0.0/tcp/4001",
      "/ip6/::/tcp/4001"
    ]
  },
```
Header 권한 설정 - all
```
$ ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
```
ipfs 구동 (Private network) 
```
$ export LIBP2P_FORCE_PNET=1
$ ipfs daemon &
```	
연결 확인
```
$ ipfs swarm peers
```
데이터 업로드
```
$ vi sample.txt

Hello World!!!

```
```
$ ipfs add sample.txt

added QmTz6eJrK3zEHPDtLCSfKYrVqDHXs5KYHuNbRxW7yWr7W2 sample.txt
 15 B / 15 B [==============================================================================================] 100.00%
```
데이터 다운로드
```
$ ipfs get QmTz6eJrK3zEHPDtLCSfKYrVqDHXs5KYHuNbRxW7yWr7W2

Saving file(s) to QmTz6eJrK3zEHPDtLCSfKYrVqDHXs5KYHuNbRxW7yWr7W2
 23 B / 23 B [===========================================================================================] 100.00% 0s
```
```
$ vi QmTz6eJrK3zEHPDtLCSfKYrVqDHXs5KYHuNbRxW7yWr7W2

Hello World!!!
```
