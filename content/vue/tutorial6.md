---
layout: PostLayout
title: 'Vue.js 뽀개기 (6) CSS 스타일 넣기'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-05-12
date: 2019-05-12
excerpt: 'Vue 템플릿에 CSS 스타일을 적용하는 방법에 대해 알아봅니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: 'Vue.js 뽀개기 (6) CSS 스타일 넣기'
  - name: 'og:description'
    content: 'Vue 템플릿에 CSS 스타일을 적용하는 방법에 대해 알아봅니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.

---

이전 글에서 잠깐 보았던 v-디렉티브들 기억하시나요?
이번 글에서는 v-디렉티브들 중, element class 및 style을 조작할 수 있게해주는 `v-bind`에 대해 정리하려고 합니다.
`v-bind`는 쉽게 말해 class 혹은 style 태그에 데이터를 바인드 시켜주는 역할을 합니다.
먼저 HTML 태그의 속성인 `class`에 바인딩 하는법을 정리한 뒤,
우리의 DOM 객체들을 아름답게 꾸며줄 `style`에 바인딩 하는법을 정리하도록 하겠습니다.

## HTML 클래스 바인딩

- `<div v-bind:class="{ 특정 클래스: 발동 조건 }"></div>`

  - 클래스 바인딩은 `v-bind:class`로 객체를 전달
  - 큰따옴표안에 Interpolation (Mustache) 넣기
  - 왼쪽은 HTML element에 추가할 클래스 속성
  - 오른쪽은 왼쪽에 추가할 클래스 속성이 언제 사용되어야 하는지 조건을 정의
    - 발동 조건이 false로 정의되어 있으면, class 속성 추가 안됨

- **Computed 속성에도 바인딩이 가능!!!**

  - Interpolation 없이, 큰따옴표 안에 Computed property 함수 넣기

- **Array 바인딩**
  - `[firstClass, secondClass]`를 v-bind 객체로 전달 가능
  - 발동 조건이 없는 클래스라면, 항상 element에 적용
  - 삼항 연산자를 사용할 때에 Array로 전달하기

---

## Style 바인딩

- `<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px'}">`
  - 스타일 바인딩은 `v-bind:style`로 객체를 전달
    - CSS와 동일해보이나, 사실 JavaScript 객체임
  - 되도록이면 스타일 객체를 data 속성에 정의하고 사용하는 것이 좋음
  - HTML 클래스와 마찬가지로 Array 바인딩 가능

---

이번 포스트에서는 Vue 템플릿으로 생성되는 HTML element의 클래스와 스타일 속성에 데이터 객체를 보내는 방법에 대해 알아보았습니다.
부실한 내용이나 틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
