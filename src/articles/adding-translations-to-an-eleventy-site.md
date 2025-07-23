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
tags:
  - Eleventy
---
On a recent project, I received a request to make the site multi-lingual, enabling the client to share their content with Spanish speak people. The request came late on in the initial build, and as I knew it would require a chunk of restructure work, I pushed back and we decided to do it as a feature after the site was launched. In hindsight, it probably would have been better to do the work upfront, but anyway, here we are. Adding translations to a static site, using Eleventy in this case, isn't something I had done before.

In this article I'm going to step through what i needed to change to enable this functionality. As the title of this article suggests, I was using Eleventy for this site, and the rest of the stack is detailed in my [recent post about the side project stack I use](https://jamesbateson.co.uk/articles/side-project-setup/). TLDR version:

* Eleventy
* Decap CMS (formerly Netlify CMS)
* Netlify

So let's get into it.

## What needed to change?

First off, I thought it might be useful to list out the different areas of the site I needed to make changes to. I've made these links also so if you wish to jump to a particular section, you can. As the list illustrates, it was quite a restructure.

* [Add language selector markup to the header](#add-a-language-selector)
* [Separate the content structure](#content-structure)
* [Separate the data structure](#data-structure)
* [Tweak the Eleventy config](#eleventy-config)
* [Update the Decap CMS config](#decap-config)
* [Add Netlify redirects and duplicate forms](#netlify-changes)
* [SEO url considerations](#seo-considerations)

Once I've gone through these different areas. I'm also going to touch on some aspects of this approach I'm not keen on, and some alternative ways this might be approached.

## Add a language selector

First up, and mainly so I could test the functionality as I added it was to add the markup for the element the user would select the language with. Early on I just used links for this, however, I eventually switched to use a select element for this. With this change I also needed to write a little JavaScript.

Here's the final markup and JavaScript, on this project I am using Tailwind CSS for styling:

{% raw %}

```nunjucks
<div class="flex items-center gap-4">
    <label class="text-sm" for="language-switcher">{{ settings.languageSwitcherLabel }}</label>

    <select id="language-switcher" class="border-b-2 border-brand-purple p-2 text-brand-purple">
        <option value="/en{{ page.url | replace('/es/', '/') | replace('/en/', '/') }}"{% if lang == 'en' %} selected{% endif %}>English</option>
        <option value="/es{{ page.url | replace('/en/', '/') | replace('/es/', '/') }}"{% if lang == 'es' %} selected{% endif %}>Español</option>
    </select>
</div>
```

{% endraw %}

{% raw %}

```javascript
document.addEventListener('DOMContentLoaded', function () {
	const select = document.getElementById('language-switcher');

	if (select) {
		select.addEventListener('change', function () {
			window.location.href = this.value;
		});
	} else {
		console.log('Language switcher not found on this page');
	}
});
```

{% endraw %}

Just looking back over this now, I am debating whether a select is actually the right approach, as the functionality is that of a link. For now though, this is the approach.

## Content structure

This was probably the biggest change needed. The approach I decided to go with was to completely separate out my English and Spanish content. Whilst it creates a fair bit of duplication, it means that there is a clear separation, it allows me finer control over the front matter and also means that my client can add content just for English or Spanish, which is something they are likely to do, if they are for example delivering a workshop, just in Spain.

The initial goal here was to only have the content markdown files duplicated in each language folder, that just being the services, blogs and such. I wanted to try and keep as much of the template code that contained markup at the top level so to keep future development easier and not having to replicate changes in two places. Whilst this didn't quite turn out to be possible, and I did need to have some HTML files in both language folders, mainly due to front matter, I managed to move markup around into top level partials that could then be shared in each language.

Here's my folder structure after the changes:

```
- /_data
- /_includes
    - /partials
        - *.html
    - *.html
- /admin
- /en
    - /blog
        - index.html
    - /how-i-help
        - index.html
    - /pages
        - *.md
    - /posts
        - *.md
    - /success-stories
        - index.html
    - /testimonials
        - *.md
    - *.html // Pages with front matter that is translated
- /es
    - /blog
        - index.html
    - /how-i-help
        - index.html
    - /pages
        - *.md
    - /posts
        - *.md
    - /success-stories
        - index.html
    - /testimonials
        - *.md
    - *.html // Pages with front matter that is translated
- /static
    - /css
    - /favicons
    - /fonts
    - /js
    - /uploads
```

Here we can see that all the content markdown files are now organised inside the relevant country directories. You will notice that I have also had to put the landing pages for these pages inside here. These listing pages are in here as they need a permalink for the correct language, for example:

```yaml
---
layout: blog
showContactForm: true
permalink: /en/blog/
---
```
There may be a nicer way of doing this, however, I couldn't think of how, as if placed in the root outside of the locale (en/es) folders, how would it be written into the correct folder with the correct permalink? Maybe something clever could be done with how it's handled in the Eleventy config, but this way it's nice and obvious for a minimal amount of repeated code.

All of my reusable components and partials are at the top level, they are used by content from both languages.

## Data structure

## Eleventy config

## Decap config

## Netlify changes

## SEO considerations

## What I'm not keen on

## Alternatives

## Summary
