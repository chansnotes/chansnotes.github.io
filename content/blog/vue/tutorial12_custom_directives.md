---
layout: PostLayout
title: 'Vue.js 뽀개기 (12) 커스텀 디렉티브'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-06-15
date: 2019-06-15
excerpt: '사용자 정의 디렉티브를 만들어 DOM의 엘리먼트를 조작하는 법에 대해 요약하는 글입니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: 'Vue.js 뽀개기 (12) 커스텀 디렉티브'
  - name: 'og:description'
    content: '사용자 정의 디렉티브를 만들어 DOM의 엘리먼트를 조작하는 법에 대해 요약하는 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.

---

Vue에서는 DOM 엘리먼트를 조작하기위해 v-디렉티브를 사용합니다. 그런데 기본으로 제공되는 디렉티브 이외에 사용자가 정의하는 디렉티브를 만들 수는 없을까요?

아래에서는 사용자 정의 디렉티브 적용 방법과 사용법에 대해 요약합니다.

---

## 커스텀 디렉티브는 언제 사용합니까?

- 기본으로 제공되는 디렉티브외에 DOM 엘리먼트를 내가 원하는대로 조작하고 싶을때

## 커스텀 디렉티브 적용 방법

- 전역 사용 혹은 로컬 사용

### 전역 사용

- `main.js` 파일에 작성
- `Vue.directive('custom_directive', { })` 와 같은 형태로 커스텀 디렉티브 정의

### 로컬 사용

- 각 컴포넌트 파일에 작성
- 인스턴스에 `directives{ custom_directive: { }}`를 정의

---

## 디렉티브 만들기

- 커스텀 디렉티브는 5가지의 **훅 함수** 와 3가지의 **훅 전달인자** 가 있음
  - 훅 함수는 선택사항
  - 훅 전달인자는 3개 모두 pass를 해주되, 정의는 선택사항

### 5가지 Hooks (훅 함수)

1. `bind`
   - 디렉티브가 **처음 바인딩 될 때, 1번 호출됨**
   - 필수 전달 인자
     - `el`
     - `binding` = 수정 금지
     - `vnode` = 수정 금지
2. `inserted`
   - 디렉티브가 적용된 엘리먼트가 **부모 노드에 삽입 되었을 때 호출**
     - 부모 노드의 존재 보장
   - 필수 전달 인자
     - `el`
     - `binding`
     - `vnode`
3. `update`
   - 적용된 **엘리먼트를 포함한 컴포넌트가 업데이트된 후 호출**
     - 자식 업데이트는 확인 안함
   - 필수 전달 인자
     - `el`
     - `binding`
     - `vnode`
     - `oldVnode`
4. `componentUpdated`
   - 적용된 **엘리먼트를 포함하는 컴포넌트 + 자식 컴포넌트들이 업데이트 된 후 호출**
   - 필수 전달 인자
     - `el`
     - `binding`
     - `vnode`
     - `oldVnode`
5. `unbind`
   - 디렉티브가 **엘리먼트에서 적용이 해제 될 때 1번 호출**
   - 필수 전달 인자
     - `el`
     - `binding`
     - `vnode`

### 3가지 Passing Arguments (훅 전달인자)

1. `el`
   - 디렉티브가 바인딩 할 엘리먼트
2. `binding`은 6가지 속성을 가진 객체
   - `name`
     - 디렉티브의 이름을 정의 (`v-` 없이 이름만!)
   - `value`
     - 디렉티브에서 전달받은 값
   - `oldValue`
     - 이전 값
     - `update` 및 `componentUpdated`에서만 사용 가능
   - `expression`
     - 표현식 문자열
   - `arg`
     - 디렉티브 전달인자 (있는 경우만 존재)
   - `modifiers`
     - 포함된 수식어 객체
3. `vnode`
   - Vue 컴파일러가 만든 버추얼 노드
   - 아직 뭔말인지 모르겠음...
4. `oldVnode`
   - 이전의 버추얼 노드
   - `update` 및 `componentUpdated`에서만 사용 가능

## 주의사항

- 모든 전달인자는 읽기 전용으로 사용! (변경 금지)

---

### 사용예시 1. 배경색 적용

```js
// 전역 등록 방법입니다.
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.backgroundColor = binding.value
  },
})
```

```html
<!-- 아래의 문단에 배경색 적용 -->
<p v-highlight:background="red">Hello World</p>
```

### 사용예시 2. 배경색 및 글씨색 적용

```js
// 전역 등록 방법입니다.
// background에 바인딩하면 배경색 적용
// 그렇지 않으면 글씨색을 적용
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    if (binding.arg == 'background') {
      el.style.backgroundColor = binding.value
    } else {
      el.style.color = binding.value
    }
  },
})
```

```html
<!-- 아래의 문단에 글씨색 적용 -->
<p v-highlight="red">Hello World</p>
```

### 사용예시 3. 수식어 사용

```js
// 전역 등록 방법입니다.
// 3초의 딜레이 후에 색 변경
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    var delay = 0
    if (binding.modifiers['delayed']) {
      delay = 3000 // 3초 딜레이
    }
    setTimeout(() => {
      if (binding.arg == 'background') {
        el.style.backgroundColor = binding.value
      } else {
        el.style.color = binding.value
      }
    })
  },
})
```

```html
<!-- 아래의 문단에 글씨색 적용 -->
<p v-highlight:background.delayed="red">Hello World</p>
```

### 사용예시 4: 다중 수식어 적용

- 추후 정리 예정

---

Vue에서는 훅 함수와 훅 전달인자를 통해 사용자가 원하는 디렉티브를 만드는데 도움을 줍니다.
조금 복잡할 수도 있지만, 대부분의 경우에 훅 전달인자는 `el`과 `binding`만 주로 사용한다고 기억하시면 될 듯 합니다.

다음 글에서는 Vue-router, Vuex, Vuetify와 같은 라이브러리를 Vue 인스턴스에 전역으로 제공하는 플러그인에 대해 요약하려고 합니다.

틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
