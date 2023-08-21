---
layout: PostLayout
title: 'Vue.js 뽀개기 (5) Computed와 Watch 속성'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-05-11
date: 2019-05-11
excerpt: 'Vue 인스턴스의 핵심 속성인 computed와 watch에 대한 정리글입니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: 'Vue.js 뽀개기 (5) Computed와 Watch 속성'
  - name: 'og:description'
    content: 'Vue 인스턴스의 핵심 속성인 computed와 watch에 대한 정리글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.

---

지금까지 알아본 Vue 인스턴스에 추가가 가능한 속성들은 `data`, `methods`가 있었습니다.
이번에는 `methods`와 비슷하면서도 다른 역할을 하는 `computed`와 `watch` 속성에 대해서 정리해보려고 합니다.

## Computed Property

- Template 태그에서 연산을 모두 수행하기에 버거워지면, Computed 속성에 정의해서 연산 진행
- Computed 속성에 정의된 함수는 data 속성과 마찬가지로 interpolation (mustache) 안에 넣어서 사용
- Computed 속성에 함수를 정의하게되면 getter처럼 사용
  _ getter는 속성에 접근하기 전까지 연산을 하지 않음 (Lazy)
  _ CPU 낭비 줄어듬
- Caching 로직
  _ Computed 속성에 정의된 함수안에 종속된 데이터가 변하면 한 번 실행
  _ 결과 값을 캐싱 해놓음
  _ 함수를 여러번 요청해도 이미 한 번 계산된 결과를 리턴함 (resourceful)
  _ 요청 할 때마다 연산을 해서 리턴하는 것이 아님 \* `methods`는 렌더링 될때마다 항상 함수를 실행하게 됨

- **캐싱 필요하면 Computed**
- **캐싱 필요없으면 Method**
- 연산이 복잡하면 Computed 속성 사용 추천!

### Setter 함수 넣기

- 일반적으로 computed에 정의되는 함수는 getter만
- 필요에 따라 setter 함수 정의 가능

```javascript
// getter와 setter를 사용하는 예시
// setter 함수가 먼저 names 변수에 사용자가 입력한 텍스트를 split후, first와 last에 저장
// getter 함수에서 first 랑 last를 리턴
computed: {
	FullName: {
		// getter
		get: function() {
			return this.first + ' ' + this.last
	    },
		// setter
		set: function() {
			Var names = newValue.split(' ')
			this.first = names[0]
			this.last = names[names.length - 1 ]
		}
 	}
}
```

---

## Watch Property

- `watch` 속성 역시 데이터 변경에 반응하는 함수를 정의 가능
- 사용자의 입력을 기다려야하는 `<input>` 태그처럼, 비동기적 처리가 필요하거나 시간이 많이 걸리는 조작 수행에 적합
- 감시하는 데이터 객체의 값이 변경될 때 마다 실행

---

이번 포스트에서는 Vue 인스턴스에 추가 할 수 있는 속성인 `computed`와 `watch`에 대해 알아보았습니다.

`methods`는 단순 함수를 호출하는 속성인 반면에,
`computed`는 복잡한 연산 계산처럼 캐싱이 필요한 함수를 정의할 수 있는 속성이고,
`watch`는 데이터 객체에 저장된 값을 감시자가 지켜보다가 변화하는 순간에 정의된 함수를 바로 호출하여 실행하도록 만들어주는 속성입니다.

부실한 내용이나 틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
