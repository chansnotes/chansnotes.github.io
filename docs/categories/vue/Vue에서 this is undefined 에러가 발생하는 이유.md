---
layout: PostLayout 
title: "Vue에서 this is undefined 에러가 발생하는 이유"
topic: 'coding'
category: vue
read_time: true
comments: true
thumbnail: '/images/vue/logo.jpeg'
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-09-02
date: 2019-09-02
excerpt: "Vue.js를 코딩하다가 알게된 사소한 팁들을 공유하는 글입니다. 본 글에서는 Vue 인스턴스에서 계속해서 사용하게 되는 this의 스코프가 어떻게 설정되고,
왜 Arrow 함수를 써야만 하는지를 설명합니다."
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: 'Vue에서 this is undefined 에러가 발생하는 이유'
  - name: 'og:description'
    content: 'Vue.js를 코딩하다가 알게된 사소한 팁들을 공유하는 글입니다. 본 글에서는 Vue 인스턴스에서 계속해서 사용하게 되는 this의 스코프가 어떻게 설정되고,
왜 Arrow 함수를 써야만 하는지를 설명합니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> 본 글은 [Michael Thiessen의 개인 블로그](https://michaelnthiessen.com/this-is-undefined/)와 [Stack Overflow](https://stackoverflow.com/questions/49417410/how-to-save-reference-to-this-in-vue-component)에서 정보를 얻어 작성하였습니다.

---

## 이런 경우 있으신가요?

Vue.js를 사용해서 코딩을 하다보면, 가끔 `this is undefined`와 같은 에러를 확인하신적이 있을 겁니다.
저의 경우에는 `socket.io`를 사용해서 webRTC 영상통화 기능을 구현하다가 처음 알게됬는데요.
아래의 예를 보면, 당연히 `this`는 Vue 인스턴스에 정의된 `data` 속성을 가르키는 줄 알았고 아무 문제가 없어 보이나...
`this is undefined` 에러가 발생하게됩니다.

```js
// this님... 여기서 이러시면 안됩니다...
mounted() {
    this.socket.on('created', function(room){
        this.isReady = true;    // this is undefined!
    })
}
```

분명 Vue.js 공식문서에서 data 속성에 정의하고, `this`를 통해 가져온다 그랬는데 문제가 뭐인걸까요?
이를 이해하려면 ECMAScript6 (이하 ES6)에서 새로 생긴 Arrow 함수와 일반적인 함수의 차이점을 알아야만 합니다.

---

## ES6 이후 두 가지 함수 정의 방법!

ES6 문법이 쓰이게된 이후, 자바스크립트에서 함수를 두 가지 방법으로 정의를 할 수 있게 되었습니다.
하나는 일반적으로 쓰이게되는 `function(){}`와 같은 형태이고,
다른 하나는 Arrow 함수라고 불리우는 `() => {}`와 같은 형태를 띕니다.

그렇다면 무엇이 다른건지 차근차근 알아봅시다!

### 1. 일반적인 함수

- 일반적인 함수정의 방법에서 **`this`는 정의한 함수가 종속되어있는 컨텍스트를 뜻합니다.**
- Vue에서 가장 많이 사용되는 방법인 아래의 예시를 확인해봅시다.

```js
export default {
  data: {
    isReady: 'This This This',
  },
  methods: {
    doesThisWork() {
      console.log(this.isReady) // 콘솔 창에는 `This This This`가 뜹니다.
    },
  },
}
```

- 위의 예시에서 `this`는 `doesThisWork()`이라는 함수가 존재하는 Vue 인스턴스를 가리킵니다.

  - 따라서, `this`를 불러온다면 이는 해당 Vue 인스턴스 안에 정의한 모든 것들을 지칭한다는 뜻!

- 반대로 다시 처음의 예를 확인해봅시다.

```js
// this님... 여기서 이러시면 안됩니다2...
mounted() {
    this.socket.on('created', function(room){
        this.isReady = true;    // this is undefined!
    })
}
```

- 여기서 우리는 `this.socket.on()`이라는 함수 안에 다시 한번 `function(room){}`을 정의하였습니다.

  - `this.socket`의 this는 Vue 인스터스를 지칭합니다.

- 문제는 `function(room){}`안의 `this`는 Vue 인스턴스를 가리키지않고, 새롭게 정의한 해당 함수의 내부를 가리키게됩니다.

  - 즉, `this.isReady`는 `this.socket.on()` 컨텍스트를 가르키기 때문에, 해당 컨텍스트에서 정의하지 않은 데이터를 불러오려고한 우리를 에러처리를 해서 꾸짖습니다...

- 간단하게, **함수안에 또다른 함수를 정의하게 된다면 `this`를 Vue.js에서 쓰이는 일반적인 방법으로 사용할 수 없다** 는 뜻입니다.

### 2. Arrow 함수

- ES6부터 사용가능한 Arrow 함수에서 `this`는 함수가 내부를 가리키지 않고, 함수가 존재하는 컨텍스트를 지칭합니다.
- 따라서, 위의 예를 다음과 바꾸게 되면 정상적으로 작동하게 됩니다.

```js
mounted() {
    this.socket.on('created', (room) => {
        this.isReady = true;    // 에러 없음!
    })
}
```

- Arrow 함수안의 `this`는 **함수가 처음 선언 될때의 컨텍스트를 참조** 하게됨 (= Lexical Scoping)
- `this.isReady`는 `(room) => {}` 함수 내부에 존재하는게 아니라, `this.socket.on`이 정의된 Vue 인스턴스를 가리킴.
  - 예를 들자면, 일반 함수는 Vue 인스턴스라는 집안에 있으면 집을 가리키고, 집안의 주방에 존재하게되면 주방을 가리킵니다.
  - Arrow 함수는 집안의 주방에 정의했지만 집을 가르킨다고 보면됨.

#### Vue.js에서 Arrow 함수 사용시 주의!!

하지만, Arrow 함수를 Vue.js에서 사용할 때 주의할 점도 존재합니다.
Lexical scoping 성향을 띄는 Arrow 함수는 절대로! Vue.js의 methods에 정의하는 함수 선언에 바로 적용하면 안됩니다!
만약 아래와 같이 사용하게되면, 해당 `this`는 Vue 인스턴스를 가리키지 않고, Vue 인스턴스를 불러온 함수를 참조하게됨 (아마 Vue 인스턴스를 렌더링한 해당 화면 or window를 지칭하는듯?)

```js
// Arrow 함수의 안좋은 예...
export default {
  data: {
    isReady: 'This This This',
  },
  methods: {
    doesThisWork: () => {
      console.log(this.isReady) // this is undefined!
    },
  },
}
```

따라서, **Vue 인스턴스의 methods 안에서는 바로 Arrow 함수를 사용하지 말도록 하자.**

---

## this is undefined 해결법 세 가지

사실 해당 에러를 해결하는 방법에는 Arrow 함수를 사용하는 방법 이외에도 두 가지가 더 있습니다.
본 글을 마치기전에 이 문제를 해결하는 세 가지 방법을 간단하게 정리하고 마칩니다.

### 1. Arrow 함수 (Best!)

```js
mounted() {
    this.socket.on('created', (room) => {
        this.isReady = true;    // 에러 없음!
    })
}
```

### 2. bind 사용 (Good)

- Arrow 함수를 사용하는게 훨씬 더 간략하지만, `bind(this)`를 내부 함수에 붙여줌으로써 내부 함수보다 한 단계 앞에 선언한 혹은 한 단계 큰 스코프의 함수를 지칭하게 만듭니다.
- 테스트는 안해봤지만, 중첩의 중첩의 중첩함수에는 `bind(this)`를 붙여도 제대로 작동을 안 할 것으로 예상... 따라서, 최고의 선택은 Arrow 함수!

```js
mounted() {
    this.socket.on('created', function(room) {
        this.isReady = true;    // 에러 없음!
    }.bind(this))
}
```

### 3. this를 변수로 정의 (Not recommended)

- `mounted()`가 실행 될 때, `this`를 변수로 지정해서 어떤 함수 내부에서도 사용이 가능하게 만들어버림
- 코드를 보고 한 눈에 명확하게 안보이기 때문에, 조금 귀찮음
- 그리고 코드가 길어지면 `this`랑 변수로 정의한 `_this`를 혼동하는 실수하기 딱 좋아보임
- Arrow 함수를 알고 나서는, 굳이 쓸 일이 없는 방법...

```js
mounted() {
    let _this = this;   // 너를 this로 지정하겠노라

    this.socket.on('created', function(room) {
        this.isReady = true;    // 에러 없음!
    }.bind(this))
}
```

---

버스에서 스택오버플로우를 읽다가 깨우쳐서 밤에 바로 정리하는 글을 써봤는데, 아무래도 정리가 많이 미흡해보입니다...
이해가 안가는 설명이나 틀린 부분들이 있다면 댓글로 남겨주시면 저에게 큰 힘이 됩니다!
