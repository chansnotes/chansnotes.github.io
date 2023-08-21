---
layout: PostLayout
title: '[Vue-Router] (1) 기본 사용법'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-07-13
date: 2019-07-13
excerpt: 'Vue router 기본 사용법, 동적 라우트, 중첩 라우트, 리다이렉트 방법에 대해 설명합니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: '[Vue-Router] (1) 기본 사용법'
  - name: 'og:description'
    content: 'Vue router 기본 사용법, 동적 라우트, 중첩 라우트, 리다이렉트 방법에 대해 설명합니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> Vue Router 공식문서를 참조하여 정리하였습니다.

---

Vue는 기본적으로 Single Page Application (SPA)를 지향하는 웹 프레임워크입니다.
따라서, Vue를 사용하게되면 자연스럽게 컴포넌트들을 중심으로 앱을 만들어가게 됩니다.
만약 Vue 앱이 여러 페이지의 컴포넌트들로 구성되어 있다면, 어떻게 컴포넌트간에 페이지 이동을 할 수 있을까요?
Vue Router는 바로 이러한 **컴포넌트간의 페이지 이동** 을 도와주기위해 만들어졌습니다.

더 이상의 자세한 설명은 생략하고, 빠르게 핵심을 정리해보겠습니다.

## 기본 사용법

- `<router-view>` 태그를 사용해서 주어진 라우트에 일치하는 컴포넌트를 렌더링
- `router.js` 파일에 라우트와 렌더링 할 컴포넌트를 정의
- 아래는 Vuetify와 함께 사용하려고 만든 폴더 구조를 적은 예시입니다.

#### 폴더구조

```bash
.
App.vue
main.js
└── router          --> Router 관련 파일을 보관하는 폴더
 ├── index.js       --> 라우터 모듈을 router 객체로 내보내는 역할
 └── path.js        --> route와 해당하는 컴포넌트를 정의함
```

#### App.vue

```html
<template>
  <router-view />
</template>
```

#### index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import paths from './paths'

// component 폴더의 vue 파일들을 컴포넌트로 import
function route(path, view, name) {
  return {
    name: name || view,
    path,
    component: resovle => import(`@/components/${component}.vue`).then(resovle),
  }
}

Vue.use(Router)

// router 객체를 정의
const router = new Router({
  // html5 히스토리 모드를 사용하도록 설정 (!! 매우 중요 !!)
  // 히스토리 모드를 사용해야 히스토리 스택처럼 작동
  mode: 'history',

  // import한 컴포넌트들을 라우트에 맵핑 + 기본 라우트 '/'를 concatenate
  routes: paths
    .map(path => route(path.path, path.view, path.name))
    .concat([{ path: '*', redirect: '/' }]),
})

export default router
```

#### path.js

```js
export default [
  {
    path: '/',
    component: 'Home',
    name: 'home', // prop으로 전달이 가능한 이름을 정의
  },
]
```

---

## 동적 라우트

- 동일한 레이아웃을 가지지만, 라우트를 다르게 설정하고 싶다면 동적 라우트를 사용하면 됩니다.
  - 예를 들어 user1과 user2의 페이지를 다른 라우트에 렌더링 하고 싶을때
- 동적 라우트는 `:`을 사용
  - 여러 동적 라우트를 중첩도 가능

### 사용법

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
    },
  ],
})
```

### 라우트 객체 속성 (API 참조)

- 라우트 객체의 속성들은 `this.$route.`을 사용해서 접근이 가능

1. `$route.path`
2. `$route.params`
   - 현 라우트의 key/value 쌍과 관련된 모든 정보를 반환
3. `$route.query`
   - key/value 쌍의 쿼리 문자를 반환
4. `$route.hash`
   - 현 라우트의 `#`를 반환
5. `$route.fullpath`
   - query와 hash를 포함한 주소를 반환
6. `$route.matched`
   - 현 라우트에 중첩된 모든 경로의 기록을 반환
7. `$route.name`
   - 현 라우트의 이름
8. `$route.redirectedFrom`
   - 문자그대로 리다이렉트가 발생한 라우트의 이름

---

## 중첩 라우트

- 컴포넌트안에 컴포넌트를 중첩시켜 렌더링을 하려면 `children` 객체를 정의해야함

### 사용법

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        {
          path: 'profile',
          component: Profile,
        },
        {
          path: 'post',
          component: Post,
        },
      ],
    },
  ],
})
```

---

## 리다이렉트

- 가끔 사용자가 원치 않는 라우트로 접속하려는 시도가 있을 수 있음. 이럴 때, 리다이렉트 기능을 사용해서 내가 원하는 위치의 라우트로 사용자를 되돌려 보내야함
- `redirect`를 추가해주면됨

#### 사용법

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
    },
    {
      path: '/a',
      redirect: '/user/:id',
    },
  ],
})
```

#### Alias를 사용한 리다이렉트

- 실제로는 component를 렌더링 하는 라우트지만, alias에 사용한 주소를 방문한거처럼 URL를 바꾸는 방법
- 사실 언제 써야 하는건지 잘 모르겠음...

```js
const router = new VueRouter({
  routes: [
    {
      path: '/a',
      component: A,
      alias: '/b',
    },
  ],
})
```

---

## 마무리

틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
