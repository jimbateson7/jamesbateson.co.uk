---
layout: layouts/post.njk
title: Personal site tinkering
metaTitle: Site tinkering
metaDesc: I've been making some changes to this site that it probably didn't need.
socialImage: /images/social-share-default.jpg
date: 2025-04-14T14:31:50.593Z
---
W﻿ith a little bit of time whilst searching for a new role, I decided to make a few tweaks to this site. From some branding tweaks to trying to improve the performance.

## B﻿randing

T﻿his is something I've wanted to change for a while, but always just put it off due to lack of ideas. My previous logo was just my initials typed in the Lobster font!

A﻿fter doing some email signature work for a friend (Angela Bradley), we decided on a skill swap, and she would help me with some new branding.

S﻿he did an amazing job, and provided me with a new logo and some new colour palettes to compliment parts of my brand I wanted to keep.

T﻿here are still some bits I need to have a play around with and I decided not to massively change my simple, typography led design, as I quite like that in the context of what I use this site for. I may try and bring more of the accent colours in for future features/articles.

## F﻿ont

O﻿ne of the more significant changes I've made is to strip out my custom fonts. I was previously using Red Hat for everything, and think that one day I looked at it and for whatever reason didn't like it.

H﻿owever, I wanted to use this opportunity, before I changed my mind again (I'm my own worst client) to try something different and see if I could settle on something that I was pleased with from a design point of view that just used system fonts.

S﻿o the site now just uses the default system UI font set by the OS the user is visiting from. This has some pros and cons. Here's the font family value I'm now using:

`font-family: system-ui, Helvetica, sans-serif;`

### P﻿erformance

N﻿ot using a custom font means that there are less networks request(s) to make. I don't need to load that font, and also prefetching it, which I was doing to try and avoid FOUT (flash of unstyled text). Although only one fairly well optimised WOFF2 file was being loaded. Every little helps.

N﻿ow I'm using system fonts, that flash of default font no longer happens, as I'm just using that fallback. Again I'd previously done some work to try and reduce this with a custom fallback, but this reduces any risk of the font changing causing content layout shift (CLS).

### B﻿randing inconsistency

F﻿rom a design point of view, one thing that using the system defaults does mean is that I don't truly have a distinctive brand font that I can associate with my style guide.

D﻿epending on the OS the user is viewing the site on, the font will be different, not some much of an issue, but it does leave the site open to a bit of risk if the user has managed to change their default OS font and it doesn't work well with my design and content.

## L﻿ight/dark theme

T﻿his is something I have previously had on the site, but as a toggle button implemented with JavaScript. After watching a brilliant talk from State of the Browser 2025, I learned all about the `light-dark()` CSS function.

[I've written an article about the light-dark function](https://jamesbateson.co.uk/articles/using-the-light-dark-css-function/) so won't go into the same stuff here, but TLDR; the site now respects the OS light/dark colour scheme the user has chosen.

## S﻿cripts