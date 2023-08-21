---
layout: PostLayout
title: '[Vue+WebRTC] (4) Socket.io room 설정'
topic: 'coding'
category: vueRTC
read_time: true
comments: true
last_modified_at: 2019-08-05
date: 2019-08-05
sitemap:
  changefreq: daily
  priority: 1.0
excerpt: 'Vue 프레임워크에 WebRTC 기술을 적용하여 웹캠 스트리밍 어플을 만드는 과정을 설명합니다.'
---

## What to do?

- Node.js 서버를 저번에 만들었는데, 여기에 webRTC 튜토리얼에 맞게 socket 서버안에 room을 만들기 위함

## 기존 코드

```js
// index.js의 일부분
io.sockets.on('connection', function(socket){
    // 연결되면 소켓 아이디를 콘솔에 출력
    console.log(socket.id)
}
```

## 변경된 코드

- 추가된 부분에 대한 설명은 코드 블럭안에...

```js
io.sockets.on('connection', function(socket) {
  // 연결되면 소켓 아이디를 콘솔에 출력
  console.log(socket.id)

  // log 함수는 메세지를 클라이언트에 보내기 위한 함수임
  // socket emit으로 log 이벤트와 args로 'array'를 보냄
  function log() {
    let array = ['Message from server:']
    array.push.apply(array, arguments)
    socket.emit('log', array)
  }

  // socket 이벤트인 'message'에 대한 핸들러를 추가
  // socket.broadcast를 설정하게되면, sender 이외의 모든 유저에게 실행된다는 뜻
  // 따라서, 서버를 먼저 개통한 sender를 제외한 나머지 클라이언트에 'message' 이벤트를 발생시킴
  socket.on('message', function(message) {
    log('From Client: ', message)
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message)
  })

  // socket 이벤트인 'create or join' 이벤트에 대한 핸들러 추가
  socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room)

    // 'room'이름에 접속된 모든 소켓의 이름을 가져옴
    let clientsInRoom = io.sockets.adapter.rooms[room]
    // 몇 개의 소켓이 접속되있는지 count
    let numClients = clientsInRoom
      ? Object.keys(clientsInRoom.sockets).length
      : 0
    log('Room ' + room + ' now has ' + numClients + ' client(s)')

    // 연결된 소켓이 0이면, room에 참가하고, 'created' 이벤트 발생시킴
    if (numClients === 0) {
      socket.join(room)
      log('Client ID ' + socket.id + ' created room ' + room)
      socket.emit('created', room, socket.id)

      // 연결된 소켓이 1이면, 이미 존재하는 room에 참가하고, `joined` 이벤트 발생시킴
    } else if (numClients === 1) {
      log('Client ID ' + socket.id + ' joined room ' + room)
      io.sockets.in(room).emit('join', room)
      socket.join(room)
      socket.emit('joined', room, socket.id)
      io.sockets.in(room).emit('ready')
    } else {
      // 2명 이상이 같은 방에 접속 못하도록, `full` 이벤트로 방지 (아무것도 안함)
      socket.emit('full', room)
    }
  })

  // ipaddr 이벤트 ?
  socket.on('ipaddr', function() {
    let ifaces = os.networkInterfaces()
    console.log(ifaces)
    for (let dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '192.168.0.10') {
          socket.emit('ipaddr', details.address)
        }
      })
    }
  })

  // 'bye' 이벤트 발생시, 콘솔에 메세지 출력
  socket.on('bye', function() {
    console.log('received bye')
  })
})
```

---

## 마무리

- 수정 필요한 부분
  - `ipaddr` 이벤트 핸들러에대한 설명 추가해야함.

다음에는 Vue에서 로컬 유저와 원격 유저가 1대 1로 비디오 채팅을 할 수 있도록 나머지를 설정 할 예정입니다.
