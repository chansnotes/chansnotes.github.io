---
layout: PostLayout
title: '[Vuex 뽀개기] (2) Vuex 모듈화하기'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-07-13
date: 2019-07-13
excerpt: 'Vuex를 모듈화해서 사용하는 방법을 정리합니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: '[Vuex 뽀개기] (2) Vuex 모듈화하기'
  - name: 'og:description'
    content: 'Vuex를 모듈화해서 사용하는 방법을 정리합니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> Vuex 공식문서를 참조하여 정리하였습니다.

---

## Module (모듈)

- 일반적으로 Vuex store는 한개의 `store` 객체 안에 모든 상태들이 포함됨
- 중/대형 규모의 복잡한 프로젝트에서 Vuex 저장소를 모듈로 분산해서 관리 가능
  - 모든 모듈은 `state`, `getters`, `mutations`, `actions` 및 중첩된 모듈 포함 가능

### 모듈 폴더 구조

- 아래의 폴더 구조는 Vuex 공식문서에서 추천하는 구조

```bash
.
└── store           --> Vuex 관련 파일을 보관하는 폴더
 ├── index.js       --> 모듈을 Store 객체로 내보내는 역할
 └── modules        --> 개별 모듈들을 보관하는 폴더
   ├── moduleA.js
   ├── moduleB.js
   └── moduleC.js
```

### 기본 사용법

- module 파일을 작성하고, 안에 `state`, `getters`, `mutations`, `actions`을 정의
- `index.js` 파일에서 사용하고자하는 모듈을 `Vuex.Store` 객체로 내보냄

```js
// index.js
export const store = new Vuex.Store({
  modules: {
    a: moduleA,
  },
})
```

```js
// moduleA.js
const moduleA = {
    state: { ... },
    mutations: { ... },
    actions: { ... },
    getters: { ... }
}

```

## Namespace (네임스페이스)

- module안의 `getters`, `mutations`, `actions`들은 전역으로 등록이됨.
  - 여러 모듈이 같은 이름으로 사용이 불가능하다는 말
- `namespaced`를 통해 각 모듈이 독립적으로 사용되거나, 같은 이름으로 재사용되게 설정 가능

### 코드로 이해하기

#### 틀린 방법

```js
// 아래와 같이 모듈을 만들면, 에러가 발생함

// moduleA.js
const moduleA = {
    state: { ... },
    mutations: {
        save() {}
    }
}

// moduleB.js
const moduleB = {
    state: { ... },
    mutations: {
        save() {}
    }
}
```

#### 올바른 방법

```js
// namespaced를 통해서 각 모듈을 전역으로 등록안하고, 경로를 기반으로 네임스페이스 지정

// moduleA.js
const moduleA = {
    state: { ... },
    mutations: {
        save() {}
    },
    namespaced: true
}

// moduleB.js
const moduleB = {
    state: { ... },
    mutations: {
        save() {}
    },
    namespaced: true
}
```

## rootState와 rootGetters

- 만약 moduleB에서 moduleA의 state 혹은 getter를 사용하려면 어떻게 해야 할까?
- 3번째 인자로 `rootState`를, 4번째 인자로 `rootGetters`를 넣어주기
  - `rootState`는 상태를 최상위로 올려보내고, `rootGetters`는 getter를 최상위로 올려보낸다고 보면됨
- 마찬가지로 moduleB에서 상태를 변이시키거나 액션을 실행시켜 변화를 주려면, `dispatch`와 `commit`의 3번째 인자로 `{root:true}`를 전달

### 예시1: 전역으로 등록된 모듈의 state, getter 사용

```js
// moduleA.js
const moduleA = {
    state: {
        count: 0
     },
    getters: {
        someGetter: state => {
            return state.count
        }
    },
    actions: {
        someAction (context, payload){
            ...
        }
    }
}

// moduleB.js
const moduleB = {
    state: { ... },
    getters: {
        otherGetter (state, getters, rootState, rootGetters) {
            getters.newGetter      // moduleB 내부에 정의된 newGetter를 호출
            rootGetters.someGetter // moduleA의 getter를 호출
        },
        newGetter: state => {
            return rootState.count // moduleA의 state인 count를 호출
        }
    },
    actions: {
        otherAction ({dispatch, commit, getters, rootGetters}) {
            dispatch('newAction') // mo duleB 내부에 정의된 newAction 호출
            dispatch('someAction', null, { root:true })  // moduleA의 someAction 호출

            commit('newMutation') // mo duleB 내부에 정의된 newMutation 호출
            commit('someMutation', null, { root:true })  // moduleA의 someMutation 호출
        },
        newAction (context, payload) {
            ...
        }
    }
}
```

### 예시2: namespaced로 등록된 모듈의 state, getter 사용

```js
// moduleA.js
const moduleA = {
    state: {
        count: 0
     },
    getters: {
        someGetter: state => {
            return state.count
        }
    },
    namespaced:true
}

// moduleB.js
const moduleB = {
    state: { ... },
    getters: {
        otherGetter (state, getters, rootState, rootGetters) {
            rootGetters['moduleA/someGetter'] // moduleA의 getter를 호출
        },
        newGetter: state => {
            return rootState['moduleA/count'] // moduleA의 state인 count를 호출
        }
    }
}
```

## 동적으로 모듈 등록하기

- Store 저장소가 생성된 후에 모듈을 등록이 가능!
- `store.registerModule()`로 등록
- `store.unreigsterModule()`로 제거

---

## 마무리

틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
