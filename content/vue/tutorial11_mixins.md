---
layout: PostLayout
title: 'Vue.js 뽀개기 (11) 믹스인'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-06-13
date: 2019-06-13
excerpt: 'Vue 컴포넌트들에 재사용 가능한 기능을 배포하도록 도와주는 믹스인에 대해 요약하는 글입니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: 'Vue.js 뽀개기 (11) 믹스인'
  - name: 'og:description'
    content: 'Vue 컴포넌트들에 재사용 가능한 기능을 배포하도록 도와주는 믹스인에 대해 요약하는 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.

---

Vue를 공부 하면 할 수록 Vue 프레임웍은 정말 재사용 및 유지보수를 쉽게 만들어준다고 생각을 하게됩니다.
만약 여러개의 컴포넌트에서 공통적으로 사용하는 기능이 있는데, 이를 매번 각 컴포넌트에 작성하게 된다면 귀찮은데다가 유지/보수도 어려워집니다.

이에 대한 해결책으로 앞서 정리했었던 컴포넌트와 슬롯 등에 이어, **믹스인 (Mixins)** 이라는 기능을 Vue에서 제공합니다.

제가 이해한 믹스인의 정의는 이렇습니다...

> ### 믹스인은 컴포넌트들에 재사용이 가능한 (캡슐화한) 기능을 배포하는 방법

이런 멋진 기능이 있었다니... 아래에서는 믹스인의 개념과 사용법에 대해 요약합니다.

---

## 믹스인은 언제 사용합니까?

- **여러 컴포넌트에 공통적으로 사용하는 기능을 재사용** 하고 싶을때

## 믹스인 적용 범위

- 믹스인을 불러오는 컴포넌트에서만 작동
  - `import`를 안한 컴포넌트는 안건드림

## 믹스인 객체의 옵션들

1. `data`
2. `methods`
3. `comptued`
4. `created`와 같은 라이프사이클 콜백
5. 이외에도 Vue 인스턴스 옵션 사용 가능

## 믹스인 참고사항

- 믹스인에 정의한 기능들은 믹스인을 불러오는 컴포넌트의 고유 옵션과 혼합됨
  - 컴포넌트 고유 옵션의 data를 없애지 않음
  - 컴포넌트 옵션에 믹스인 옵션이 **추가** 된다고 생각하면됨

## 믹스인과 컴포넌트 객체간에 충돌하는 키가 있다면?

- 믹스인 옵션은 제공된 순서대로 호출됨
- 믹스인 훅이 먼저 호출되고, 컴포넌트 훅이 다음에 호출됨
  - **충돌하는 키가 있다면, 컴포넌트 옵션이 호출됨** (우선순위)

---

## 믹스인 사용법

- mixins 폴더에 `__name__.js` 파일에 믹스인 정의
- vue 인스턴스를 만들듯이, 믹스인 인스턴스 작성
  - `export` 꼭 해주기
- 사용하려는 컴포넌트에서 해당 믹스인 파일을 `import`
- 해당 컴포넌트 인스턴스에 `mixins: [__name__]`으로 믹스인 호출

### 믹스인 사용 예시

```js
// clickCount.js
export const clickCount = {
  // Data 속성 정의
  data() {
    return {
      isShowing: false,
      clicked: 0,
    }
  },
  // computed 속성 정의
  // clicked의 숫자가 1씩 증가하는 메소드
  methods: {
    clickIncrement() {
      return this.clicked++
    },
  },
}
```

```html
<!-- app.vue -->
<template> ... </template>
<script>
import { clickCount } from './clickCount.js';

export default {
    data() {
      return {
          name: 'helloWorld'
      }
    },
    mixins: [clickCount]
}
```

---

## Global 믹스인 (특별한 경우에만 사용!)

- 써드파티 컴포넌트를 포함하여 만들어진 모든 Vue 인스턴스에 적용됨
- 프로덕션 환경에서는 비추천
- `main.js`에 정의하면 전역으로 사용가능
- Vue 파일이 2개면 3번 호출됨
  - `main.js`에서 한 번 이미 호출이 되기 때문

```js
// main.js에 믹스인을 정의하면, 전역 사용!
...

Vue.mixin({
    data() {
        return: {
            name: myName
        }
    }
})
```

---

만약 여러 컴포넌트들에서 공통으로 사용하는 기능이 있다면, 이를 믹스인으로 구현하여 활용하면 아주 유용하게 쓰일 것 같습니다.

Vue에서는 DOM 엘리먼트를 조작하기 위해 디렉티브를 (`v-if`와 `v-on` 등) 사용합니다. 이미 정의된 디렉티브외에 내가 원하는 기능을 가진 디렉티브를 만들 수 있을까요?
다음 글에서는 커스텀 디렉티브에 대해 요약하려고 합니다.

틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
