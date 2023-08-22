---
layout: PostLayout
title: 'Vue.js 뽀개기 (10) 트랜지션과 애니메이션 적용하기'
topic: 'coding'
category: vue
thumbnail: '/images/vue/logo.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-06-10
date: 2019-06-10
excerpt: 'Vue에서는 어떻게 트랜지션과 애니메이션 효과를 구현하는지 정리하는 글입니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: 'Vue.js 뽀개기 (10) 트랜지션과 애니메이션 적용하기'
  - name: 'og:description'
    content: 'Vue에서는 어떻게 트랜지션과 애니메이션 효과를 구현하는지 정리하는 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/logo.jpeg'
---

> 본 글은 Udemy에서 제공하는 유료 강좌인 Vue.js Complete Guide를 수강하면서 정리한 내용입니다. 저작권 문제시 바로 글을 내리도록 하겠습니다.

---

웹 어플리케이션을 제작 할 때, 트랜지션과 애니메이션 효과를 넣어 동적인 연출을 만듭니다.
Vue에서도 CSS 트랜지션 및 애니메이션을 구현할 수 있습니다.

트랜지션이란 HTML 엘리먼트에 변화를 적용하여 일정시간 동안 발생을 시키는 역할을 한다고 이해하면 되겠습니다.

## 트랜지션 사용하기

- `<transition>` 태그 안에 넣어 사용
- 하나의 태그에는 하나의 엘리먼트만 트랜지션 적용 가능 = 단일 트랜지션
  - 조건부 렌더링/출력 (`v-if` 혹은 `v-show`)를 사용하여, 1개를 트랜지션으로 보여주면 다른 하나는 숨겨야함
  - 여러 엘리먼트를 트랜지션 하려면 `<transition-group>` 태그를 사용
    - `<span>`을 렌더링
    - `<tag>` 속성으로 렌더링된 요소를 변경
- 최초 렌더링시 트랜지션을 사용하려면 `appear`를 태그안에 명시

  - `<transition appear>`

- CSS 혹은 JavaScript 훅을 사용해서 트랜지션/애니메이션 적용 가능
  - Vue가 자동으로 CSS 트랜지션 적용을 감지하고, 적절한 타이밍에 트랜지션 클래스 추가/제거
  - JS 훅이 제공되면, Vue가 적절한 타이밍에 훅을 호출
  - 한마디로, 일반적인 상황에서는 Vue가 알아서 잘 적용해준다는 소리
- Duration을 명시 안하면, 즉시 attach 하고 detach함
- Transition property 혹은 animation property를 사용

---

## Vue 트랜지션의 6가지 클래스

- 진입 및 진출 트랜지션에는 총 6가지 클래스가 존재

![transition_class](https://chansnotes.github.io/images/vue/vue_transition.png)

1. `v-enter`
2. `v-enter-active`
3. `v-enter-to` (2.1.8 버전 이상)
   - 진입 상태의 마지막에 실행
4. `v-leave`
5. `v-leave-active`
6. `v-leave-to` (2.1.8 버전 이상)
   - 진입 상태의 마지막에 실행

- `v-`를 없애고 `name`을 지정하면, `name-enter` 이렇게 바뀜
- transition 혹은 animation은 `enter` 단계가 아닌, `enter-active`에서 정의

```css
<style>
    /* Enter 단계에서는 transition을 추가하지 않음 */
    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 1s; # 시간을 명시해줌
        opacity: 1;     /* 1초 뒤에 opacity 0을 opacity 1로 바꿔줌 */
    }

    .fade-leave {

    }

    .fade-leave-active {
        transition: opacity 1s;
        opacity: 0;
    }
</style>
```

### 트랜지션과 애니메이션 함께 사용

- 그냥 style에 animation이랑 transition 같이 정의하면 됨
- type property를 정의해서 animation 이랑 transition 시간중 어떤거 사용할지 정할수 있음

```css
<style>
    /* Slide transition using Animation property of CSS */
    .slide-enter{
        /* keyframe에 이미 초기 상태를 정의해놔서 여기에 정의 안해도 됨 */
    }

    .slide-enter-active{
        animation: slide-in 1s ease-out forwards;
        /* forwards = element가 finishing position에 붙어놓음  */
        transition: opacity .5s;
    }

    .slide-leave {

    }

    .slide-leave-active {
        animation: slide-out 1s ease-out forwards;
        transition: opacity .5s;
        opacity: 0;
    }

    @keyframe slide-in {
        from {
            transform: translateY(20px);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframe slide-out {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(20px);
        }
    }

</style>
```

### CSS 스타일 무시

- transition 태그에 `:css="false"`로 정의하기

### 라이브러리 CSS 사용하기

- name attribute를 없애고 specific class를 적기
- **라이브러리 사용하게되면 `appear`는 작동 안함**

### 동적 바인딩

- `v-model`을 사용하고, value를 적어놔야함
- transition 태그에 `:name` 으로 지정해주기

```html
<transition
  enter-active-class="animated bounce"
  leave-active-class="animated shake"
>
</transition>

<select v-model="alertAnimation">
  <option value="fade"> Fade </option>
  <option value="slide"> Slide </option>
</select>

<transition :name="alertAnimation"> ... </transition>

<script>
  export default {
    data() {
      return {
        show: true,
        alertAnimation: 'fade',
      }
    },
  }
</script>
```

### 트랜지션 모드

- 트랜지션의 기본 동작은 다른 트랜지션이 진행되는 동안 하나의 트랜지션이 나타남 (동시 발생)
- `mode`를 선언하여, 트랜지션 동시 발생으로 이상하게 보이는 것을 방지
  1. `out-in`: 현 엘리먼트 트랜지션 후, 새로운 요소 생성 (**더 자주 사용**)
  2. `in-out`: 새로운 요소 생성 후, 현 엘리먼트 트랜지션

### 여러개 트랜지션하기

- `v-if`와 `v-else`를 이용해서 구현
- `key` 속성을 추가해서 각각의 트랜지션 엘리먼트들을 구분하기

### 그룹 트랜지션

- `<transition-group>` 태그를 사용
  - transition 은 DOM에 새로 render되지 않음
  - `<span>`을 새로운 태그로 생성
    - transition-group tag="TAG"로 어떤 태그를 생성할지 변경 가능
- key를 넣어서 vue가 어떤 element를 animate 시킬지 알려줘야함
- transition-group에만 적용되는 style 존재
  - `slide-move`

```html
<button @click="addItem">Add</button>
<transition-group name="slide">
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(number,index) in number"
      @click="removeItem(index)"
      style="cursor: pointer"
      key="number"
    >
      {{ number }}
    </li>
  </ul>
</transition-group>

<script>
  export default {
      methods: {
          addItem: {
              const pos = Math.floor(Math.random() * this.numbers.length);
              this.numbers.splice(pos, 0, this.numbers.length +1);
          },
          removeItem: {
              this.numbers.splice(index,1);
          }
      }
  }
</script>

<style>
  .slide-leave-active {
    position: absolute;
    /* absolute를 정의해서 애니메이션되는 동안 
        다른 element가 그 자리를 채워 넣을 수 있게 만들어줌 */
  }
  .slide-move {
    transition: transform 1s;
  }
</style>
```

---

# 자바스크립트 훅

- CSS 클래스처럼, 자바스크립트 훅이 존재
- 이를 Vue 컴포넌트의 `method` 객체에 정의하여 사용
  - before-enter
  - enter
  - after-enter (once the animation finished)
  - after-enter-cancelled (add element before animation is finished)
  - before-leave()
  - after-leave
  - leave
  - after-leave-cancelled
- method에 함수를 정의 할 때는 `el` 및 `done`을 input variable로 정확히 명시해야함
  - `enter` 및 `leave` 훅에서 `done` 콜백 함수를 호출해야함
  - 콜백 호출 안하면, 동기적으로 호출이 되어 트랜지션이 즉시 완료되어버림

```html
<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
  >
  </transition>
</template>

<script>
  export default {
      data() {
          return {
              elementWidth : 100
          }
      },
      methods: {
          beforeEnger(el) {
              ...
              this.elementWidth = 100;
              el.style.width = this.elementWidth + 'px';
          },
          enter(el, done) {
              ...
              const interval = setInterval(() => {
                  el.style.width = (this.elementWidth + round * 10) + 'px';
                  round ++;
                  if (round > 20) {
                      clearInterval(interval);
                      done();
                  }
              }, 20);
              // done();  vue에게 애니메이션이 언제 끝났는지 알리기 위해 사용 (CSS랑은 다름)

          },
          afterEnter(el){
              ...
          },
          enterCancelled(el) {
              ...
          },
          beforeLeave(el) {
              ...
              this.elementWidth = 300;
              el.style.width = this.elementWidth + 'px';
          },
          leave(el,done){
              let round = 1;
              const interval = setInterval(() => {
                  el.style.width = (this.elementWidth - round * 10) + 'px';
                  round ++;
                  if (round > 20) {
                      clearInterval(interval);
                      done();
                  }
              }, 20);
          }
          /// 나머지도 정의
      }
  }
</script>
```

---

여기까지 Vue의 트랜지션과 애니메이션을 구현하는 방법을 정리해보았습니다.

틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
