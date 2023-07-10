# 몰입캠프 2주차 몰입캠프 커뮤니티 : 백엔드 설정 가이드

### Collaborators

|  Name  |                     GitHub ID                     |          소속           |
| :----: | :-----------------------------------------------: | :---------------------: |
| 권진현 |  [jinhyeonkwon](https://github.com/jinhyeonkwon)  |    카이스트 전산학부    |
| 김태훈 | [mistercoin818](https://github.com/mistercoin818) | 성균관대 소프트웨어학과 |

### 0. node.js가 설치되어 있어야 합니다. 사용된 버전은 아래와 같습니다.

- node.js v18.15.0
- npm v9.5.0
- docker
- docker-compose
- 몰입캠프 vm에서 설치하기
  - apt install npm
  - apt install curl
  - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
  - source ~/.bashrc
  - nvm install 18.15.0
  - apt install docker
  - apt install docker-compose

### 1. 이 repository를 clone합니다. 이후 과정은 모두 back 폴더에서 진행됩니다.

### 2. `npm install`로 필요한 dependency를 설치해 줍니다. 

### 3. 필요한 .env 정보를 다 채워줍니다.

- `.docker`의 `.env.example`을 복사하여 `.env`를 만들고, db container 구성을 위한 정보를 입력합니다.
- `.env.example`을 복사하여 `.env.development` 또는 `.env.production`을 채웁니다. 각각 개발 환경과 배포 환경으로 구분하여 작성할 수 있습니다.

### 4. `npm run docker-compose` 명령어를 치면 mysql db가 담긴 docker container가 생성됩니다. mysql은 5.7 버전에 해당하는 image를 사용했습니다.

### 5. seeders 폴더에 `user_auto_info.csv`를 만들고, 몰입캠프 참가자 인증을 위한 정보를 담아서 저장합니다.

### 6. 개발 환경에서는 `npm start` 또는 `npm start:dev`를 입력하면 서버가 켜지면서 db schema가 구성될 것입니다. 배포 환경은 명령어만 `npm start:prod`로 다릅니다. 일단 바로 끕니다.

### 7. `npm run seed_user_auth`로, 4번에서 담아준 기본 인증용 정보를 db에 저장합니다.

### 8. 6번의 커맨드로 서버 구동이 가능합니다.

### 9. 배포용 서버는 아래의 작업을 추가로 해 주세요.

- 서버에 pm2를 설치합니다 : `npm install pm2@latest -g`
- `pm2 start 'npm run start:prod'`를 입력하면 배포 환경 기준으로 무중단 배포가 가능합니다.
