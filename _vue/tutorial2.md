---
layout: posts 
title: "[Vue.js] Vue.js 뽀개기 (2) Vue 인스턴스와 라이프사이클"
categories:
- vue
read_time: true
last_modified_at: 2019-05-05
date: 2019-05-05
excerpt: "Vue 인스턴스와 라이프사이클에 대해 정리한 글입니다."
---

> #### 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.
---- 

이번 글에서는 Vue 인스턴스와 이 인스턴스가 어떠한 라이프사이클을 가지고 작동이 되는지 정리하려고 합니다. 잘못된 정보 혹은 오탈자등 글에 대한 코멘트는 언제든지 부탁드립니다!

## Vue 인스턴스란?

* DOM과 HTML의 중개자
* Vue 인스턴스는 여러개 생성이 가능하며, 각각은 고유한 Component (이하 컴포넌트)로 구성되어 있음
  * 각 컴포넌트들은 재사용 가능
* Vue 인스턴스2 에서 1에 정의된 property를 불러올 수 있음 

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

* 각 인스턴스들은 data property 객체에 있는 모든 속성을 Proxy (프록시) 처리함
	* Vue 인스턴스에 존재하는 데이터 객체는 Vue watcher에 저장되고 감시를 받게됨
	* 따라서, data가 변경되면 자동으로 화면이 다시 렌더링됨 

## Vue 컴포넌트 
* $el
  * Refers to our template (native html element)

* $data
  * Holds our data properties
  * Vue instance 밖에서 정의하고 data: your\_data 로 바로 사용가능

* $ref
  * html에 ref="" 키를 추가
  * html element를 Vue 인스턴스내에서 access 가능하게 해줌
  * this.$refs.myButton.innerText = 'Test';
  * Vue instance를 변수로 정의해놓으면, 밖에서도 JavaScript로 access 가능


## Mount
* You can Mount outside of Vue instance
* e.g) vm1.$mount('#app');
  * Works same as declaring inside
  * Use it when you don't know where to mount it

## Template inside Vue instance
* Vue 인스턴스에서 바로 template에 들어갈 내용을 정의할 수 있음
* 단점:
  * Multi-line으로 작성하기 어려움 (String 포멧으로 작성되기 때문)
  * Syntax highlight 지원도 안됨

var vm3 = new Vue({
  template: '<h1> Hello! </h1>'
});

vm3.$mount('#app3');

// Append it somewhere in html code
// Pass $el property as child
document.getElementById('app3').appendChild(vm3.$el);



## Create reusable Vue instance

// hello라는 이름의 reusable component를 정의하기
// HTML에서 <hello> </hello> 로 사용하기
Vue.component('hello', {
  template: '<h1> Hello </h1>'
});


## VueJS DOM updating
* Vue는 Virtual DOM을 사용하여 느린 DOM 렌더링을 수행하지 않음
* Virtual DOM과 Vue instance의 차이를 체크,
* 바뀐 New virtual DOM (=template)의 부분을 가져와서 Real DOM에 업데이트
* (그림 넣기)

## Vue 라이프사이클
* new Vue() = Constructor
* __beforeCreate()__
* Initialize Data + Events
* Instance Created = __created()__
* Complie template (or el's template)
* __beforeMount()__
* Replace el with compiled template
* Mount to DOM = Vue instance hooked with DOM (__mounted()__)
* Data changes;
  * Data changes -->\_\_beforeUpdate()\_\_ --> Re-render DOM --> __updated()__ --> Mount DOM
* Destroy;
  * __beforeDestroy()__ --> Destroyed; __destroyed()__