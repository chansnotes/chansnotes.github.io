---
layout: PostLayout
title: 'Vue.js 뽀개기 (7) 컴포넌트 기본편'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-05-13
date: 2019-05-13
excerpt: 'Vue를 가장 강력한 프론트엔드 프레임워크로 만들어주는 기능인 컴포넌트에 대해 알아봅니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: 'Vue.js 뽀개기 (7) 컴포넌트 기본편'
  - name: 'og:description'
    content: 'Vue를 가장 강력한 프론트엔드 프레임워크로 만들어주는 기능인 컴포넌트에 대해 알아봅니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.

---

컴포넌트는 Vue를 가장 매력적인 프론트엔드 프레임워크로 만들어주는 기능 중 하나입니다.
저 역시도 기존의 HTML 페이지들을 재사용 가능하도록 캡슐화 시켜주는 컴포넌트라는 기능에 매료되어 React 대신에 Vue를 선택하게 되었습니다.

이번 글에서는 컴포넌트와 관련된 기본적인 사항들에 대해 알아보겠습니다.

## 컴포넌트 등록하기

- 원하는 HTML 페이지를 템플릿화하여, 여러곳에서 재사용이 가능
- 컴포넌트는 Vue 인스턴스를 확장해주는 역할
- 컴포넌트를 등록하는 방법에는 두가지가 존재:
  1.  전역 등록 (Global)
  2.  지역 등록 (Local)

### 1. 전역 등록

- 추가하려는 컴포넌트 파일 생성
- Vue 인스턴스가 생성된 `App.vue` 파일에 전역 컴포넌트로 등록

```js
// 컴포넌트 등록
Vue.component('new-component', {
  // tagName, options
  template: '<div> Hello </div>',
})

// Root 인스턴스 생성
new Vue({
  el: '#app',
})
```

### 2. 지역 등록

- Vue 인스턴스 내부에 컴포넌트를 정의하여, 특정 컴포넌트의 범위내에서만 사용 가능하게 만듬

```js
// Root 인스턴스 생성
new Vue({
  el: '#app',

  // 컴포넌트 등록
  components: {
    'my-comp': Child,
  },
})

var Child = {
  template: '<p> Hello </p>',
}
```

---

## 컴포넌트를 사용하기

```js
// mycomponent.vue
// export default를 통해 외부로 보내기
<template>
<div>
    <p> Hello </p>
</div>
</template>

<script>
export default {

}
</script>
```

```js
// App.vue
<template>
<div>
    <my-comp></my-comp>
</div>
</template>

<script>
import myComp from './mycomponent.vue'

export default {
    components: {
        myComp
    }
}

```

### 주의사항!

- 각각의 컴포넌트에 function들이 각각 작동하므로, 한 곳에서 데이터가 변경되어도 다른 곳에서는 바뀌지 않도록 **data 객체를 function으로 캡슐화** 해서 사용해야함에 주의!

- 에러메세지 = "Component template should contain exactly one root element"

  - 부득이하게도, 컴포넌트에 정의된 모든 템플릿 코드는 `<div>` 태그안에 정의가 되어있어야함

- 컴포넌트 파일 `<script>` 태그안에는 무조건 `export default{}`를 적어서 외부로 보내줘야함

- 한 컴포넌트에 style을 추가하면, 전역 취급되서 다른 컴포넌트들에도 적용됨
  - `<style scoped>`로 표기해서 지역 사용 가능!
    - Vue가 HTML element들에 임의의 이름을 부여함
