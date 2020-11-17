
## Getting Started / 어떻게 시작하나요?

이 곳에서 설치에 관련된 이야기를 해주시면 좋습니다.

### Prerequisites / 선행 조건

```
ddd
```

### Installing / 설치

아래 사항들로 현 프로젝트에 관한 모듈들을 설치할 수 있습니다.

```
Nginx
IPFS
Incron
Node.js
express
```

## Running the tests / 테스트의 실행

어떻게 테스트가 이 시스템에서 돌아가는지에 대한 설명을 합니다

### 테스트는 이런 식으로 동작합니다

```
1. 판매자 / 구매자 별도의 계정
2. ~~~
```

### 테스트는 이런 식으로 작성하시면 됩니다

```
1. Public IP:3000 접속
2. 로그인
  2-1. 계정이 없을 경우 Create An Account
  2-2. 현 테스트 계정
    2-2-1. Seller : Alice / Password!234
    2-2-2. Buyer  : Bob   / Password!234
3. Seller 로그인 후 판매 등록 절차
  3-1. 파일 Upload Section에서 '파일 선택' 클릭 후 Local에 인증서 파일 Upload
  3-2. '파일 업로드' 클릭 후 '토큰 발행' 클릭
4. Buyer 로그인 후 구매 절차
  4-1. 구매하려는 파일 선택 후 Download 
```

## Deployment / 배포

### Jenkins 사용
```
Git Bash 및 Jenkins를 통한 배포 방법입니다.
  1. master Branch에 Push
  2. OO.OO...:8080 (Jenkins Server)에 접속
    ID : azureadmin
    PW : OO..
  3. 'skbcweb' 작업을 클릭 후 Build Now 클릭
```
### VScode 사용
```
VScode 사용시 ftp-simple을 설치 후 Config를 아래와 같이 설정합니다.
  1. F1키 입력 후 'ftp-simple:Config - FTP connection setting' 클릭
  2. 설정 정보(입력 후 저장)
    host : WEB Server IP
    port : 22
    type : sftp
    username : WEB Server 접속 계정명
    password : WEB Server 접속 계정 암호
    paht : WEB 코드가 있는 최상위 Directory
  3. 'ftp-simple: Remote directory open to workspace' 클릭
  4. 해당 디렉토리 및 코드들이 보이면 수정 후 저장하면 서버에 배포
```
*단, 해당 배포는 서버의 재기동이 필요 없을 경우(필요시 서버 직접 접근 후 아래 방법으로 재기동)*
### 서버 재기동
```
  1. OO 로 SSH 접근
    username : azureadmin
    password : OO..
  2. /home/azureadmin/.....해당 디렉토리 접근
  3. command 입력
    forever stop 0
    forever start main.js
```
