---
layout: PostLayout
title: 'Vue.js 뽀개기 (2) Vue 인스턴스와 라이프사이클'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-05-05
date: 2019-05-05
sitemap:
  changefreq: daily
  exclude: false
excerpt: 'Vue 인스턴스와 라이프사이클에 대해 정리한 글입니다.'
meta:
  - name: 'og:title'
    content: 'Vue.js 뽀개기 (2) Vue 인스턴스와 라이프사이클'
  - name: 'og:description'
    content: 'Vue 인스턴스와 라이프사이클에 대해 정리한 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> #### 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.

---

이번 글에서는 Vue 인스턴스와 이 인스턴스가 어떠한 라이프사이클을 가지고 작동이 되는지 정리하려고 합니다. 잘못된 정보 혹은 오탈자등 글에 대한 코멘트는 언제든지 남겨주세요!

## Vue 인스턴스란?

- DOM과 HTML의 중개자
- Vue 인스턴스는 여러개 생성이 가능하며, 각각은 고유한 Component (이하 컴포넌트)로 구성되어 있음
  - 각 컴포넌트들은 재사용 가능
- Vue 인스턴스2 에서 1에 정의된 property를 불러올 수 있음

```javascript
var vm1 = new Vue({
  // ... 기타 코드 ... //
  data: {
    title:'asd'
  }
});

var vm2 = new Vue({
  // 아래처럼 vm1의 instance에 정의된 property를 불러올 수 있음
  vm1.title = 'Changed';

})
```

- 각 인스턴스들은 data property 객체에 있는 모든 속성을 Proxy (프록시) 처리함
  _ Vue 인스턴스에 존재하는 데이터 객체는 Vue watcher에 저장되고 감시를 받게됨
  _ 따라서, data가 변경되면 자동으로 화면이 다시 렌더링됨

### VueJS DOM 업데이트 방식

- Vue는 Virtual DOM을 사용하여 느린 DOM 렌더링을 수행하지 않음
- Virtual DOM과 Vue instance의 차이를 먼저 확인함
- 그 후, 바뀐 New virtual DOM (=template)의 부분을 가져와서 Real DOM에 업데이트

---

## Vue 인스턴스의 속성들

Vue 인스턴스에 추가 가능한 속성들은 2019년 5월 기준 12가지가 있다. ([공식문서참조](https://kr.vuejs.org/v2/api/#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%86%8D%EC%84%B1))
12가지 중 일반적으로 가장 자주 쓰게 될 3가지를 아래에 정리하였다.

- `$el`

  - 뷰 인스턴스가 관리하게 되는 root DOM 요소
  - HTML로 정의된 템플릿을 연결

- `$data`

  - 뷰 인스턴스가 가지는 데이터 객체
  - 뷰 인스턴스 범위 밖에서 정의하여도 data: **yourData** 로 명시 후, `vm.__yourData__` 로 바로 액세스 가능
  - 데이터 객체는 프록시 처리되어, 데이터 변경시 자동으로 DOM을 업데이트함

- `$ref`
  - HTML에 있는 요소를 뷰 인스턴스내에서 액세스 가능하게 만들어줌
  - HTML 요소에 `ref="__"` 태그를 추가하여 사용
  - 뷰 인스턴스를 변수로 정의하고, 범위 밖에서도 JavaScript 코드로 사용 가능

### Vue 인스턴스안에 템플릿 만들기

- 뷰 인스턴스안에서 DOM에 렌더링 할 Template을 바로 정의할 수 있음

```javascript
var vm3 = new Vue({
  template: '<h1> Hello! </h1>',
})
```

- 단점:
  1. 여러줄로 작성하기 어려움 (String 포맷으로 작성해야하기 때문)
  2. 구문 강조 지원도 안되서 가독성이 떨어짐

여기까지가 뷰 인스턴스에 대한 간단한 설명입니다.
다음으로는 뷰 인스턴스가 어떠한 생애주기를 거쳐서 생성되고 없어지는지 알아보도록 하겠습니다.

---

## Vue 라이프사이클

![vue-lifecycle](https://vuejs.org/images/lifecycle.png){: .align-center}

위의 그림을 보면 어떤 방식으로 뷰의 라이프사이클이 진행되는지 한눈에 볼 수 있다.
뷰의 라이프사이클은 간단하게 `create`, `mount`, `update`, `destroy` 크게 4가지로 나눌 수 있다.

1. `beforeCreate()`

- 데이터와 이벤트가 초기화

2. `created()`

- 인스턴스 생성
- 명시된 템플릿 혹은 `$el`에 지정된 템플릿을 컴파일함

3. `beforeMount()`

- el 부분을 컴파일된 템플릿으로 대체

4. `mounted()`

- **DOM에 마운트**
- 뷰 인스턴스가 여기서 DOM이랑 연결됨
- 이 말은 즉, 뷰 인스턴스의 데이터 객체가 변하게되면 이를 감지하고 DOM으로 자동 업데이트 한다는 뜻
  - `beforeUpdate()`
    - 데이터 변화를 감지
    - 가상의 DOM에 렌더링
  - `updated()`
    - 가상 DOM에 렌더링 된 것을 실제 DOM에 마운트 시키고 업데이트

5. `beforeDestroy()`

- watcher, child component, event listener 등을 모두 제거

6. `destroyed()`

### Mount 관련 팁

- 뷰 인스턴스에서 어디에 mount 할지 정하지 않고, 밖에서 정의 가능
- 어디에 mount를 해야 할지 모를때에 사용하는 것을 추천
  - `vm.$mount('#app');`

이번 포스트에서는 Vue 인스턴스가 무엇인지 그리고 어떤 속성들을 가졌는지에 대한 간단한 설명을 시작으로,
이러한 인스턴스가 어떠한 방식으로 DOM과 연계되는지에 대해 알아보았습니다.
(~~부실한 내용은 지적 꼭 부탁드립니다!~~)

이제 다음편에서는 Vue 코드로 실제 DOM과 인터액션을 하는 방법에 대해 알아보도록 하겠습니다.
