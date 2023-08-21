---
layout: PostLayout
title: 'Vue.js 뽀개기 (3) Vue로 DOM 조작하기'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-05-06
date: 2019-05-06
sitemap:
  changefreq: daily
  exclude: false
excerpt: 'Vue가 DOM을 어떻게 조작하는지에 대해 정리한 글입니다.'
meta:
  - name: 'og:title'
    content: 'Vue.js 뽀개기 (3) Vue로 DOM 조작하기'
  - name: 'og:description'
    content: 'Vue가 DOM을 어떻게 조작하는지에 대해 정리한 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> #### 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.

---

이번 글에서는 Vue.js가 어떻게 렌더링된 DOM을 조작하는지에 대해 정리하고자한다. 먼저, Vue에서 가장 중요한 템플릿 문법인 Interpolation에 대해서 알아보자.

## Interpolation (보간법)

- Vue.js는 HTML 코드를 구문 분석하여 템플릿을 작성
- Vue의 내부 시스템에 저장하고, 이를 DOM으로 렌더링함
- **Mustache** 를 사용하여 텍스트를 interpolate함
  - 와 같이 이중 중괄호에 넣어서 사용
    _ Mustache 태그는 안에 있는 데이터 객체의 속성 값으로 대체함
    _ Mustache 태그안에 정의된 것은 일반 텍스트로 취급되기 때문에, Raw HTML을 보간하고자 할 때에는 `v-html`을 사용해야함
- 데이터 객체의 속성이 실시간으로 변하면, DOM에서도 실시간으로 갱신됨
  _ `v-once` 를 사용하면, 데이터를 정적으로 만들어주는 1회성 interpolation이 가능함
  _ 데이터 변화에 따라 DOM이 다시 렌더링 되는 것을 방지해줌
- Mustache안에서 JavaScript 표현식의 모든 기능을 사용 가능
  _ **Ternary expression (삼항 연산자)까지 사용이 가능함!**
  _ 하지만, 단일 표현식으로 작성해야함
  _ variable을 정의하는 것과 같은 **구문 작성 안됨 **
  _ **조건문도 안됨**
- HTML 속성 태그에서 사용은 불가 \* 대신 `v-bind`를 사용하여 Vue 인스턴스에 정의된 데이터 객체들과 연결시킬 수 있음

#### 디렉티브란? (Directives)

- Vue.js에서 사용되는 `v-` 접두사가 붙은 특수한 속성들
- DOM을 반응적으로 조작 가능하게 해주는 역할
- 디렉티브의 속성 값은 단일 JavaScript 표현식이 됨
- 전달인자를 가질 수 있음 \* 콜론을 붙여 전달인자 사용

---

## DOM 이벤트 핸들링

### v-on으로 DOM 이벤트 청취 (Event Listener)

Vue.js에서는 DOM에서 사용자 인터액션으로 발생하는 이벤트들을 `v-on`을 사용해서 아주 쉽게 조작할 수 있게해준다.

- 예제: 버튼 클릭 이벤트를 청취하는 법

```html
<!-- v-on을 사용해서 버튼 클릭 이벤트를 청취하고, 
	이벤트 발생에 맞추어 내가 작성한 메소드를 실행-->
<button v-on:click="myFunction">
  <!-- 자기 자신의 매개변수와 자동으로 생성되는 event 객체를 메소드로 보낼 수 있음-->
  <!-- $event를 2번째 매개변수로 입력해주면됨 -->
  <button v-on:click="increase(2, $event)"></button>
</button>
```

### 이벤트 수식어 사용 (Event Modifier)

- 함수 사용 없이 Vue에서 제공하는 이벤트 수식어를 통해서 조금 간편하게 DOM 데이터 조작이 가능함
- 예제: 이벤트 수식어 사용 예시

```html
<!-- 방법1: 직접 메소드를 정의한다 -->
<span v-on:mousemove="dummy"></span>

<!-- 방법2 (초간단): 이벤트 수식어를 사용한다 -->
<span v-on:mousemove.stop=""></span>

<!-- 키 수식어 사용: keydown 버튼 이벤트에 맞추어 값을 데이터 객체에 저장 -->
<input type="text" v-on:keydown="value = $event.target.value" />
```

- 사용 가능한 이벤트 수식어들의 전체 리스트는 [공식문서](https://kr.vuejs.org/v2/guide/events.html '공식문서')를 참고해주세요.

### 양방향 데이터 바인딩 (v-model)

- 위에서 살펴본 Vue의 디렉티브들은 Vue 인스턴스에 정의된 데이터 객체들을 가져오기만 하는 단방향 바인딩임
- 그렇다면 사용자의 입력에 맞추어 Vue 인스턴스에 저장된 데이터 객체의 값은 어떻게 바꿀까? (= Input form은 어떻게 다뤄야 할까?)
  _ `v-model`을 사용하면 쉽게 바꿀 수 있음
  _ 초기값을 무조건 만들어주어야 사용이 가능 \* Select, Radio button, checkbox 등과 사용하면 짱

- 예시: 셀렉트 사용

```js
// 셀렉트
<template>
<select v-model="selected">
	<option> A </option>
	<option> B </option>
	<option> C </option>
</select>
</template>

<script>
export default{
	data: {
		selected: "A"
	}
}
</script>
```

### 디렉티브 사용 관련 꿀팁!!!

- 매번 v-on, v-bind등을 텍스트 에디터로 입력하게 되면 조금 번거로울 수도 있기 때문에 Vue.js에서는 이 두가지 디렉티브에 대해서는 줄임말을 쓸 수 있게 만듬
  _ v-on 은 `@` 으로 대체
  _ v-bind는 `:`으로 대체

이번 글에서는 기본 템플릿 문법인 Interpolation과 DOM에서 발생하는 이벤트들을 반응적으로 조작 가능하게 해주는 v-디렉티브들에 대해 정리해보았습니다.
다음 글에서는 또다른 v-구문인 `v-if`와 `v-for`를 사용한 조건문과 반복문을 통해 리스트를 동적으로 DOM에 생성하는 방법을 정리하도록 하겠습니다.
