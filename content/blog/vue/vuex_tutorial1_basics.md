---
layout: PostLayout
title: '[Vuex 뽀개기] (1) State, Getter, Mutation, 그리고 Action'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-07-03
date: 2019-06-25
excerpt: 'Vue의 복잡한 상태 관리를 간편하게 만들어주는 Vuex 라이브러리가 무엇이고, 어떻게 사용해야하는지에 대해 정리하는 글입니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: '[Vuex 뽀개기] (1) State, Getter, Mutation, 그리고 Action'
  - name: 'og:description'
    content: 'Vue의 복잡한 상태 관리를 간편하게 만들어주는 Vuex 라이브러리가 무엇이고, 어떻게 사용해야하는지에 대해 정리하는 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> Vuex 공식문서를 참조하여 정리하였습니다.

---

Vue에서 부모와 자식 컴포넌트가 데이터를 주고 받는 방식인 Props에 대해 기억하시나요?
Props 자체는 사용이 매우 간단하지만, 만약 자식1 컴포넌트가 자식2 컴포넌트에 데이터를 전달하려면 부모를 거쳐서 가야만 하는 번거로움이 존재합니다.
데이터를 보내려고 중첩에... 중첩에... 중첩을 하게 되면 추후에 유지보수에도 어려워집니다.
그래서 그런지 Vuex의 공식문서에서는 **공통의 상태를 공유하는 여러 컴포넌트가 있는 경우 단순함이 빠르게 저하** 된다고 언급합니다.

이러한 문제를 해결해주는 Vuex는 Vue에서 지원하는 공식 상태관리 라이브러리입니다.
만약 여러 컴포넌트에서 공유해야하는 데이터 혹은 상태가 있다면, Vuex를 사용해야 할 때가 온 것입니다.

### Vuex는 store.js 파일에 작성됩니다.

- store 폴더에 index.js 파일 작성해도 가능

## Vuex의 특징 2 가지

1. Vuex store의 데이터가 업데이트 되면, 이에 반응해서 자동으로 view를 업데이트!
2. store안의 데이터는 마음대로 변경 불가.
   - 변경 방법은 commit을 사용한 mutation만 가능
   - 기록이 남기 때문에 상태 추적이 비교적 쉬워짐

---

## State (상태)

### State는 언제 사용합니까?

- 여러 컴포넌트에서 사용하는 공통된 상태 혹은 데이터가 존재할 때 사용

### 특징

- Vuex는 단일 상태 트리를 사용
  - 각 앱마다 하나의 저장소만 가질 수 있음
  - 특정 상태를 쉽게 찾을 수 있음

### 사용법

- 루트 컴포넌트 전체에 주입하는 방법
  - `$store.state` 로 불러올 수 있음

```js
// main.js
const app = new Vue({
  el: '#app',
  store,
  components: { Counter },
})
```

```html
<!-- counter.vue -->
<script>
  export default {
    computed: {
      count() {
        return this.$store.state.count
      },
    },
  }
</script>
```

### mapState 헬퍼

- computed getter 함술르 생성하는 mapState 헬퍼를 사용해서 키 입력 줄이기

```html
<script>
  import { mapState } from 'vuex'

  export default {
    computed: mapState({
      count: state => state.count,
      countAlias: 'count', // Alias도 지정가능
      countPlusLocalState(state) {
        return state.count + this.localCount
      },
    }),
  }
</script>
```

---

## Getter

### Getter는 언제 사용합니까?

- Vuex store에 저장된 상태를 가져오는 역할을 수행
  - 중복 호출 방지
- computed 속성과 비슷하게, Vuex store에 저장된 상태 (데이터)를 계산해야 하는 경우 사용
  - 예시:) to-do 리스트에서 완료된 항목 필터

### 특징

- getter 결과는 종속성에 따라 캐쉬되고, 변경된 경우만 재계산됨

### 사용법: 속성 접근

- `state`를 첫 번째 전달인자로 받음
- 다른 getter를 두 번째 인자로 받음
  - 결과가 캐쉬됨 (computed 속성과 비슷)
- `store.getters.name_of_getter` 로 사용

```js
// store.js
const store = new Vuex.Store({
    state: {
        todos: [
            { id: 1, done: true},
            ...
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        },
        doneTodoCount: (state, getters) => {
            return getters.doneTodos.length
        }
    }
})
```

### 사용법 2: 함수 반환 값을 getter의 전달인자로

- 메소드 유형 접근 방법
  - getter 호출 마다 실행됨 = 결과 캐쉬 안됨
  - vue의 method와 비슷
- **저장소 배열 검색에 유용**

```js
getters: {
  getTodoById: state => id => {
    return state.todos.find(todo => todo.id === id)
  }
}

store.getters.getTodoById(2) // 2번째 entry를 가져옴
```

---

## Mutation (변이)

### 변이는 언제 사용합니까?

- Vuex store에 저장된 상태를 직접 변경하고 싶을때 = Setter!!
- 각 변이는 타입 문자열 핸들러를 소유
  - 핸들러 함수 = 상태 수정 함수
    - 입력인자는 당연히 state

### 특징

- 변이 함수 직접 호출 불가
- 오로지 `store.commit`으로 호출
  - 직접 호출보다는 action을 통해 호출하는 것을 권장

### 사용법

- 두번째 입력인자로 `payload`를 받을 수 있음
  - 여러 필드 포함 가능한 객체 (기록을 위함)
- 한 파일에 모든 Mutation 함수 이름을 정의하고, 이를 store.js로 불러와서 사용하면 다른 작업자가 파악하기 쉬워짐
  - `export const MUTATION1 = 'some_mutation'`

```js
// store.js
const store = new Vuex.Store({
  state: {
    count: 1,
  },
  mutations: {
    increment(state) {
      state.count++
    },
    incrementPayload(state, payload) {
      state.count += payload.amount
    },
  },
})

// 기본 변이 함수 호출하기
store.commit('increment')

// 객체 스타일로 변이 함수 호출
store.commit({
  type: 'increment',
  amount: 10,
})
```

### 주의사항

- **변이는 무조건 동기적으로 구동** 되어야함
  - 비동기 콜백에서 수행된 변이는 본질적으로 추적이 불가능

---

## Action (액션)

### 액션은 언제 사용합니까?

- 변이에 대한 커밋을 하기 위함
  - 변이를 직접 커밋하지 않고, 액션으로 커밋!
- **비동기 작업 수행** 을 위함
  - 변이는 synchronous 하게 작동

### 사용법

- 변이에 정의한 함수를 Action에서 `context`를 입력 인자로 정의
  - `context` 객체는 `context.commit`, `context.state`, `context.getters`등을 통해 상태와 getter에 접근이 가능
  - 변이 함수의 `payload`도 입력인자로 받을 수 있음
- Action은 `$store.dispatch`로 호출
  - Vue 컴포넌트에서도 호출이 가능하지만, Action 함수 내에서도 호출 가능
- Action 내에서 비동기 작업 가능!
- `...mapActions` 헬퍼를 사용해서, 액션을 호출하고 맵핑할 수 있음

```js
mutations : {
    set_name (state, name) => {
        state.name = name
    }
},
// 실행 딜레이를 부여해서, Async 작업 흉내내기 (변이에서는 비동기 작업 불가)
actions {
    set_name (context, name) => {
        setTimeout(() => {
            context.commit('set_name')
        }, 1000)
    }
}

// 액션 호출하기!
this.$store.dispatch('set_name', "chansbro")

```

### 비동기 작업을 위해 액션에 Promise 사용하기

```js
actions: {
    set_name (context, name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                context.commit(set_name)
                resolve()
            }, 1000)
        })
    }
}

// 액션 디스패치하고 then 사용하기
this.$store.dispatch('set_name', name).then() => {
    // ...
}

```

---

Vuex 뽀개기 2편에서는 모듈화 방법, 플러그인 사용법 등 Vuex 사용을 조금 더 체계적으로 만들어주는 기능들에 대해 소개합니다.

틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
