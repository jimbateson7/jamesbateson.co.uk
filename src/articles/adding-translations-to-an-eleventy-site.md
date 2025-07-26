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

### src folder structure after content separation

```
/
├── _data
│   ├── en/
│   │   └── siteSettings.yaml
│   ├── es/
│   │   └── siteSettings.yaml
│   └── siteSettings.js
├── _includes
│   ├── partials/
│   │   └── *.html
│   └── *.html
├── admin
├── en/
│   ├── blog/
│   │   └── index.html
│   ├── how-i-help/
│   │   └── index.html
│   ├── pages/
│   │   └── *.md
│   ├── posts/
│   │   └── *.md
│   ├── success-stories/
│   │   └── index.html
│   ├── testimonials/
│   │   └── *.md
│   └── *.html  // Pages with front matter that is translated, e.g., home
├── es/
│   ├── blog/
│   │   └── index.html
│   ├── how-i-help/
│   │   └── index.html
│   ├── pages/
│   │   └── *.md
│   ├── posts/
│   │   └── *.md
│   ├── success-stories/
│   │   └── index.html
│   ├── testimonials/
│   │   └── *.md
│   └── *.html  // Pages with front matter that is translated, e.g., home
├── static/
│   ├── css/
│   ├── favicons/
│   ├── fonts/
│   ├── js/
│   └── uploads/
└── 404.html  // Custom 404 page needs to sit in root
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

Some of the content I have that can be edited in the CMS writes to data (yaml) files, rather than to front matter. This also needs to be separated out in to a folder for English and Spanish. I'll be covering in the \[Decap CMS config section](#decap-config) how the files are referenced.

Eleventy requires that the `/_data` folder is in the root of the `src` directory. Therefore it needs it's own locale directories within it, rather then being able to place it in the top level locale folders along with the content.

Here's how my `/_data` directory looks:

### _data folder structure after locale seperation

```
_data/
├── en/
│   └── *.yaml          
├── es/
│   └── *.yaml          
├── socialLinks.yaml // Shared across all languages
└── *.js 
```

So, as we can see form this structure. English and Spanish data now has it's own files, in my case for site settings data, header navigation and footer navigation. Outside of these locale directories sits any data that doesn't need to be different based on locale. In my case the social links on the site.

This approach leads to an issue though, how do you now refer to the correct data source when using it in templates? This is where the `*.js` files in this `_data` directory come in.

For each of my `yaml` files in the locale directories, I have a corresponding JavaScript file. Here's an example of my `siteSettings.js` file. My site settings in this project are for strings and options used across the site.

```javascript
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function loadYAML(filePath) {
    const fullPath = path.join(__dirname, filePath);
    const file = fs.readFileSync(fullPath, 'utf8');
    return yaml.load(file);
}

module.exports = {
    en: loadYAML('./en/siteSettings.yaml'),
    es: loadYAML('./es/siteSettings.yaml'),
};
```

First off the `loadYAML()` is just a helper function that I've included for clarity. it allows the reading of both the English and Spanish `yaml` files and merges them into an object keyed by language code.

```javascript
{
    en: { ...English content... },
    es: { ...Spanish content... }
}
```

In my Nunkucks templates, I can access the appropriate language version by using a locale (or falling back to en).

{% raw %}

```nunjucks
{% set lang = locale or 'en' %}

{% set settings = siteSettings[lang] %}
{% set nav = headerNavigation[lang] %}
{% set footer = footerNavigation[lang] %}
```

{% endraw %}

These can then be used in components and layouts `settings.someTitle` and it will grab the correct content based on the current page locale context the user has chosen.

**Note**: I'm going to cover how the `locale` is set and determined in the next section: [Eleventy config](#eleventy-config).

So now we have our content in markdown files split and content in data files split. Let's move onto what we need to pass to Eleventy and tweak in the config.

## Eleventy config

Eleventy can take an optional config (usually eleventy.js, eleventy.config.js/mjs) that can be used to tweak default Eleventy settings, define how files are processed, and can also be used to add filters, shortcodes, data, plugins and more.

In my case I was defining my collections from within my config. Due to now having two sets of the content inside these collections - services, posts and testimonials in both English and Spanish, unfortunately a bit more duplication was needed. For example my single services collection now became:

```javascript
eleventyConfig.addCollection("services_en", (collection) => {
    return
    [...collection.getFilteredByGlob("./src/en/services/*.md").filter(services)].reverse();
});

eleventyConfig.addCollection("services_es", (collection) => {
    return
    [...collection.getFilteredByGlob("./src/es/services/*.md").filter(services)].reverse();
});
```

Each locale now has a collection and it points to the collection files within the locale directory. Rinse and repeat this for each collection. What we don't want to do is then have to duplicate looping through these collections in our templates. I'd just like to have one services component that renders either the English or Spanish services.

To achieve this I made use of my `locale` variable again:

{% raw %}

```nunjucks
{% set orderedServices = collections['services_' + locale] | sort(attribute='data.order') %}

<section class="py-8 md:py-12 lg:py-16 overflow-x-hidden relative">
    <div class="container mx-auto">
        <h2 class="font-medium text-brand-purple md:text-5xl">{{ howIHelpTitle }}</h2>

    <div class="px-2 md:px-11 mt-12 splide" data-splide='{ "autoHeight": true, "updateOnMove": true, "perPage": 3, "gap": "3rem", "breakpoints": { "1023": { "perPage": 1 } } }'>
            <div class="splide__track">
                <ul class="md:mt-8 splide__list">
                    {% for service in orderedServices %}
                        <li class="splide__slide">
                            {% include "partials/serviceCard.html" %}
                        </li>
                    {% endfor %}
                </ul>
            </div>
        </div>
    </div>
</section>
```
{% endraw %}

Here we use the `locale` (set in the front matter) on the page to ensure the correct collection is rendered `['services_' + locale]`. This can then be used for other collections as well. One partial file takes care of all our languages.

### Setting/determining the locale

As some of my snippets have used the `locale` variable I have available in my templates, I wanted to show how this is working. It's set in my Eleventy config file, and uses [a feature of Eleventy called Computed Data (`eleventyComputed)](https://www.11ty.dev/docs/data-computed/).

Here's an example of the usage from the Eleventy docs:

> Say you want to use Eleventy’s Navigation Plugin to create a navigation menu for your site. This plugin relies on the eleventyNavigation object to be set. You don’t necessarily want to set this object manually in front matter in each individual source file. This is where Computed Data comes in!

In my case this also works well for adding a locale to the front matter of my files. It would then allow me to access this and render the relevant content and data for each page. To ensure it was set, here's how I achieved this:

```javascript
eleventyConfig.addGlobalData("eleventyComputed", {
  locale: (data) => {
    // Front matter locale takes absolute precedence - don't override if already set
    if (data.locale) return data.locale;
    
    // Fallback to path-based detection only if no front matter locale
    if (data.page && data.page.inputPath) {
      if (data.page.inputPath.includes(`${path.sep}es${path.sep}`)) return "es";
      if (data.page.inputPath.includes(`${path.sep}en${path.sep}`)) return "en";
    }
    return "en";
  }
});
```

To break this down:

* If the locale is already set in the data, don't try and override this
* Otherwise use the `inputPath` of the file, which is [supplied data from Eleventy](https://www.11ty.dev/docs/data-eleventy-supplied/). If depending on if the `inputPath` contains `en` or `es` set this
* Fallback to `en`

I then know I'll have access to a locale, allowing me to set it as a variable in my top level template, giving all others access to it, in `default.njk` - `{% set lang = locale or 'en' %}`.


## Decap config

So we now have content separation for our languages, we have a variable that we can use to determine which content we need to serve, collections are split up so each language has its own. We now need to ability to add this data into the Decap CMS interface.

This step involved another frustrating dose of duplication, inside of the `/admin/config.yaml` file. This file is where we define how the UI will be presented to add content for all of our collections and settings. This is done by defining fields and the widgets that make them up.

Here's an example of how I set up the ability to add simple static content pages

### Admin config file code example

```yaml
    - name: 'static_pages'
      label: 'Static Pages'
      folder: 'src/pages'
      slug: ''
      preview_path: 'pages/'
      create: true
      fields:
          - {
                label: 'Layout',
                name: 'layout',
                widget: 'hidden',
                default: 'page.html',
            }

          - { label: 'Title', name: 'title', widget: 'string' }

          - {
                label: 'Subtitle',
                name: 'subTitle',
                widget: 'string',
                required: false,
            }

          - {
                label: 'Banner Image',
                name: 'bannerImage',
                widget: 'image',
                required: false,
            }

          - {
                label: 'Permalink Override',
                name: 'permalink',
                widget: 'string',
                required: false,
            }

          - {
                label: 'SEO Meta Title',
                name: 'metaTitle',
                widget: 'string',
                required: false,
            }

          - {
                label: 'SEO Meta Description',
                name: 'metaDesc',
                widget: 'string',
                required: false,
            }

          - {
                label: 'Social Image',
                name: 'socialImage',
                widget: 'image',
                required: false,
            }

          - { label: 'Body', name: 'body', widget: 'markdown' }

          - label: 'Show contact form?'
            name: 'showContactForm'
            widget: 'boolean'
            default: false
            required: false
```

Now we have pages, services, posts, testimonials for both English and Spanish though, we need to duplicate this to allow content entry in both languages. So our static pages would become:

### Admin config file code example after multiple languages added

```yaml
# Static Pages - English
    - name: 'static_pages_en'
      label: 'Static Pages (English)'
      folder: 'src/en/pages'
      slug: '{{slug}}'
      preview_path: 'pages/{{slug}}'
      create: true
      fields:
          - {
                label: 'Layout',
                name: 'layout',
                widget: 'hidden',
                default: 'page.html',
            }

          - { label: 'Title', name: 'title', widget: 'string' }

          - {
                label: 'Subtitle',
                name: 'subTitle',
                widget: 'string',
                required: false,
            }

          - {
                label: 'Banner Image',
                name: 'bannerImage',
                widget: 'image',
                required: false,
            }

          - {
                label: 'Permalink Override',
                name: 'permalink',
                widget: 'string',
                required: false,
            }

          - {
                label: 'SEO Meta Title',
                name: 'metaTitle',
                widget: 'string',
                required: false,
            }

          - {
                label: 'SEO Meta Description',
                name: 'metaDesc',
                widget: 'string',
                required: false,
            }

          - {
                label: 'Social Image',
                name: 'socialImage',
                widget: 'image',
                required: false,
            }

          - { label: 'Body', name: 'body', widget: 'markdown' }

          - label: 'Show contact form?'
            name: 'showContactForm'
            widget: 'boolean'
            default: false
            required: false

    # Static Pages - Spanish
    - name: 'static_pages_es'
      label: 'Static Pages (Spanish)'
      folder: 'src/es/pages'
      slug: '{{slug}}'
      preview_path: 'pages/{{slug}}'
      create: true
      fields:
          - {
                label: 'Layout',
                name: 'layout',
                widget: 'hidden',
                default: 'page.html',
            }

          - { label: 'Title', name: 'title', widget: 'string' }

          - {
                label: 'Subtitle',
                name: 'subTitle',
                widget: 'string',
                required: false,
            }

          - {
                label: 'Banner Image',
                name: 'bannerImage',
                widget: 'image',
                required: false,
            }

          - {
                label: 'Permalink Override',
                name: 'permalink',
                widget: 'string',
                required: false,
            }

          - {
                label: 'SEO Meta Title',
                name: 'metaTitle',
                widget: 'string',
                required: false,
            }

          - {
                label: 'SEO Meta Description',
                name: 'metaDesc',
                widget: 'string',
                required: false,
            }

          - {
                label: 'Social Image',
                name: 'socialImage',
                widget: 'image',
                required: false,
            }

          - { label: 'Body', name: 'body', widget: 'markdown' }

          - label: 'Show contact form?'
            name: 'showContactForm'
            widget: 'boolean'
            default: false
            required: false
```

As we can see everything is the same here, apart from we have two versions. For me, this is slightly ugly and has resulted in quite a large config file, with changes in two places required if I want to make changes, albeit in the same file and close together. For my two languages, it's manageable, but if I needed to added 2-3 more languages, or a bunch more collections/fields for both languages it'd be a challenge.

## Netlify changes

The changes here, may well be unique to my setup, and in all honesty, I probably made these issues for myself. I envisaged a couple of issues that might arise after launching this feature with the site already being live with just English content. If following this along, can most likely be skipped.

* People may already have urls saved that had no locale in them, what would they see?
* The way my data was being populated based on having that locale meant that if a page was displayed without it, important data would be missing or incorrect

### Netlify redirects

Netlify allows you to setup redirects via it's build config file `netlify.toml`. to be honest, I needed to make use of AI to know what I might need to add into here. I wasn't able to test it locally easily either.

```toml
[build]
  publish = "_site"
  command = "npm run build"

# Allow direct access to /admin and /admin/* (no language redirect)
[[redirects]]
  from = "/admin"
  to = "/admin"
  status = 200

[[redirects]]
  from = "/admin/*"
  to = "/admin/:splat"
  status = 200

# Redirect root to English
[[redirects]]
  from = "/"
  to = "/en/"
  status = 301
  force = true

# Do NOT redirect if already has /en/ or /es/
[[redirects]]
  from = "/en/*"
  to = "/en/:splat"
  status = 200

[[redirects]]
  from = "/es/*"
  to = "/es/:splat"
  status = 200

# Redirect only non-language-prefixed URLs to English
[[redirects]]
  from = "/:path"
  to = "/en/:path"
  status = 301
  force = true

# Prevent double /en/en/ or /es/es/
[[redirects]]
  from = "/en/en/*"
  to = "/en/:splat"
  status = 301
  force = true

[[redirects]]
  from = "/es/es/*"
  to = "/es/:splat"
  status = 301
  force = true
```

These are doing the following (and why needed):

* We don't want the admin url to contain a locale, so ensure this is always just {domain}/admin
* If somebody with the urls with no locale lands on the site, redirect them to the /en version of the page. Probably not the nicest approach, but at least they see something complete and can then change the language
* I was seeing some issues with it being possible to have two locales in the url, not 100% sure why this was happening, so added some redirects to ensure this was doable

## SEO considerations

I'm not an SEO specialist, but I am aware of how changes I make can have an impact on it, and being the sole team member on projects, means I needed to do the investigation and work so as not to create regressions.

## What I'm not keen on

## Alternatives

## Summary
