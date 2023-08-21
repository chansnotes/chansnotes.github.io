---
layout: PostLayout
title: 'Vue.js 뽀개기 (13) 플러그인'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-06-16
date: 2019-06-16
excerpt: '자주 사용하는 기능들을 묶어 플러그인으로 작성하는 법에 대해 정리하는 글입니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: 'Vue.js 뽀개기 (13) 플러그인'
  - name: 'og:description'
    content: '자주 사용하는 기능들을 묶어 플러그인으로 작성하는 법에 대해 정리하는 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.

---

자주 쓰는 메소드나 믹스인, 커스텀 디렉티브 등을 모든 컴포넌트에서 사용이 가능하게 만들 수는 없을까? 이 문제를 도와주기 위해 Vue에서는 **플러그인** 이라는 개념을 소개합니다.

플러그인을 사용하게되면, 각각의 컴포넌트에 필요한 메소드, 믹스인 등을 매번 따로 불러오지 않아도 됩니다.
알게 모르게 사용중인 플러그인의 예로는, 우리가 Vue 어플리케이션을 만들게되면 자주 사용하게되는 `vue-router`, `vuex`, `vuetify`등과 같은 라이브러리들이 있습니다.
이들은 모두 플러그인 형태로 Vue 인스턴스에 추가됩니다.

---

## 플러그인은 언제 사용합니까?

- 자주 사용하는 라이브러리, 메소드, 속성, 커스텀 디렉티브, 트랜지션 등을 Global 수준 기능으로 Vue 어플리케이션에 추가하고 싶을 때

## 플러그인 유형

1. 전역 메소드 혹은 속성 추가
2. 디렉티브, 필터, 트랜지션과 같은 에셋을 전역으로 추가
3. 믹스인을 전역으로 추가
4. `Vue.prototype`에 Vue 인스턴스 메소드 추가 (??)

## 플러그인 사용 방법

- 플러그인을 `.js` 파일로 작성
  - `MyPlugin.install = function (Vue, options){ }` 메소드를 노출해야함
- `main.js` 파일에서 해당 플러그인을 사용하겠다고 명시
  - `Vue.use(MyPlugin)`으로 플러그인 호출
  - 같은 플러그인을 여러번 호출해도, 1번만 설치됨

---

## 플러그인 작성 예시

```js
// ..src/plugins/myPlugin.js
const MyPlugin = {
    install(Vue, options) {
        // 1. 전역 메소드 혹은 속성 추가
        Vue.myGlobalMethod () => {

        }

        // 2. 전역 에셋 추가
        Vue.directive('my-directive', {
            bind(el, binding, vnode){

            }
        })

        // 3. 전역 믹스인 추가
        Vue.mixin({
            created: function() {

            }
        })

        // 4. Vue 인스턴스 메소드 추가
        Vue.prototype.$myMehtod = (options) => {

        }
    }
}

export default MyPlugin;
```

## 플러그인 호출 방법

```js
// main.js

Vue.use(MyPlugin, {
  // option을 선택적으로 전달 가능
  someOption: true,
  otherOption: false,
})
```

---

다음 글에서는 텍스트를 형식을 변환시켜주는 필터에 대해 소개합니다.

틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
