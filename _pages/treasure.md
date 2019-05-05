---
layout: category
title: 지식창고
permalink: '/treasure'
---
{% assign col = site.treasure  %}
{% assign categories_max = 0 %}

<ul class="taxonomy__index">
  {% assign postsCategory = col | group_by_exp: 'post', 'post.category' %}
  {% for cat in postsCategory %}
    <li>
      <a href="#{{ cat.name }}">
        <strong>{{ cat.name }}</strong> <span class="taxonomy__count">{{ cat.items | size }}</span>
      </a>
    </li>
  {% endfor %}
</ul>

{% assign postsByCategory = col | group_by_exp: 'post', 'post.category' %}
{% for cat in postsByCategory %}
  <section id="{{ cat.name }}" class="taxonomy__section">
    <h2 class="archive__subtitle">{{ cat.name }}</h2>
    <div class="entries-{{ page.entries_layout | default: 'list' }}">
      {% for post in cat.items %}
        {% include archive-single.html type=page.entries_layout %}
      {% endfor %}
    </div>
    <a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
  </section>
{% endfor %}

