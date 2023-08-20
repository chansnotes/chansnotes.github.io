---
layout: PostLayout
title: 'Vue.js 뽀개기 (9) 컴포넌트 재사용 - 슬롯'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-06-09
date: 2019-06-09
excerpt: 'Vue의 컴포넌트를 재사용하게 도와주는 슬롯 엘리먼트에 대해 요약하는 글입니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: 'Vue.js 뽀개기 (9) 컴포넌트 재사용 - 슬롯'
  - name: 'og:description'
    content: 'Vue의 컴포넌트를 재사용하게 도와주는 슬롯 엘리먼트에 대해 요약하는 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.

---

Vue의 가장 큰 장점은 Reusable (재사용이 가능한) 컴포넌트를 작성할 수 있다는 것입니다.

만약 자식 컴포넌트에 정의한 버튼을 부모 컴포넌트에서 특정 조건에 따라 색이 변화하게 만들려면 어떻게 해야 할까요?

Vue에서는 Slot (슬롯) 이라는 기능을 제공하여, slot안의 콘텐츠를 부모 컴포넌트에서 대체 할 수 있도록 만들어줍니다. Slot은 언제 사용하고, 컴포넌트 커뮤니케이션에 사용하는 Props랑은 어떻게 다른 것 일까요?

## Slot은 언제 필요 할까?

- 자식 컴포넌트 안의 특정 컨텐츠를 부모 컴포넌트에서 추가 혹은 재정의 하기를 원할 때

## Slot vs. Props

- `Props`는 부모에서 자식 컴포넌트로 **데이터 객체** 를 전달하는 속성
  - 자식 컴포넌트의 템플릿 및 자바스크립트에서 모두 활용 가능
- `Slot`은 부모 컴포넌트에서 자식 컴포넌트의 템플릿에 어떤 컨텐츠를 직접 작성 가능하게 함
  - 자식 컴포넌트에서 slot으로 정의된 부분에만 컨텐츠 전달 가능

---

## Slot 사용법

![slot](https://chansnotes.github.io/images/vue/vue_slot.jpeg)

- 자식 컴포넌트에 정의하게 되는 slot을 통해, 부모 컴포넌트에서 slot 부분을 변경하여 사용 가능
- Slot 부분을 부모 컴포넌트에서 정의 안하면, 자식 컴포넌트에 작성된 컨텐츠를 기본으로 사용
  - Slot 태그 안의 내용은 **대체 컨텐츠** 로 생각하면 쉬움

### 1. 단일 Slot

- 별도의 작업 없이, 자식 컴포넌트에 `slot`태그 부분을 부모 컴포넌트에서 정의하면 됨

```html
<!-- 자식 컴포넌트; myComponent.vue -->
<template>
  <div>
    <slot> 슬롯 정의 안하면, 기본으로 정의되는 컨텐츠 </slot>
  </div>
</template>

<!-- 부모 컴포넌트 -->
<template>
  <div>
    <my-component>
      <p>부모 컴포넌트에서 추가하는 컨텐츠</p>
    </my-component>
  </div>
</template>
```

### 2. 이름을 가지는 Slot (Named Slot)

- 자식 컴포넌트에서 `slot`에 `name`태그를 추가
- 부모 컴포넌트에서는 `slot=name-of-your-choice`로 특정 slot을 지정해서 조작 가능
- 이름이 없는 slot = 기본 슬롯
  - 일치하지 않는 컨텐츠의 포괄적인 컨텐츠 역할
  - 기본 슬롯이 없으면, 일치하지 않는 컨텐츠 삭제

```html
<!-- 자식 컴포넌트; myComponent.vue -->
<template>
  <div>
    <slot name="example"> 슬롯 정의 안하면, 기본으로 정의되는 컨텐츠 </slot>
    <slot name="example2"> 두 번째 슬롯 </slot>
  </div>
</template>

<!-- 부모 컴포넌트 -->
<template>
  <div>
    <my-component>
      <p slot="example">부모 컴포넌트에서 추가하는 컨텐츠</p>
      <p slot="example2">두 번째 슬롯에 추가하는 컨텐츠</p>
    </my-component>
  </div>
</template>
```

### Slot 사용시 주의사항

- 자식 컴포넌트에 스타일 적용은 자식 컴포넌트에 정의해야함
  - 부모 컴포넌트에 스타일을 정의해도, slot을 사용한 자식 컴포넌트에는 적용이 안됨
  - 자식 컴포넌트 스타일에 `scoped`를 명시해서, 해당 자식 컴포넌트 요소들에게만 적용되도록 하기

### Dynamic 컴포넌트 (동적 컴포넌트)

- 사용자의 선택에 따라 특정 컴포넌트를 렌더링 하려면?
- 부모 컴포넌트에서 불러온 자식 컴포넌트에 `v-bind:is` 속성 추가
  - 부모 컴포넌트 데이터 객체에 variable 추가해서 특정 컴포넌트를 지정하도록 설정

`<component v-bind:is="selectedComponent"></component>`

---

이번 포스트에서는 Vue 컴포넌트의 재사용성과 관련된 Slot에 대해 정리해보았습니다.
다음 포스트에서는 트랜지션에 대해 정리합니다.

틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
