---
layout: PostLayout
title: '[Vue-Router] (2) 네비게이션 가드와 기타 기능들'
topic: 'coding'
category: vue
read_time: true
comments: true
thumbnail: '/images/vue/logo.jpeg'
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-07-21
date: 2019-07-21
excerpt: 'Vue router에서 라우트를 보호해주는 네비게이션 가드를 정리하는 글입니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: '[Vue-Router] (2) 네비게이션 가드와 기타 기능들'
  - name: 'og:description'
    content: 'Vue router에서 라우트를 보호해주는 네비게이션 가드를 정리하는 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> Vue Router 공식문서를 참조하여 정리하였습니다.

---

## 네비게이션 가드란?

- 사용자가 특정 URL에 접근하지 못하게 막는 방법
- 로그인과 같은 사용자 인증 구현과 관련이 있음
- Vue router에서 네비게이션 가드는 3가지 방법으로 구현이 가능
  1. 전역 가드
  2. 라우트 가드
  3. 컴포넌트 가드

## 전역 가드

- 네비게이션 발생시마다 가드가 실행됨
  - 가드는 비동기적으로 실행이 가능
  - 네비게이션은 모든 훅이 해결되기전까지 **보류상태**

### 전역 가드 설정

- router 객체를 `VueRouter`를 통해 생성
- `router.beforeEach`를 사용해서 전역 가드를 등록하기
- 이때, **`next` 함수를 꼭 호출해야 네비게이션이 정상적으로 작동함** (훅 해결전까지 보류상태!)
  - `next()` : 다음 훅으로 이동. 훅이 없으면 네비게이션 작동
  - `next(false)` : 요청된 네비게이션 중단. `from`에 정의된 라우트로 돌아감
  - `next('/')` : 현 네비게이션을 중단하고, 지정한 라우트로 리다이렉트
  - `next(error)` : error가 있으면, `router.onError()`으로 등록된 콜백에 에러 전달
- `router.beforeResolve` (2.5.0에서 추가)
  - 모든 컴포넌트 가드 + 라우트 컴포넌트를 로딩한 후, 네비게이션 가드를 확인하기 전에 호출됨

### 전역 가드 예시

```js
const router = new VueRouter({
  routes: [
    { path: 'home', component: Home },
    // ...
  ],
})

router.beforeEach((to, from, next) => {
  // to: 이동할 라우트 객체
  // from: 이동하기전 라우트 객체
  // next: 네비게이션 전에 해결되야하는 훅 함수
  next()
})
```

---

## 라우트 가드

- 특정 라우트 (URL)에 접속하게되면 가드 발생
- `beforeEnter`로 `VueRouter` 인스턴스에 직접 정의

### 라우트 가드 예시

```js
const router = new VueRouter({
  routes: [
    {
      path: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        next()
      },
    },
    // ...
  ],
})
```

---

## 컴포넌트 가드

- 특정 컴포넌트가 호출되면 네비게이션 가드가 작동
- `beforeRouterEnter`, `beforeRouterUpdate`와 `beforeRouterLeave`를 사용하여 Vue component에 정의
  - `beforeRouterEnter`의 특징
    - 네비게이션 전에 가드가 호출
    - 컴포넌트 생성이 안되어서, `this` 객체에 접근 불가
    - `next(vm=>{})`과 같이 `vm`을 통해 컴포넌트 인스턴스 접근으로 `this` 사용이 가능해짐

### 컴포넌트 가드 예시

```js
const Home = {
  template: '<p> Hello World! </p>',
  beforeRouterEnter(to, from, next) {
    // 이 컴포넌트로 네비게이션 되기 전에 실행
    // Home 컴포넌트는 아직 렌더링 되지 않음
  },
  beforeRouterUpdate(to, from, next) {
    // Home 컴포넌트의 내용이 변경되면 실행
    // `this` 객체에 접근이 가능 => 왜? => 이미 렌더링이 되었기 때문
  },
  beforeRouterLeave(to, from, next) {
    // Home 컴포넌트를 떠나기 전에 실행
    // 사용자가 저장하지 않은 편집 내용을 두고 실수로 떠나는 것을 방지
    // next(false)를 써서 이동 취소
  },
}
```

---

## 메타 필드

- 라우트를 만들면서 검색엔진에 문서의 내용을 요약해주는 메타 필드를 포함 가능
- `meta: {...}` 를 `VueRouter` 인스턴스에 적으면 끝

### 메타 필드에 접근하기

- 모든 라우트 레코드는 `$route` 객체에 `$router.matched`로 전달됨
- 라우트 레코드는 중첩가능

### 전역 가드에서 메타 필드 확인

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 메타 필드 가져오기
  }
})
```

---

## 라우터에서의 데이터 핸들링

- 라우트가 활성화되면 서버에서 데이터를 가져와야함
  - 탐색 후 가져오기
    - 컴포넌트의 `created()` 훅에서 데이터를 가져옴
    - 로드 상태를 표시 가능
  - 탐색 전 가져오기
    - 라우트 가드에서 네비게이션 전에 데이터를 가져옴
    - 가져오기 실패시, 경고 메세지 띄우는거 추천

### 방법 1. 탐색 후

```js
export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    getData() {
      this.loading = true
    },
  },
  created() {
    // 컴포넌트가 렌더링되면 데이터를 가져옴
    this.getData()
  },
}
```

### 방법 2. 탐색 전

---

## 마무리

틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
