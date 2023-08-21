---
layout: PostLayout
title: 'Nuxt 프로젝트에서 tailwindcss 사용하기'
topic: 'coding'
category: vueTailwind
thumbnail: '/images/thumbnail/thumbnail_vuetailwind.jpeg'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2020-01-30
date: 2020-01-30
sitemap:
  changefreq: daily
  exclude: false
excerpt: '최근 Nuxt를 기반으로 개인 프로젝트를 진행하면서 배운 것들을 기록으로 남기고, 공유하기 위한 목적의 글입니다.'
meta:
  - name: 'og:title'
    content: 'Nuxt 프로젝트에서 tailwindcss 사용하기'
  - name: 'og:description'
    content: '최근 Nuxt를 기반으로 개인 프로젝트를 진행하면서 배운 것들을 기록으로 남기고, 공유하기 위한 목적의 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/thumbnail/thumbnail_vuetailwind.jpeg'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/thumbnail/thumbnail_vuetailwind.jpeg'
---

## Vuetify 대신에 tailwindcss를 사용하게 된 계기

현재 Vue 혹은 Nuxt로 프로젝트를 진행하면서 가장 많이 사용하는 컴포넌트 프레임워크 (i.e. 재사용 가능한 컴포넌트들의 모음집)로는 단연 `Vuetify`가 꼽힙니다.
저 역시 작년에 개인적으로 진행하던 프로젝트에 `Vuetify`를 적용하여 빠르게 웹 어플리케이션을 만든 경험이 있는데요.

앱을 만드는데 필요한 색 변경/모양 변경/레이아웃 변경 등과 같은 대부분의 중요한 기능들이 `Vuetify` 프레임워크 전용 엘리먼트인 `v-dialog`, `v-card` 등을 사용하여 매우 빠르게 제작이 가능하다는 것이 가장 큰 장점 같습니다.
개발자가 굳이 번거롭게 몇몇 UI 컴포넌트들을 만들어야 할 수고를 덜어주는 셈이지요.

하지만, 프로젝트에 직접 `Vuetify`를 사용하다보니 단점도 느껴졌습니다.

가장 크게 느껴졌던 단점은 프레임워크에서 제공하는 **컴포넌트를 개별적으로 커스터마이즈 하거나 새로운 컴포넌트를 제작하는 것이 불편** 합니다. 더 나은 방법도 있었겠지만, 저는 빨리 만들려고 하다보니까 vue 파일의 `<style>` 태그안에 HTML 엘리먼트 별로 적용하였습니다. 아래는 제가 사용했던 방법의 예시입니다.

```css
#recorded_dialog_title {
  font-family: 'SCDream5', 'Roboto', sans-serif;
  font-size: 16px;
}

.theme--dark.v-expansion-panels .v-expansion-panel {
  background-color: #282828;
  font-family: 'SCDream2', 'Roboto', sans-serif;
  color: #ffffff;
}
```

커스터마이즈 관련된 단점을 빼고나면 크게 단점이라고 부를 것도 없습니다. 하지만 최근 `tailwindcss`라는 새로운 low-level CSS 프레임워크가 급부상하고 있고, 2020년에는 새로운 기술 스택을 배우고 싶었던 마음도 겹쳐 다음 프로젝트에는 `tailwindcss`를 적용하기로 결정했습니다.

## `tailwindcss` 간단 소개

![tailwind trend](https://chansnotes.github.io/images/tailwind/trend.png)

`tailwindcss`를 간단히 소개하자면, 커스터마이즈 성향이 매우 강한 low-level 수준의 CSS 프레임워크라고 생각하시면 됩니다.
좀 더 쉽게 풀자면, 기존에 CSS style 태그에서 id 혹은 class 속성으로 지정하여 디자인을 해야하던 귀찮음을 없애주는 좋은 친구입니다 :)

예를 들어, 특정 `<img>` 태그의 스타일을 변경하고자 할 때, 기존의 방식으로는 아래와 같이 코드를 작성해야 합니다 (Vue 기준).

```vue
<template>
  <div>
    <img id="#myclass" />
  </div>
</template>

<style scoped>
#myclass {
  height: 100%;
  border: solid black;
}
</style>
```

style을 분리하는 것에 장점도 있지만, CSS를 처음부터 전부 작성하려면 `style` 태그 안의 내용이 굉장히 길어지게 됩니다.
거기다가 화면 크기 별로 추가적인 스타일 변경이 필요하다면...? 와우...
이럴 바엔 그냥 `.css` 파일을 하나 따로 만드는 것이 더 나은 방법이 아닌가 싶네요 ㅎㅎ

이러한 단점을 없애주는 것이 바로 `tailwindcss`라고 생각하시면 됩니다. 장황하고 긴 CSS 스타일 코딩을 하지 않게 도와주는 것이지요.
위의 코드는 아래의 tailwind 스타일 코드로 아주 간결하게 변경이 가능합니다! 정말 간결하죠~?

```vue
<template>
  <div>
    <img class="h-full border border-black" />
  </div>
</template>
```

글을 작성한 날을 기준으로 `tailwindcss`는 현재 npm에서 stars 수와 다운로드 수가 비교적 꾸준히 증가하는 추세를 보여줍니다.
아직 커뮤니티 활성화 수준이 매우 낮지만, 개인적인 느낌으로는 `Vuetify`만큼 성장 가능성이 있다고 생각됩니다.
만들어진 기본 컴포넌트를 사용하려면 `Vuetify`를!
자유자재로 직접 만들려면 `tailwindcss`를! 이런 느낌으로요 ㅎㅎ

여담이지만 현재 진행 중인 프로젝트를 마치면, `tailwindcss`와 `Vuepress`를 같이 사용하여 지금 사용 중인 Jekyll Git Blog도 싹 다 개편을 할 계획입니다.
다만, 그 시기가 언제가 될지 아무도 모릅니다... 껄껄

---

아래에서는 `nuxt` 프로젝트에 `tailwindcss`를 설치하고 적용하는 방법을 설명하려고 합니다.
`nuxt` 프로젝트를 기반으로 하기 때문에, `nuxt`를 설치하고 난 다음에 `yarn create nuxt-app <your_ProjectName>`으로 새로운 프로젝트 폴더를 만든 상태에서 시작해주세요!

주의할 점은 프로젝트 시작 과정에서 `CSS Framework`를 `TailwindCss`로 선택해주셔야 합니다!

## tailwindcss 설치하기

`nuxt` 프로젝트 시작하는 방법으로 tailwindcss의 설치는 매우 손쉽게 진행할 수 있습니다.
시작을 위한 폴더 생성이 모두 완료되면 아래의 과정을 진행하시면 됩니다.

1. `tailwind.css` 파일 만들기

- `tailwind`에서는 기본으로 제공하는 directive들이 있습니다. 기본 directive들을 사용하기 위해, 아래처럼 `root_folder/assets/css` 위치에 `tailwind.css` 파일을 생성해주세요.

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

2. `tailwind.config.js` 파일 만들기

- `tailwind.config.js` 파일은 기본으로 제공하는 테마, 플러그인등의 기능들을 변경하거나 확장하고 싶을 때에 사용됩니다.
- 있는게 없는 것 보다 나으니, 일단 아래의 내용을 복사하여 프로젝트 폴더의 루트에 `tailwind.config.js` 파일을 만들어 줍시다.

```js
// tailwind.config.js
module.exports = {
  theme: {},
  variants: {},
  plugins: [],
}
```

3. `nuxt.config.js` 파일 변경

- tailwind 쪽에서의 설정을 완료했으면, 이제 `nuxt` 앱의 설정을 담당하는 `nuxt.config.js`파일을 수정해서 CSS 처리를 Tailwind로 진행하도록 변경해줘야 합니다 (이를 PostCss라고 부릅니다).
  - 사실 [공식문서 페이지](tailwindcss.com/docs/installation/)의 4번에서 **Webpack** 부분과 비슷합니다.

* **변경해야하는 부분!**
  - `css`
  - `buildModules`
  - `build`

```js
// nuxt.config.js
export default {
  mode: 'universal',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: { color: '#fff' },

  css: ['~assets/css/tailwind.css'],

  plugins: ['~plugins/tui-editor.client.js'],

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/dotenv', '@nuxtjs/auth'],

  build: {
    postcss: {
      plugins: {
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
      },
    },
    extend(config, ctx) {},
  },
}
```

#### 끝

여기까지 완료하면, `nuxt` 앱에서 `tailwindcss`를 자유자재로 사용할 수 있게 됩니다.
기본으로 제공하는 기능들이 부족하다고 느껴진다면, `tailwind.config.js` 파일의 `theme` 안에 `extend`로 추가하면 됩니다. 자세한 설명은 추후에 정리하도록 하겠습니다.
