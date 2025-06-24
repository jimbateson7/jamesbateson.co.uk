---
layout: layouts/project-single.njk
title: Claudia De Carlo
url: https://claudiadecarlo.com/
shortDescription: Design and development of a small marketing site for a transformation coach.
socialImage: /images/social-share-default.jpg
date: 2025-06-14T07:56:04.981Z
tags:
  - Eleventy
  - Tailwind
  - Netlify
---
Claudia is a transformation coach and mentor I first met at a Manchester Tech Fest event. I got in touch with her for some support and help to try and change my negative thinking about myself after past relationship and job trauma. We agreed to do a skill swap. You try and sort my head out, I'll design and build you a website.

## Services

* Design
* Development

## Tools

* Figma
* Eleventy
* Netlify
* TailwindCSS

## Starting point

Her existing site was a faff for her to change anything, didn't offer a lot of flexibility and wasn't scalable with the plans she has for her business and how she would like to grow different services.

The site used a page builder, drag and drop type system, and she had used WordPress in the past, but felt it a little complex and over the top for her needs. It's worth noting that it could well have been the theme/setup that had caused this, as WordPress is an excellent platform to work with when setup nicely.

## Goal

The aim was to create Claudia a site that allowed for multiple pages (her current site was just a long one pager), brought in her blog posts that were written on an external platform so she controlled and owned her content and had a space to create more, allow her to add more services, testimonials and content pages as she needed.

## Process

I started off by sitting down with Claudia and listening to her frustrations with the current site she had, what she wanted from her new one, looking through her existing brand assets and looking at examples of people she aspired to in her profession and what they were offering on their sites.

We decided we would head towards something quite minimalist, which suits my style of design and development as well.

Along with talking design, i also asked some questions and put forward my approach and thinking for the development deliverables. Such as what I would build it with (Eleventy) the CMS I was thinking of using (Decap) and where i thought would be good to host it (Netlify). This ensured there was no suprises along the way, and that I could manage expectations with the services that would be used.

For example, Decap CMS has its flaws. It can be quite slow and clunky in places, it's not the most accessible, and I was upfront about these, giving Clauida the opportunity to state a prefernce. But I felt that this stack would be ideal for what was needed and allow a short build to be sustainable, flexible and robust.

Claudia already had a domain name and some hosting and such, so I just explained the process of switching this to Netlify, and would would be needed, when and what it might cost.

### Pen and paper

I started off by doing some very rough page layout sketches. They don't look like much to anyone, but for me are a really important step in starting to visualise what I want to put into something like Figma. It makes me think about the layout and content that will be included first, before getting bogged down in pixels, fonts and colours.

I showed these to Claudia, just to keep the communication up and be open with my process. There's not a lot fo feedback that you can get from them, so I used a wireframe kit in Figma to make a slightly higher fidelity version of them.

After a few tweaks, we agreed on a layout and the content that would go onto the homepage, so i could move onto applying her brand.

### Figma designs

First things first, I'm not a designer. But I do feel that I have a proficiency in Figma and an eye for design supported by dev experience and working closely with designers. 

Normally when building side projects for myself I'll just design in the browser, however, with this project being for a client, I designed the pages out in Figma. It's also good experience for me in preparing to return to work and collaborate with designers.

I designed 4 different templates. Homepage, a static page, a service page and an archive (listing) page. I really enjoy using Figma, and feel my dev experience is a benefit when thinking about how I would build what I'm designing, how to make things accessible and thinking about semantics. 

I made use of variables (tokens) and components within Figma to ensure that my own design to dev handover was smooth and my dev setup - Tailwind for this project - was easy to do. One thing I didn't do, which was a bit naughty, and only because I knew I was building the site myself, was do mobile designs. I kept in mind how things would work on mobile, and there were no complex components on the site. It is something that should always be done though.

### Into build

Once the designs were signed off (apart from a few things we wanted to try out during build) I moved into the development phase. 

I used an Eleventy, Tailwind and NetlifyCMS starter as the base for the project. It was exactly the setup I wanted and very similar to how I built my own site, just minus the sass setup. As the starter was a little out of date, I did need to make a few adjustments before starting the build:

* Update Elevently to latest version (3.1.1 stable at time of writing) and then any Eleventy dependencies that needed to be bumped as a result of this
* Swap the Netlify CMS scripts and setup for Decap
* Update Tailwind to use version 4 (changing config to CSS as per new setup)
* Installed any Eleventy dependencies I knew I would need, such as eleventy-img

I use Nunjucks with Eleventy, inside of HTML files, this allows me to put HTML first and then build upon that solid semantic base with logic when needed. It also allows me to use partials, so i can build things up in a component structured way, keep things manageable and reusable.

This workflow, along with using Tailwind was great to work with! I found myself enjoying the development experience and moving through my task list at a nice pace. As much as I love writing CSS, I have to say that this project has probably converted me to Tailwind being my go-to for similar projects.

Once I was happy with my HTML and styling, had done some testing and such, I configured the CMS and hooked that up. This is done headless in an admin config yaml file. You can build up settings and collections, setting up fields that sit within those for content authors to populate and then selecting which widgets the fields use. I love seeing static builds come to life with dynamic data.

## Anything I didn't do?

I was quite limited in the format of the assets I had available on this project. Although I had some nice icons to use, they were in PNG format, and my design abilities don't stretch to assets creation. So the site makes a few too many image requests for my liking, however, we have been in touch with the designer who created the original assets to ask for them in SVG format, so hopefully can do some reworks if they come through.

If I can use SVGs, I'd love to add some nice little animation touches as well. I'm thinking some floral elements drawing in on scroll etc. It will be a nice chance to do some work like that, maybe using GSAP.

## Plans for the future

We're going to look at adding some kind of tracking at some point. It's not something I have experience in setting up and organising, so might just be dropping an analytics tool script in to start with, but hopefully another learning opportunity that will help my understanding in future roles and projects.

Claudia would also like to be able to change the language of the site and support Spanish translations. It's not something I've done with Eleventy and DecapCMS before, and the request came far too late in the day for it to make it into the initial launch. But something I will explore.

## Summary

This is the first start-finish solo project I've done in a long time, and I'm pleased with how it's turned out. Claudia is happy, and has been finding it easy to add and edit content - with some of the usual learning/teaching bits getting used to a new "system" comes with. And she's received some initial positive feedback on the site as a whole as well, which is great to hear.

I'm currently drafting out a more in-depth article on my side project setup and workflow, as I again greatly enjoyed working with it on this project. I learnt a bunch more useful features and ways of working with Eleventy, DecapCMS and Netlify, and think it would be worth me writing about them more for my future self.