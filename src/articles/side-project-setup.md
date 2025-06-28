---
layout: layouts/post.njk
title: My side project setup/stack
metaTitle: My side project setup/stack
metaDesc: An overview of my go-to side project setup.
socialImage: /images/social-share-default.jpg
date: 2025-06-14T08:33:30.195Z
---
With my [latest (and to be honest first for a while) side project recently launched](https://jamesbateson.co.uk/project/claudia-de-carlo/), I thought I would write a brief overview of the stack I used, and would use for other projects. It's very similar to the one I used for this site, it won't suite everyone/every project but I love working with it.

First off it's worth noting that the side projects I do are small-scale, normally just marketing/blog sites with little to no complex integrations. Here are the tools I use:

1. Figma
2. Eleventy
3. Tailwind CSS*
4. Netlify/Decap CMS\*\*
5. Netlify

\* Tailwind is something I've used recently, previously I used sass and vanilla CSS. Sometimes I'll use it for just some bits of a project alongside sass etc

\*\* This site uses Netlify CMS, however, Netlify no longer maintain the project, it is now known as Decap CMS. The setup and documentation and generally how it works seem to have stayed the same though

## Figma

Figma isn't always my starting point for side projects. If it's just a personal project and I have a clear vision in mind, I'll often combine pen and paper with design in the browser. However, when working on a project for other people, mocking up wireframes and designs in Figma can save a lot of time and makes collaboration early on easier.

As primarily a developer, I find it very useful to gain more experience working within Figma, to help me better understand the process of designers and design teams.

As I don't have a paid Figma account, I don't use dev mode for my side projects, however, I find it very useful to setup design tokens in Figma and start thinking ahead as if I were doing a design/dev handover. I'll often setup tokens I can use in development for this such as fonts, spacing and colours. Along with using components in Figma to think about how I might then split up my development build.

Using Figma is a great opportunity for me to practice what I preach when working in teams and advocating for shifting left in regards to accessibility and in particular not designing potential barriers into products. I use  plugins such as Stark and accessibility annotation kits to aid my self-handover to development.

I think it's also worth noting that I'm not a designer and don't claim to be. My practices are not likely as efficient and clean as people in this profession. However, I've always considered myself having an eye from design, and I love using Figma and collaborating with design.

## Eleventy (11ty)

I've switched between using [11ty](https://www.11ty.dev/) and [Astro](https://astro.build/) for my side projects. I love both, the documentation, setup experience, ease-of-use and communities and general developer experience make them a joy to work with. However, I find myself having a real affinity with 11ty when it comes to a new build.

I use Nunjucks as my templating language. There are other HTML templating languages out there such as Twig and Liquid that are also great, Nunjucks is just my go-to preference, can't really give many reasons beyond that. using templating languages fits in well with how I like to approach my development. Do it, do it right, do it better.

I like to start by writing semantic, accessible HTML, then build upon that with styles and finally any interactivity needed with presentational JavaScript. With templating languages, I feel like you're always putting the HTML first, and then writing logic around that, opposed to something like React, which has always, for me, felt like the opposite somehow, that HTML is an afterthought. This is just my opinion.

With Eleventy I can logically structure my projects as I need and Nunjucks allows me to work in `.html` files but use things like loops and partials. Front matter gives me the dynamic data I need to populate the HTML, which is populated by content from the CMS.

Here's an example of a testimonials list component: `testimonials.html` (I'm trying to ignore the carousel I begrudgingly lost the battle to not use).

{% raw %}
```twig
{% set orderedTestimonials = collections.testimonials | sort(attribute='data.order') %}

<section class="py-8 md:py-16 bg-[url('/static/uploads/pattern.webp')] bg-brand-purple-light">
    <div class="container mx-auto">
        <h2 class="font-medium text-brand-purple md:text-5xl">{{ testimonialsTitle }}</h2>

        <div class="px-2 md:px-11 mt-12 splide" aria-label="Testimonials Slider" data-splide='{ "autoHeight": true, "updateOnMove": true, "perPage": 2, "gap": "3rem", "breakpoints": { "1023": { "perPage": 1 } } }''>
            <div class="splide__track">
                <ul class="md:mt-8 splide__list">
                    {% for testimonial in orderedTestimonials %}
                        <li class="splide__slide">
                            {% include "partials/testimonialCard.html" %}
                        </li>
                    {% endfor %}
                </ul>
            </div>
        </div>
    </div>
</section>
```
{% endraw %}

I love how free the approach is, my front and back end are completely decoupled and I could switch things around if I so wished. 11ty provides support for many different languages should that need to change as well, and the whole process just feels logical to me and that I can concentrate on shipping less, and building up an accessible, performant and solid project.

When the homepage content from my CMS has been added, this is how it's written to the front matter in the index.html file. You can also add front matter yourself to help write logic and such.

```yaml
---
heroImage: /static/uploads/collage.jpg
layout: default
metaTitle: My Approach
metaDesc: Reconnect with Yourself to create lasting change
title: My Approach
subTitle: Reconnect with Yourself to create lasting change
bannerImage: /static/uploads/collage.jpg
summary: >-
  Everything begins with the relationship you have with yourself. 


  My method integrates insights from psychology, neuroscience, behavioural science, mindfulness, and therapeutic tools to guide you on a transformative journey. Together, we explore, redefine, and dissolve limiting beliefs and patterns, moving toward a more fulfilling life.


  At the core of my work are 4 main pillars, supported by 5 additional concepts that ensure holistic growth.
pillarsHeading: The 4 Core Pillars
pillars:
  - text: Feel
    description: Emotions are the gateway to understanding. By allowing yourself to
      fully experience them, we uncover the hidden limitations that hold you
      back. Your feelings offer important clues to areas needing growth and
      healing.
    icon: feel
  - text: Heal
    description: Once we identify the root cause of those emotions, I’ll guide you
      to nurture your inner self, helping you release old narratives and
      limiting beliefs. This process lessens the emotional grip they once had,
      allowing you to grow and move forward with more freedom and clarity.
    icon: heal
  - text: Balance
    description: Effective change happens through a mix of movement and stillness.
      Incorporating physical exercise, even something as simple as walking,
      together with mindfulness and meditation (even for the ones that believe
      they don’t have time), helps ground the body and mind. We’ll work to
      create harmony between action and reflection, allowing for steady,
      sustainable progress that feels natural over time.
    icon: balance
  - text: Transform
    description: As you integrate these practices, you’ll align more closely with
      your own values and deeper "Why." This leads to healthier choices in your
      career, relationships, and overall wellbeing - a transformation into the
      most authentic, empowered version of yourself.
    icon: transform
conceptsHeading: The 5 Supporting Concepts
concepts:
  - text: Learn
    description: Every challenge is an opportunity to deepen your self-understanding
      and expand your knowledge. A step forward to freedom.
  - text: Harmony
    description: We aim to create balance in all aspects of life, leading to inner
      peace and a sense of well-being.
  - text: Rise
    description: As you heal and grow, you rise into a more resilient and empowered
      version of yourself.
  - text: Connect
    description: Building deeper connections with yourself and others fosters a
      richer, more meaningful life.
  - text: Grow
    description: At every stage, we focus on nurturing continuous growth, both
      personally and professionally.
showContactForm: true
subtitle: Reconnect with Yourself to create lasting change
---
```

## Tailwind CSS

To be honest, Tailwind is something I have only been using regluaraly fairly recently. It was used by the team in my last role, which was my first experience using it outside of little projects and just for prototyping. And I have to admit that in the past I've more than happily jumped on the "but I love writing CSS, look at that disgusting markup" bandwagon.

However, I actually really enjoy using it now. I still think that learning CSS is an important first step before using something like Tailwind. For me, understanding what the classes your adding are actually doing, makes it even more powerful to use it efficiently, and can help with debugging when you come across unexpected CSS cross browser bugs, write performant CSS and CSS with accessibility considerations.

I'm not going to go into how Tailwind works, and how I used it, as there are many posts out there that do that, and it's also got great documentation for getting started. However, this is the first project I have used Tailwind 4 on. So there were a couple of configuration differences compared to my past usage.

### CSS config

Before version 4, `tailwind.config.js` would be used to extend any classes you need with the spacing/sizing scale from your designs, or tweak defualt breakpoints, add your brand colours etc. This was done through a series of objects, that Tailwind then did magic things with and they became classes that could be used with the same syntax as their defaults `bg-brand-purple` for example.

In version 4 you now [use the CSS file you import Tailwind in to configure](https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration) your projects custom property values. This feels like a better fit for me, after all it's a CSS framework, so setting it up in CSS makes sense, right?

You can setup your design token in the `@theme` layer

```css
@theme {
  --font-display: "lora", serif;
  --font-sans: "jakarta-sans", sans-serif;

  --color-brand-red: #c74c49;
  --color-brand-purple: #912c61;
  --color-brand-yellow: #fca23b;
  --color-brand-purple-light: #f1e0e9;

  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
}
```

With mine only being a fairly simple small site that I designed with Tailwinds sizing and spacing scale in mind, I've not added much here, but there's a lot more you could do, and I'm still learning how powerful Tailwind can be.

You can also use a base layer, which I used for setting things like default styles on common elements like headings and links etc

```css
@layer base {
  h1, h2, h3, h4 {
    @apply font-display text-pretty;
  }

  ...more base styles
}
```

For any custom CSS you're writing, useful for such things as markup not written by you, or maybe elements coming from APIs/CMS content widgets etc, you can use the component layer, and reference your design tokens.

```css
@layer components {
  .pillar-card:nth-child(odd) {
    background-color: var(--color-brand-purple);
    color: var(--color-white;
  }
 }
```

Something I'm still unsure on is whether it's still 'ok' to use @apply or whather now that tokens are available as CSS custom properties, whether just writing CSS as normal and using these is preferred. Something that I kind of mixed up a little bit in these examples and my latest project, but I'm sure that I'll refine with more use and learning.

### Use Tailwind for bits not all

Something that I quite like the idea of is using Tailwind for aspects of a projects CSS workflow, but integrating it into another methodology, or way of working. Tailwind only outputs what you have written, you could potentially have a tiny utilities library and still write your own CSS for components.

I'm still figuring out if it's counter intuitive and would need to use it in a project to make a judgement, and Tailwind 4 might be what I'm describing and just not realised. [CUBE CSS touches upon this concept](https://cube.fyi/), although it's tool agnostic, you could use something like Tailwind just for it's utility class generation of your tokens. Some food for thoughts anyway.

## Netlify/Decap CMS

When a side project required the ability to regularly add and update content. Adding a CMS obviously makes sense. However, with little to no backend dev experience and often not really wanting to pay licensing/seat costs, I want something that is easy to configure, flexible, scalable, able to be decoupled from my front end, well documented and has an active community (not wanting much there, ey!).

When I built this site (my personal site) I used Netlify CMS. It ticked all of those boxes and I also found a great 11ty starter project that used it, my site was hosted with Netlify meaning I could use their identity service to login and it kept everything in one place. However, [in February 2023 Netlify transferred the development of the CMS](https://www.netlify.com/blog/netlify-cms-to-become-decap-cms/) to one of their agency partners and it become [Decap CMS](https://decapcms.org/).

To take from the Decap docs:

> Decap CMS (formerly Netlify CMS) is an open source content management system for your Git workflow that enables you to provide editors with a friendly UI and intuitive workflows. You can use it with any static site generator to create faster, more flexible web projects. Content is stored in your Git repository alongside your code for easier versioning, multi-channel publishing, and the option to handle content updates directly in Git.

The config for Decap is done via a `yaml` file that sits in my `/admin` folder. In here I can build up a set of collections that can be added and edited in the UI. Inside these collections you add fields and set the widget types the field will use. Here's an example of a page setup

```yaml
    - name: 'static_pages'
      label: 'Static Pages'
      folder: 'src/pages'
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

This allows the creating of a page in the CMS, with a series of fields that can be added to. In this instance it's just for basic static content pages. So as well as some basic meta info that can be added  overridden. The title, subtitle and banner image and be set, and the markdown widget provides a WYSIWYG editor to add the main content of the page. From within that images, quotes, headings, codeblocks etc can be added (these are just the Decap defaults and can be built upon).

You can make fields required, set defaults and also provide helper info if needed. As you can see, it's a pretty simple setup. Admittedly it probably wouldn't work for a large complex site. But that's not the type of project I'd be looking to undertake on my own, so this suits my needs.

Along with pages, you can also add collections for items you might use in multiple places on the site. For example, if we return the testimonials I showed earlier in my Nunjucks code example. Here's how this is configured

```yaml
    - label: 'Testimonials'
      name: 'testimonials'
      folder: 'src/testimonials'
      create: true
      slug: '{{fields.testimonialAuthor | slug}}'
      fields:
          - label: 'Layout'
            name: 'layout'
            widget: 'hidden'
            default: 'page.html'

          - label: 'Order'
            name: 'order'
            widget: 'number'
            min: 1

          - label: 'Author'
            name: 'testimonialAuthor'
            widget: 'string'

          - label: 'Author Location'
            name: 'testimonialAuthorLocation'
            widget: 'string'
            required: false

          - label: 'Author Image'
            name: 'testimonialAuthorImage'
            widget: 'image'
            required: false

          - label: 'Quote'
            name: 'quote'
            widget: 'markdown'

          - label: 'Show Story?'
            name: 'showStory'
            widget: 'boolean'
            default: false

          - label: 'Body'
            name: 'body'
            widget: 'markdown'
            required: false

          - label: 'Show contact form?'
            name: 'showContactForm'
            widget: 'boolean'
            default: false
            required: false
```

This gives me a collection that I can then loop through to display and such.

There's some nice content author bits you can setup in Decap as well. You can enable an editorial workflow to allow the saving of posts as drafts, set them for review and such before you publish them. Useful if working with other contributors. There also preview links generated by Netlify (using git branches) so you can view the post to make sure you're happy, in addition to a live preview that you can show as the author builds up theuir page/article/content.

What I would say is that there might well be tools that are better than this out there. Decap can be a little slow and clunky. It's not the most accessible. It has limitations for in it's functionality. However, it works for me and my skillset/knowledge limitations, and I work efficiently with it. If I'm doing the project and using this for a client. I'll always be transparent about these limitations, and talk them through how it works, show them an example and offer alternatives.

## Netlify

Many people will be aware of Netlify, and what a great service it is for hosting and publishing great things on the web. You can very quickly get something published from a code repository (you get a siteName.netlify.app url) allowing you to share what you have built. You can then configure a custom domain.

For the size and requirements of the projects I work on, [the free tier](https://www.netlify.com/pricing/) is more than enough for me. You get a number of build minutes a month for free alongside capped extras like handling of large media, form submissions and even features such as split testing, which is cool! The paid plans offer even more such as site analytics, extra security and more.

### Forms

Being able to detect forms with Netlify is handy when you have little experience hooking services up. With Netlify, you just need to tell Netlify the forms you want it to collect submissions for, and it will handle the rest, as mentioned with a submission cap. Here's an example of how one is configured

```html
<form action="/success" method="POST" netlify name="subscribe" data-netlify-honeypot="bot-field">
  <input type="hidden" name="subscribe" value="subscribe" />

  <div hidden>
      <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
  </div>

  ...rest of your form fields
 </form>
```

The form just needs the netlify attribute for Netlify to detect it and a name that wil show in the Netlify forms dashboard. You can also use the action attribute to use a custom success/thank you page, and attempt to filter out spam using a honeypot.

### Netlify identity and CMS login

I'm going write a post going into this a little more, however, [Netlify Identity has now been deprecated](https://www.netlify.com/changelog/deprecation-netlify-identity/). As my personal site was built and configured before this happened, it still works to allow me to login to my admin UI (however, I will be looking to move away from it soon).

The recommendation is to setup OAuth, and a particular plugin you can add to Netlify is suggested. For my latest side project, I did try and get this working, but I'll be honest, I got a little lost and confused in the UI and wasn't sure what I was being asked to do. I may sit down and try and step through this again, but for now I used a [third party service called DecapBridge](https://decapbridge.com/), which offers a UI for authenticating admin editor users.

I'll update this post with a link to my migration article when it's complete, which will explain the process and setup in a little more detail.

## Wrapping up

There's no doubt that my setup/stack is suited to the smaller, static nature of the side projects I work on, and am capable and comfortable taking on by myself. The beauty of your preferred stack is that as long as what your outcome is an accessible, performant, user-friendly site, it doesn't really matter. Do what works for you best. this stack suits me as I like to practice what I preach around not jumping into JavaScript first/heavy frameworks.

No doubt I'll continue to tweak my stack and process as things advance and I learn new process and tools in my new role.

## Further reading

* If not using 11ty, [Astro](https://astro.build/) is my other go-to
* A great community [guide/resource hub for all things 11ty](https://11tybundle.dev/)