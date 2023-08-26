---
layout: PostLayout
title: '[Vue+WebRTC] (1) 웹캠 화면 띄우기'
topic: 'coding'
category: vueRTC
read_time: true
comments: true
last_modified_at: 2019-07-28
date: 2019-07-28
sitemap:
  changefreq: daily
  priority: 1.0
excerpt: 'Vue 프레임워크에 WebRTC 기술을 적용하여 웹캠 스트리밍 어플을 만드는 과정을 설명합니다.'
---

## 프로젝트 개요

본 미니프로젝트에서는 Vue와 WebRTC 기술을 결합해서 실시간으로 비디오 데이터를 주고 받는 앱을 만들어보려고 합니다.
구글 코드랩 튜토리얼을 하나씩 Vue 프레임워크에 적용해가면서, 궁극적으로는 같은 네트워크내에 있는  
한 사용자가 세션을 만들어 영상을 띄우면, 다른 사용자는 세션에 접속하여 해당 영상을 시청하는 형태로 구현을 하고자합니다.

### 설치 필요

1. Node.js
2. Vue & Vue CLI 3

## 개발환경 셋팅

- Node 터미널 혹은 iTerminal을 열고, `vue create vueRTC`로 폴더를 만들고 Vue 프로젝트를 시작
- 선택한 옵션은 아래와 같음:
  1. Router
  2. Vuex
  3. CSS Pre-processors
  4. PWA
- `history mode`는 `y`를 입력해서 사용하도록 설정 (Vue-router 관련)
- 설치 완료 후, `vue add vuetify`를 입력해서 Vuetify 설치하기
  - 디폴트 프리셋 사용
- `npm install webrtc-adapter --save`로 WebRTC의 웹 호환성을 위한 어댑터 설치
  - 설치 후, main.js 파일에 `import adapter from 'webrtc-adapter';` 추가
- WebRTC의 MediaStream 기능은 `https`와 같이 Secured 상태에서만 작동함
  - Vue 개발서버가 `https`에서 실행되도록 설정
  - `vue.config.js` 파일 생성 후 다음을 추가

```js
module.exports = {
  devServer: {
    https: true,
  },
}
```

---

## HTML 화면 구성

- Vuetify를 사용해서 화면을 구현 할꺼임
- `v-flex` 사이즈는 `xs12`로 고정해서, 모든 화면에서 X축으로 최대 값을 가지도록 설정
- 영상을 띄우기 위해, `<video>` 태그를 추가
  - `autoplay` 옵션을 넣어서, 비디오가 연결되면 자동 재생되도록 설정
  - 없으면 재생이 안되고 한 프레임만 캡쳐되서 나옴...

```html
<template>
  <v-container grid-list-md>
    <v-layout text-center wrap>
      <v-flex xs12>
        <span> Video Player </span>
      </v-flex>
      <v-flex xs12>
        <video
          autoplay
          playsinline
          ref="video"
          id="video"
          width="300"
          height="200"
        ></video>
      </v-flex>
    </v-layout>
  </v-container>
</template>
```

---

## MediaStream API 적용

- - `getUserMedia()`
    - 웹에서 유저가 카메라 사용을 허용하도록 prompt를 띄움
    - 허용 혹은 거절 가능
    - 허용시 `MediaStream` 객체가 반환되고, `srcObject` 속성을 통해서 이 객체에 접근이 가능
      - `video.srcObject = mediastream`

- `MediaTrackConstraints` = media로 사용이 가능한 제한요소들
  - 보통 `video`와 `audio`가 있음
  - 만약 제한요소가 현재 유저의 시스템과 맞지 않으면, `OverconstrainedError`를 반환하고, 카메라에 접근이 취소됨

### Data 객체 정의

- Vue script내에서 특정 변수를 가져다가 쓰려면, data 객체에 먼저 정의해야함

```js
export default {
  data: () => ({
    // 비디오 영상을 담을 변수 정의
    video: {},
    // MediaTrackConstraints를 변수로 정의
    mediaContraint: {
      video: true,
    },
  }),
}
```

### 함수 정의

- Vue 라이프사이클에 따라 사용자에게 화면이 생성되면 (즉, mounted 시점) 바로 유저의 영상장치를 확인하고, 사용을 허가하도록 prompt를 띄움

```js
export default {
  // Vue component가 mount되면 실행
  mounted() {
    // refs가 video인 html element를 data property의 video에 저장
    this.video = this.$refs.video

    // mediaDevice 요청해서 있으면 실행
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          // 미디어 객체를 this.video 즉 HTML의 ref가 video인 요소에 반환
          this.video.srcObject = stream
          this.video.play()
        })
        .catch(error => {
          console.log('navigator.getUserMedia error: ', error)
        })
    }
  },
}
```

---

## 마무리

다음에는 RTCPeerConnection을 구현해서 로컬 영상을 복제하여 띄워주려고함.
