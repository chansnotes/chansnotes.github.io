---
layout: PostLayout
title: 'Vue.js 뽀개기 (4) 조건문과 반복문'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-05-07
date: 2019-05-07
excerpt: 'Vue에서는 조건문과 반복문을 어떻게 사용하는지에 대해 정리한 글입니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: 'Vue.js 뽀개기 (4) 조건문과 반복문'
  - name: 'og:description'
    content: 'Vue에서는 조건문과 반복문을 어떻게 사용하는지에 대해 정리한 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.

---

이전 글에서는 Vue가 어떻게 DOM을 조작하는지에 대해 정리를 하였습니다. Vue는 디렉티브를 사용해서 DOM의 이벤트를 듣고 주어진 역할을 수행합니다.

그렇다면 Vue에서 특정 조건에만 DOM에 렌더링 하고 싶으면 어떻게 할까요?
또한, 리스트 나열과 같이 하나의 Loop에서 반복되는 작업은 어떻게 만들까요?

Vue에서는 다른 프로그램 언어들과 마찬가지로 if 와 for 를 제공합니다.
먼저, 조건문을 사용하고 싶을때에 쓰는 `v-if`에 대해 정리하도록 하겠습니다.

## 조건문 (v-if)

- 기본적인 로직은 프로그램언어에서 if-else와 같음
- `v-if`를 사용하면 지정한 태그를 특정 조건에서 DOM에 렌더링이 안되게 없앨 수 있음
- `v-else` 및 `v-else-if`는 가장 최근에 정의된 `v-if`와 자동으로 연동됨
- Nested 구조로 포함된 요소들도 한꺼번에 `v-if`에 의해 DOM에 생성되거나 없어짐
- 만약 DOM에서 렌더링은 하지만 특정 조건에서 보여지지 않게 하려면 `v-show`를 사용
  _ 이 경우, 지정한 태그의 display 속성이 `none`으로 표시됨
  _ DOM에 렌더링은 된다는 뜻

```html
<!-- v-if는 show가 true일때 DOM에 렌더링됨 v-show는 항상 렌더링 되어있지만, show가 false면 display 속성이 none으로 변경됨 -->
<div id="app">
  <p v-if="show">You can see me</p>
  <p v-else>No</p>

  <button @click="show = !show">Switch</button>
  <p v-show="show">haha</p>
</div>
```

---

## 반복문 (v-for)

- 리스트의 데이터를 나열하고 싶을때에는, `v-for` 사용

  - For-loop과 마찬가지로 리스트 element를 하나씩 Looping
  - `(item, index) in array` 로 index 값 추출 가능
  - 순서는 item이 첫번째; index가 항상 두번째

- 예시 1: 딕셔너리

```html
<ul>
  <li v-for="person in persons">
    <div v-for="(v, key, i) in person">
      {{ key }} : {{ v }} - {{ i }}
    </div>
  </li>
</ul>
```

- 예시 2: 새로운 데이터 추가 \* `.push()` 수식어 사용

```html
<!--Vue.js가 알아서 push된 object를 proxy해줌;
      1. push를 통해 array에 object 추가
      2. Vue.js가 바뀐 array object를 출력 -->
<button @click="ingredients.push('spices')">Add new</button>
```

- 예시 3: 값이 바뀌는 것을 방지

```html
 <!-- 존재하는 element 덮어쓰기  (Vue에게 update되는 element 알리기)
      v-bind를 사용하여 Position 및 값 그자체를 저장하고,
      이를 통해 element를 덮어 쓸때, Vue가 지정한 특정 값이 바뀌는 것을 보증
     list item에 key를 바인딩 시키기!!
      리스트에 assign된 위치가 다른 버그는 이렇게 해결이 가능 -->
    <ul>
      <li v-for="ing in ingredients" :key="ing">{{ ing }}</li>
    </ul>
</div>
```

이번 포스트에서는 Vue에서 사용하는 조건문과 반복문 디렉티브인 `v-if`와 `v-for`에 대해 알아보았습니다.
다음 포스트에서는 제가 공부하는 중 조금 이해하기 어려웠던 computed property에 대해 정리를 해보겠습니다.
부실한 내용이나 틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
