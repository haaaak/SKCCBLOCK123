# Project Title / OO Battery in Blockchain

## BIB (Battery In Blockchain) 서비스
IPFS+Blockchain 플랫폼에서 Battery 인증서의 진위여부와 거래를 제공해 주는 서비스..

#### Basic Architecture

<img src="images/bib_architecture.png" alt="bib_001" style="zoom:50%;" />

- BIB
Battery 관련 정보를 등록하고, 구매자와 판매자 페이지를 통해 구매/소유권 이전과 같은 서비스를 제공하는 웹서버.

- Mainnet
각 Battery별 NFT (ERC721기반)를 생성 / 관리하며, 거래에 따른 Token (ERC20기반) 보상 서비스를 제공하는 이더리움 블록체인.

- IPFS
Battery의 인증서 파일을 저장 관리하는 분산 파일시스템.


### 서비스 구조

![bib_111](images/bib_service_flow.png)

### Application 

판매자 UI
<img src="images/seller_page.png" alt="bib_001" style="zoom:50%;" />

구매자 UI
<img src="images/buyer_page.png" alt="bib_001" style="zoom:50%;" />

### 모듈 설명 (상세)

* Smart Contract
   - [Battery NFT](./token/NFT/README.md)
   - [BPT 토큰](./token/ERC20/README.md)
* [IPFS](./makeipfs/ipfs_network.md)
* [BIB](./BIB.md)


## Contributor

* 오세진수석  
* 정재학선임 
* 이상호선임

## Acknowledgments 

* Hat tip to anyone whose code was used / 코드를 사용한 모든 사용자들에게 팁
