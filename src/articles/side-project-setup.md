---
layout: layouts/post.njk
title: Side project setup
metaTitle: Side project setup
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

When I built this site (my personal site) I used Netlify CMS. It ticked all of those boxes and I also found a great 11ty starter project that used it, my site was hosted with Netlify meaning I could use their identity service to login and it kept everything in one place. However, [in February 2023 Netlify transferred the development of the CMS](https://www.netlify.com/blog/netlify-cms-to-become-decap-cms/) to one of their agency partners and it become Decap CMS.

## Netlify

## Wrapping up

## Further reading