---
layout: layouts/post.njk
inProgress: true
title: "Share: swiper.js accessibility considerations"
metaTitle: "Share: swiper.js accessibility considerations"
metaDesc: In my new role I've been working on some base components in the
  company framework. One uses swiper.js and there were some accessibility issues
  when testing.
socialImage: /images/social-share-default.jpg
date: 2025-08-24T08:43:00.000+01:00
---
My first task in my new role has involved reviewing and looking to improve the EXP starter theme. This has meant testing the components we have out-of-the-box to ensure they are accessible, performant and use solid and semantic code. I've been using keyboard and screen readers during this testing.

As much as loath reaching for carousels as a UI pattern, there is no getting away from the fact that they are a common pattern. The implementation in our starter uses the swiper.js library. This is a libraries I have come across in the past, and is actually quite nice to configure in terms of developer experience. However, when testing using Safari and VoiceOver, there were some issues.

I came across [this excellent article from a series from Graceful Web Studio](https://www.gracefulwebstudio.com/blog-articles/accessible-swiper-js-carousel-autoplay-a11y), detailing how they implemented accessibility into their swiper carousels. It's worth noting that they use Webflow, however, I found the advice and techniques transferrable to a codebase stack.

## Further reading

* [swiper.js accessibility documentation](https://swiperjs.com/swiper-api#accessibility-a11y). **Note**: make sure to understand the limitations of this from the Graceful article
