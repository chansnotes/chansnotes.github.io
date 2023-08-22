---
layout: PostLayout
title: 'Vue.js 뽀개기 (14) 텍스트 형식 변환을 위한 필터'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-06-17
date: 2019-06-17
excerpt: 'Vue에서 제공하는 기능 중, 텍스트의 형식을 변환시켜주는 필터에 대해 정리하는 글입니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: 'Vue.js 뽀개기 (14) 텍스트 형식 변환을 위한 필터'
  - name: 'og:description'
    content: 'Vue에서 제공하는 기능 중, 텍스트의 형식을 변환시켜주는 필터에 대해 정리하는 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.

---

사용자가 입력한 영문자를 모두 대문자로 바꾸는 방법은 없을까요?

Vue.js가 공식적으로 제공하는 기능인 **필터** 는 텍스트를 원하는 대로 형식을 변환시켜주는 역할을 합니다. 비록 어떻게 변환시킬 것인지는 개발자가 필터 함수를 직접 만들어야하지만, 저장된 데이터를 실제로 변환시키지 않고 템플릿에서만 마법처럼 바꾸어줍니다.

---

## 필터는 언제 사용합니까?

- 기존의 데이터는 유지하면서, UI에 보이는 텍스트를 다른 형식으로 변환시키고 싶을때

## 필터의 사용범위

- 로컬 및 전역으로 사용이 가능

{% raw %}

## 필터 사용 방법

- 필터는 항상 `data`객체에 정의된 값을 입력값으로 필요로함
- 템플릿에는 중괄호 보간법, `mustache interpolation`, 혹은 `v-bind`를 선언
  - `{{ yourInput | Capitalized }}`
  - 맨 앞이 입력값, 뒤에가 사용되는 필터 함수
  - 입력값과 필터 함수 사이에 파이프 심볼 (`|`)을 넣어주기
- 입력값으로 사용된 값이 실제로 변환되는 것이 아니라, 우리에게 보여지는 결과 화면에서만 변환
  {% endraw %}

---

## 로컬 등록

- 로컬 등록은 해당 컴포넌트에 정의하기!

```html
<template>
  {% raw %}
  <p>{ text | to-uppercase }}</p>
  {% endraw %}
</template>

<script>
  export default {
    data() {
      return {
        // 입력값이 text이기 때문에, 데이터 객체에 text 값을 정의합니다.
        // 값은 공백이여도 상관이 없습니다.
        text: 'Hello there!',
      }
    },
    filters: {
      'to-uppercase'(value) {
        return value.toUpperCase()
      },
    },
  }
</script>
```

## 전역 등록

```js
// main.js 파일에 등록
Vue.filter('to-lowercase', function(value) {
  return value.toLowerCase()
})
```

## 별도의 파일로 등록

- `filter.js` 파일에 작성
- 혹은 더 나은 폴더 구조를 위해 `filter` 폴더에 `index.js` 파일에 작성

```js
// index.js
export function lowercase(value) {
  return value.toLowerCase()
}

export function uppercase(value) {
  return value.toUppaerCase()
}
```

```js
// main.js
import * from './filter

// 사용자 정의...

```

---

{% raw %}

## 여러개의 필터를 순차 적용하기

- 필터는 여러개를 순차적으로 적용하는 체이닝이 가능
- `{{ yourInput | toUpperCase | toLowerCase }}`
  - 먼저, `yourInput`이 upper case로 변환
  - 변환된 결과가 다시, `toLowerCase` 필터의 입력값이 됨
  - 소문자로 변환된 결과가 화면에 출력
- 참고로 필터는 자바스크립트 함수이기 때문에 **두개 이상의 입력 값을 가질 수 있음!**
  _ `{{ yourInput | toUpperCaese('arg1', 'arg2')}}`
  _ 먼저, `yourInput`이 필터 함수에 의해 변환
  _ `arg1`이 두번째 입력값으로 전달되어 변환
  _ `arg2`가 세번째 입력값으로 전달되어 변환
  {% endraw %}

## (번외) Computed 속성을 이용한 필터 정의

- Vue의 computed 속성을 이용해서 필터 정의 가능
- computed 속성의 장점은 값의 변화가 있을때만, 연산을 다시 수행한다는 점

```html
<!-- 사용자가 입력한 값에 따라, fruits에서 텍스트가 일치하는 항목을 필터링해서 보여줌 -->
<template>
  {% raw %}
  <p>{{ text | to-uppercase }}</p>
  {% endraw %}
  <hr />
  <input v-model="filterText" />
  <ul>
    <li v-for="fruit in fruits ">{{ fruit }}</li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        text: 'Hello there!',
        fruits: ['Apple', 'Bannana', 'Mango', 'Melon'],
        filterText: '',
      }
    },
    filters: {
      // 일반적인 지역 필터 등록
      'to-uppercase'(value) {
        return value.toUpperCase()
      },
    },
    // Vue에서 제공하는 필터는 아니지만, 비슷한 역할 수행 가능
    computed: {
      filteredFruits() {
        return this.fruits.filter(element => {
          return element.match(this.filterText)
        })
      },
    },
  }
</script>
```

---

다음 글에서는 렌더 함수와 JSX에 대해 소개합니다.

틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
