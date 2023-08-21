---
layout: PostLayout
title: 'VuePress를 설치하고 사용하는 방법에 대해 araboja'
topic: 'coding'
category: 'vuePress'
thumbnail: '/images/thumbnail/vuepress.png'
read_time: true
comments: true
permalink: /:year/:month/:day/:slug
last_modified_at: 2020-09-20
date: 2020-09-20
sitemap:
  changefreq: daily
  exclude: false
excerpt: '자바스크립트 프레임워크인 Vue를 기반으로 정적사이트를 생성해주는 VuePress에 CSS 프레임워크인 Tailwindcss를 적용하여 Github blog를 제작하는 방법에 대해 정리하는 글입니다.'
meta:
  - name: 'og:title'
    content: 'VuePress를 사용하는 방법에 대해 araboja'
  - name: 'og:description'
    content: '자바스크립트 프레임워크인 Vue를 기반으로 정적사이트를 생성해주는 VuePress에 CSS 프레임워크인 Tailwindcss를 적용하여 Github blog를 제작하는 방법에 대해 정리하는 글입니다.'
  - name: 'og:image'
    content: 'https://chansnotes.github.io/images/thumbnail/vuepress.png'
  - name: 'og:url'
    content: 'https://chansnotes.github.io/images/thumbnail/vuepress.png'
---

> 해당 글은 VuePress 1.5 버전에서 작성되었습니다.

## 머리말

Github 블로그를 시작하게 된지 벌써 1년이 지났다.

처음에는 이직하면서 이력서에 한 줄 더 쓰고자 하는 욕망에서 시작했고, 그러다보니 썩 그렇게 빠삭하게 알지 못하던 웹 프레임워크인 Vue.js에 대한 정리 글을 주로 작성했었다.

지금은 여러가지 사업 철학이나 내가 현 회사에서 프로젝트를 추진하면서 얻은 도메인 지식들을 공유해보려고 하는데... 이게 참 글 쓰는게 아직 취미까지는 아닌게 온 몸으로 느껴진다...

Anyway long story short.
2020년도 목표 중 하나였던 Jekyll 기반의 개인 블로그를 VuePress로 새롭게 만들었다. 여기에 기본 테마를 사용하지 않고, 내가 좋아하는 CSS 프레임워크인 Tailwindcss를 같이 적용해서 나만의 테마를 만들어 보았다.

사실 만든거라고는 몇 개의 자잘한 컴포넌트 수준이지만, 혹시라도 VuePress와 Tailwindcss를 사용해서 직접 테마를 만들고 싶은 개발자에게 도움이 되었으면 하는 바램에서 정리를 하고 글을 남겨본다.

마지막으로 Vue와 Tailwindcss의 조합이 더 자주 쓰였으면 좋겠다! 자유로운 테마 작성을 원하신다면 지금 바로 [Tailwind에 대해 확인해보세요!](https://tailwindcss.com/)

---

## 무엇을 만드나요?

이 글 시리즈의 말미에는 VuePress 정적사이트 생성기에 Tailwindcss를 적용하여 커스텀 테마를 만들고 있는 당신의 모습을 발견하게 될 것입니다 :)

만들어진 결과물은 Github나 Netlify에 배포할 수 있습니다!

### 필요사항

1. Node.js 설치
2. Yarn 설치
3. 코딩이 가능한 노트북 혹은 데스크탑
4. 적당히 마음에 드는 코드 에디터

### 그나저나 VuePress가 도대체 뭡니까?

VuePresss는 JavaScript 프레임워크인 Vue.js를 기반으로 만들어진 정적사이트 생성기입니다.
간단하게 데이터를 저장하고 불러와야하는 서버가 필요없는 웹 사이트를 만들어 준다고 생각하면 됩니다.

좀 더 자세히 설명하자면, Vuepress 웹사이트는 Vue, Vue Router, 그리고 webpack으로 만들어진 Single Page Application (SPA) 입니다.
빌드과정에서 각각의 라우트, 즉 각각의 페이지들을 가상으로 방문해서 각 페이지에 해당하는 HTML 파일을 미리 만들어 놓습니다.

이로 인해 로딩 속도가 빠르고 SEO에 최적화되어 있다는 장점이 있습니다.

### Jekyll 블로그에서 갈아타는 이유는?

**첫 번째**, Vue 언어로 블로그를 만들고 싶었다. VuePress는 Vue를 기반으로 정적사이트를 만들수 있는 최적의 툴로 보였다.

**두 번째**, Jekyll은 Ruby 언어 기반이다. 테마를 커스터마이즈 하고 싶으나 뭔가 Ruby를 배워야만 할 것 같은 기분이 들었다...

**세 번째**, 그냥 뭔가를 만들고 싶었다...

---

## 설치하기

위의 필요사항에서 Yarn을 설치했다면, VuePress를 설치하는 방법은 매우 간단합니다.

```bash
# 자동으로 Vuepress 프로젝트 폴더를 생성해줍니다.
yarn create vuepress-site [폴더 이름]
```

설치가 완료되면, 만든 폴더로 위치를 이동하고, 해당 폴더 안의 `docs` 폴더로 이동합니다.

```bash
cd [폴더 이름]
cd docs

# 필수 패키지 설치
yarn install

# 데모 실행
yarn run dev
```

![VuePress Demo](https://chansnotes.github.io/images/vuepress/demo.png)

실행이 정상적으로 완료되면 위와 같은 화면을 볼 수 있습니다!

---

## VuePress의 폴더 구조를 알아보자

위의 방법에 따라 VuePress 폴더를 만들면 안에 `docs` 폴더가 있는 것을 알 수 있습니다.
그리고 다시 `docs` 안에는 `src` 폴더와 `package.json` 파일이 달랑 있구요.

기본 생성시, 전체 파일 트리는 아래와 같이 되있습니다.

```
docs
├── src
│   ├── .vuepress (Optional)
│   │   ├── components (Optional)
│   │   ├── theme (Optional)
│   │   │   └── Layout.vue
│   │   ├── public (Optional)
│   │   ├── styles (Optional)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (Optional, Danger Zone)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (Optional)
│   │   └── enhanceApp.js (Optional)
│   │
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│
└── package.json
```

여기서 우리가 작성하게 될 마크다운 문서들, 커스텀 테마를 위한 vue component, 그리고 style 파일들은 모두 `src` 폴더 안에 존재하게 됩니다.

카테고리별로 토픽을 나누어서 문서를 보관하고 싶다구요?

그러면 `src` 폴더 안에 `category` 폴더를 만들고, 이 안에 원하는 topic 이름을 가진 폴더를 만들어주면 해당 주소가 라우트로 생성이 됩니다.

여기서 중요한 점은..! **마크다운 문서가 존재하는 모든 폴더 안에는 `README.md` 파일을 기본으로 꼭! 생성해줘야 합니다.**
README 파일이 기본 라우트에서 보여줄 화면이 되기 때문이죠.

예를 들면, `category 폴더 안의 README.md` 파일은 실제로 웹사이트를 생성하면 `.../category/`의 주소로 변환됩니다.

> 이 점이 조금 불편하지만... 마크다운 문서를 가지고 있는 폴더에 README 파일이 존재하지 않으면, 해당 폴더의 기본 주소가 404 에러 페이지로 나오니까 꼭 만들어 주세요!

### `.vuepress` 폴더 = 커스텀 테마를 개발하는 장소

- `components` = 컴포넌트를 저장하는 폴더
- `styles` = 각종 CSS 스타일이 저장된 폴더
- `public` = 이미지/로고 등과 같은 asset 파일을 저장하는 폴더
- `theme` (기존 layouts 폴더) = 레이아웃 템플릿이 저장된 폴더

커스텀 테마를 만들게 된다면, 기본 뼈대가 되는 레이아웃을 `theme` 폴더에 만들게 됩니다.
그리고 버튼이나 Form과 같은 컴포넌트를 쪼개서 `components` 폴더에 생성하고, 여러 레이아웃 및 컴포넌트에서 재사용이 가능합니다.

이제부터는 매우 Vue스러운 개발 여정이 시작됩니다~!

### `config.js` 파일 = 설정 파일

마지막으로 VuePress에도 Jekyll 블로그에서 작성하였던 `_config.yml`과 동일한 설정 파일을 만들어야 합니다.

VuePress에서 config 파일의 형식은 `js`, `yml`, `toml` 세 가지를 모두 지원합니다. 따라서, 원하는 형식으로 작성을 하면 됩니다.

`config.js` 파일을 열어보면, 내용이 많아 보이지만... 사실 별거 없습니다.
config 파일에서는 웹사이트의 이름, 설명, `<header>` 태그 내용, 플러그인 설정, 그리고 테마 설정 등을 수정할 수 있습니다. [config 파일에서 사용 가능한 기능들은 여기를 확인해주세요.](https://vuepress.vuejs.org/config/#basic-config)

웹사이트의 이름을 바꿔야 한다면, `config.js` 파일의 `title` 부분을 수정해주면 됩니다.

새로운 플러그인을 사용해야 한다면, `plugin` 부분에 사용하려는 플러그인을 추가해 넣어주면 됩니다.

나중에 Tailwindcss를 추가할 때, `plugin` 부분을 수정해야합니다.

---

## 마무리

너무 글이 길어지면 보기가 싫어질 수 있으니, 이번 글에서는 VuePress를 설치하고 사용하는 방법과 폴더 구조, 그리고 `config.js` 파일에 대해 간단하게 정리를 했습니다.

이어지는 다음 글에서는 VuePress에 Tailwind를 추가하는 방법에 대해 바로 정리하려고 합니다.

VuePress와 Tailwindcss를 많이 사용해주세요~ :D 참고로 직원 아닙니다 ㅋㅋ
