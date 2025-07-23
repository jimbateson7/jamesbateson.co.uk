---
layout: layouts/post.njk
inProgress: true
title: Adding translations to an Eleventy site
metaTitle: Adding translations to an Eleventy site
metaDesc: After launching a recent project, I was tasked with adding the ability
  to translate the content to Spanish. This is something I hadn't done with
  Eleventy before. This is how I went about it.
socialImage: /images/social-share-default.jpg
date: 2025-07-20T10:49:00.000+01:00
---
On a recent project, I received a request to make the site multi-lingual, enabling the client to share their content with Spanish speak people. The request came late on in the initial build, and as I knew it would require a chunk of restructure work, I pushed back and we decided to do it as a feature after the site was launched. In hindsight, it probably would have been better to do the work upfront, but anyway, here we are. Adding translations to a static site, using Eleventy in this case, isn't something I had done before.

In this article I'm going to step through what i needed to change to enable this functionality. As the title of this article suggests, I was using Eleventy for this site, and the rest of the stack is detailed in my [recent post about the side project stack I use](https://jamesbateson.co.uk/articles/side-project-setup/). TLDR version:

* Eleventy
* Decap CMS (formerly Netlify CMS)
* Netlify

So let's get into it.

## What needed to change?

First off, I thought it might be useful to list out the different areas of the site I needed to make changes to. I've made these links also so if you wish to jump to a particular section, you can. As the list illustrates, it was quite a restructure.

* Add language selector markup to the header
* Separate the content structure
* Separate the data structure
* Update the Decap CMS config
* Tweak the Eleventy config
* Add Netlify redirects and duplicate forms
* SEO url considerations

Once I've gone through these different areas. I'm also going to touch on some aspects of this approach I'm not keen on, and some alternative ways this might be approached.

## Add a language selector

## Content structure

## Data structure

## Decap config

## Eleventy config

## Netlify changes

## SEO considerations

## What I'm not keen on

## Alternatives

## Summary
