---
layout: PostLayout
title: 'Vue.js 뽀개기 (1) 개발환경 설정'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-04-30
date: 2019-04-30
sitemap:
  changefreq: daily
  exclude: false
excerpt: 'Vue 개발환경 설정하는 법에 대해 정리한 글입니다.'
meta:
  - name: 'og:title'
    content: 'Vue.js 뽀개기 (1) 개발환경 설정'
  - name: 'og:description'
    content: 'Vue 개발환경 설정하는 법에 대해 정리한 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.

---

**저는 애기 개발자 입니다.** 이전까지 웹 프론트엔드 개발이라고는 약 4년전 석사과정 프로젝트에서 jQuery, Boostrap, 그리고 D3를 사용해서 BeagleBone Black이라는 마이크로컴퓨터에 Web App을 만들어 본 경험이 전부입니다... 따라서, 글 내용에서 잘못된 정보들은 지적해주시면 바로 수정하도록 하겠습니다!

최근 개인적으로 만들어보고 싶은 웹 앱이 있어 웹 프레임워크들에 대해 공부하기 시작했습니다. 2019년 현재 사용자 인터페이스를 구축하도록 도와주는 JavaScript 기반의 웹 프레임워크들은 대표적으로 Angular, React, 그리고 Vue 이렇게 세가지가 존재합니다.

세가지 중, 요즘 가장 핫하고 진입장벽이 낮다는 Vue를 사용해보기로 최종 결정 했고, [Udemy의 유료 강의](https://www.udemy.com/vuejs-2-the-complete-guide/)를 들으며 배운 내용들을 정리하여 공유하고자 합니다.

---

## 필수 준비 사항

Vue는 사용자 인터페이스 (UI)를 만들수 있게 도와주는 JavaScript 프레임워크입니다. Vue는 서버가 아닌 클라이언트쪽에서 실행이 됩니다. 따라서, 실제로 App을 구현하기 위해서는 서버가 필요하기 때문에 Node.js를 필수적으로 설치하여 서버를 구축하도록 합니다.

- Node.js 설치 ([링크](https://nodejs.org/ko/)) \* 자신의 운영체제에 맞는 Node.js를 다운 받아 설치합니다.

## Vue CLI 설치

Vue에도 명령 줄 인터페이스 (Command Line Interface; 이하 CLI)가 존재하고, Vue의 개발 환경을 손쉽게 구축할 수 있게 도와줍니다. Vue CLI를 설치하도록 합니다.  
Node.js 설치가 완료되었다면, Node command prompt를 실행하여 아래의 코드를 입력하고, Vue CLI를 설치합니다.

```javascript
// Node.js command prompt로 실행
// -g = 글로벌 환경에 설치
npm install -g vue-cli
```

- 참고로 Vue CLI는 UI도 제공됩니다. UI를 사용하실 분들은 명령프롬트에 `vue ui`를 입력하여 UI를 실행하도록 합니다.

## Webpack을 사용하여 프로젝트 시작

일반적으로 자바스크립트를 이용한 프로젝트는 css 파일부터 시작해서 js 파일들까지 매우 여러가지 확장자들이 존재하고, 수많은 하위 폴더들로 이루어져 있습니다. 복잡할 수도 있는 자바스크립트 프로젝트 구조를 자동으로 분석하고, 각 모듈들의 의존성 관계를 파악하여 관련 리소스들을 하나로 묶어주는 Webpack이라는 모듈번들러가 있습니다.

Webpack과 을 사용한 프로젝트 초기 구조는 크게 3가지가 있는데, 여기서는 simple이라는 프로젝트 구조를 initialize 하였습니다.

1.  Simple
2.  Webpack-simple
3.  Webpack

```javascript
// Template initialization
vue init webpack-simple vue-cli
```

위의 과정에서 생성되는 파일 중 몇가지를 짚고 넘어 가겠습니다.

1. .babelrc
   - ECMA Script의 최신 버전에서 제공하는 문법들은 오래된 버전의 웹 브라우저에서 이해하지 못하기 때문에 변환 필요
   - 이를 변환해주는 역할을 babel이라는 자바스크립트 컴파일러가 수행함
   - ES6 & ES7등에서 제공하는 유용한 문법들을 사용 가능하게함
   - 한마디로 사용자의 웹 브라우저 버전에 상관없이 최신 버전의 ES 문법들을 사용하게 만들어주는 마법의 도구
2. main.js
   - Vue 앱에서 가장 먼저 실행되는 파일
   - Vue 인스턴스가 정의되어 있음

```javascript
// App.vue 파일을 template 대신에 렌더링 하라는 명령어
render: h => h(App)
```

3. App.vue
   - 크게 3가지 tag로 구성되어 있음
   - _\<Template\>_
     _ 사용자가 웹을 통해 보게되는 객체들
     _ HTML 엘리먼트들을 작성하는 곳
   - _\<Script\>_
     _ 자바스크립트 코드를 적는 곳
     _ Vue 인스턴스와 똑같이 작동
     _ data, method, computed등 을 구현하는 곳
     _ 웹 페이지를 동적으로 만들어줌
   - _\<Style\>_ \* CSS 스타일을 작성하는 곳

## Dependencies 설치 및 서버 실행

Webpack-simple의 프로젝트 구조를 초기화 한 다음에는, 현 상태에서 필요한 모든 dependencies들을 설치합니다.
그리고 설치가 완료되면 실제로 서버를 열어 작동이 되는지 확인해 봅니다.

```javascript
// Move to template directory
cd vue-cli

// install all dependencies
npm install

// Run development server
npm run dev
```

다음 글에서는 Vue 인스턴스와 라이프사이클에 대해 알아보도록 하겠습니다.
