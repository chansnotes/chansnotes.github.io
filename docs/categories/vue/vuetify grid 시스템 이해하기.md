---
layout: PostLayout
title: '[Vuetify] (1) Grid 시스템 이해하기'
topic: 'coding'
category: vue
thumbnail: '/images/vue/vuetify.png'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2019-07-27
date: 2019-07-27
excerpt: 'Vue의 UI를 예쁘게 꾸며주도록 도와주는 구글의 Material Design 기반의 UI 컴포넌트 라이브러리인 Vuetify의 Grid 시스템에 대해 정리합니다.'
sitemap:
  changefreq: daily
  exclude: false
meta:
  - name: 'og:title'
    content: '[Vuetify] (1) Grid 시스템 이해하기'
  - name: 'og:description'
    content: 'Vue의 UI를 예쁘게 꾸며주도록 도와주는 구글의 Material Design 기반의 UI 컴포넌트 라이브러리인 Vuetify의 Grid 시스템에 대해 정리합니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/vue/vuetify.png'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/vue/vuetify.png'
---

Vuetify는 부트스트랩과 마찬가지로 12 포인트의 Grid 시스템으로 이루어져있음.
즉, 한 row (열)는 12개의 column으로 구성된다고 보면됨.
사이즈에 맞지 않으면, 아래로 커짐.
Vuetify에서 Grid system은 먼저 `v-container`로 컨텐츠를 담을 컨테이너를 정의.
`v-layout`은 단일 컨텐츠 항목인 `v-flex`를 포함하는 레이아웃을 정의.
`v-flex`는 가장 작은 컨텐츠 단위로 보면됨

순서: `v-container` >> `v-layout` >> `v-flex` (>> `v-card`)

![Vuetify Grid](https://chansnotes.github.io/images/vue/grid.png)

---

## v-container

- Grid 시스템에서 가장 큰 개체
- 안에 layout 및 flex를 포함

### Props

1. **`fluid`**
   - Removs viewport size breakpoints
   - 화면에 따라 사이즈가 바뀌는게 아니라 항상 최대 넓이를 가짐
   - 사이즈 조절 안해도 되는 경우 사용하면 될듯
2. `justify-center`
   - 컨텐츠를 가운데로 정렬
3. **`grid-list-(size)`**
   - 각 v-flex 아이템들이 세로 및 가로로 몇 픽셀만큼 떨어져있는지
   - 2에서 24px까지 지정이가능
     - xs = 2px
     - sm = 4px
     - md = 8px
     - lg = 16px
     - xl = 24px
4. `fill-height`
   - 칼럼 엘리먼트의 높이가 부모랑 자식 요소로 채워지도록 만듬

---

## v-layout

- 섹션을 구분하는데 사용
- v-flex를 포함

### Props

1. **`wrap`**
   - 엘리먼트가 100%를 넘어가면 컨테이너안에서 자식노드를 감싸도록함 (similar as flex-wrap)
   - 한 줄에 다 안들어가면, 다음 줄로 넘어가서 배치됨
   - wrap 안쓰면, 컨텐츠가 화면에서 짤림
2. `row`
   - 좌에서 우로 표시
3. **`column`**
   - 위에서 아래로 표시
4. `reverse`
   - 표시 방향을 반대로 뒤집는 기능
5. `align-content-()`
   - v-layout을 Y축 방향으로 정렬
6. `justify-()`
   - v-layout을 X축 방향으로 정렬
   - `justify-center` = X축의 가운데에 생성
   - `justify-space-between` = X축을 기준으로 컨텐츠 사이에 빈 공간을 두고 생성

---

## CSS의 Flex에 대해 알아보자!

- Flexbox는 1차원적인 레이아웃 모델
  - 한 번에 하나의 차원만 다룬다는 뜻
  - 행으로 정렬 혹은 열로 정렬
- Flexbox는 가로축인 Main-axis와 세로축인 Cross-axis를 가짐
- Flexbox는 Flex 컨테이너 안에 정의됨

  - CSS에 `flex: 1 1 auto` 와 같이 정의
    - 첫번째 숫자 = `flex-grow`
    - 두번째 숫자 = `flex-shrink`
    - auto = `flex-basis`의 사이즈

- flex 컨테이너가 만약 500 픽셀 크기고, 100 픽셀 크기의 자식이 3개 존재하면 남은 공간은 200 픽셀
  - 마지막 자식 요소를 200 픽셀 빈공간으로 남겨둠
  - flex-grow, flex-shrink, flex-basis는 빈 공간을 분배하는 방식을 변경함

### 1. flex-basis

- 항목의 크기를 결정
- 디폴트는 auto
  - 이 상태에서는 flex안의 항목의 크기에 딱 맞는 크기 사용
- 각 내용물의 크기만큼 공간을 차지하게됨

### 2. flex-grow

- 주축에서 남는 공간을 flex 컨테이너 안의 항목들에 분배
- 값을 양수로 지정하면, flex 항목별로 주축 방향으로 크기가 flex-basis 값 이상으로 늘어날 수 있음
  - 위의 100 픽셀 항목이 있다면, 크기가 100 이상으로 늘어날 수 있음
  - 1로 지정하면 사용가능한 공간은 각 항목에 동일하게 분배
  - 각 항목은 주축을 따라 분배받은 값만큼 사이즈가 늘어남
- Vuetify에서는 `flex-grow:1` 로 고정

### 3. flex-shrink

- 주축의 공간이 부족하면, 어떻게 항목들의 사이즈를 줄일건지를 결정
- 양수이면, flex 항목은 flex-basis에 지정된 사이즈보다 작아짐

---

## v-flex

- 각각의 그리드 박스는 flex-box 요소임
- 자식 노드를 `flex: 1 1 auto`로 설정 (기본 값)
  - flex-grow = 1
    - flex-basis 값보다 커질 수 있음
  - flex-shrink = 1
    - flex 컨테이너 공간이 모자라면, 크기가 줄어듬
  - flex-basis = auto
    - flex 항목의 내용물의 크기로 지정

### Props

1. `align-self-()`
   - Y축 방향으로 정렬
   - `align-self-end`는 `v-flex`를 `v-layout` 맨 아래에 생성
2. `(size)(1-12)`
   - xs12 = xs 크기 이상에서 12로 고정
   - lg12 = lg 크기 이상에서 12로 고정
   - 모든 디바이스 크기에서 12로 고정
     - `xs12`
   - xs 사이즈 이상에서 12, md 사이즈 이상에서는 6
     - `xs12 md6`
3. `offset-(size)(0-12)`
   - 장치의 크기별로 v-flex 항목이 그리드에서 몇 칸뒤에 생겨야하는지를 지정해줌
   - `offset-xs6`
     - xs 보다 큰 장치에서 6칸의 빈 공간을 두고 생성
4. `order-(size)(1-12)`
   - 그리드 항목의 순서를 지정가능
   - 이것도 장치 크기별로 지정가능
   - `order-lg2`
     - lg 보다 큰 장치에서 2번째로 보여지도록 지정

### Row 및 Column breakpoints

- 디바이스 크기별로 동적으로 breakpoint를 지정 가능
- 조금 귀찮은 방법;;;
  - computed 속성에 함수를 정의해야함?
  - v-layout에 v-bind로 함수랑 묶어주기

```js
new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  computed: {
    binding() {
      const binding = {}

      // Screen size가 md 이상이면 항목을 아래로 정렬
      if (this.$vuetify.breakpoint.mdAndUp) binding.column = true

      return binding
    },
  },
})
```

### Grow와 Shrink

- 기본적으로 grow랑 shrink 둘다 켜져있음 (기본 값: `1 1 auto`)
  - 레이아웃에 정의된 v-flex의 컨텐츠 크기에 맞춰서 빈 공간 없이 크기가 지정됨
- Grow를 비활성화하려면, `shrink`를 props로
  - v-flex 내용에 맞춰 사이즈가 조정됨
  - 처음에 6으로 지정되면, 레이아웃 빈 공간을 채우려고 6에서 더 커지지는 않음
- Shrink를 비활성화하려면, `grow`를 props로
  - 컨텐츠가 viewport보다 많아지면, 줄을 바꿈
  - 절대로 지정한 v-flex의 사이즈보다 작아지지 않음!
  - 빈 공간을 채우려고 커지기는함
- 둘다 끄려면, `grow-shrink-0`
  - v-flex 내용에 딱 맞는 사이즈로 알아서 지정

### d-flex? d-inline? (뭔지 공부 필요...)

- display 속성을 지정해주는 역할
  - d-inline-flex
  - d-flex
  - d-inline-block
  - d-block
  - d-inline
  - d-none

---

## v-spacer

- 컴포넌트 사이에 빈 공간을 생성하고 싶을때 사용

---

## 마무리

틀린 내용이 있다면 자유롭게 댓글로 달아주세요 :)
