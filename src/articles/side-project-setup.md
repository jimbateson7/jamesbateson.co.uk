---
layout: layouts/post.njk
title: Side project setup
metaTitle: Side project setup
metaDesc: An overview of my go-to side project setup.
socialImage: /images/social-share-default.jpg
date: 2025-06-14T08:33:30.195Z
---
With my latest (and to be honest first for a while) side project wrapping up soon, I thought I would write a brief overview of the stack I used, and would use for other projects. It's very similar to the one I used for this site, it won't suite everyone/every project but I love working with it.

First off it's worth noting that the side projects I do are small-scale, normally just marketing/blog sites with little to no complex integrations. Here are the tools I use:

1. Figma
2. Eleventy
3. Tailwind CSS*
4. Netlify/Decap CMS\*\*
5. Netlify

\* Tailwind is something I've used recently, previously I used sass and vanilla CSS. Sometimes I'll use it for just some bits of a project alongside sass etc

\*\* This site uses Netlify CMS, however, Netlify no longer maintain the project, it is now known as Decap CMS. The setup and documentation and genrally how it works seem to have stayed the same though

## Figma

Figma isn't always my starting point for side projects. If it's just a personal project and I have a clear vision in mind, I'll often combine pen and paper with design in the browser. However, when working on a project for other people, mocking up wireframes and designs in Figma can save a lot of time and makes collaboration early on easier.

As primarily a developer, I find it very useful to gain more experience working within Figma, to help me better understand the process of designers and design teams.

As I don't have a paid Figma account, I don't use dev mode for my side projects, however, I find it very useful to setup design tokens in Figma and start thinking ahead as if I were doing a design/dev handover. I'll often setup tokens I can use in development for this such as fonts, spacing and colours. Along with using components in Figma to think about how I might then split up my development build.

Using Figma is a great opportunity for me to practice what I preach when working in teams and advocating for shifting left in regards to accessibility and in particular not designing potential barriers into products. I use  plugins such as Stark and accessibility annotation kits to aid my self-handover to development.

I think it's also worth noting that I'm not a designer and don't claim to be. My practices are not likely as efficient and clean as people in this profession. However, I've always considered myself having an eye from design, and I love using Figma and collaborating with design.

## Eleventy (11ty)

I've switched between using 11ty and Astro for my side projects. I love both, the documentation, setup experience, ease-of-use and communities make them a joy to work with. However, I find myself having a real affinity with 11ty. 

I use Nunjucks as my templating language. There are other HTML templating languages out there such as Twig and Liquid that are also great, Nunjucks is just my go-to preference, can't really give many reasons beyond that. using templating languages fits in well with how I like to approach my development. Do it, do it right, do it better. 

I like to start by writing semantic, accessible HTML, then build upon that with styles and finally any interactivity needed with presentational JavaScript. With templating languages, I feel like you're always putting the HTML first, and then writing logic around that, opposed to something like React, which has always, for me, felt like the opposite somehow, that HTML is an afterthought. This is just my opinion.

With Eleventy I can logically structure my projects as I need and Nunjucks allows me to work in `.html` files but use things like loops and partials. Front matter gives me the dynamic data I need to populate the HTML, which is populated by content from the CMS.

I love how free the approach is, my front and back end are completely decoupled and I could switch things around if I so wished. 11ty provides support for many different languages should that need to change as well, and the whole process just feels logical to me and that I can concentrate on shipping less, and building up an accessible, performant and solid project.