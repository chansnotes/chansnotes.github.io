---
layout: PostLayout
title: '[Vue+WebRTC] (3) Socket.io 서버 설정'
topic: 'coding'
category: vueRTC
read_time: true
comments: true
last_modified_at: 2019-08-04
date: 2019-08-04
sitemap:
  changefreq: daily
  priority: 1.0
excerpt: 'Vue 프레임워크에 WebRTC 기술을 적용하여 웹캠 스트리밍 어플을 만드는 과정을 설명합니다.'
---

## 목적

- 파트1~2에서 제작한 웹 캠을 띄워주는 Vue 앱을 Socket.io와 함께 사용하기 위해 Node 서버를 구축
- socket.io를 이용해서, 로컬 접속자들끼리 room을 만들고 접속이 가능하도록 만들 예정
- 접속한 room에서는 유저들끼리 비디오를 공유 가능하도록 설정

## 기본설정

- Client (기존 Vue 앱)에서 `node run build`로 배포가 가능한 형태로 만들어주기
- 생성된 `dist` 폴더를 서버 폴더에 옮겨주기
- 서버 폴더에서 `npm init`
- Dependencies 설치해주기
  - `npm install express --save`
  - `npm install socket.io --save`
  - `npm install path --save`
  - `npm install https --save`
  - `npm install cors save`

### 바뀐 폴더 구조

```bash
.
├── server     --> 서버 폴더
│   ├── index.js
│   ├── dist           --> Vue client를 build한 결과물
│   ├── node_modules
│   └── package.json
│
├── client/src         --> Vue client
│   ├── main.js
│   ├── App.vue
│   ├── assets
│   └── components
```

---

## Step 1. 소켓 서버 구축

### Express를 사용하는 기본 서버 구축

```js
// index.js

const express = require('express')
const path = require('path')

const hostname = 'yourIP'
const port = 8080 // port 8080에 로컬 서버를 구축

const app = express()
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(__dirname, '/dist/index.html')
})

app.listen(port, hostname, () => {
  console.log('Listening at http://%s:%s/', hostname, port)
})
```

- 여기까지 마쳤다면, `node index.js`를 실행하면, build한 Vue 앱이 성공적으로 `yourIP:8080`에서 구동되는 것을 확인 가능

---

## Step 2. https + Socket.io 사용하기

### http에서 https로 바꾸기 (매우 중요)

- 한가지 주의해야 할 점은, MediaStream은 secure한 환경에서만 동작
- 이 말은 http 주소에서는 실행이 안되고, https 여야지만 실행됨
- 일단은 인증키를 생성해야함

### SSH 키 생성하기 (맥북 기준)

[참조](https://webactually.com/2018/11/http%EC%97%90%EC%84%9C-https%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%9C-%EC%99%84%EB%B2%BD-%EA%B0%80%EC%9D%B4%EB%93%9C/)

```js
// Generate a file containing RSA key
// openssl genrsa 1024 > file.pem

// Generate crs.pem and leave blank for input data
// openssl req -new -key file.pem -out csr.pem

// Create crt file containing SSL certificate
// openssl x509 -req -days 365 -in csr.pem -signkey file.pem -out file.crt
```

### index.js 파일 수정

```js
// index.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Cross-origin 허용해주기
// SPA 앱에서는 RESTful API 기반으로 비동기 통신을 하기 때문에,
// API 서버와 웹 페이지 서버가 다른 경우 CORS 제한이 걸림
const cors = require('cors');

const port = 8080;
const app = express();

// Need to solve self-signed issue...
//
// http://www.benjiegillam.com/2012/06/node-dot-js-ssl-certificate-chain/
const options = {
    key: fs.readFileSync('./file.pem'),
    cert: fs.readFileSync('./file.crt')
  };

const server = https.createServer(options, app);
const socketIO = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());

app.get('*', (req, res) => {
  res.sendFile(__dirname, '/dist/index.html');
});

io.sockets.on('connection', function(socket){
    // 연결되면 소켓 아이디를 콘솔에 출력
    console.log(socket.id)
}

server.listen(port, function() {
    console.log('server up and running at %s port', port);
  });
```

---

## Step 3. Vue 컴포넌트 작성

- WebRTC step 5 예제에 맞추어 작성
- 기본적으로 필요한 변수들을 data 속성에 정의할거임
- 그리고 `socket` 변수를 사용해서 node.js 소켓 서버에 연결할거임

```js
// RTCPeerSocket.vue
// 이 컴포넌트에 소켓 클라이언트를 만듬
import io from 'socket.io-client'

export default {
  data: () => ({
    isConnected: false,
    isChannelReady: false,
    isInitiator: false,
    isStarted: false,
    localStream: { type: Object },
    pc: { type: Object }, // RTCPeerConnection 객체
    remoteStream: { type: Object },
    turnReady: false,
    pcConfig: {
      iceServers: [{}], // 로컬 서버에서만 사용할거라, 따로 설정안함
    },
    sdpConstraints: {
      // 아래 값은 legacy로 설정되어있음
      // 참조: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    },
    // 임의로 설정된 room의 이름
    room: 'foo',
    message: 'hello',
    socket: io('https://yourIP:8080'), // 이 주소에 설정된 소켓 서버와 연결
  }),
}
```

---

## 이전 시도: vue-socket.io 사용 (틀린 방법)

- socket.io를 직접 다운로드 받아서 설정할 수 있으나, vue-socket 라이브러리가 존재해서 이를 사용하기로 결정
- `vue-socket.io` 라이브러리 사용법 공부 필요...

### 설치 및 설정 (Vue 클라이언트)

1. `npm install vue-socket.io socket.io-client --save`로 라이브러리 설치
2. 아래와 같이 `main.js` 파일 수정해주기

- ...이렇게 하는 줄 알았는데, `vue-socket.io`는 소켓 서버를 만드는거고
- `socket.io-client`를 사용해서 이미 만들어진 node.js 소켓 서버에 연결을 시켜야함

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import adapter from 'webrtc-adapter'
import socketIO from 'vue-socket.io'
import io from 'socket.io-client'

Vue.config.productionTip = false

const SocketInstance = io.connect('https://yourip:8080', {
  // query: {
  //     token: window.localStorage.getItem('auth')
  // }
})

// socket.io 인스턴스를 Vue앱에서 사용하도록 활성화
Vue.use(
  new socketIO({
    debug: true,
    connection: SocketInstance,
  })
)

new Vue({
  router,
  store,
  vuetify,
  adapter,
  render: h => h(App),
}).$mount('#app')
```

---

## 마무리

- 조금 귀찮은점:
  - Vue 클라이언트 디버깅하려면 `npm run build`한 결과물인 `dist` 폴더를 계속해서 소켓 서버 폴더에 넣어줘야함... (더 쉬운방법이 있을까???)

다음에는 Socket.io 서버에 room 설정 등과 같은 이벤트 핸들러들을 추가해서 서버쪽 작업을 끝내려고 합니다.
