---
layout: layouts/post.njk
title: Accessibility for content authors
metaTitle: Accessibility for content authors
metaDesc: How can we ensure that accessibility requirements, expectations,
  responsibilities and good practices are understood and passed onto content
  authors.
socialImage: /images/social-share-default.jpg
date: 2025-04-23T10:38:16.439Z
tags:
  - Accessibility
---
## Accessibility is everybody's responsibility

During a product lifecycle, our aim is to move accessibility considerations and conversations earlier in the process (sometimes referred to as 'shifting left'). This involves cross-discipline teams collaborating and considering peoples experiences at each stage from the start of the process. However, once you ship a product, what happens if the content editors that will manage the site going forwards are external, unaware of accessibility requirements and not technically proficient. How can we ensure that our hard work in making a product accessible is not undone, or falls into a cycle of having to constantly remedy the same problems.

Something that I've been experiencing more often is that when handing over a product to an external team, accessibility is just being chucked over the wall with no training or support for day-to-day content authoring. How can we do better?

## Not a blame game

First off, and importantly, this is not a finger pointing exercise at content authors. They often have lots of content to create, add and edit on a daily basis, deadlines to meet and with little or no support. It may be that the tools they have to do this are not suitable, or training on these tools has not been sufficient.

There are also many content authors out there that are following accessibility best practices and upholding these standards across their teams.

The aim of this article is to look at ways we can better assist content authors in learning about and being aware of accessibility considerations when we hand over a product.

## Common issues

W﻿hen creating and editing content, there are a number of common areas that done incorrectly and gone unchecked, could create barriers for people wanting to consume the content:

* Alt text
* Captions/transcripts
* Colour contrast
* Link text
* Headings structure
* Reading level
* Text formatting (italics, size etc)

W﻿hen content is added on a regular basis, the number of these issues can build and build, and content authors may not be aware, passing them on to other team members, new starters etc. It may only be if somebody raises an issue, or an audit picks them up that they realise.

F﻿ixing these types of issues, is fairly low-hanging and high impact for people consuming the content. But educating and making content authors aware before they arise would cut the risk of them making published content.

## Education

A great place to start can be to signpost people in the direction of resources that can help them learn more about why accessibility is so important and to learn what responsibilities they may have to ensure standards are met and barriers not unintentionally created.

As part of the accessibility champions network at Code Computerlove, we encouraged new starters and people wanting to learn more to take the free [W3C digital accessibility foundations course](https://www.w3.org/WAI/courses/foundations-course/). This is a course is non-technical and suitable for a variety of disciplines, including content authors. This could be an ideal resource to get people understanding accessibility. It contains information and experiences from people with disabilities that use assistive technology everyday, including practical examples, exercises and quizzes that can be undertaken.

Another potential way to engage external teams with the importance of accessibility is to deliver an accessibility fundamentals skillshare. Similar to the W3C course, this can introduce people from different disciplines to why accessibility is so important. It's again chance to pass on expertise and passion around the subject in a face-to-face or digital session, a mix of educational slides and facts mixed with some hands-on interactive exercises, such as, mouse-free browsing tasks can really help deliver the message and put people in the position of their users and the barriers they may face.

## Training

Once there is some awareness around accessibility important and how it could affect users, a good way to build upon this might be to provide either a training path, or training materials.

I﻿f the content author team is internal, having an training path in place for the business would be great in terms of allowing content to also follow this should they wish. It could be suggested courses to take, recourses they might be able to use training budget for etc.

H﻿owever, if the content team is external, accessibility training could come from the team handing over the product.

O﻿ne way I've been exploring the potential to do this is with a short document that provides guidance on the common areas issues can be introduced as mentioned earlier in the article. This could be a do/don't example for each area. It would then be easy to make this part of all handovers, a default part of handing over, that would give the content team a reminder and resource for checking and sharing.

F﻿or example it could give a good example of alt text to write if the image contains text, or is an image of a graph/chart etc, and also remind that the alt text doesn't need to start with "Image of...". With links for further reading such as the alt text decision tree. Again, signposting for further reading and education.

## Why and how not just the doing

One of the most valuable ways to pass on accessibility knowledge, habits and more importantly, the **why** of the importance of accessibility and the barriers it can create if not considered can be to involve people that will be editing content when reviewing, identifying and fixing accessibility issues.

A legacy client project that I worked on received an accessibility audit, it flagged many issues, some that we could remedy in the codebase and a result of some bad ARIA usage (that's another article). However, a large percentage of them, were from pages/templates that were populated with content via the CMS (static page templates, news articles etc).

Whilst investigating a cross-section of these pages to find the common issues and the ones raised in the audit, we introduced the main content authors to one of the tools we were using to do this.

### WAVE

We wanted to demonstrate a tool that would be easy for people with little to no technical knowledge to understand and use. The [WAVE tool from WebAIM](https://wave.webaim.org/) felt like the ideal option. It's a tool that I'll often start with when investigating accessibility of a site/component. It adds icons to the page so people can see where the errors and warnings have occurred. It also offers explanations of issues it find in easier ways to understand than official documentation, and in ways that might make more sense to add to ticket/rely to colleagues. If WCAG guidelines are something that are understood and required, it also links off to the success criteria that issues relate to.

Wave also has inbuilt tools to check colour contrast, focus order and crucially for content editors a content structure visualiser.

We demo'd Wave on a call with the content editors and went through these features and helped them get it installed in their browsers.

Showing the content editors what these tools were, how to use them and what to look out for made a real impact. It gave them a way to check new content they were adding and also learn more about common issues as they went along, avoiding them resurfacing in the future and ending up back at square one.

## Handovers

When we hand over code, designs and processes we tend to document things. Whether this be API documentation, a digital document or a call demo. These things ensure that the person picking up the project or piece of work can efficiently pick it up and know what the original author was thinking and planning.

However, this isn't usually the case when it comes to content authors. We might show them the basics of the content management system, where to find things and how to add things etc, but I feel we could be documenting/helping with why the actual content best practices are so important.

### Descriptions/tooltips

When creating the CMS interface for a page/component a great way to remind people of accessibility considerations and responsibilities for the content they add, can be to add relevant accessibility descriptions or tooltips. Especially on fields where we might expect common issues to surface. For example:

* Image uploads - remind about alt text if and when it's needed
* Media uploads - consider captions and transcripts
* Colour pickers - check that contrast against the background it will sit on passes requirements
* WYSIWYG - remind about use of italics, to add suitable link text and reading age
* Headings - mention heading order/structure
* Tables - make people aware of how important creating accessible data tables structure is to people using assistive technology

This is something low-hanging, high-impact that many people already do, and several out-of-the-box content management systems also provide the ability to do. A helpful field description or tooltip can make a massive difference in reminding people of things to consider when entering content. Of course they could be ignored, but it's a good way to keep the accessibility awareness and messaging visible day-to-day. Eventually these practices in suggestions will lead to good habits. It could also benefit new team members onboarding, having this useful information and reminders as they learn the system.

#### A note on WYSIWYG editors

A﻿ common field type that content authors will use is a WYSIWYG (What You See Is What You Get) editors. These allow people to add blocks of content and format text, add images, quotes etc. However, they can allow people who know just enough to be dangerous.

I﻿t can result in an eclectic mix of font sizes, styles, weights, headings in random places, large blocks of italics. All this can have a negative effect on accessibility, from a readability point of view and consuming content through assistive technologies such as screen readers.

S﻿omething that can help with this is to limit what formatting options you allow in these editors (most allow you to only show certain features). This not only improves the UX for the editor as they only have the options they need, but also means they can't unintentionally create something that may exclude people from consuming the content.

**Note**: I'd also suggest looking into a way to handle parsing pasted in copy as well, for example pasting in a formatted word document can result in a lot of formatting issues. This could be part of the handover training document.

### Content style guides

M﻿any companies and brands have a content style guide, this helps them set a consistent tone-of-voice when people are creating new content and can help onboard new starters and contributors.

T﻿his could be an excellent place to set accessibility considerations for content authoring. It could be a page added to the website during build. This would put the considerations and expectations in an easy-to-access place for content authors and contributors and also in a public place for people to see the commitment and consideration  company has for accessible content.

H﻿aving it as a page on a site means it could also be adapted and grow as needed a little easier than having to re-edit/reproduce a physical document/PDF etc. It could however, also be exported or saved as a document if needed.

I﻿'ve seen a couple of nice examples of this:

* [T﻿he A11y project content style guide](https://www.a11yproject.com/content-style-guide/)
* ﻿[N﻿HS digital content creation guide](https://digital.nhs.uk/about-nhs-digital/corporate-information-and-documents/our-style-guidelines/conide/creating-content#usability-and-accessibility) - linked to their accessibility and usability section

### A﻿ccessibility annotations

I﻿'ve previously written about some ways that [accessibility decisions and considerations can be documented at the design stage](https://jamesbateson.co.uk/articles/accessibility-documentation-in-figma-mockups/), increasing collaboration and education between design and development disciplines. But there is no reason that this type of documentation could also be surfaced to and benefit content authors.

I﻿f a CMS allows content authors to build up pages using a set of components or elements, add heading levels, images etc the accessibility annotations done at the design stage could be a useful resource for them. It may provide some hints about what heading level certain content should be, certain colours that should or should not be used, types of images that should have alt text.

I﻿t's also another opportunity for accessibility awareness, responsibility, education and collaboration as well between disciplines.

T﻿here are [many publicly available annotation kits](https://www.figma.com/community/file/953682768192596304) for tools such as Figma.

## In summary

O﻿nce a product has been built and launched, it's likely that content authors, whether internal, external, part of a team, solo, technically proficient or not, will be making the most frequent changes to it.

I﻿f they are unaware of why, and how content needs to be made accessible, it can result in barriers being created for people trying to access the content. This article has covered some ways that we can help raise awareness and educate around accessibility rather than just basic CMS usage and then leaving them to it.

G﻿ood content is vital for accessibility, ensure that your content team is included in your accessibility work.

## Further reading

* A﻿ little bit of a self-plug here sorry, but I touched upon this subject in an [article I wrote for the HTMHell advent calendar](https://www.htmhell.dev/adventcalendar/2022/16/) a couple of years back. Some feedback from it inspired me to write this article
* [A﻿lt text guidance from Pope Tech](https://blog.pope.tech/2022/04/05/alternative-text-alt-text/)