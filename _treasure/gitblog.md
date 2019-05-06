---
layout: posts
title: "[Github Blog] Minimal-mistake 테마 활용하기" 
category: github blog
read_time: true
comments: true
last_modified_at: 2019-05-04
date: 2019-05-04
---

> ### Jekyll 블로그 테마인 Minimal-mistake를 취향대로 바꿔보자

Jekyll 블로그 테마중 가장 깔끔하고 이쁜 [minimal-mistake](https://mmistakes.github.io/minimal-mistakes/)를 내 블로그에 적용을 시키겠다고 낑낑거리다가 소중한 주말 하루가 날아가버렸다... 

처음에는 폴더구조부터 이해를 하기 어려웠는데, 그래도 지금은 어느정도 내가 원하는 블로그 구조를 만들수 있을 것만 같다.

내가 이 글에서 설명할 것들은 아래의 세가지 이다.
1. 3가지 네비게이션 메뉴 만들기 - About, Vue, 지식창고
2. 최근 포스트순으로 위에서 아래로 정렬하여 리스트업 (Vue 메뉴)
3. 카테고리를 설정하고, 카테고리별로 나누어 보여주기 (지식창고 메뉴)

그럼 1번부터 차례대로 알아보자.

----
## 1. 네비게이션 메뉴 생성 및 Collection 페이지로 설정

#### 메뉴 생성

Jekyll 블로그의 네비게이션 메뉴는 `_data` 폴더의 `navigation.yml`를 간단히 수정하면 만들 수 있다. minimal-mistake 테마는 "*Priority Plus*" 디자인 패턴을 사용하는데, 이는 사용자의 화면 크기에 맞춰 네비게이션 메뉴를 최대한 많이 나열하여 보여준다. 자세한 정보는 [여기를](https://mmistakes.github.io/minimal-mistakes/docs/navigation/) 참조하자. 

일단 About, Vue, 지식창고라는 이름의 네비게이션 메뉴를 아래와 같이 추가해주었다. 
title에는 메뉴의 이름을, url에는 기본주소 (base url)의 뒤에 추가되는 주소를 직접 입력해주면 된다.

~~~cs
# Navigation.yml
main:
    - title: "About"
      url: /about/
    - title: "Vue 공부일지"
      url: /vue/
    - title: "지식창고"
      url: /treasure/
~~~

#### 각 메뉴의 첫 페이지 설정 (Collection 사용)

여기까지 하면 Jekyll블로그에 네비게이션 메뉴가 생성이 되는 것을 확인 할 수 있다.
이제 각 메뉴의 첫 페이지를 설정하고 작성한 글들을 묶어주도록 해보자. 
나는 Collection을 사용해서 관련된 주제의 글들을 한 폴더에 넣고 분류하도록 만들어보려고 한다. 
~~물론 여기서 설명하는 것이 최선의 방법이 아닐 수도 있다...~~

먼저, Jekyll 블로그의 최상위 폴더에 내가 원하는 이름으로 폴더를 만들어준다. 중요한 것은 폴더명의 시작은 `_` (underscore)로 해야 Jekyll이 인식한다. 
여기서 `_vue` 폴더와 `_treasure` 폴더를 각각 만들었다.

이제는 가장 중요한 `_config.yml`을 수정해야한다. 해당 파일은 최상위 폴더에 있다. 텍스트 에디터로 열어서 맨 아래에 다음을 추가해준다. 

~~~cs
# collections 아래의 정의된 것을 고유주소를 가진 variable(?)로 만들어주기
collections:
  vue:
    output: true
    permalink: /:collection/:path/
  treasure:
    output: true
    permalink: /:collection/:path/

# Defaults
# Scope와 Value를 정의해주기
# Value는 사용자의 취향대로 바꿔주기
defaults:
  # _vue
  - scope:
      path: ""
      type: vue
    values:
      layout: single
      author_profile: true
      read_time: true
      comments: #true
      share: true
      related: true
  # _treasure
  - scope:
      path: ""
      type: treasure
    values:
      layout: single
      author_profile: true
      read_time: true
      comments: #true
      share: true
      related: true
~~~

`collections`는 Jekyll이 콜렉션으로 읽도록 지정해주는 부분이다. 고유주소를 위와 같이 설정함으로써 정의한 이름의 폴더를 최상위 폴더에서 찾는다. 

`defaults`에서는 콜렉션 속성의 기본값을 설정할 수 있다. scope의 `type`에는 collection에서 정의한 이름이랑 같게 적어줘야한다. 이제 작성한 글들을 분류하고 싶다면 각 폴더에 저장해주면 된다! 심지어 post 할 파일들의 이름도 기존의 YYYY-MM-DD 포멧을 따르지 않아도 된다.

참고로, yml 파일 변경 후에는 로컬에서 서버를 돌리고 있다면, Jekyll 서버를 재시작해주어야 로컬서버에서 확인이 가능하다. (~~ 바보같이 재시작을 안해놓고 적용이 안됬다고 짜증이 났었지 허허... ~~)

그런데 여기까지해도 내가 올린 글들은 보이지 않을 것이다...
나는 vue 첫 페이지는 최근 올린 글 순으로 정렬해서 보여주도록, 
지식창고의 첫 페이지는 카테고리 별로 분류해서 보여주도록 설정을 시도했다. 
먼저, 최근 올린 글 순으로 정렬해보자. 

## 2. 최근 올린 글 순으로 정렬

`_pages` 폴더에는 블로그에 나타나는 화면들의 페이지가 정의되어있다. 우리는 각 폴더별로 고유의 첫 페이지를 가지게 할 것이기 때문에, 원하는 이름의 마크다운 (.md) 파일을 2개 만들어주자. 

나는 vue.md에 아래와 같이 적어주었다.

```html
---
layout: category
title: Vue.js 공부일지
permalink: '/vue'
---

<h3 class="archive__subtitle">{{ site.data.ui-text[site.locale].recent_posts | default: "Recent Posts" }}</h3>
  
{% assign sorted = site.vue  | reverse %} 
{% for post in sorted %}
  {% include archive-single.html %}
{% endfor %}

{% include paginator.html %}
```

yaml 속성을 정의해주는 부분에 고유주소를 적어넣어 줌으로써 네비게이션 메뉴에서 /vue로 이동할때에는 항상 위의 파일이 열리도록 만들어주었다. 

`<h3>` 태그는 현재 웹사이트의 언어에 맞추어 "최근 포스트"라는 글씨를 띄워준다. 
assign은 웹사이트의 vue 폴더를 지정해주고, 안에 있는 글들을 시간 역순으로 바꾸어 가장 최신 글이 맨 처음 보이도록 설정했다. 
그리고 for-loop를 통해 각 포스트 별로 하나의 archive-single.html을 화면에 나타내도록 설정했다. 

minimal-mistake 테마에서 기본으로 제공하는 archive-single 파일에는 작성일을 표시하는 부분이 없기 때문에 아래와 같이 코드를 추가해준다. 

    {% if post.date %}
      <p class="page__meta"><i class="far fa-calendar" aria-hidden="true"></i> 작성일: {{ post.date | date: "%F" }}</p>
    {% endif %}


여기까지 수정해주면 vue 폴더의 글들은 최신 작성글을 맨위로 정렬하여 vue메뉴의 첫 페이지에 보여주게 된다. 

## 3. 카테고리 별로 분류하여 정렬

to be continued..


