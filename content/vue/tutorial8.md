---
layout: PostLayout
title: 'Vue.js 뽀개기 (8) 컴포넌트 커뮤니케이션 - Props와 Emit'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-06-07
date: 2019-06-07
excerpt: 'Vue의 컴포넌트끼리 데이터를 주고 받는 방식인 Props와 Emit에 대해 정리하는 글입니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: 'Vue.js 뽀개기 (8) 컴포넌트 커뮤니케이션 - Props와 Emit'
  - name: 'og:description'
    content: 'Vue의 컴포넌트끼리 데이터를 주고 받는 방식인 Props와 Emit에 대해 정리하는 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.

---

Vue 어플리케이션을 만들다보면 컴포넌트들을 많이 생겨납니다.
따라서, 보다 쉬운 유지 및 관리를 위해서 컴포넌트들을 부모와 자식의 형태로 분리시켜 유지하는 것이 좋습니다.

만약에 자식 컴포넌트가 부모 컴포넌트의 데이터를 이용해야한다면, 어떻게 해야 할까요?

컴포넌트간의 데이터 커뮤니케이션을 위해서는,
부모에서 자식에게 데이터를 전달하는 Props 객체와
자식이 부모에게 데이터 변경을 알리는 Emit 이벤트가 필요합니다.

## 애초에 왜 Props를 써야하는가?

- 모든 컴포넌트들은 자체 격리된 scope가 존재함
- 하위 컴포넌트가 상위 컴포넌트의 data를 직접 참조 못함
- 하위 컴포넌트끼리 data 직접 참조 못함

---

## Props와 Emit 설명

![Props 1](https://chansnotes.github.io/images/vue/vue_props1.jpeg)

### Props

- 이를 Props를 통해 하위 컴포넌트로 전달하게됨 (단방향 바인딩) \* 하위 컴포넌트가 부모 컴포넌트의 데이터 변경 불가
- 자식 컴포넌트에서 접근하려는 부모 컴포넌트의 data 객체를 `props` 로 명시해야함
- 부모 컴포넌트에서 template 혹은 data 객체를 통해 전달

### Emit

- Emit event를 통해, 부모에게 변경된 데이터를 전달
- 자식 컴포넌트에서 부모 컴포넌트로 커스텀 event를 `emit`
- 부모 컴포넌트가 event를 `v-on`으로 감지하기

---

## Props 사용법

### 부모 컴포넌트

1. `<script>` 태그에 자식 컴포넌트 import 후, component 및 data 객체 정의
2. `<template>` 태그에 자식 컴포넌트를 불러오기
3. 자식 컴포넌트를 불러온 태그에 `props_이름=“data_객체”`와 같은 형태로 정의
4. (Option) 동적 바인딩을 위해 `v-bind` 사용
   - 부모 컴포넌트의 데이터가 업데이트 되면, 자식 컴포넌트도 변경됨

```html
<!-- User.vue ; 부모 컴포넌트 -->
<!-- name 데이터 객체를 UserDetail로 전달 -->
<template>
  <div class="component">
    <button @click="changeName">Change</button>
    <div class="row">
      <app-user-detail :my-name="name"></app-user-detail>
    </div>
  </div>
</template>

<script>
  import UserDetail from ...

  export default {
      data: function() {
        return {
          name: 'Max'
        };
      },
      components: {
          appUserDetail : UserDetail
      }
  }
</script>
```

### 자식 컴포넌트

1. `props: ['myProp']` 과 같은 형태로 props를 정의
2. 데이터를 불러올 부분에 `{{ myProp }}` 으로 부모 컴포넌트의 data객체를 불러옴

```html
<!-- UserDetail.vue ; 자식 컴포넌트 -->
<!-- 부모 컴포넌트에서 name 데이터를 전달받고, 이를 switchName 메소드로 처리 -->
<template>
  <div class="component">
    {% raw %}
    <p>Name: {{ switchName() }}</p>
    {% endraw %}
    <!-- myName대신 methods인 switchName pass 가능 -->
  </div>
</template>

<script>
  export default {
    props: ['myName'], // template에 있는 name과 같아야함
    methods: {
      switchName() {
        return this.myName
          .split('')
          .revers()
          .join('')
        // this 사용 가능 = props는 일반 data나 methods 처럼 취급하기 때문에 가능함
      },
    },
  }
</script>
```

---

## Props 사용시, 주의 사항들

### 주의 사항 1: camelCase vs. kebab-case

- DOM은 case-insensitive함 = 대소 문자를 구분 못함
- 자식 컴포넌트에서 `camelCase` 로 props를 정의했다면, 부모 컴포넌트 template에서 불러 올때는, `<child camel-case=“hello”></child>` 로 정의해서 데이터를 보내야함

### 주의사항 2: 리터럴 vs. 동적

- 부모 컴포넌트 template 태그에 자식 컴포넌트를 불러올 때 발생하는 실수 중, 리터럴 구문을 사용해서 JavaScript 숫자를 전달
- `' '` (Quotation mark) 안에 숫자를 적으면, 숫자가 아닌 문자 형태로 전달됨
  - **`v-bind`를 사용해서 숫자를 quotation mark 안에 정의**

```html
<!-- Literal case
     아래의 경우는 숫자가 아닌 문자를 자식 컴포넌트로 전달 -->
<child new-prop="1"></child>

<!-- Dynamic case
     v-bind를 통해, 문자가 아니라 JavaScript 숫자를 전달 -->
<child :new-prop="1"></child>
```

### 주의 사항 3: 다수의 데이터를 가진 객체 전달

- props의 이름을 생략하고, `v-bind` 만으로도 사용이 가능

```html
<!-- 부모 컴포넌트에서 text와 isComplete라는 데이터를 가진 todo 객체 생성 -->
<!-- 여러개의 데이터를 가진 todo 객체의 이름을 생략하고, v-bind 만으로 props 생성 -->

<template>
  <todo-item v-bind="todo"></todo-item>
</template>

<script>
  export default {
    data() {
      return {
        todo: {
          text: 'new',
          isComplete: false,
        },
      }
    },
  }
</script>

<!-- 위의 template는 아래와 같은 역할 -->

<template>
  <todo-item
    v-bind:text="todo.text"
    v-bind:is-complete="todo.isComplete"
  ></todo-item>
</template>
```

### 주의 사항 4: 자식 컴포넌트에서 Props 데이터를 저장 및 변경하고 싶을 때

- 자식 컴포넌트에서 `computed property` 사용해서 데이터를 변경
  1. Props를 통해 부모 컴포넌트의 데이터 받아오기
  2. 받아온 props 데이터를 자식 컴포넌트에서 local variable로 선언 (= 저장)
  3. computed property를 통해 연산 수행 (= 변경)

```js
// props value를 local variable로 정의
props: ['initialcount'],
data: function() {
	return { counter: this.initialcount }
},
// props value를 가지고 연산 수행
computed: {
    incrementCount() {
        return this.initialcount++
    }
}
```

### 주의 사항 5: 부모 컴포넌트의 속성을 받지 않기

- 부모 컴포넌트에서 정의한 속성을 자식 컴포넌트의 속성으로 설정 하지 않는 방법
- `inhertAttrs: false` 를 자식 컴포넌트에 정의

---

## Props 검증

- 자식 컴포넌트가 props를 받을 때, 특정 요구사항을 충족시키도록 지정할 수 있음
- Props에 정의가 가능한 `type`에는 7가지 존재
  _ String
  _ Number
  _ Boolean
  _ Function
  _ Object
  _ Array \* Symbol
- Props 내부에 `default` (기본 값) 설정 가능
- Props 내부에 `validator` (사용자 정의 유효성 검사 함수) 설정 가능
- Props는 컴포넌트 인스턴스 생성 전에 검증됨 \* **default 혹은 validator 함수 내에서 data, computed, methods와 같은 인스턴스 속성은 사용이 불가능**

```js
props: {
	// 기본 타입은 null = 어떤 type이던 ok!
	// 숫자만 가능
	propA: Number,
	// String or Number 가능
	propB: [String, Number],
	// String이 무조건 필요
	propC: {
		type: String,
		required: true
	},
	// 기본 값 100을 가지는 Number
	propD: {
		type: Number,
		default: 100
	},
	// 객체 및 배열의 기본값은 팩토리 함수에서 반환 되어야함
	propE: {
		type: Object,
		default: function() {
			return: { message: 'hello'}
		}
	},
	// Customized 유효성 검사
	propF: {
		validator: function(value) {
			return value > 10
		}
	}
}
```

---

## Emit Event 사용법 (자식에서 부모로!)

- `$on(eventName)` = 이벤트를 감지
  _ `$on`은 자식에서 호출한 event는 감지 안함
  _ `v-on`은 반드시 template에 지정해야함
- `$emit(eventName)` = Parent로 커스텀 Event 보내기
- Parent에서 Event를 Listen 하기 (`@` 사용)

```html
<!-- 부모 컴포넌트 -->
<template>
  <div class="component">
    <button @click="changeName">Change</button>
    <div class="row">
      <!-- 이벤트 청취! -->
      <app-user-detail
        :name="name"
        @nameResetted="name = $event"
      ></app-user-detail>
      <app-user-edit> </app-user-edit>
    </div>
  </div>
</template>
<!-- 이하 생략 -->
```

```html
<!-- 자식 컴포넌트 -->
<template>
  <div class="component">
    <p>Name: {{ myName }}</p>
    <!-- myName대신 methods인 switchName pass 가능 -->
    <button @click="resetName">Reset</button> // Reset 버튼 추가
  </div>
</template>

<script>
  export default {
    props: {
      myName: {
        type: String,
      },
    }, // template에 있는 name과 같아야함
    methods: {
      switchName() {
        return this.myName
          .split('')
          .revers()
          .join('')
        // this 사용 가능 = props는 일반 data나 methods 처럼 취급하기 때문에 가능함
      },
      resetName() {
        this.myName = 'Max'
        this.$emit('nameResetted', this.myName) // Emit Event로 Parent 컴포넌트에 쏴주기
      },
    },
  }
</script>
```

## 비 부모 - 자식간의 통신은? (내용 보충 필요..)

![Props 2](https://chansnotes.github.io/images/vue/vue_props1.jpeg)

- 부모 컴포넌트에 정의되지 않은 자식 컴포넌트들 간에 데이터 객체를 전달 할 수 있음
- 아무것도 정의하지 않은 (비어있는) Vue 인스턴스를 **이벤트 버스** 로 사용

1. 커스텀 Event 생성 (Emit)

- Parent로 Emit
- Parent에서 event listen
- Child2에서 값을 읽어들임

2. Callback 사용
3. **EventBus 사용 (Best Option)**

- main.js 파일에 새로운 Vue 오브젝트 생성
  - `export const eventBus = new Vue();`
  - methods 생성
    - `changeAge(age) { this.$emit('ageWasEdited', age);}` = Emit logic in EventBus
    - 기존에 `eventBus.$emit()`안써도 됨
    - `eventBus.changeAge(this.userAge);`로 간단하게 불러올수 있음

4. `{ eventBus }` 를 import 하기
5. Method에 `eventBus.$emit(...)` = Child 컴포넌트에 emit된것이 아니라, eventBus로 emit됨
6. 불러오려는 child에서 새로운 method 생성
   - `eventBus.$on(name, (data)=> { this.name = ...;});` 으로 불러오기

---

## 기타 유용한 팁들

### 컴포넌트에 Native 이벤트 바인딩

- 컴포넌트의 root element에서 네이티브 이벤트를 수신하고자 할 때
- .native 를 v-on에 붙여 사용
- `v-on:click.native="doSomething"`

### 양방향 바인딩

- Props는 기본적으로 단방향 바인딩임 (부모에서 자식만 가능)
- `.sync`를 사용하면, 자식에서의 변경이 부모에 반영됨
  - 자동으로 `v-on`으로 확장됨
- 2.0 버전에서 삭제되었다가, 2.3에 다시 부활
  _ 재사용 가능한 컴포넌트 만들 때 유용
  _ 부모 상태에 영향을 미치기 때문에, 유지보수 문제 발생 가능성 \* 자식 컴포넌트에서 명시적으로 이벤트를 보내서 부모 컴포넌트에 변경사항 전달

```html
<!-- .sync 사용하는 부모 컴포넌트 코드 -->
<comp :foo.sync="bar"></comp>

<!-- 위와 똑같은 역할을 하는 코드 -->
<comp :foo="bar" @update:foo="val => bar = val"></comp>

<!-- 자식 컴포넌트에서 foo를 갱신하는 코드
     속성 변경 대신, event를 emit  -->
<script>
  this.$emit('update:foo', newValue)
</script>
```

---

이번 포스트에서는 Vue 컴포넌트간의 커뮤니케이션 방법인 Props와 Emit에 대해 정리하였습니다.
다음편에는 Slot에 대해 정리하겠습니다.

부실한 내용이나 틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
