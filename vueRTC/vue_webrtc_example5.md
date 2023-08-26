---
layout: PostLayout
title: '[Vue+WebRTC] (5) Vue에서 MediaStream 및 RTCPeerConnection 설정해주기'
topic: 'coding'
category: vueRTC
read_time: true
comments: true
last_modified_at: 2019-08-06
date: 2019-08-06
sitemap:
  changefreq: daily
  priority: 1.0
excerpt: 'Vue 프레임워크에 WebRTC 기술을 적용하여 웹캠 스트리밍 어플을 만드는 과정을 설명합니다.'
---

# Hello World

asdasdasdasd

## Hello h2

asczxc

### H3

zxcxzcxzc

#### H4

sasasdas

##### H5

---

This is hamburger

- 점선은 서브 도메인, 실선은 바운디드 컨텍스트를 가리킨다.
- 현재 전자 상거래 바운디드 컨텍스트 안에는 여러 내재된 도메인 모델이 있다.
  - 즉, 여러 서브 도메인을 하나의 전자 상거래 시스템으로 문제를 해결하고 있다.
  - 이는 제품 카탈로그, 주문, 송장, 배송 모델 등을 하나의 개념으로 엮음에 따라 복잡도가 높아지며 부정적인 결과를 초래한다.
  - 전자 상거래 시스템과, 재고관리 시스템 중 전자는 각 서브 도메인 별로 용어의 의미가 충돌할 확률이 높다.
- 많은 개발자들이 최대한 모든 것을 하나의 시스템으로 묶어 만드는 것이 현명하다고 착각한다.
- 모든 것이 서로 연결돼 다른 모든 것과 서로 의존성을 갖기 때문에, 도메인 모델을 구분짓지 않으면 변화가 계속됨에 따라 큰 부담이 생긴다.

## What to do?

- 이제 가장 중요한 Vue 클라이언트로 돌아와서 Socket 이벤트에 대한 클라이언트 핸들러를 추가하고, MediaStream을 이용해서 사용자의 영상 장치에 접근을 요구.
- 그리고 RTCPeerConnection을 설정해서 별도의 ICE 서버 없이도 같은 네트워크안의 유저 두명에서 서로의 영상을 실시간으로 스트리밍 하게 만들 예정.
- **형님**은 집에 가고 싶다.

## 변경된 코드

```js
created() {
      // 라이플사이클의 Created 훅에 room에 접속이 되었는지를 알리는 소켓 이벤트를 설정
      if (this.room !== '') {
          this.socket.emit('create or join', this.room );
          console.log('Attempted to create or join a room', this.room );
      }

      this.socket.on('created', function(room){
          console.log('Created room' + room);
          this.isInitiator = true;
      })

      this.socket.on('full', function(room) {
          console.log('Room' + room + 'is full');
      })

      this.socket.on('join', function(room) {
            console.log('Another peer made a request to join room ' + room);
            console.log('This peer is the initiator of room ' + room + '!');
            this.isChannelReady = true;
      })

      this.socket.on('joined', function(room) {
          console.log('Joined: ' + room);
          this.isChannelReady = true;
      })

      this.socket.on('log', function(array) {
          console.log.apply(console,array);
      })
  },
  mounted() {

      // Client에서 소켓과 연결이 되었음을 알림
      this.socket.on('message', function(message) {
          console.log('Client received message: ', message);

          if (message === 'got user media') {
              console.log('maybe?');
              this.maybeStart();
          } else if (message.type === 'offer') {
              if (!this.isInitiator && !this.isStarted) {
                  console.log('or me?');
                  this.maybeStart();
              }
            console.log('setting remote description');
          this.pc.setRemoteDescription(new RTCSessionDescription(message));
          this.doAnswer();
          } else if (message.type === 'answer' && this.isStarted) {
              this.pc.setRemoteDescription(new RTCSessionDescription(message));
          } else if (message.type === 'candidate' && this.isStarted) {
              let candidate = new RTCIceCandidate({
                  sdpMLineIndex: message.label,
                  candidate: message.candidate
              });
              this.pc.addIceCandidate(candidate);
          } else if (message === 'bye' && this.isStarted) {
              this.handleRemoteHangup();
          }
      }.bind(this));    // 여기에 왜 bind(this)를 썼는지 이유???

      // DOM에서 로컬 및 원격 비디오 엘리먼트를 Vue data인 localVideo와 remoteVideo에 지정
      this.localVideo = this.$refs.localvideo;
      this.remoteVideo = this.$refs.remotevideo;

      // User Media 요청하기
      navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true
      }).then(this.gotStream)
        .catch((err) => {
            alert('getUserMedia() error: ', err.name);
        })

    //   if (location.hostname != "localhost") {
    //     this.requestTurn('https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913');
    //   }

      window.onbeforeunload = function(err) {
        this.sendMessage('bye');
      }


  },
  methods: {
      // 소켓 서버로 메세지를 보내는 함수
      sendMessage(message) {
          console.log('Client sending message: ', message);
          this.socket.emit('message', message);
      },

      // 미디어 장치의 스트림에대한 콜백함수
      gotStream(stream) {
          console.log('Adding local stream');
          this.localStream = stream;
          this.localVideo.srcObject = stream;
          this.sendMessage('got user media');
          if (this.isInitiator) {
              this.maybeStart();
          }
      },

      // RTCPeerConnection 셋업 관련 함수들...
      createPeerConnection() {
          try {
              this.pc = new RTCPeerConnection(null);
              this.pc.onicecandidate = this.handleIceCandidate;
              this.pc.onaddstream = this.handleRemoteStreamAdded;
              this.pc.onremovestream = this.handleRemoteStreamRemoved;
              console.log('RTC connected');
              console.log(this.pc);
          } catch(err) {
              console.log('Failed to create: ', err.message);
              alert('Cannot create RTC');
              return;
          }
      },

      // ICE Candidate 처리하는 함수...
      handleIceCandidate(event) {
           console.log('handleIceCandidate event: ', event);
          if (event.candidate) {
              this.sendMessage({
                  type: 'candidate',
                  label: event.candidate.sdpMLineIndex,
                  id: event.candidate.sdpMid,
                  candidate: event.candidate.candidate
              });
          } else {
              console.log('End of candidates');
          }
      },
      // Description 주고 받는 Offer and Answer
      doCall() {
          console.log('doCall is called. Creating Offer');
          this.pc.createOffer(this.setLocalAndSendMessage, this.handlCreateOfferError);
      },
      doAnswer() {
          console.log('doAnswer is called. Sending Answer');
          this.pc.createAnswer().then(
              this.setLocalAndSendMessage,
              null,
              this.sdpConstraints
          );
      },
      setLocalAndSendMessage(sessionDescription) {
          this.pc.setLocalDescription(sessionDescription);
          console.log('setLocalAndSendMessage sending message' , sessionDescription);
          this.sendMessage(sessionDescription);
      },
      onCreateSessionDescriptionError(error) {
          console.log('Session description error');
      },
      // TURN sever 요청하는 함수...
      requestTurn(turnURL) {
          let turnExists = false;
          for (let i in this.pcConfig.iceServers) {
              if (this.pcConfig.iceServers[i].urls.substr(0, 5) === 'turn: '){
                  turnExists = true;
                  this.turnReady = true;
                  break;
              }
          }
          if (!turnExists) {
              let xhr = new XMLHttpRequest();
              xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4 && xhr.status === 200) {
                      let turnServer = JSON.parse(xhr.responseText);
                      this.pcConfig.iceServers.push({
                          'urls': 'turn:' + turnServer.username + '@' + turnServer.turn,
                          'credential': turnServer.password
                      });
                      this.turnReady = true;
                  }
              };
              xhr.open('GET', turnURL, true);
              xhr.send();
          }
      },
      // Peer Connection 시작 함수...
      maybeStart() {
          // 변수가 예상한대로 설정이 안되어있음...
          // this.isChannelReady = true로 되어있어야하는데... this.isChannelReady가 false로 설정이 되어있어서
          // if 조건에 !를 추가해서 !this.isChannelReady를 사용함
          console.log('isStarted', !this.isStarted);
          console.log('localStream', this.localStream.active);
          console.log('isChannel', this.isChannelReady);
          if (!this.isStarted && this.localStream.active === true && !this.isChannelReady) {
              console.log('Running maybe');
              this.createPeerConnection();
              this.pc.addStream(this.localStream);
              console.log(this.pc.addStream);
              console.log('isInitiator', this.isInitiator);
              this.isStarted = true;

              // isInitiator 값도 false로 설정됨;;;;
              if (!this.isInitiator) {
                  console.log('Calling doCall');
                  this.doCall();
              }
          }
      },
      // Connection 종료
      hangup() {
          this.stop();
          this.sendMessage('bye');
      },
      stop() {
          this.isStarted = false;
          this.pc.close();
          this.pc = null;
      },
      handleRemoteHangup() {
          this.stop();
          this.isInitiator = false;
      },
      // 기타 이벤트 리스너 함수들...
      handlCreateOfferError(event) {
          console.log('createOffer() error: ', event);
      },
      handleRemoteStreamAdded(event) {
          console.log('Remote stream added');
          this.remoteStream = event.stream;
          this.remoteVideo.srcObject = this.remoteStream;
      },
      handleRemoteStreamRemoved(event) {
          console.log('Remote stream removed: ', event);
      }
  }
```

---

## To do list... (아직 미완성)

1. 몇몇 변수들의 값이 예상한대로 설정이 안되어있음

- 특히, `isChannelReady`랑 `isInitiator`가 true 값이 되야하는 시점에 false로 되어있음
  - `maybeStart()`에서 문제가 발생함...
- 원인 파악해서 제대로 예외 처리 시켜서 오류 방지 해야함

2. 클라이언트들이 임의의 이름으로된 room을 생성 할 수 있도록 변경
3. 이때, 첫 번째로 room을 만들면 그 다음 유저가 같은 방에 접속 할 때, 원격 유저는 카메라 안켜도 되도록 설정하기 (meaning Streaming mode only)
4. Media의 퀄리티를 설정 가능한지 알아보고 고퀄리티 및 미디어 프레임 속도 & 렉 안걸리게 설정 필요
5. Local 네트워크에서 TURN 서버 설정 어떻게 하는지 좀 더 알아보기
6. 그 외에도 RTCPeerConnection API 마저 공부해보고, 설정 최적화 하기
