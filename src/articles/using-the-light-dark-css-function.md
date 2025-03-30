---
layout: layouts/post.njk
title: Using the light-dark() CSS function
metaTitle: Using the light-dark() CSS function
metaDesc: Using the light-dark() CSS function as a modern way to support light
  and dark colour scheme preferences.
socialImage: /images/social-share-default.jpg
date: 2025-03-30T08:37:52.592Z
tags:
  - CSS
---
[State of the Browser](https://2025.stateofthebrowser.com/) conference took place yesterday. Whilst I was unfortunately wasn't able to attend in person, I still watched on the live stream. All of the speakers were brilliant, with engaging, thoughtful and informative talks. One in particular came at a good time for me. [Niya Dobazova](https://bsky.app/profile/niya-d.bsky.social) (who you could not tell was relatively new to public speaking) gave a talk on using the CSS `light-dark()` function.

I﻿'ve recently being making some UI tweaks to this site, including some little brand tweaks provided by the brilliant [Angela Bradley](https://www.linkedin.com/company/angela-bradley-creative). One thing that I wanted to add was colours that would update based on the users OS light/dark/auto theme preferences.

I﻿n the past I've had a toggle on this site for it. This used a toggle button and some JavaScript to detect the OS preference, set the theme, and then users could toggle this if they wished. Whilst I was very happy with the solution and interaction of the button, you don't need JavaScript to do this though.

## Implementation

F﻿irstly, support for the function must be added. This is typically done on the `:root`. The `light-dark()` color function then requires two comma separated values; the color when the theme is light and then color when it's dark.

```css
:root {
  color-scheme: light dark;
}

body {
  background-color: light-dark(#fff, #000);
  color: light-dark(#000, #fff);
}
```

## Support

T﻿he `light-dark()` color function is still relatively new. Therefore consideration for older browser versions may be needed if you support this. You can find the [support list on the caniuse site](https://caniuse.com/mdn-css_types_color_light-dark).

## Advantages

N﻿iya highlighted A number of ways that supported both light and dark colour schemes could help:

* A﻿ccessibility
* S﻿ustainability
* P﻿refernce support

## F﻿urther reading

* [M﻿DN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark)