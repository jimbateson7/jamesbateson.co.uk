---
layout: layouts/post.njk
title: Google Slides accessibility checker
metaTitle: Google Slides accessibility checker
metaDesc: Whilst putting together a deck for a lightning talk in Google slides,
  I wanted to see if there was anything available for checking the accessibility
  of slides.
socialImage: /images/social-share-default.jpg
date: 2025-05-28T08:47:41.211Z
---
I﻿n the past I've primarily used the Microsoft Office suite for putting together non-web documents such as presentation decks. However, with currently not being part of an organisation and unable to afford the license for the desktop app versions. I decided to use Google Slides to put together a deck for an upcoming lightning talk.

I﻿n the Office applications, there is a nice accessibility checker that checks your content to ensure it meets requirements such as colour contrast, reading order, alt text. I assumed there might be something similar for Google Slides.

I﻿ took a look around the various menus and under the `Tools` menu item, there is an accessibility item. This opens a dialog with some options for an improved accessibility experience.

![Screenshot of the Google Slides accessibility menu item dialog. It shows options for screen reader and screen magnifier support.](/images/screenshot-2025-05-28-at-10.08.04.png)

T﻿hese options are great, as they allow people relying on this assistive technology to better collaborate and understand the content in the slides. They could also be useful for manually testing your content.

H﻿owever, in this case, I was more looking for an automated accessibility checker to just run through all of my slides.

A﻿fter a brief search online, I found that you can add extensions to Google Slides. This is through the `Extensions -> Add-ons` menu. Through this I discovered [Grackle Slides](https://workspace.google.com/marketplace/app/grackle_slides/273764076887). There was another called "Accessibility Checked for Slides", however, Grackle seemed to have more installs and better reviews, so I went with that.

A﻿fter installing, when returning to the `Extensions` menu, you can now launch Grackle. This opens a sidebar that displays the accessibility checks done on your slides, whether they pass or fail, need investigation and the slide content that the check is referencing. This is useful as you can open the slide that the offending content is on.

![Screenshot of the Grackle Slides accessibility checker sidebar open in a Google Slides deck.](/images/screenshot-2025-05-28-at-10.26.54.png)

<div class="post-note"><h3 id="heading-further-reading">Note<a href="#heading-note" class="heading-permalink"><span class="visually-hidden"> permalink</span></a></h3><p>As it's a third party add-on installed through the Google Workplace Marketplace, it does mean that you have to grant it certain permissions to read content etc. So may be something to bear in mind for more confidential documents. </p><br><p>Once installed it's relatively simple to remove the add-on though if you so wish.</p></div>

T﻿he checks, information and feedback Grackle gave me were exactly what I was looking for, and very similar to the ones the Microsoft Office checker performs. It checked my deck for:

* T﻿itles and document language set
* S﻿lides have titles are unqiue and not empty
* A﻿ny tables used are accessible
* S﻿lide content elements are accessible e.g. image alt text, colour contrast, empty text boxes, lists not broken, etc.

I﻿t also seems to offer export to PDF and PDF checking as well. As far as I can tell this add-on seems to be free, however, it looks like if you want to start utilising the PDF features, you might only get around 6 uses of this for free.

T﻿here is also another tab in the sidebar UI that will show the structure of your slides and content. This is useful for ensuring you have suitable titles and nothing empty, and a meaningful reading order that will help people consuming your slides using assistive technology such as screen readers.

![Screenshot of the Grackle sidebar UI open in a Google Slide deck. The "Slides Structure" tab is open and displaying a structure of the deck slides content.](/images/screenshot-2025-05-28-at-10.27.34.png)

A﻿s with web accessibility testing, it's import to manually check that your content is accessible in documents as well, however this is a useful tool that I will be using for future presentations.